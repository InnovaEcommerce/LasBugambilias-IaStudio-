import { useState, useEffect } from 'react';
import { Menu, X, Phone, Database, FileSpreadsheet, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
          isScrolled ? 'bg-white shadow-md py-1.5' : 'bg-white py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          
          {/* Logo Brand Representation block hanging down - Image 1 */}
          <a
            href="#"
            className="flex flex-col items-center justify-center bg-white border border-neutral-100 shadow-md px-3 py-3 select-none -mt-[15px] -mb-8 z-50 rounded-b-2xl group transition-all"
            style={{ minWidth: '114px' }}
          >
            <img 
              src="https://app.innovainversiones.com/logo_buganbilias.svg" 
              alt="Logo Las Bugambilias" 
              className="h-[57px] w-auto object-contain group-hover:scale-105 transition-transform duration-300"
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

          {/* Action and Admin CRM Toggle */}
          <div className="hidden md:flex items-center gap-3">
            {/* Direct Call Button */}
            <a
              href="tel:+51926289293"
              className="px-5 py-3 bg-[#E9EAF0] hover:bg-[#DEDFE5] text-[#0C152B] font-black text-[13px] xl:text-[14px] rounded-xl transition duration-200 shadow-sm font-sans inline-flex items-center justify-center gap-1"
            >
              📞 <span className="font-sans font-black">926 289 293</span>
            </a>

            {/* ¡Regístrate AQUÍ! Button - Image styled */}
            <button
              onClick={onOpenLeadPopup}
              id="header-cta-register"
              className="px-6 py-3 bg-[#FFD100] hover:bg-amber-400 text-[#D2007A] font-black text-[13px] xl:text-[14px] rounded-xl shadow-sm transition-all duration-300 font-sans"
            >
              ¡Regístrate <span className="font-black uppercase font-sans">AQUÍ!</span>
            </button>
          </div>

          {/* Mobile Navigation controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenLeadPopup}
              className="px-3.5 py-2 text-[11px] font-black bg-[#FFD100] text-[#D2007A] rounded-full hover:scale-105 shadow-sm transition uppercase leading-none shrink-0"
            >
              ¡Regístrate AQUÍ!
            </button>

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

              <div className="space-y-2">
                <a
                  href="tel:+51926289293"
                  onClick={() => setIsOpenMenu(false)}
                  className="w-full py-3 bg-[#E9EAF0] text-[#0C152B] rounded-xl text-center font-black text-sm block shadow-sm"
                >
                  📞 926 289 293
                </a>
                <button
                  onClick={() => {
                    setIsOpenMenu(false);
                    onOpenLeadPopup();
                  }}
                  className="w-full py-3 bg-[#FFD100] text-[#D2007A] rounded-xl font-black text-sm block shadow-sm hover:bg-amber-400 transition"
                >
                  ¡Regístrate <span className="uppercase">AQUÍ!</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
