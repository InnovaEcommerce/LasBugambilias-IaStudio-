import React, { useState, useEffect } from 'react';
import { X, CheckCircle, ShieldAlert, Sparkles, AlarmClock, Smartphone, ArrowRight, UserCheck, Calendar, Flame, Users, Gift, Home, MapPin, Bell, AlertCircle, Percent } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Lead } from '../types';
import { saveLeadLocal } from '../services/leadsService';
import { trackLead, trackInitiateRegistration } from '../utils/pixel';

/* ==========================================
   1. MAIN LEAD CAPTURE FORM POPUP COMPONENT
   ========================================== */
interface LeadPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (lead: Lead) => void;
  initialComment?: string;
}

export function LeadPopup({ isOpen, onClose, onSubmitSuccess, initialComment }: LeadPopupProps) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<Lead>({
    lead: '',
    celular: '',
    correo: '',
    distrito: '',
    comentarios: initialComment || '',
    politicaTerminos: true,
    politicaPublicidad: true,
    politicaPerfilamiento: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof Lead, string>>>({});

  // Sync initial customized message whenever a lot is passed
  useEffect(() => {
    if (initialComment) {
      setForm((prev) => ({
        ...prev,
        comentarios: initialComment,
      }));
    }
  }, [initialComment]);

  const validate = (): boolean => {
    const err: Partial<Record<keyof Lead, string>> = {};
    
    if (!form.lead.trim()) {
      err.lead = 'Ingresa tu nombre y apellido completo';
    } else if (form.lead.trim().split(' ').length < 2) {
      err.lead = 'Por favor ingresa nombre y apellido';
    }
    
    // Email regex validate
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.correo.trim()) {
      err.correo = 'Ingresa un correo electrónico';
    } else if (!emailRegex.test(form.correo)) {
      err.correo = 'El formato de correo no es válido';
    }

    // Phone validation
    const phoneRegex = /^9\d{8}$/;
    if (!form.celular.trim()) {
      err.celular = 'Ingresa tu número de teléfono móvil';
    } else if (!phoneRegex.test(form.celular)) {
      err.celular = 'Ingresa un celular de 9 dígitos (Inicia con 9)';
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleNext = () => {
    const stepErrors: Partial<Record<keyof Lead, string>> = {};
    if (!form.lead.trim()) {
      stepErrors.lead = 'Ingresa tu nombre y apellido completo';
    } else if (form.lead.trim().split(' ').length < 2) {
      stepErrors.lead = 'Ingresa al menos un nombre y un apellido completo';
    }
    
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setStep(2);
    trackInitiateRegistration(2, 'Formulario Popup');
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleFormChange = (key: keyof Lead, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const origenStr = 'formulario popup';

    try {
      await saveLeadLocal(form, {
        origen: origenStr,
      });
    } catch (dbError) {
      console.error('Local database lead capture failed:', dbError);
    }

    // Save lead in localStorage for backup/compatibility alerts
    const stored = localStorage.getItem('innova_leads');
    let leadsList = [];
    if (stored) {
      try {
        leadsList = JSON.parse(stored);
      } catch (e) {
        console.error(e);
      }
    }

    const newLead = {
      ...form,
      id: `l-${Math.floor(Math.random() * 89999 + 10000)}`,
      timestamp: new Date().toLocaleString('es-PE'),
      origen: origenStr,
    };

    leadsList.unshift(newLead);
    localStorage.setItem('innova_leads', JSON.stringify(leadsList));
    
    // Track successful Lead with Meta Pixel
    trackLead(origenStr);
    
    // Broadcast submit action across tabs & context
    window.dispatchEvent(new Event('innova_lead_submitted'));

    onSubmitSuccess(form);
    
    // Reset form states
    setStep(1);
    setForm({
      lead: '',
      celular: '',
      correo: '',
      distrito: '',
      comentarios: '',
      politicaTerminos: true,
      politicaPublicidad: true,
      politicaPerfilamiento: false,
    });
    setErrors({});
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Solid Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-900 z-50 pointer-events-auto"
            onClick={onClose}
          />

          {/* Form Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl overflow-hidden shadow-2xl z-50 max-w-[calc(100%-2rem)] w-[410px] md:max-w-lg font-sans text-neutral-800 flex flex-col max-h-[90vh]"
          >
            {/* Header branding band with yellow top */}
            <div className="bg-centenario-yellow py-3 md:py-4 px-5 md:px-6 flex justify-between items-center border-b border-amber-200">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-centenario-magenta" />
                <span className="font-display font-black text-sm text-neutral-950 uppercase tracking-tight">
                  {initialComment ? 'Reserva de Lote / Plan' : 'Formulario de Suscripción'}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1 text-neutral-700 hover:bg-black/10 rounded-full transition cursor-pointer"
                aria-label="Cerrar Formulario"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Steps indicator bar */}
            <div className="bg-neutral-50 px-5 md:px-6 py-2.5 md:py-3 border-b border-neutral-150 flex justify-between text-[11px] md:text-xs font-semibold text-neutral-500 font-mono">
              <span className={step === 1 ? 'text-centenario-magenta font-black' : ''}>1. Datos personales</span>
              <span className={step === 2 ? 'text-centenario-magenta font-black' : ''}>2. Datos de contacto</span>
            </div>

            {/* Form scrollable container */}
            <form onSubmit={handleSubmit} className="p-5 md:p-8 space-y-4 md:space-y-5 overflow-y-auto max-h-[60vh] text-left">
              
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-4"
                  >
                    {/* Lead Full Name Field */}
                    <div className="space-y-1">
                      <label className="text-[13.5px] font-semibold text-neutral-600 font-sans tracking-normal block">Nombres y Apellidos</label>
                      <input
                        type="text"
                        placeholder="Graciela García A."
                        value={form.lead}
                        onChange={(e) => handleFormChange('lead', e.target.value)}
                        className={`w-full p-3 font-sans font-semibold bg-neutral-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-centenario-magenta ${
                          errors.lead ? 'border-rose-400 focus:ring-rose-300' : 'border-neutral-200'
                        }`}
                      />
                      {errors.lead && (
                        <p className="text-[10px] text-rose-500 font-extrabold flex items-center gap-1 font-mono">
                          <ShieldAlert className="w-3 h-3 shrink-0" />
                          {errors.lead}
                        </p>
                      )}
                    </div>

                    {/* Step transition submit */}
                    <div className="pt-2 md:pt-4">
                      <button
                        type="button"
                        onClick={handleNext}
                        className="w-full py-3.5 md:py-4 bg-[#D2007A] hover:bg-pink-800 text-white text-xs font-black rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transform hover:scale-[1.01] transition-transform duration-200 uppercase font-sans tracking-widest"
                      >
                        <span>Siguiente Paso</span>
                        <ArrowRight className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-4"
                  >
                                  {/* Phone Field */}
                    <div className="space-y-1">
                      <label className="text-[13.5px] font-semibold text-neutral-600 font-sans tracking-normal block">Celular (+51)</label>
                      <input
                        type="tel"
                        placeholder="981234567"
                        maxLength={9}
                        value={form.celular}
                        onChange={(e) => handleFormChange('celular', e.target.value.replace(/\D/g, ''))}
                        className={`w-full p-3 font-sans font-semibold bg-neutral-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-centenario-magenta ${
                          errors.celular ? 'border-rose-400 focus:ring-rose-300' : 'border-neutral-200'
                        }`}
                      />
                      {errors.celular && (
                        <p className="text-[10px] text-rose-500 font-extrabold flex items-center gap-1 font-mono">
                          <ShieldAlert className="w-3 h-3 shrink-0" />
                          {errors.celular}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1">
                      <label className="text-[13.5px] font-semibold text-neutral-600 font-sans tracking-normal block">Correo electrónico</label>
                      <input
                        type="email"
                        placeholder="nombre@ejemplo.com"
                        value={form.correo}
                        onChange={(e) => handleFormChange('correo', e.target.value)}
                        className={`w-full p-3 font-sans font-semibold bg-neutral-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-centenario-magenta ${
                          errors.correo ? 'border-rose-400 focus:ring-rose-300' : 'border-neutral-200'
                        }`}
                      />
                      {errors.correo && (
                        <p className="text-[10px] text-rose-500 font-extrabold flex items-center gap-1 font-mono">
                          <ShieldAlert className="w-3 h-3 shrink-0" />
                          {errors.correo}
                        </p>
                      )}
                    </div>

                    {/* Distrito Field */}
                    <div className="space-y-1">
                      <label className="text-[13.5px] font-semibold text-neutral-600 font-sans tracking-normal block">Distrito (Opcional)</label>
                      <input
                        type="text"
                        placeholder="Arequipa, Yanahuara, etc."
                        value={form.distrito}
                        onChange={(e) => handleFormChange('distrito', e.target.value)}
                        className="w-full p-3 font-sans font-semibold bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-centenario-magenta text-neutral-800"
                      />
                    </div>

                    {/* Custom Message Area */}
                    <div className="space-y-1">
                      <label className="text-[13.5px] font-semibold text-neutral-600 font-sans tracking-normal block">Tu Comentario (Opcional)</label>
                      <textarea
                        rows={2}
                        placeholder="Deseo financiamiento de cuotas, consultas del terreno."
                        value={form.comentarios}
                        onChange={(e) => handleFormChange('comentarios', e.target.value)}
                        className="w-full p-3 font-sans font-semibold bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-centenario-magenta text-neutral-800"
                      />
                    </div>

                    {/* Step transition Buttons */}
                    <div className="flex gap-2.5 pt-1 md:pt-2">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="w-1/3 py-3.5 md:py-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-black rounded-xl transition font-sans uppercase"
                      >
                        Atrás
                      </button>

                      <button
                        type="submit"
                        className="w-2/3 py-3.5 md:py-4 bg-centenario-red hover:bg-red-800 text-white text-xs font-black rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg transform hover:scale-[1.01] transition duration-200 uppercase"
                      >
                        <span>Solicitar información</span>
                      </button>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

            </form>

            <div className="bg-neutral-100 py-3 md:p-4 text-center border-t border-neutral-150 text-[9.5px] md:text-[10px] text-neutral-400 font-mono uppercase tracking-wider">
              🛡️ Protección de datos garantizada
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ==========================================
   2. EXIT INTENT INCENTIVE POPUP COMPONENT (CRO SUCCESS)
   ========================================== */
interface ExitIntentPopupProps {
  onSubmitSuccess: (lead: Lead) => void;
  isDisabled?: boolean;
}

export function ExitIntentPopup({ onSubmitSuccess, isDisabled = false }: ExitIntentPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [isDelayFinished, setIsDelayFinished] = useState(false);
  const [isExternallyDisabled, setIsExternallyDisabled] = useState(false);

  // 1. Initial page delay of 5 seconds before activation is active
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDelayFinished(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Check if user has rejected/closed the modal in the last 48 hours
  const checkClosedRestriction = (): boolean => {
    try {
      const lastClosed = localStorage.getItem('innova_exit_intent_closed');
      if (lastClosed) {
        const closedTime = parseInt(lastClosed, 10);
        if (!isNaN(closedTime)) {
          const distance = Date.now() - closedTime;
          // 48 hours in milliseconds = 172800000 ms
          if (distance < 48 * 60 * 60 * 1000) {
            return true;
          }
        }
      }
    } catch (e) {
      console.warn("LocalStorage check failed:", e);
    }
    return false;
  };

  // Check if a registration has already occurred
  const checkLeadCaptured = (): boolean => {
    try {
      const leads = localStorage.getItem('innova_leads');
      if (leads) {
        const parsed = JSON.parse(leads);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return true;
        }
      }
    } catch (e) {
      console.warn("LocalStorage lead parse failed:", e);
    }
    return false;
  };

  // Update external state when an 'innova_lead_submitted' event is received
  useEffect(() => {
    const handleLeadSubmitted = () => {
      setIsExternallyDisabled(true);
    };
    window.addEventListener('innova_lead_submitted', handleLeadSubmitted);
    return () => {
      window.removeEventListener('innova_lead_submitted', handleLeadSubmitted);
    };
  }, []);

  // 2. Desktop mouseleave & Mobile inactivity detection
  useEffect(() => {
    // If delay hasn't finished, already triggered, externally disabled, or has restriction - do not activate
    if (!isDelayFinished || hasTriggered || isDisabled || isExternallyDisabled || checkClosedRestriction() || checkLeadCaptured()) {
      return;
    }

    const isMobileDevice = window.innerWidth < 768 || ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
    let inactivityTimer: NodeJS.Timeout | null = null;

    const triggerModal = () => {
      setIsOpen(true);
      setHasTriggered(true);
    };

    // Desktop: tracking top screen exit intent mouse leave
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 20) {
        triggerModal();
      }
    };

    // Mobile: Inactivity tracking for 25 seconds
    const resetInactivityTimer = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        triggerModal();
      }, 25000); // 25 seconds
    };

    if (!isMobileDevice) {
      // Desktop Setup
      document.addEventListener('mouseleave', handleMouseLeave);
    } else {
      // Mobile Setup: Detect interactions to keep mobile countdown reset
      resetInactivityTimer();
      window.addEventListener('scroll', resetInactivityTimer, { passive: true });
      window.addEventListener('touchstart', resetInactivityTimer, { passive: true });
      window.addEventListener('touchmove', resetInactivityTimer, { passive: true });
      window.addEventListener('touchend', resetInactivityTimer, { passive: true });
      window.addEventListener('click', resetInactivityTimer, { passive: true });
    }

    return () => {
      if (!isMobileDevice) {
        document.removeEventListener('mouseleave', handleMouseLeave);
      } else {
        if (inactivityTimer) clearTimeout(inactivityTimer);
        window.removeEventListener('scroll', resetInactivityTimer);
        window.removeEventListener('touchstart', resetInactivityTimer);
        window.removeEventListener('touchmove', resetInactivityTimer);
        window.removeEventListener('touchend', resetInactivityTimer);
        window.removeEventListener('click', resetInactivityTimer);
      }
    };
  }, [isDelayFinished, hasTriggered, isDisabled, isExternallyDisabled]);

  const handleClose = () => {
    setIsOpen(false);
    try {
      localStorage.setItem('innova_exit_intent_closed', Date.now().toString());
    } catch (e) {
      console.warn("Failed to set exit intent limit tag:", e);
    }
  };

  const handleOpenLeadForm = () => {
    setIsOpen(false);
    // Open standard registrations form matching special bono details
    const leadTriggerNode = document.getElementById('demo-register-button-popup');
    if (leadTriggerNode) {
      leadTriggerNode.click();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.65 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm z-50 pointer-events-auto"
            onClick={handleClose}
          />

          {/* Dialog bubble */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-900 text-white rounded-3xl overflow-hidden shadow-2xl z-50 max-w-[calc(100%-2rem)] w-[400px] md:max-w-md font-sans border-4 border-centenario-yellow"
          >
            <div className="p-5 xs:p-6 md:p-8 text-center space-y-4 md:space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-600/10 rounded-full blur-2xl"></div>

              {/* Header icons alert clock */}
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-centenario-yellow/15 border-2 border-centenario-yellow flex items-center justify-center text-centenario-yellow mx-auto animate-pulse">
                <AlertCircle className="w-6 h-6 md:w-8 md:h-8" />
              </div>

              {/* Main discount incentives block */}
              <div className="space-y-1.5 md:space-y-2">
                <span 
                  style={{ fontSize: '12px' }}
                  className="inline-block text-centenario-yellow font-black uppercase font-mono tracking-widest bg-yellow-450/10 border border-yellow-400 pl-2.5 pr-2.5 py-0.5 md:py-1 rounded-full"
                >
                  ¡Cupón Exclusivo!
                </span>
                <h3 className="font-display font-black text-xl md:text-3xl text-white tracking-tight leading-tight uppercase font-display pt-1 md:pt-2">
                  ¡Espera! No Te Vayas
                </h3>
                <p className="text-neutral-350 text-[11px] md:text-sm leading-relaxed max-w-sm mx-auto">
                  Registra tus datos en este instante y recibe un <strong className="text-centenario-yellow font-extrabold uppercase">Bono de Descuento de S/ 500 adicionales</strong> aplicables directamente sobre precio del lote.
                </p>
              </div>

              {/* Highlight badge of price reduction */}
              <div className="bg-neutral-950 p-3 md:p-4 border border-neutral-805 rounded-2xl relative">
                <div className="absolute top-2 right-2 text-neutral-600">
                  <Percent className="w-4 h-4 opacity-30" />
                </div>
                <span className="text-[8px] md:text-[9px] font-mono text-neutral-400 uppercase tracking-widest block">BONO EXCLUSIVO DE RETENCIÓN</span>
                <span className="text-2xl md:text-4xl text-[#D2007A] font-display font-black tracking-tight font-mono mt-0.5 md:mt-1 block">
                  - S/ 500 Dcto.
                </span>
              </div>

              {/* Dual button lines */}
              <div className="space-y-2">
                <a
                  href="https://api.whatsapp.com/send/?phone=51926289293&text=%C2%A1DESCUENTO+-500%21+Bono+Especial+Innova&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClose}
                  className="w-full py-3.5 md:py-4 bg-centenario-yellow hover:bg-amber-400 text-neutral-900 text-[11px] md:text-xs font-black rounded-xl shadow-lg transition duration-200 uppercase cursor-pointer block text-center"
                >
                  ¡Asegurar mi Descuento Ahora!
                </a>
                <button
                  onClick={handleClose}
                  className="w-full py-1.5 bg-transparent text-neutral-400 hover:text-white text-[11px] md:text-xs font-semibold hover:underline cursor-pointer"
                >
                  Dejar pasar esta oportunidad única
                </button>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ==========================================
   3. LEAD REGISTRY CONFIRMATION POPUP (SUCCESS STAGE)
   ========================================== */
interface SuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
  leadDetails: Lead | null;
}

export function SuccessPopup({ isOpen, onClose, leadDetails }: SuccessPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-950 z-50 pointer-events-auto"
            onClick={onClose}
          />

          {/* Dialog layout container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl overflow-hidden shadow-2xl z-50 max-w-[calc(100%-2rem)] w-[400px] md:max-w-md font-sans text-neutral-800 border-t-8 border-emerald-500"
          >
            <div className="p-6 md:p-8 text-center space-y-6 relative overflow-hidden">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1 text-neutral-400 hover:text-neutral-600 rounded-full hover:bg-neutral-50 transition"
                aria-label="Cerrar confirmacion"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-emerald-500 mx-auto border-2 border-emerald-300">
                <CheckCircle className="w-9 h-9 stroke-[2.5px]" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] text-emerald-600 font-black uppercase font-mono tracking-widest bg-emerald-50 pl-2.5 pr-2.5 py-1 rounded-full border border-emerald-150">
                  ¡Registro Exitoso!
                </span>
                <h3 className="font-display font-black text-2xl text-neutral-900 tracking-tight leading-tight uppercase font-display pt-2">
                  ¡Gracias Por Escribirnos!
                </h3>
                <p className="text-neutral-500 text-xs md:text-sm leading-relaxed">
                  Asesor acreditado de <strong>INNOVA Inversiones</strong> ha sido notificado y se conectará contigo vía llamadas o WhatsApp en los próximos <strong className="text-[#D2007A]">15 minutos</strong> para coordinar los detalles.
                </p>
              </div>

              {/* Show dynamic captured leads info */}
              {leadDetails && (
                <div className="p-4 bg-neutral-50 border border-neutral-150 rounded-2xl text-left text-xs text-neutral-600 space-y-2 font-sans pr-2">
                  <div className="flex justify-between items-center text-[10px] text-neutral-450 border-b border-neutral-150 pb-1 font-mono uppercase font-bold">
                    <span>REGISTRO CAPTURADO LOCAL CRM</span>
                    <span className="text-emerald-600 font-bold">● ONLINE</span>
                  </div>
                  <div>
                    <span className="opacity-60 block font-mono text-[9px]">PROSPECTO (LEAD):</span>
                    <strong className="text-neutral-900 font-extrabold uppercase font-sans text-xs">{leadDetails.lead}</strong>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <span className="opacity-60 block font-mono text-[9px]">CELULAR:</span>
                      <strong className="text-neutral-800 text-xs font-mono">+51 {leadDetails.celular}</strong>
                    </div>
                    <div>
                      <span className="opacity-60 block font-mono text-[9px]">CORREO:</span>
                      <strong className="text-neutral-800 text-[11px] font-mono break-all">{leadDetails.correo}</strong>
                    </div>
                  </div>
                  {leadDetails.distrito && (
                    <div className="pt-1 border-t border-neutral-150/40">
                      <span className="opacity-60 block font-mono text-[9px]">DISTRITO:</span>
                      <strong className="text-neutral-800 text-xs uppercase">{leadDetails.distrito}</strong>
                    </div>
                  )}
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black rounded-xl shadow-lg transition duration-200 uppercase cursor-pointer"
                >
                  Entendido, ¡volver a la web!
                </button>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ==========================================
   4. AUTOPLAY / TIMER SOCIAL PROOF TOASTS COMPONENT
   ========================================== */
interface SocialProofToastsProps {
  onOpenLeadPopup: () => void;
}

export function SocialProofToasts({ onOpenLeadPopup }: SocialProofToastsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const toastsList = [
    {
      id: 1,
      author: "Carlos Mendoza",
      message: "reservó su visita guiada gratuita de este sábado.",
      time: "hace 4 min",
      source: "WhatsApp",
      tag: "#Visitas",
      color: "bg-emerald-950/80 text-emerald-400 border-emerald-500/30",
      icon: "Calendar"
    },
    {
      id: 2,
      author: "Atención • Cupos Limitados",
      message: "quedan solo 4 cupos para la visita guiada SIN COSTO.",
      time: "hace instantes",
      source: "Urgencia",
      tag: "#Cupos",
      color: "bg-amber-950/80 text-amber-400 border-amber-500/30",
      icon: "Flame"
    },
    {
      id: 3,
      author: "Sofía y Luis Ramos",
      message: "programaron cita en oficina para ver la maqueta este lunes.",
      time: "hace 12 min",
      source: "Reunión",
      tag: "#Planos",
      color: "bg-pink-950/80 text-pink-400 border-[#D2007A]/30",
      icon: "Users"
    },
    {
      id: 4,
      author: "¡Bono S/ 500 Otorgado!",
      message: "un cliente se registró y aseguró su descuento extra hoy.",
      time: "hace 24 min",
      source: "Web",
      tag: "#Ahorra",
      color: "bg-blue-950/80 text-blue-400 border-blue-500/30",
      icon: "Gift"
    },
    {
      id: 5,
      author: "Lote Reservado",
      message: "un cliente realizó la separación de su lote en la Mz. K.",
      time: "hace 1 hora",
      source: "Innova CRM",
      tag: "#Separaciones",
      color: "bg-orange-950/80 text-orange-400 border-orange-500/30",
      icon: "Home"
    },
    {
      id: 6,
      author: "Milagros Cárdenas",
      message: "coordinó visita guiada con movilidad familiar gratuita.",
      time: "hace 18 min",
      source: "Call Center",
      tag: "#Transporte",
      color: "bg-indigo-950/80 text-indigo-400 border-indigo-500/30",
      icon: "MapPin"
    }
  ];

  useEffect(() => {
    // Initial delay of 8 seconds before showing first toast on page mount
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 8000);

    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Toast stays shown for 8.5 seconds, then closes
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 8500);

    return () => clearTimeout(hideTimer);
  }, [isVisible, currentIndex]);

  useEffect(() => {
    if (isVisible) return;

    // Wait 14 seconds between different notifications
    const nextTimer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % toastsList.length);
      setIsVisible(true);
    }, 14000);

    return () => clearTimeout(nextTimer);
  }, [isVisible]);

  const currentToast = toastsList[currentIndex];

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calendar':
        return <Calendar className="w-4 h-4" />;
      case 'Flame':
        return <Flame className="w-4 h-4" />;
      case 'Users':
        return <Users className="w-4 h-4" />;
      case 'Gift':
        return <Gift className="w-4 h-4" />;
      case 'Home':
        return <Home className="w-4 h-4" />;
      case 'MapPin':
        return <MapPin className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -50, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          exit={{ opacity: 0, x: -100, scale: 0.85 }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
          className="fixed bottom-24 left-4 z-40 w-[290px] md:w-[320px] bg-zinc-950/95 backdrop-blur-md border border-neutral-800 rounded-2xl shadow-2xl p-3 cursor-pointer hover:border-neutral-700 transition"
          onClick={() => {
            setIsVisible(false);
            onOpenLeadPopup();
          }}
        >
          <div className="flex gap-3 items-start relative pr-5">
            {/* Round icon circle representing activity style */}
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-inner border ${currentToast.color}`}>
              {renderIcon(currentToast.icon)}
            </div>

            {/* Text message contents */}
            <div className="space-y-0.5 text-left font-sans min-w-0 flex-1">
              {/* Dynamic Status pulse + Author Name */}
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse shrink-0 inline-block"></span>
                <span className="text-[12.5px] font-black text-white hover:text-centenario-magenta transition-colors line-clamp-1">
                  {currentToast.author}
                </span>
              </div>
              
              {/* Custom message text body */}
              <p className="text-[11px] text-neutral-400 font-semibold leading-relaxed">
                {currentToast.message}
              </p>

              {/* Timestamp, Source and Badge hashtag */}
              <div className="flex items-center justify-between pt-1 mt-1 border-t border-neutral-800 text-[10px] text-neutral-500 font-mono">
                <span className="truncate">
                  {currentToast.time} • {currentToast.source}
                </span>
                <span className="text-[#D2007A] font-black shrink-0 font-sans tracking-wide ml-1">
                  {currentToast.tag}
                </span>
              </div>
            </div>

            {/* Click to dismiss btn */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsVisible(false);
              }}
              className="absolute -top-1 -right-2 p-1 text-neutral-500 hover:text-white rounded-full transition"
              aria-label="Cerrar notificacion"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
