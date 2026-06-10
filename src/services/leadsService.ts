import { Lead } from '../types';

export interface LeadWithMeta extends Lead {
  id: string;
  fecha: string;
  campaña: string;
  formulario: string;
  captacion: string;
  contactoLaia: string;
  asesora: string;
  contactoAsesor: string;
  leadPerdido: string;
  cliente: string;
}

const LOCAL_STORAGE_KEY = 'las_bugambilias_leads_local';

function getLocalLeads(): LeadWithMeta[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading local leads:', e);
    return [];
  }
}

function saveLocalLeads(leads: LeadWithMeta[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(leads));
    // Notify all active subscribers
    subscribers.forEach((callback) => {
      try {
        callback([...leads]);
      } catch (err) {
        console.error('Error in subscriber callback:', err);
      }
    });
  } catch (e) {
    console.error('Error saving local leads:', e);
  }
}

// Memory-based callback subscription list
const subscribers: Set<(leads: LeadWithMeta[]) => void> = new Set();

/**
 * Saves a lead to local storage with direct metadata attributes.
 */
export async function saveLeadToFirestore(
  lead: Lead,
  extra: { origen: 'formulario principal' | 'formulario popup' | string }
): Promise<string> {
  const currentLeads = getLocalLeads();
  const id = 'lead_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
  
  // Format local date/time for es-PE matching Peru's timezone
  const localDateStr = new Date().toLocaleString('es-PE', {
    timeZone: 'America/Lima',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const newLead: LeadWithMeta = {
    id,
    lead: lead.lead.trim(),
    celular: lead.celular.trim(),
    correo: lead.correo.trim(),
    distrito: lead.distrito ? lead.distrito.trim() : '',
    comentarios: lead.comentarios ? lead.comentarios.trim() : '',
    politicaTerminos: lead.politicaTerminos,
    politicaPublicidad: lead.politicaPublicidad,
    politicaPerfilamiento: lead.politicaPerfilamiento,
    
    // Google Sheets exact column expectations & defaults
    fecha: localDateStr,
    campaña: 'Landing Page LB',
    formulario: extra.origen === 'formulario popup' ? 'formulario popup' : 'formulario principal',
    captacion: 'Landing LP Form',
    contactoLaia: 'no',
    asesora: 'N/A',
    contactoAsesor: 'sin seguimiento',
    leadPerdido: 'no',
    cliente: 'no',
  };

  saveLocalLeads([newLead, ...currentLeads]);

  // Attempt to forward the new lead to Google Sheets via our Express backend
  try {
    const apiPath = '/lasbugambilias/api/leads';
    console.log('[leadsService] Requesting backend sync to Google Sheets, path:', apiPath);
    const response = await fetch(apiPath, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newLead),
    });
    
    if (!response.ok) {
      console.warn('[leadsService] Sync request failed with status:', response.status);
    } else {
      const resJson = await response.json();
      console.log('[leadsService] Sync request completed successfully:', resJson);
    }
  } catch (error) {
    console.error('[leadsService] Network error during backend sync request:', error);
  }

  return id;
}

/**
 * Subscribes to lead updates in real-time.
 */
export function subscribeToLeads(
  onUpdate: (leads: LeadWithMeta[]) => void,
  onErr: (error: any) => void
) {
  // Notify immediately with current local data
  const currentLeads = getLocalLeads();
  onUpdate(currentLeads);

  // Add callback to system subscribers set
  subscribers.add(onUpdate);

  // Return unsubscribe token
  return () => {
    subscribers.delete(onUpdate);
  };
}

/**
 * Updates dynamic fields of a lead (eg. contactoAsesor, leadPerdido, cliente).
 */
export async function updateLeadFields(id: string, fields: Partial<LeadWithMeta>): Promise<void> {
  const currentLeads = getLocalLeads();
  const updated = currentLeads.map((l) => (l.id === id ? { ...l, ...fields } : l));
  saveLocalLeads(updated);
}

/**
 * Deletes a lead.
 */
export async function deleteLeadFromFirestore(id: string): Promise<void> {
  const currentLeads = getLocalLeads();
  const updated = currentLeads.filter((l) => l.id !== id);
  saveLocalLeads(updated);
}

