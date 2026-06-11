import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  // In production, bind to port 8007, otherwise default to 3000 for development setup
  const PORT = process.env.NODE_ENV === "production" ? 8007 : 3000;

  app.use(express.json());

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
          error: "GOOGLE_SHEETS_WEBHOOK_URL is not defined in environment variables. Set it in current secrets." 
        });
      }

      // Format payload ensuring all required fields (including management / gestion keys and putting comentarios last)
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

      console.log("[SERVER] Manual sync payload formatted:", formattedData);

      // Append query parameters for scripts using e.parameter (extreme compatibility booster)
      const urlObj = new URL(webhookUrl);
      Object.entries(formattedData).forEach(([k, v]) => {
        urlObj.searchParams.append(k, String(v));
      });
      const finalUrl = urlObj.toString();

      console.log(`[SERVER] Dispatching to final webhook url: ${finalUrl}`);

      const response = await fetch(finalUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formattedData),
        redirect: "follow"
      });

      const responseText = await response.text();
      console.log(`[SERVER] Google Sheets response status: ${response.status}, body:`, responseText);

      if (!response.ok) {
        throw new Error(`Google Sheets Webhook returned status ${response.status}: ${responseText}`);
      }

      return res.json({ 
        success: true, 
        message: "Lead manually synced successfully",
        details: responseText
      });
    } catch (error: any) {
      console.error("[SERVER] Error with manual sync:", error);
      return res.status(500).json({ 
        success: false, 
        error: error.message || "Failed to Sync with Google Sheets" 
      });
    }
  });

  // API Route to receive lead and forward to Google Sheets Webhook
  app.post(["/api/leads", "/lasbugambilias/api/leads"], async (req, res) => {
    try {
      const leadData = req.body;
      const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
      
      console.log("[SERVER] Received lead backend submission:", leadData);

      if (!webhookUrl) {
        console.warn("[SERVER] GOOGLE_SHEETS_WEBHOOK_URL is not defined in environment variables. Lead won't be forwarded.");
        return res.json({ 
          success: true, 
          message: "Lead processed locally. Define GOOGLE_SHEETS_WEBHOOK_URL to forward to Google Sheets." 
        });
      }

      // Format payload ensuring all required fields (including management / gestion keys and putting comentarios last)
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

      console.log("[SERVER] Direct sync payload formatted:", formattedData);

      // Append query parameters for scripts using e.parameter (extreme compatibility booster)
      const urlObj = new URL(webhookUrl);
      Object.entries(formattedData).forEach(([k, v]) => {
        urlObj.searchParams.append(k, String(v));
      });
      const finalUrl = urlObj.toString();

      console.log(`[SERVER] Forwarding lead to Google Sheets webhook: ${finalUrl}`);
      
      // Perform the fetch request
      const response = await fetch(finalUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formattedData),
        redirect: "follow"
      });

      const responseText = await response.text();
      console.log(`[SERVER] Google Sheets response status: ${response.status}, body:`, responseText);

      if (!response.ok) {
        throw new Error(`Google Sheets Webhook returned status ${response.status}: ${responseText}`);
      }

      return res.json({ 
        success: true, 
        message: "Lead forwarded to Google Sheets successfully",
        details: responseText
      });
    } catch (error: any) {
      console.error("[SERVER] Error forwarding lead to Google Sheets:", error);
      return res.status(500).json({ 
        success: false, 
        error: error.message || "Failed to forward lead to Google Sheets" 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    console.log("[SERVER] Starting in DEVELOPMENT mode with Vite dev middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    
    // Ensure the Vite dev server routing works, handling /lasbugambilias/ base properly
    app.use(vite.middlewares);
  } else {
    console.log("[SERVER] Starting in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    
    // Serve static files for the SPA
    app.use("/lasbugambilias/", express.static(distPath));
    app.use(express.static(distPath));
    
    // Support base path fallback
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
