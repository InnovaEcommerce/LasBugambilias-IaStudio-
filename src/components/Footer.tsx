import { Facebook, Youtube, Instagram, ShieldCheck, FileSpreadsheet, Heart, Smartphone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const primaryLinks = [
    { label: 'Condominios', href: '#proyecto' },
    { label: 'Proyectos', href: '#proyecto' },
    { label: 'Refiere y gana', href: '#refiere' },
    { label: 'App vecino INNOVA', href: '#app' },
  ];

  const legalLinks = [
    { label: 'Pagolink', href: '#financiamiento' },
    { label: 'Términos y condiciones', href: '#legal' },
    { label: 'Políticas de Privacidad', href: '#legal' },
    { label: 'Mesa de Partes', href: '#contacto' },
  ];

  return (
    <footer className="bg-neutral-900 border-t-4 border-centenario-magenta text-white font-sans text-xs">
      
      {/* Top Footer links segment */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Column 1: Brand details and short summary */}
        <div className="space-y-4">
          <div className="flex flex-col">
            <span className="font-display font-black text-lg italic text-white tracking-tighter leading-none">
              INNOVA
            </span>
            <span className="text-[9px] tracking-[4px] uppercase font-bold text-centenario-yellow leading-none font-mono">
              GRUPO
            </span>
          </div>
          <p className="text-neutral-400 text-xs leading-relaxed max-w-xs">
            Desarrolladora de proyectos residenciales modernos líder en el sur del Perú con más de 15 años de trayectoria sustentable construyendo proyectos seguros y revalorizables.
          </p>
          
          <div className="flex items-center gap-2 pt-2">
            <ShieldCheck className="w-4 h-4 text-emerald-450 shrink-0" />
            <span className="text-[10px] text-neutral-400 font-mono">Inversión 100% Amparada S.A.A.</span>
          </div>
        </div>

        {/* Column 2: Nav Options list */}
        <div className="space-y-3 text-left">
          <h4 className="font-display font-black text-sm uppercase tracking-wider text-centenario-yellow">Navegación</h4>
          <ul className="space-y-2">
            {primaryLinks.map((lnk) => (
              <li key={lnk.label}>
                <a
                  href={lnk.href}
                  className="text-neutral-300 hover:text-centenario-magenta transition-colors duration-150"
                >
                  • {lnk.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Legal Disclosures list */}
        <div className="space-y-3 text-left">
          <h4 className="font-display font-black text-sm uppercase tracking-wider text-centenario-yellow">Transparencia</h4>
          <ul className="space-y-2">
            {legalLinks.map((lnk) => (
              <li key={lnk.label}>
                <a
                  href={lnk.href}
                  className="text-neutral-300 hover:text-centenario-magenta transition-colors duration-150"
                >
                  • {lnk.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Libro de Reclamaciones and physical markers */}
        <div className="space-y-4">
          <h4 className="font-[#FFD100] font-sans font-black tracking-wide text-sm text-centenario-yellow">Canal de Contacto</h4>
          <p className="text-neutral-300 leading-normal">
            ✉️ info@innova.com.pe
          </p>

          {/* Simulated Libro de reclamaciones icon layout matching Peru requirements */}
          <div className="p-3 bg-neutral-950 rounded-2xl border border-neutral-850 flex items-center gap-3 w-52 shadow-inner">
            <FileSpreadsheet className="w-8 h-8 text-neutral-300 shrink-0" />
            <div className="text-left font-sans text-[10px] leading-tight">
              <span className="text-white font-extrabold uppercase block font-display tracking-tight text-xs">Libro de Reclamaciones</span>
              <span className="text-neutral-500 font-mono text-[9px] block mt-0.5">Hoja de Reclamo Virtual</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Rights and Social icons copyright segment */}
      <div className="bg-neutral-950 border-t border-neutral-850 py-6 text-neutral-500 text-center font-mono">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <p className="text-[11px] leading-relaxed text-neutral-450 text-center md:text-left">
            Copyright © {currentYear} innova.com.pe • Todos los derechos reservados bajo leyes peruanas S.A.C.
          </p>

          {/* Social icons row */}
          <div className="flex gap-4 items-center">
            <a
              href="https://facebook.com/innovaperu"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-400 hover:text-white p-2 rounded-full hover:bg-neutral-900 transition-colors cursor-pointer"
              aria-label="Seguir en Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-400 hover:text-white p-2 rounded-full hover:bg-neutral-900 transition-colors cursor-pointer"
              aria-label="Seguir en Youtube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-400 hover:text-white p-2 rounded-full hover:bg-neutral-900 transition-colors cursor-pointer"
              aria-label="Seguir en Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>

          <p className="text-[10px] text-neutral-500 flex items-center gap-1 justify-center">
            <span>Hecho con</span>
            <Heart className="w-3 h-3 text-[#D2007A] fill-[#D2007A]" />
            <span>para INNOVA Inversiones 2026</span>
          </p>

        </div>
      </div>

    </footer>
  );
}
