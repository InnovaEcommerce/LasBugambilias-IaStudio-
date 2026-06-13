import { useState, useEffect } from 'react';
import { MessageCircle, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function WhatsAppBubble() {
  const [showTeaser, setShowTeaser] = useState(false);

  useEffect(() => {
    // Show interactive conversion-focused teaser box after 4 seconds of page load
    const timer = setTimeout(() => {
      setShowTeaser(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappUrl = 'https://api.whatsapp.com/send/?phone=51926289293&text=%C2%A1Hola%EF%BF%BD%21+INNOVA%2C+deseo+recibir+m%C3%A1s+informaci%C3%B3n+sobre+los+lotes+y+financiamientos+del+proyecto+Las+Bugambilias&type=phone_number&app_absent=0';

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3.5 select-none font-sans">
      
      {/* Dynamic Conversational Messenger Teaser */}
      <AnimatePresence>
        {showTeaser && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-4 bg-white rounded-2xl shadow-2xl border border-neutral-100 max-w-xs text-neutral-800 text-xs font-sans space-y-2 relative"
          >
            {/* Close trigger button */}
            <button
              onClick={() => setShowTeaser(false)}
              className="absolute top-2.5 right-2.5 text-neutral-400 hover:text-neutral-700 p-0.5 rounded-full hover:bg-neutral-50 transition"
              aria-label="Cerrar aviso"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Teaser text line */}
            <div className="space-y-1.5 pr-4 text-left">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse block"></span>
                <span className="text-[10px] text-neutral-450 uppercase font-mono font-bold tracking-wider">Asesora Online</span>
              </div>
              <p className="leading-relaxed text-neutral-700">
                ¡Hola! 😊 ¿Listo para agendar tu visita a <strong className="text-[#D2007A]">Las Bugambilias</strong>? Escríbenos para enviarte tu REGALO🎁 Plano de Casa Modelo en PDF.
              </p>
            </div>

            {/* Direct CTA action */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setShowTeaser(false)}
              className="block text-center py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold rounded-lg tracking-wide shadow-sm transition"
            >
              Iniciar Chat WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating active pulsing WhatsApp ball */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="relative w-14 h-14 bg-emerald-500 hover:bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-2xl transition-transform duration-300 transform hover:scale-110 active:scale-95 group relative cursor-pointer"
        aria-label="Contactar por WhatsApp"
      >
        {/* Glow pulsing ring visual border */}
        <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-45 pointer-events-none group-hover:scale-110" />

        <MessageCircle className="w-7 h-7 text-white animate-pulse" />
      </a>

    </div>
  );
}
