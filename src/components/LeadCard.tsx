import React, { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Lead } from '../types';
import { saveLeadToFirestore } from '../services/leadsService';

interface LeadCardProps {
  onSubmitSuccess: (lead: Lead) => void;
  className?: string;
}

export default function LeadCard({ onSubmitSuccess, className = '' }: LeadCardProps) {
  const [form, setForm] = useState<Lead>({
    lead: '',
    celular: '',
    correo: '',
    distrito: '',
    comentarios: '',
    politicaTerminos: true,
    politicaPublicidad: true,
    politicaPerfilamiento: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof Lead, string>>>({});
  const [activeStep, setActiveStep] = useState<1 | 2>(1);

  const validateStep1 = () => {
    const errs: Partial<Record<keyof Lead, string>> = {};
    
    if (!form.lead.trim()) {
      errs.lead = 'Obligatorio';
    } else if (form.lead.trim().split(' ').length < 2) {
      errs.lead = 'Nombre y apellido';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.correo.trim()) {
      errs.correo = 'Obligatorio';
    } else if (!emailRegex.test(form.correo)) {
      errs.correo = 'Inválido';
    }

    const phoneRegex = /^9\d{8}$/;
    if (!form.celular.trim()) {
      errs.celular = 'Obligatorio';
    } else if (!phoneRegex.test(form.celular)) {
      errs.celular = 'Celular inválido (9 dígitos starting 9)';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateComplete = () => {
    if (!validateStep1()) {
      setActiveStep(1);
      return false;
    }

    const errs: Partial<Record<keyof Lead, string>> = {};
    if (!form.politicaTerminos) {
      errs.politicaTerminos = 'Debe aceptar';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFormChange = (key: keyof Lead, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: '' }));
    }
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setActiveStep(2);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeStep === 1) {
      handleNextStep();
      return;
    }

    if (!validateComplete()) {
      return;
    }

    const origenStr = 'Formulario Principal';

    try {
      await saveLeadToFirestore(form, {
        origen: origenStr,
      });
    } catch (dbError) {
      console.error('Local and Sheets storage pipeline failed:', dbError);
    }

    // Secondary save lead in localStorage for backward compatibility alerts
    const stored = localStorage.getItem('innova_leads');
    let leadsList = [];
    if (stored) {
      try {
        leadsList = JSON.parse(stored);
      } catch (err) {
        console.error(err);
      }
    }

    const googleSheetsStyledLead = {
      ...form,
      id: `l-${Math.floor(Math.random() * 89999 + 10000)}`,
      timestamp: new Date().toLocaleString('es-PE'),
      origen: origenStr,
    };

    leadsList.unshift(googleSheetsStyledLead);
    localStorage.setItem('innova_leads', JSON.stringify(leadsList));
    
    // Broadcast submit action to other panels
    window.dispatchEvent(new Event('innova_lead_submitted'));

    onSubmitSuccess(form);

    // Reset local state fields
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
    setActiveStep(1);
  };

  return (
    <div className={`w-full bg-[#FFD100] rounded-[32px] p-6 text-neutral-900 border-none relative flex flex-col justify-between shadow-2xl font-sans ${className}`}>
      
      {/* Step Indicators Section matching Image 2 */}
      <div className="flex items-center justify-center gap-2.5 mb-5 mt-1">
        {/* Step 1 badge */}
        <div 
          onClick={() => setActiveStep(1)}
          className={`w-9 h-9 rounded-full flex items-center justify-center font-display font-black text-sm cursor-pointer transition-all ${
            activeStep === 1 ? 'bg-[#D2007A] text-white font-bold' : 'bg-[#D2007A]/40 text-neutral-900'
          }`}
        >
          1
        </div>
        
        {/* Connecting dashed line */}
        <div className="w-16 border-t-2 border-dashed border-[#D2007A]" />
        
        {/* Step 2 badge */}
        <div 
          onClick={handleNextStep}
          className={`w-9 h-9 rounded-full flex items-center justify-center font-display font-black text-sm cursor-pointer transition-all ${
            activeStep === 2 ? 'bg-[#D2007A] text-white font-bold' : 'bg-white text-[#D2007A] border-2 border-neutral-100'
          }`}
        >
          2
        </div>
      </div>

      {/* Main Form Title */}
      <div className="text-center mb-6">
        <h3 className="font-display font-black text-[15px] md:text-[17px] text-[#D2007A] leading-[1.15] uppercase tracking-tight max-w-[280px] mx-auto font-sans">
          QUIERO TENER MI LOTE PROPIO EN NUEVA LA JOYA
        </h3>
      </div>

      {/* Inputs Form block */}
      <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
        
        {activeStep === 1 ? (
          /* STEP 1: Personal Contact Details */
          <div className="space-y-3.5">
            {/* Lead Full Name */}
            <div className="relative">
              <input
                type="text"
                placeholder="Nombres y Apellidos"
                value={form.lead}
                onChange={(e) => handleFormChange('lead', e.target.value)}
                className={`w-full px-4 py-3 bg-[#FAF9F6] border-none text-neutral-800 text-xs font-semibold placeholder:text-neutral-450 rounded-full focus:outline-none focus:ring-2 focus:ring-[#D2007A] ${
                  errors.lead ? 'ring-2 ring-pink-650' : ''
                }`}
              />
              {errors.lead && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] text-[#D2007A] font-black uppercase" title={errors.lead}>!</span>}
            </div>

            {/* Peru flag logo + Celular combined */}
            <div className="grid grid-cols-12 gap-3.5">
              <div className="col-span-4 relative flex items-center bg-[#FAF9F6] rounded-full px-3 py-3 border-none shadow-sm cursor-default">
                {/* Peru flag emblem */}
                <span className="inline-flex w-4.5 h-3.5 bg-neutral-900 overflow-hidden rounded-sm relative shrink-0">
                  <span className="absolute left-0 top-0 bottom-0 w-1/3 bg-red-600"></span>
                  <span className="absolute left-1/3 right-1/3 top-0 bottom-0 bg-white"></span>
                  <span className="absolute right-0 top-0 bottom-0 w-1/3 bg-red-600"></span>
                </span>
                <span className="text-xs font-bold text-neutral-600 ml-1.5">+51</span>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 w-4.5 h-4.5 flex items-center justify-center bg-neutral-200/40 rounded-full">
                  <ChevronDown className="w-2.5 h-2.5" />
                </div>
              </div>

              <div className="col-span-8 relative">
                <input
                  type="text"
                  placeholder="Número Celular"
                  maxLength={9}
                  value={form.celular}
                  onChange={(e) => handleFormChange('celular', e.target.value.replace(/\D/g, ''))}
                  className={`w-full px-4 py-3 bg-[#FAF9F6] border-none text-neutral-800 text-xs font-bold font-mono placeholder:text-neutral-450 rounded-full focus:outline-none focus:ring-2 focus:ring-[#D2007A] ${
                    errors.celular ? 'ring-2 ring-pink-650' : ''
                  }`}
                />
                {errors.celular && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] text-[#D2007A] font-black uppercase" title={errors.celular}>!</span>}
              </div>
            </div>

            {/* Correo Electrónico */}
            <div className="relative">
              <input
                type="email"
                placeholder="Correo Electrónico"
                value={form.correo}
                onChange={(e) => handleFormChange('correo', e.target.value)}
                className={`w-full px-4 py-3 bg-[#FAF9F6] border-none text-neutral-800 text-xs font-semibold placeholder:text-neutral-450 rounded-full focus:outline-none focus:ring-2 focus:ring-[#D2007A] ${
                  errors.correo ? 'ring-2 ring-pink-650' : ''
                }`}
              />
              {errors.correo && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] text-[#D2007A] font-black uppercase" title={errors.correo}>!</span>}
            </div>
          </div>
        ) : (
          /* STEP 2: Optional Location & Comentarios */
          <div className="space-y-3.5">
            {/* Distrito (Opcional) */}
            <div className="relative">
              <input
                type="text"
                placeholder="Distrito de residencia (Opcional)"
                value={form.distrito}
                onChange={(e) => handleFormChange('distrito', e.target.value)}
                className="w-full px-4 py-3 bg-[#FAF9F6] border-none text-neutral-800 text-xs font-semibold placeholder:text-neutral-450 rounded-full focus:outline-none focus:ring-2 focus:ring-[#D2007A]"
              />
            </div>

            {/* Comentarios o Mensaje de consulta (Opcional) */}
            <div className="relative">
              <textarea
                placeholder="¿Algún comentario o consulta adicional?"
                value={form.comentarios}
                onChange={(e) => handleFormChange('comentarios', e.target.value)}
                rows={2}
                className="w-full px-4 py-3 bg-[#FAF9F6] border border-transparent text-neutral-800 text-xs font-semibold placeholder:text-neutral-450 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D2007A] resize-none"
              />
            </div>

            {/* Terms checkpoints round design */}
            <div className="space-y-3 pt-1 text-xs text-neutral-850 font-semibold leading-snug">
              {/* Policy 1 */}
              <div 
                onClick={() => handleFormChange('politicaTerminos', !form.politicaTerminos)}
                className="flex items-start gap-3 cursor-pointer select-none"
              >
                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0 mt-0.5 border border-neutral-300">
                  {form.politicaTerminos && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#D2007A]" />
                  )}
                </div>
                <span className="text-[11px] leading-tight text-neutral-800">
                  He leído y acepto los <a href="#legal" className="underline font-bold text-neutral-900">Términos y Condiciones</a> y la <a href="#legal" className="underline font-bold text-neutral-900">Política de Privacidad</a>
                </span>
              </div>

              {/* Policy 2 */}
              <div 
                onClick={() => handleFormChange('politicaPublicidad', !form.politicaPublicidad)}
                className="flex items-start gap-3 cursor-pointer select-none"
              >
                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0 mt-0.5 border border-neutral-300">
                  {form.politicaPublicidad && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#D2007A]" />
                  )}
                </div>
                <span className="text-[11px] leading-tight text-neutral-800">
                  Acepto el envío de Publicidad según <a href="#legal" className="underline font-bold text-neutral-900">Política de Privacidad</a>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          {activeStep === 1 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full py-4 bg-[#D2007A] hover:bg-pink-800 text-white font-black text-sm rounded-full shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 uppercase tracking-wide"
            >
              <span>Continuar</span>
              <ArrowRight className="w-4 h-4 text-white stroke-[3px]" />
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setActiveStep(1)}
                className="px-4 py-4 bg-white/20 hover:bg-white/40 text-neutral-900 text-xs font-black rounded-full uppercase transition-all"
              >
                Atrás
              </button>
              <button
                type="submit"
                className="flex-1 py-4 bg-[#D2007A] hover:bg-pink-800 text-white font-black text-sm rounded-full shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 uppercase tracking-wide font-sans transform active:scale-95"
              >
                <span>Solicitar información</span>
                <ArrowRight className="w-4 h-4 text-white stroke-[3px]" />
              </button>
            </div>
          )}
        </div>

      </form>

      {/* Compliance seal bottom */}
      <div className="text-[9px] text-neutral-700 font-mono tracking-wider font-bold text-center uppercase pt-4 opacity-75">
        🔒 DATOS SEGUROS • LEY Nro. 29733 PERÚ
      </div>

    </div>
  );
}
