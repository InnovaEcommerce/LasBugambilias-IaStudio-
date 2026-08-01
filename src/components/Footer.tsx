import { Facebook, Youtube, Instagram, ShieldCheck, Heart, MessageCircle, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const primaryLinks = [
    { label: 'Proyectos', href: '#proyecto' },
    { label: 'Refiere y gana', href: '#refiere' },
    { label: 'Invierte AQUÍ', href: '#financiamiento' },
    { label: 'Contáctanos', href: '#mapa' },
  ];

  return (
    <footer className="bg-neutral-900 border-t-4 border-centenario-magenta text-white font-sans text-xs">
      
      {/* Top Footer links segment */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Column 1: Brand details and short summary */}
        <div className="space-y-4">
          <div className="flex items-center">
            <img 
              src="/logo_innova_nombre_blanco.svg" 
              alt="INNOVA Inversiones" 
              className="h-10 w-auto object-contain"
            />
          </div>
          <p className="text-neutral-400 text-xs leading-relaxed max-w-xs">
            Desarrolladora de proyectos de inversión modernos líder en Arequipa con más de 15 años de trayectoria construyendo proyectos rentables y seguros.
          </p>

          {/* Social Media circular white buttons */}
          <div className="pt-1">
            <span className="text-[11px] font-bold text-neutral-300 uppercase tracking-wider block mb-2 font-mono">Síguenos en redes:</span>
            <div className="flex items-center gap-2.5">
              <a
                href="https://www.facebook.com/terrenos.innova"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 bg-white hover:bg-centenario-yellow text-[#1877F2] hover:text-neutral-900 rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 cursor-pointer"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 fill-current" />
              </a>
              <a
                href="https://www.instagram.com/terrenos.innova"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 bg-white hover:bg-centenario-yellow text-[#E4405F] hover:text-neutral-900 rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@terrenos.innova"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 bg-white hover:bg-centenario-yellow text-[#FF0000] hover:text-neutral-900 rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 cursor-pointer"
                aria-label="Youtube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://www.tiktok.com/@lotesyterrenos.innova"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 bg-white hover:bg-centenario-yellow text-neutral-900 rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 cursor-pointer"
                aria-label="TikTok"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-2.83V7.58a6.34 6.34 0 0 0-3.55 1.01 6.33 6.33 0 1 0 10.45 4.83V9a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.56-.43z" />
                </svg>
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=51926289293&text=%C2%A1Hola%21+INNOVA%2C+deseo+recibir+m%C3%A1s+informaci%C3%B3n+sobre+los+lotes+y+financiamientos+del+proyecto+Las+Bugambilias&type=phone_number&app_absent=0"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 bg-white hover:bg-centenario-yellow text-[#25D366] hover:text-neutral-900 rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 cursor-pointer"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div className="flex items-center gap-2 pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-450 shrink-0" />
            <span className="text-[10px] text-neutral-400 font-mono">Inversión 100% segura.</span>
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

        {/* Column 3: Marco Legal */}
        <div className="space-y-3 text-left">
          <h4 className="font-display font-black text-sm uppercase tracking-wider text-centenario-yellow">Marco Legal</h4>
          <ul className="space-y-2 text-neutral-300">
            <li>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('open_terms_modal', { detail: { tab: 'terms' } }))}
                className="hover:text-centenario-yellow transition-colors duration-150 text-left cursor-pointer"
              >
                • Términos y Condiciones
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('open_terms_modal', { detail: { tab: 'privacy' } }))}
                className="hover:text-centenario-yellow transition-colors duration-150 text-left cursor-pointer"
              >
                • Política de Privacidad
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Canal de Contacto */}
        <div className="space-y-4">
          <h4 className="font-sans font-black tracking-wide text-sm text-centenario-yellow">Canal de Contacto</h4>
          
          <div className="space-y-3">
            {/* Address */}
            <div className="flex items-start gap-2.5">
              <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              <span className="text-xs font-bold text-neutral-200 leading-snug uppercase tracking-wide">
                CALLE OCTAVIO MUÑOZ NAJAR N° 137, OFICINA 204, CERCADO, AREQUIPA
              </span>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-2.5">
              <Phone className="w-5 h-5 text-teal-400 shrink-0" />
              <a
                href="https://api.whatsapp.com/send/?phone=51926289293&text=%C2%A1Hola%21+INNOVA%2C+deseo+recibir+m%C3%A1s+informaci%C3%B3n+sobre+los+lotes+y+financiamientos+del+proyecto+Las+Bugambilias&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-black text-white hover:text-centenario-yellow transition-colors cursor-pointer"
              >
                +51 926 289 293
              </a>
            </div>

            {/* Brand Link */}
            <div className="flex items-center gap-2.5 pt-0.5">
              <img 
                src="/logo_innova_blanco.svg" 
                alt="INNOVA Logomark" 
                className="w-5 h-5 object-contain shrink-0" 
              />
              <a
                href="https://innovainversiones.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-white underline hover:text-centenario-yellow transition-colors cursor-pointer tracking-wide"
              >
                INNOVA Inversiones
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Rights and Social icons copyright segment */}
      <div className="bg-neutral-950 border-t border-neutral-850 py-6 text-neutral-500 text-center font-mono">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
            <p className="text-[11px] leading-relaxed text-neutral-450">
              Copyright © {currentYear} • Todos los derechos reservados bajo leyes peruanas
            </p>
            <div className="flex items-center gap-2 text-[10px] text-neutral-400">
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('open_terms_modal', { detail: { tab: 'terms' } }))}
                className="hover:underline hover:text-white cursor-pointer"
              >
                Términos
              </button>
              <span>|</span>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('open_terms_modal', { detail: { tab: 'privacy' } }))}
                className="hover:underline hover:text-white cursor-pointer"
              >
                Privacidad
              </button>
            </div>
          </div>

          {/* Social icons row */}
          <div className="flex gap-2.5 items-center">
            <a
              href="https://www.facebook.com/terrenos.innova"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 bg-white hover:bg-centenario-yellow text-[#1877F2] hover:text-neutral-900 rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 cursor-pointer"
              aria-label="Seguir en Facebook"
            >
              <Facebook className="w-4 h-4 fill-current" />
            </a>
            <a
              href="https://www.instagram.com/terrenos.innova"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 bg-white hover:bg-centenario-yellow text-[#E4405F] hover:text-neutral-900 rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 cursor-pointer"
              aria-label="Seguir en Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://www.youtube.com/@terrenos.innova"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 bg-white hover:bg-centenario-yellow text-[#FF0000] hover:text-neutral-900 rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 cursor-pointer"
              aria-label="Seguir en Youtube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="https://www.tiktok.com/@lotesyterrenos.innova"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 bg-white hover:bg-centenario-yellow text-neutral-900 rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 cursor-pointer"
              aria-label="Seguir en TikTok"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-2.83V7.58a6.34 6.34 0 0 0-3.55 1.01 6.33 6.33 0 1 0 10.45 4.83V9a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.56-.43z" />
              </svg>
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=51926289293&text=%C2%A1Hola%21+INNOVA%2C+deseo+recibir+m%C3%A1s+informaci%C3%B3n+sobre+los+lotes+y+financiamientos+del+proyecto+Las+Bugambilias&type=phone_number&app_absent=0"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 bg-white hover:bg-centenario-yellow text-[#25D366] hover:text-neutral-900 rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 cursor-pointer"
              aria-label="Contacto por WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
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
