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
              <p className="leading-relaxed text-neutral-700 text-[10px] md:text-[12px]">
                ¡Hola! 😊 ¿Listo para agendar tu visita? Escríbenos y te <strong className="text-[#D2007A] uppercase">🎁REGALAMOS</strong> los Planos Arquitectónicos para tu nueva casa en PDF.
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
        className="relative w-16 h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center transition-transform duration-300 transform hover:scale-110 active:scale-95 group relative cursor-pointer"
        aria-label="Contactar por WhatsApp"
      >
        {/* Glow pulsing ring visual border */}
        <span className="absolute inset-0 rounded-full bg-[#25D366]/20 animate-ping opacity-45 pointer-events-none group-hover:scale-110" />

        {/* Inner Solid Green Circle of WhatsApp */}
        <div className="relative w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg">
          {/* Logo WhatsApp (SVG with white phone in icon) */}
          <svg
            viewBox="0 0 24 24"
            className="w-6.5 h-6.5 text-white fill-current animate-bounce"
          >
            <path d="M12.004 0C5.372 0 0 5.373 0 12c0 2.11.547 4.16 1.585 5.978L.069 24l6.196-1.625C8.04 23.23 10.005 24 12.004 24c6.63 0 12.003-5.373 12.003-12S18.63 0 12.004 0zm0 1.702c5.684 0 10.29 4.606 10.29 10.298 0 5.69-4.606 10.298-10.29 10.298-1.748 0-3.46-.445-4.97-1.28l-.356-.196-3.69 1.157L4.15 18.33l-.216-.328A10.24 10.24 0 0 1 1.71 12C1.71 6.31 6.32 1.702 12.004 1.702zm-3.65 4.542c-.247 0-.585.093-.82.355-.23.26-.89.87-.89 2.123 0 1.252.91 2.463 1.037 2.632.127.17 1.792 2.736 4.34 3.834.607.262 1.08.417 1.45.534.61.194 1.164.167 1.602.102.488-.073 1.5-.613 1.71-1.206.212-.594.212-1.103.148-1.207-.064-.105-.233-.168-.49-.297-.26-.13-1.5-.74-1.73-.823-.233-.085-.4-.128-.57.127-.17.255-.656.822-.804.992-.148.17-.297.19-.554.062-.258-.127-1.09-.4-2.072-1.28-.767-.685-1.285-1.53-1.436-1.79-.153-.254-.016-.393.11-.523.113-.117.254-.297.382-.445.127-.148.17-.254.254-.423.085-.17.042-.317-.02-.444-.065-.127-.57-1.376-.782-1.884-.207-.5-.453-.43-.59-.43h-.475z" />
          </svg>

          {/* Active Red notification bubble "1" */}
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#d3080c] text-white font-sans font-bold text-[11px] rounded-full flex items-center justify-center border border-[#d3080c] shadow-sm leading-none">
            1
          </span>
        </div>
      </a>

    </div>
  );
}
