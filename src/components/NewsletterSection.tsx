import React, { useState } from 'react';
import { Mail, Phone, Send, CheckCircle2 } from 'lucide-react';
import { saveLeadLocal } from '../services/leadsService';
import { trackLead } from '../utils/pixel';
import { Lead } from '../types';

interface NewsletterSectionProps {
  onSubmitSuccess?: (lead: Lead) => void;
}

export default function NewsletterSection({ onSubmitSuccess }: NewsletterSectionProps) {
  const [celular, setCelular] = useState('');
  const [correo, setCorreo] = useState('');
  const [errors, setErrors] = useState<{ celular?: string; correo?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: { celular?: string; correo?: string } = {};
    const cleanPhone = celular.trim().replace(/\D/g, '');

    if (!cleanPhone) {
      newErrors.celular = 'Ingresa tu número celular';
    } else if (!cleanPhone.startsWith('9')) {
      newErrors.celular = 'El celular debe iniciar con 9';
    } else if (cleanPhone.length !== 9) {
      newErrors.celular = 'El celular debe tener exactamente 9 dígitos';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correo.trim()) {
      newErrors.correo = 'Ingresa tu correo electrónico';
    } else if (!emailRegex.test(correo.trim())) {
      newErrors.correo = 'Ingresa un correo electrónico válido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const leadData: Lead = {
      lead: 'Suscriptor Boletín',
      celular: celular.trim(),
      correo: correo.trim(),
      distrito: 'N/A',
      comentarios: 'Suscrito al boletín informativo de ofertas y promociones',
      politicaTerminos: true,
      politicaPublicidad: true,
      politicaPerfilamiento: true,
    };

    try {
      await saveLeadLocal(leadData, {
        campaña: 'form 3 - Footer',
        formulario: 'lp LB form',
        captacion: 'lp LB form',
      });

      trackLead('form 3 - Footer');

      if (onSubmitSuccess) {
        onSubmitSuccess(leadData);
      }

      setIsSubmitted(true);
      setCelular('');
      setCorreo('');
    } catch (err) {
      console.error('Error al guardar suscripción al boletín:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-neutral-100/80 border-t border-b border-neutral-200/80 py-8 sm:py-10 px-4 sm:px-6 md:px-8 font-sans text-neutral-800">
      <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/90 shadow-xs text-center space-y-5">
        
        {/* Main Title - Compact & Elegant */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-[#D2007A] font-black text-xs uppercase tracking-widest bg-pink-50 px-3 py-0.5 rounded-full border border-pink-100">
            <Mail className="w-3.5 h-3.5 stroke-[2.5px]" />
            <span>BOLETÍN DE DESCUENTOS</span>
          </div>
          <h2 className="font-display font-black text-lg sm:text-xl md:text-2xl text-neutral-900 tracking-tight pt-1">
            Suscríbete Para Recibir El Mejor Descuento
          </h2>
        </div>

        {/* Success Card or Form */}
        {isSubmitted ? (
          <div className="bg-pink-50/50 rounded-xl p-5 border border-pink-200/80 max-w-md mx-auto text-center space-y-2 animate-fade-in">
            <div className="w-10 h-10 bg-white text-[#D2007A] rounded-full flex items-center justify-center mx-auto border border-pink-200 shadow-xs">
              <CheckCircle2 className="w-6 h-6 stroke-[2.5px]" />
            </div>
            <h3 className="font-display font-black text-base text-neutral-900 uppercase">
              ¡Suscripción Confirmada!
            </h3>
            <p className="text-xs text-neutral-600 font-medium leading-relaxed">
              Te hemos registrado con éxito. Pronto recibirás nuestras mejores promociones en <strong className="text-neutral-900 font-bold">Las Bugambilias</strong>.
            </p>
            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              className="mt-1 text-xs font-bold text-[#D2007A] hover:text-pink-800 underline uppercase tracking-wide cursor-pointer"
            >
              Suscribir otro correo
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-left">
              {/* Telefono / WhatsApp */}
              <div className="space-y-1">
                <label className="block text-[10px] font-black uppercase text-neutral-600 tracking-wider">
                  TELÉFONO / WHATSAPP *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="tel"
                    value={celular}
                    maxLength={9}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 9);
                      setCelular(val);
                      if (errors.celular) setErrors((prev) => ({ ...prev, celular: undefined }));
                    }}
                    placeholder="Ej: 999888777"
                    className={`w-full pl-9 pr-3 py-2.5 bg-neutral-50/50 border ${
                      errors.celular ? 'border-red-500 bg-red-50/20' : 'border-neutral-200 focus:border-[#D2007A] focus:bg-white'
                    } rounded-lg text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#D2007A]/15 transition-all font-medium`}
                  />
                </div>
                {errors.celular && (
                  <p className="text-[11px] text-red-600 font-semibold">{errors.celular}</p>
                )}
              </div>

              {/* Correo Electronico */}
              <div className="space-y-1">
                <label className="block text-[10px] font-black uppercase text-neutral-600 tracking-wider">
                  CORREO ELECTRÓNICO *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="email"
                    value={correo}
                    onChange={(e) => {
                      setCorreo(e.target.value);
                      if (errors.correo) setErrors((prev) => ({ ...prev, correo: undefined }));
                    }}
                    placeholder="ejemplo@correo.pe"
                    className={`w-full pl-9 pr-3 py-2.5 bg-neutral-50/50 border ${
                      errors.correo ? 'border-red-500 bg-red-50/20' : 'border-neutral-200 focus:border-[#D2007A] focus:bg-white'
                    } rounded-lg text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#D2007A]/15 transition-all font-medium`}
                  />
                </div>
                {errors.correo && (
                  <p className="text-[11px] text-red-600 font-semibold">{errors.correo}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-7 py-2.5 bg-[#D2007A] hover:bg-pink-800 active:scale-[0.99] text-white font-black text-xs uppercase tracking-wider rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>SUSCRIBIENDO...</span>
                ) : (
                  <>
                    <span>SUSCRIBIRME AL BOLETÍN</span>
                    <Send className="w-3.5 h-3.5 stroke-[2.5px]" />
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </section>
  );
}
