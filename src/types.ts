export interface Testimonio {
  id: string;
  nombre: string;
  cargo: string;
  avatar: string;
  comentario: string;
}

export interface ProyectoAdicional {
  id: string;
  nombre: string;
  ubicacion: string;
  tag: string;
  precio: string;
  area: string;
  imagen: string;
  previo?: string;
  agotado?: boolean;
}

export interface Lead {
  lead: string; // Nombres y Apellidos completos del interesado
  celular: string; // Número celular
  correo: string; // Correo electrónico
  distrito?: string; // Distrito (opcional)
  comentarios?: string; // Comentarios / Mensaje de consulta (opcional)
  politicaTerminos: boolean;
  politicaPublicidad: boolean;
  politicaPerfilamiento: boolean;
}

export interface LeadResponse {
  success: boolean;
  message: string;
  leadId?: string;
}
