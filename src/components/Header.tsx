import { useState, useEffect } from 'react';
import { Menu, X, Phone, Database, FileSpreadsheet, Compass, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { trackContact } from '../utils/pixel';

interface HeaderProps {
  onOpenLeadPopup: () => void;
}

export default function Header({ onOpenLeadPopup }: HeaderProps) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [leadsCount, setLeadsCount] = useState(2);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    const updateLeadsCount = () => {
      const stored = localStorage.getItem('centenario_leads');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setLeadsCount(parsed.length);
        } catch (e) {
          console.error(e);
        }
      }
    };
    updateLeadsCount();
    window.addEventListener('storage', updateLeadsCount);
    window.addEventListener('centenario_lead_submitted', updateLeadsCount);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', updateLeadsCount);
      window.removeEventListener('centenario_lead_submitted', updateLeadsCount);
    };
  }, []);

  const menuItems = [
    { label: 'Proyecto', href: '#proyecto' },
    { label: 'Refiere y gana', href: '#refiere' },
    { label: 'Invierte AQUÍ', href: '#financiamiento' },
    { label: 'Contáctanos', href: '#mapa' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-45 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md' : 'bg-white'
        }`}
        style={{ height: '63px' }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-full flex items-center justify-between">
          
          {/* Logo Brand Representation block hanging down - Image 1 */}
          <a
            href="#"
            className="flex flex-col items-center justify-center bg-white border border-neutral-100 shadow-md px-3 py-3 select-none -mt-[15px] -mb-8 z-50 rounded-b-2xl group transition-all"
            style={{ minWidth: '114px' }}
          >
            <img 
              src="https://app.innovainversiones.com/logo_buganbilias.svg" 
              alt="Logo Las Bugambilias" 
              className="object-contain group-hover:scale-105 transition-transform duration-300"
              style={{ width: '80px', height: '70px' }}
              referrerPolicy="no-referrer"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-neutral-800 hover:text-[#D2007A] font-extrabold text-[14px] transition-colors duration-200 cursor-pointer font-sans ${
                  item.label === 'Contáctanos' ? 'ml-6 xl:ml-12' : ''
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action and Contact Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* WhatsApp Redirect Button (Left) */}
            <a
              href="https://api.whatsapp.com/send/?phone=51926289293&text=%C2%A1Hola%21+INNOVA%2C+deseo+recibir+m%C3%A1s+informaci%C3%B3n+sobre+los+lotes+y+financiamientos+del+proyecto+Las+Bugambilias"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContact('Header WhatsApp Button')}
              className="px-5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-[15px] rounded-xl transition duration-200 shadow-sm font-sans inline-flex items-center justify-center gap-2"
              style={{ height: '45px' }}
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>WhatsApp</span>
            </a>

            {/* Direct Phone Call Button (Right) */}
            <a
              href="tel:+51926289293"
              onClick={() => trackContact('Header Phone Button')}
              className="px-5 bg-[#E9EAF0] hover:bg-[#DEDFE5] text-[#0C152B] font-extrabold text-[15px] rounded-xl transition duration-200 shadow-sm font-sans inline-flex items-center justify-center gap-2"
              style={{ height: '45px' }}
            >
              <Phone className="w-4 h-4 text-[#D2007A] fill-[#D2007A] shrink-0" />
              <span className="font-sans font-bold text-[16px]">Llamar</span>
            </a>
          </div>

          {/* Mobile Navigation controls */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile WhatsApp Button */}
            <a
              href="https://api.whatsapp.com/send/?phone=51926289293&text=%C2%A1Hola%21+INNOVA%2C+deseo+recibir+m%C3%A1s+informaci%C3%B3n+sobre+los+lotes+y+financiamientos+del+proyecto+Las+Bugambilias"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContact('Mobile Header WhatsApp')}
              className="p-2.5 bg-[#25D366] text-white rounded-xl flex items-center justify-center shadow-sm shrink-0 active:scale-95 transition-transform"
              aria-label="WhatsApp"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </a>

            {/* Mobile Llamar Button */}
            <a
              href="tel:+51926289293"
              onClick={() => trackContact('Mobile Header Call')}
              className="px-3 py-2 bg-[#E9EAF0] text-[#0C152B] font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm shrink-0"
            >
              <Phone className="w-3.5 h-3.5 text-[#D2007A] fill-[#D2007A]" />
              <span>Llamar</span>
            </a>

            <button
              onClick={() => setIsOpenMenu(!isOpenMenu)}
              className="p-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition"
              aria-label="Toggle Menu"
            >
              {isOpenMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isOpenMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-30 lg:hidden"
              onClick={() => setIsOpenMenu(false)}
            />
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              className="fixed top-[64px] left-0 right-0 bg-white shadow-xl z-30 py-6 px-4 flex flex-col gap-4 border-b border-neutral-100 lg:hidden font-sans"
            >
              <div className="grid grid-cols-2 gap-2 text-center">
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpenMenu(false)}
                    className="p-3 text-sm font-semibold text-neutral-700 bg-neutral-50 hover:bg-pink-50 hover:text-centenario-magenta rounded-lg transition"
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              <div className="h-[1px] bg-neutral-100 my-2"></div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="https://api.whatsapp.com/send/?phone=51926289293&text=%C2%A1Hola%21+INNOVA%2C+deseo+recibir+m%C3%A1s+informaci%C3%B3n+sobre+los+lotes+y+financiamientos+del+proyecto+Las+Bugambilias"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    setIsOpenMenu(false);
                    trackContact('Mobile Drawer WhatsApp');
                  }}
                  className="w-full py-3 bg-[#25D366] text-white rounded-xl flex items-center justify-center gap-2 font-black text-sm shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>
                <a
                  href="tel:+51926289293"
                  onClick={() => {
                    setIsOpenMenu(false);
                    trackContact('Mobile Drawer Call');
                  }}
                  className="w-full py-3 bg-[#E9EAF0] text-[#0C152B] rounded-xl flex items-center justify-center gap-2 font-black text-sm shadow-sm"
                >
                  <Phone className="w-4 h-4 text-[#D2007A] fill-[#D2007A]" />
                  <span>Llamar</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
