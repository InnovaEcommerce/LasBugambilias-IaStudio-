import React, { useState, useEffect } from 'react';
import { X, CheckCircle, ShieldAlert, Sparkles, AlarmClock, Smartphone, ArrowRight, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Lead } from '../types';
import { saveLeadToFirestore } from '../services/leadsService';

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

    if (!form.politicaTerminos) {
      err.politicaTerminos = 'Debes aceptar los términos y políticas para continuar';
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
      await saveLeadToFirestore(form, {
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
            className="fixed left-4 right-4 md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 bg-white rounded-3xl overflow-hidden shadow-2xl z-50 max-w-lg w-full font-sans text-neutral-800 flex flex-col max-h-[90vh]"
          >
            {/* Header branding band with yellow top */}
            <div className="bg-centenario-yellow py-4 px-6 flex justify-between items-center border-b border-amber-200">
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
            <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-150 flex justify-between text-xs font-semibold text-neutral-500 font-mono">
              <span className={step === 1 ? 'text-centenario-magenta font-black' : ''}>1. Datos de Contacto</span>
              <span className={step === 2 ? 'text-centenario-magenta font-black' : ''}>2. Residencia & Políticas</span>
            </div>

            {/* Form scrollable container */}
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5 overflow-y-auto max-h-[60vh] text-left">
              
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
                      <label className="text-xs font-black uppercase text-neutral-450 tracking-wider font-mono">Nombres y Apellidos</label>
                      <input
                        type="text"
                        placeholder="Nombres y apellidos completos"
                        value={form.lead}
                        onChange={(e) => handleFormChange('lead', e.target.value)}
                        className={`w-full p-3 font-medium bg-neutral-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-centenario-magenta ${
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
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={handleNext}
                        className="w-full py-4 bg-[#D2007A] hover:bg-pink-800 text-white text-xs font-black rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transform hover:scale-[1.01] transition-transform duration-200 uppercase font-sans tracking-widest"
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
                      <label className="text-xs font-black uppercase text-neutral-450 tracking-wider font-mono">Celular (+51)</label>
                      <input
                        type="tel"
                        placeholder="Ej. 981234567"
                        maxLength={9}
                        value={form.celular}
                        onChange={(e) => handleFormChange('celular', e.target.value.replace(/\D/g, ''))}
                        className={`w-full p-3 font-mono font-bold bg-neutral-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-centenario-magenta ${
                          errors.celular ? 'border-rose-400 focus:ring-rose-300' : 'border-neutral-200'
                        }`}
                      />
                      {errors.celular ? (
                        <p className="text-[10px] text-rose-500 font-extrabold flex items-center gap-1 font-mono">
                          <ShieldAlert className="w-3 h-3 shrink-0" />
                          {errors.celular}
                        </p>
                      ) : (
                        <span className="text-[9px] text-neutral-450 font-mono italic">Sólo celulares peruanos de 9 dígitos.</span>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1">
                      <label className="text-xs font-black uppercase text-neutral-450 tracking-wider font-mono">Correo de Contacto</label>
                      <input
                        type="email"
                        placeholder="nombre@ejemplo.com"
                        value={form.correo}
                        onChange={(e) => handleFormChange('correo', e.target.value)}
                        className={`w-full p-3 font-semibold bg-neutral-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-centenario-magenta ${
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
                      <label className="text-xs font-black uppercase text-neutral-450 tracking-wider font-mono">Distrito de Residencia (Opcional)</label>
                      <input
                        type="text"
                        placeholder="Ej: Chorrillos, Arequipa, etc."
                        value={form.distrito}
                        onChange={(e) => handleFormChange('distrito', e.target.value)}
                        className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-centenario-magenta font-semibold text-neutral-800"
                      />
                    </div>

                    {/* Custom Message Area */}
                    <div className="space-y-1">
                      <label className="text-xs font-black uppercase text-neutral-450 tracking-wider font-mono">Notas o Comentarios (Opcional)</label>
                      <textarea
                        rows={2}
                        placeholder="Ej: Deseo financiamiento de cuotas, consultas del terreno."
                        value={form.comentarios}
                        onChange={(e) => handleFormChange('comentarios', e.target.value)}
                        className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none"
                      />
                    </div>

                    {/* Bullet Consents Checklist */}
                    <div className="space-y-2 border-t border-neutral-100 pt-3">
                      <label className="flex items-start gap-2.5 text-[10px] text-neutral-500 font-medium cursor-pointer leading-tight">
                        <input
                          type="checkbox"
                          checked={form.politicaTerminos}
                          onChange={(e) => handleFormChange('politicaTerminos', e.target.checked)}
                          className="mt-0.5 accent-centenario-magenta h-3.5 w-3.5"
                        />
                        <span>
                          He leído y acepto los <strong className="text-neutral-700 underline">Términos y Condiciones</strong> y la <strong className="text-neutral-700 underline">Política de Privacidad</strong> obligatoria.
                        </span>
                      </label>

                      <label className="flex items-start gap-2.5 text-[10px] text-neutral-500 font-medium cursor-pointer leading-tight">
                        <input
                          type="checkbox"
                          checked={form.politicaPublicidad}
                          onChange={(e) => handleFormChange('politicaPublicidad', e.target.checked)}
                          className="mt-0.5 accent-centenario-magenta h-3.5 w-3.5"
                        />
                        <span>Acepto el envío de Publicidad masiva según la Política de Tratamiento Comercial de Datos.</span>
                      </label>

                      {errors.politicaTerminos && (
                        <p className="text-[10px] text-rose-500 font-bold flex items-center gap-1 font-mono">
                          🚨 Debes aceptar los Términos obligatorios del botón checklist
                        </p>
                      )}
                    </div>

                    {/* Step transition Buttons */}
                    <div className="flex gap-2.5 pt-2">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="w-1/3 py-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-black rounded-xl transition font-sans uppercase"
                      >
                        Atrás
                      </button>

                      <button
                        type="submit"
                        className="w-2/3 py-4 bg-centenario-red hover:bg-red-800 text-white text-xs font-black rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg transform hover:scale-[1.01] transition duration-200 uppercase"
                      >
                        <span>Solicitar información</span>
                      </button>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

            </form>

            <div className="bg-neutral-100 p-4 text-center border-t border-neutral-150 text-[10px] text-neutral-400 font-mono uppercase tracking-wider">
              🛡️ Protección de datos garantizada • Innova S.A.C.
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
}

export function ExitIntentPopup({ onSubmitSuccess }: ExitIntentPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    // Only bind desktop mouse listeners
    const handleMouseLeave = (e: MouseEvent) => {
      if (hasTriggered) return;
      
      // If cursor leaves the top boundary of screen (Exit intent)
      if (e.clientY < 20) {
        setIsOpen(true);
        setHasTriggered(true);
      }
    };
    
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasTriggered]);

  const handleClose = () => {
    setIsOpen(false);
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
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-950 z-50 pointer-events-auto"
            onClick={handleClose}
          />

          {/* Dialog bubble */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-4 right-4 md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 bg-neutral-900 text-white rounded-3xl overflow-hidden shadow-2xl z-50 max-w-md w-full font-sans border-4 border-centenario-yellow"
          >
            <div className="p-6 md:p-8 text-center space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-600/10 rounded-full blur-2xl"></div>

              {/* Header icons alert clock */}
              <div className="w-16 h-16 rounded-full bg-centenario-yellow/15 border-2 border-centenario-yellow flex items-center justify-center text-centenario-yellow mx-auto animate-pulse">
                <AlarmClock className="w-8 h-8" />
              </div>

              {/* Main discount incentives block */}
              <div className="space-y-2">
                <span className="text-[10px] text-centenario-yellow font-black uppercase font-mono tracking-widest bg-yellow-450/10 border border-yellow-400 pl-2.5 pr-2.5 py-1 rounded-full">
                  ¡Cupo de Oferta Exclusiva!
                </span>
                <h3 className="font-display font-black text-2xl md:text-3xl text-white tracking-tight leading-tight uppercase font-display pt-2">
                  ¡Espera! No Te Vayas
                </h3>
                <p className="text-neutral-350 text-xs md:text-sm leading-relaxed max-w-sm mx-auto">
                  Registra tus datos en este instante y recibe un <strong className="text-centenario-yellow font-extrabold uppercase">Bono de Descuento de S/ 500 adicionales</strong> aplicables directamente sobre precio del lote.
                </p>
              </div>

              {/* Highlight badge of price reduction */}
              <div className="bg-neutral-950 p-4 border border-neutral-800 rounded-2xl">
                <span className="text-[9px] font-mono text-neutral-450 uppercase tracking-widest block">BONO EXCLUSIVO DE JUNIO</span>
                <span className="text-3xl md:text-4xl text-[#D2007A] font-display font-black tracking-tight font-mono mt-1 block">
                  - S/ 500 Dcto.
                </span>
              </div>

              {/* Dual button lines */}
              <div className="space-y-2">
                <button
                  onClick={handleOpenLeadForm}
                  className="w-full py-4 bg-centenario-yellow hover:bg-amber-400 text-neutral-900 text-xs font-black rounded-xl shadow-lg transition duration-200 uppercase cursor-pointer"
                >
                  ¡Asegurar mi Descuento Ahora!
                </button>
                <button
                  onClick={handleClose}
                  className="w-full py-2 bg-transparent text-neutral-400 hover:text-white text-xs font-semibold hover:underline cursor-pointer"
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
            className="fixed left-4 right-4 md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 bg-white rounded-3xl overflow-hidden shadow-2xl z-50 max-w-md w-full font-sans text-neutral-800 border-t-8 border-emerald-500"
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
