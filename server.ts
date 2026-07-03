import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

// Dual ES Module and CommonJS compatibility for __filename and __dirname
let resolvedFilename = "";
let resolvedDirname = "";

try {
  if (typeof import.meta !== "undefined" && import.meta.url) {
    resolvedFilename = fileURLToPath(import.meta.url);
    resolvedDirname = path.dirname(resolvedFilename);
  }
} catch (e) {
  // Graceful fallback for non-ESM or environments without import.meta
}

const __filenameFallback = resolvedFilename || (typeof __filename !== "undefined" ? __filename : "");
const __dirnameFallback = resolvedDirname || (typeof __dirname !== "undefined" ? __dirname : process.cwd());

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // ==========================================
  // 1. RUTAS DE LA API (Siempre primero)
  // ==========================================

  // API Route to check if Google Sheets Webhook is configured
  app.get(["/api/sheets-config", "/lasbugambilias/api/sheets-config"], (req, res) => {
    const isConfigured = !!process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    res.json({
      configured: isConfigured,
      webhookUrlPlaceholder: isConfigured 
        ? `${process.env.GOOGLE_SHEETS_WEBHOOK_URL!.substring(0, Math.min(30, process.env.GOOGLE_SHEETS_WEBHOOK_URL!.length))}...` 
        : null
    });
  });

  // API Route to manually sync a lead (re-send)
  app.post(["/api/leads/sync", "/lasbugambilias/api/leads/sync"], async (req, res) => {
    try {
      const leadData = req.body;
      const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
      
      console.log("[SERVER] Manual sync request for lead ID:", leadData.id);

      if (!webhookUrl) {
        return res.status(400).json({ 
          success: false, 
          error: "GOOGLE_SHEETS_WEBHOOK_URL is not defined in environment variables." 
        });
      }

      const formattedData = {

        origen:"LP_LasBugambilias",

        fecha: leadData.fecha || "",
        campaña: leadData.campaña || "Landing Page LB",
        formulario: leadData.formulario || "formulario principal",
        captacion: leadData.captacion || "Landing LP Form",
        lead: leadData.lead || "",
        celular: leadData.celular || "",
        correo: leadData.correo || "",
        distrito: leadData.distrito || "",
        contactoLaia: leadData.contactoLaia || "no",
        "contacto laia": leadData.contactoLaia || "no",
        asesora: leadData.asesora || "N/A",
        contactoAsesor: leadData.contactoAsesor || "sin seguimiento",
        "contacto asesor": leadData.contactoAsesor || "sin seguimiento",
        leadPerdido: leadData.leadPerdido || "no",
        "lead perdido": leadData.leadPerdido || "no",
        cliente: leadData.cliente || "no",
        comentarios: leadData.comentarios || ""
      };

      const urlObj = new URL(webhookUrl);
      Object.entries(formattedData).forEach(([k, v]) => {
        urlObj.searchParams.append(k, String(v));
      });
      const finalUrl = urlObj.toString();

      const response = await fetch(finalUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
        redirect: "follow"
      });

      const responseText = await response.text();
      if (!response.ok) throw new Error(`Google Sheets returned status ${response.status}`);

      return res.json({ success: true, message: "Lead manually synced successfully", details: responseText });
    } catch (error: any) {
      console.error("[SERVER] Error with manual sync:", error);
      return res.status(500).json({ success: false, error: error.message });
    }
  });

  // API Route to receive lead and forward to Google Sheets Webhook
  app.post(["/api/leads", "/lasbugambilias/api/leads"], async (req, res) => {
    try {
      const leadData = req.body;
      const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
      
      console.log("[SERVER] Received lead backend submission:", leadData);

      // Return instant success response to the client
      res.json({ success: true, message: "Lead received, processing in background" });

      if (!webhookUrl) {
        console.log("[SERVER] Webhook URL is missing. Processed locally only.");
        return;
      }

      const formattedData = {
        fecha: leadData.fecha || "",
        campaña: leadData.campaña || "Landing Page LB",
        formulario: leadData.formulario || "formulario principal",
        captacion: leadData.captacion || "Landing LP Form",
        lead: leadData.lead || "",
        celular: leadData.celular || "",
        correo: leadData.correo || "",
        distrito: leadData.distrito || "",
        contactoLaia: leadData.contactoLaia || "no",
        "contacto laia": leadData.contactoLaia || "no",
        asesora: leadData.asesora || "N/A",
        contactoAsesor: leadData.contactoAsesor || "sin seguimiento",
        "contacto asesor": leadData.contactoAsesor || "sin seguimiento",
        leadPerdido: leadData.leadPerdido || "no",
        "lead perdido": leadData.leadPerdido || "no",
        cliente: leadData.cliente || "no",
        comentarios: leadData.comentarios || ""
      };

      const urlObj = new URL(webhookUrl);
      Object.entries(formattedData).forEach(([k, v]) => {
        urlObj.searchParams.append(k, String(v));
      });
      const finalUrl = urlObj.toString();

      // Execute Google Sheets API Webhook asynchronously in the background
      fetch(finalUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
        redirect: "follow"
      })
      .then(async (response) => {
        const responseText = await response.text();
        if (!response.ok) {
          console.error(`[SERVER] Google Sheets webhook failed with status ${response.status}:`, responseText);
        } else {
          console.log("[SERVER] Lead forwarded successfully to Google Sheets Webhook (background):", responseText);
        }
      })
      .catch((error) => {
        console.error("[SERVER] Error forwarding lead in background:", error);
      });

    } catch (error: any) {
      console.error("[SERVER] Error processing lead submission:", error);
      if (!res.headersSent) {
        return res.status(500).json({ success: false, error: error.message });
      }
    }
  });

  // ==========================================
  // 2. MIDDLEWARES DE CLIENTE (Vite / Estáticos)
  // ==========================================
  if (process.env.NODE_ENV !== "production") {
    console.log("[SERVER] Starting in DEVELOPMENT mode...");
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("[SERVER] Starting in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    
    // Servir estáticos primero
    app.use("/lasbugambilias", express.static(distPath));
    app.use(express.static(distPath));
    
    // Comodines GET estrictos para el SPA (Al final de todo)
    app.get("/lasbugambilias/*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SERVER] Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("[SERVER] Failed to start server:", err);
});