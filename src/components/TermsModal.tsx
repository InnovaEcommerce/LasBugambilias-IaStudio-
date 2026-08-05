import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, Shield } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'terms' | 'privacy';
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose, defaultTab = 'terms' }) => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy'>('terms');

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setActiveTab(defaultTab);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, defaultTab]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 font-sans" id="terms-modal">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="bg-white rounded-3xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden relative z-10 border border-slate-100"
          >
            {/* Header */}
            <div className="p-6 md:p-8 bg-gradient-to-br from-indigo-950 via-kunan-secondary to-slate-900 text-white flex flex-col gap-4 relative">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all active:scale-95 cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center p-2 shadow-sm">
                  <img src="/logo_innova.svg" alt="Innova Inversiones" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-black tracking-tight">
                    Innova Inversiones
                  </h2>
                  <p className="text-teal-400 text-xs font-bold tracking-wider uppercase">
                    Marco Legal y Tratamiento de Datos
                  </p>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex gap-2 bg-white/5 p-1 rounded-xl self-start mt-2">
                <button
                  onClick={() => setActiveTab('terms')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-bold tracking-wide uppercase transition-all ${
                    activeTab === 'terms'
                      ? 'bg-teal-500 text-white shadow-md'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Términos de Uso</span>
                </button>
                <button
                  onClick={() => setActiveTab('privacy')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-bold tracking-wide uppercase transition-all ${
                    activeTab === 'privacy'
                      ? 'bg-teal-500 text-white shadow-md'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  <span>Política de Privacidad</span>
                </button>
              </div>
            </div>

            {/* Content Scrollable Container */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50 text-slate-700 space-y-6 scrollbar-thin">
              {activeTab === 'terms' ? (
                <div className="space-y-6 md:space-y-8">
                  <div>
                    <h3 className="text-lg md:text-xl font-black text-slate-900 border-b border-slate-200 pb-3 uppercase tracking-wide">
                      Términos y Condiciones de Uso
                    </h3>
                    <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mt-2">
                      Asociación de Vivienda Innova Inversiones, AQP
                    </p>
                  </div>

                  <p className="text-sm leading-relaxed text-slate-600 font-medium">
                    El presente documento establece los Términos y Condiciones de Uso aplicables a la página web principal de Innova Inversiones y a las páginas de destino (landing pages) de sus proyectos específicos, tales como "Las Bugambilias".
                  </p>

                  <p className="text-sm leading-relaxed text-slate-600">
                    Al navegar por este sitio web y/o enviar su información a través de nuestros formularios, el usuario declara haber leído, comprendido y aceptado el contenido de este documento de manera plena e incondicional.
                  </p>

                  <div className="space-y-4">
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                      <h4 className="font-bold text-slate-900 text-sm md:text-base flex items-center gap-2">
                        <span className="text-teal-600 font-black">1.</span> Naturaleza de la Información
                      </h4>
                      <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                        Toda la información contenida en este sitio web, incluyendo de manera enunciativa pero no limitativa: imágenes, renders, planos, medidas, áreas, ubicaciones y precios (aportes o cuotas sociales), es estrictamente referencial e ilustrativa. Esta información está sujeta a modificaciones técnicas, legales o comerciales sin previo aviso y no constituye una oferta comercial vinculante ni un contrato definitivo.
                      </p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                      <h4 className="font-bold text-slate-900 text-sm md:text-base flex items-center gap-2">
                        <span className="text-teal-600 font-black">2.</span> Naturaleza de la Asociación
                      </h4>
                      <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                        La solicitud de información a través de nuestro sitio web tiene como único propósito establecer contacto inicial. El llenado y envío del formulario no garantiza la separación de un lote, no genera una reserva formal y no constituye la firma de un contrato de compraventa ni la inscripción automática como socio de la asociación. Los procesos de adjudicación o participación en el proyecto se rigen estrictamente por los estatutos internos de la asociación y los documentos legales que se firmen de manera presencial o digital posterior al contacto.
                      </p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                      <h4 className="font-bold text-slate-900 text-sm md:text-base flex items-center gap-2">
                        <span className="text-teal-600 font-black">3.</span> Propiedad Intelectual
                      </h4>
                      <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                        Todos los contenidos de la web (logotipos, textos, diseños, gráficos, material audiovisual y marcas de los proyectos) son propiedad exclusiva de la <strong className="text-slate-800">ASOCIACIÓN DE VIVIENDA INNOVA INVERSIONES, AQP</strong> o de sus respectivos licenciantes. Queda estrictamente prohibida su copia, reproducción, distribución o uso comercial sin autorización previa y por escrito.
                      </p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                      <h4 className="font-bold text-slate-900 text-sm md:text-base flex items-center gap-2">
                        <span className="text-teal-600 font-black">4.</span> Disponibilidad del Sitio
                      </h4>
                      <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                        Innova Inversiones no garantiza el acceso ininterrumpido a la página web y no se hace responsable por posibles fallas técnicas, caídas del servidor o errores que impidan el envío de la información temporalmente.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 md:space-y-8">
                  <div>
                    <h3 className="text-lg md:text-xl font-black text-slate-900 border-b border-slate-200 pb-3 uppercase tracking-wide">
                      Política de Privacidad
                    </h3>
                    <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mt-2">
                      Y Tratamiento de Datos Personales (Ley N° 29733 - Perú)
                    </p>
                  </div>

                  <p className="text-sm leading-relaxed text-slate-600">
                    En estricto cumplimiento de la Ley N° 29733, Ley de Protección de Datos Personales del Perú, y su Reglamento, informamos a los usuarios sobre cómo recopilamos y tratamos su información:
                  </p>

                  <div className="space-y-4">
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                      <h4 className="font-bold text-slate-900 text-sm md:text-base flex items-center gap-2">
                        <span className="text-teal-600 font-black">1.</span> Identidad del Responsable
                      </h4>
                      <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                        El responsable del tratamiento de los datos recopilados es la <strong className="text-slate-800">ASOCIACIÓN DE VIVIENDA INNOVA INVERSIONES, AQP</strong>, con personería jurídica inscrita en la Zona Registral N° XII - Sede Arequipa, Partida Registral N° 11601536, con domicilio legal en Calle Octavio Muñoz Najar N° 137, oficina 204, Cercado, Arequipa - Perú.
                      </p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                      <h4 className="font-bold text-slate-900 text-sm md:text-base flex items-center gap-2">
                        <span className="text-teal-600 font-black">2.</span> Datos Personales Recopilados
                      </h4>
                      <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                        A través de nuestros formularios, recopilamos estrictamente los siguientes datos proporcionados voluntariamente por el usuario: Nombres, Apellidos, Número de teléfono/celular, Correo electrónico, Selección de proyecto de interés, Motivo de compra, Distrito de residencia y Comentarios adicionales.
                      </p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                      <h4 className="font-bold text-slate-900 text-sm md:text-base flex items-center gap-2">
                        <span className="text-teal-600 font-black">3.</span> Finalidad del Tratamiento de los Datos
                      </h4>
                      <p className="text-xs md:text-sm text-slate-600 leading-relaxed mb-3">
                        Al marcar la casilla de aceptación en nuestros formularios, el usuario otorga su consentimiento expreso, libre e inequívoco para que sus datos sean utilizados para las siguientes finalidades:
                      </p>
                      <ul className="list-disc pl-5 space-y-1.5 text-xs md:text-sm text-slate-600">
                        <li>Contactarlo vía llamada telefónica, WhatsApp o correo electrónico para brindarle información detallada, cotizaciones y asesoría sobre el proyecto de su interés (ej. "Las Bugambilias" u otros seleccionados).</li>
                        <li>Responder a las consultas o requerimientos ingresados en el campo de comentarios.</li>
                        <li>Fines Comerciales y Publicitarios: Enviarle información sobre futuros proyectos inmobiliarios, ofertas, promociones y novedades relacionadas con Innova Inversiones y sus proyectos asociados.</li>
                        <li>Realizar perfiles estadísticos e investigación de mercado de manera interna.</li>
                      </ul>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                      <h4 className="font-bold text-slate-900 text-sm md:text-base flex items-center gap-2">
                        <span className="text-teal-600 font-black">4.</span> Plazo de Conservación y Almacenamiento
                      </h4>
                      <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                        Los datos personales serán almacenados en el banco de datos de titularidad del responsable por un tiempo indeterminado, o hasta que el usuario decida revocar su consentimiento. Toda la información será tratada con los más altos estándares de seguridad para evitar su alteración, pérdida o acceso no autorizado.
                      </p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                      <h4 className="font-bold text-slate-900 text-sm md:text-base flex items-center gap-2">
                        <span className="text-teal-600 font-black">5.</span> Ejercicio de los Derechos ARCO
                      </h4>
                      <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                        El usuario tiene derecho a ejercer en cualquier momento sus derechos de Acceso, Rectificación, Cancelación y Oposición (Derechos ARCO) respecto a sus datos personales. Si el usuario desea actualizar sus datos o no desea recibir más comunicaciones publicitarias, puede enviar una solicitud formal al correo electrónico: <a href="mailto:innovai.dmnstrcn@gmail.com" className="text-teal-600 font-bold hover:underline">innovai.dmnstrcn@gmail.com</a>, indicando en el asunto "EJERCICIO DE DERECHOS ARCO".
                      </p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                      <h4 className="font-bold text-slate-900 text-sm md:text-base flex items-center gap-2">
                        <span className="text-teal-600 font-black">6.</span> Modificaciones a la Política
                      </h4>
                      <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                        Innova Inversiones se reserva el derecho de modificar esta Política de Privacidad en cualquier momento. Las actualizaciones entrarán en vigencia desde el momento de su publicación en este sitio web.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="p-4 md:p-6 bg-slate-100 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <span className="text-[10px] md:text-xs text-slate-500 font-medium italic">
                Última actualización: Julio 2026
              </span>

              <div className="flex gap-2.5">
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl text-xs font-black tracking-wider uppercase bg-teal-500 hover:bg-teal-600 text-white shadow-md shadow-teal-500/10 active:scale-95 transition-all cursor-pointer"
                >
                  Entendido
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Plain text versions for copying
const termsText = `TÉRMINOS Y CONDICIONES DE USO - INNOVA INVERSIONES

1. Naturaleza de la Información
Toda la información contenida en este sitio web, incluyendo de manera enunciativa pero no limitativa: imágenes, renders, planos, medidas, áreas, ubicaciones y precios (aportes o cuotas sociales), es estrictamente referencial e ilustrativa. Esta información está sujeta a modificaciones técnicas, legales o comerciales sin previo aviso y no constituye una oferta comercial vinculante ni un contrato definitivo.

2. Naturaleza de la Asociación
La solicitud de información a través de nuestro sitio web tiene como único propósito establecer contacto inicial. El llenado y envío del formulario no garantiza la separación de un lote, no genera una reserva formal y no constituye la firma de un contrato de compraventa ni la inscripción automática como socio de la asociación. Los procesos de adjudicación o participación en el proyecto se rigen estrictamente por los estatutos internos de la asociación y los documentos legales que se firmen de manera presencial o digital posterior al contacto.

3. Propiedad Intelectual
Todos los contenidos de la web (logotipos, textos, diseños, gráficos, material audiovisual y marcas de los proyectos) son propiedad exclusiva de la ASOCIACIÓN DE VIVIENDA INNOVA INVERSIONES, AQP o de sus respectivos licenciantes. Queda estrictamente prohibida su copia, reproducción, distribución o uso comercial sin autorización previa y por escrito.

4. Disponibilidad del Sitio
Innova Inversiones no garantiza el acceso ininterrumpido a la página web y no se hace responsable por posibles fallas técnicas, caídas del servidor o errores que impidan el envío de la información temporalmente.`;

const privacyText = `POLÍTICA DE PRIVACIDAD Y TRATAMIENTO DE DATOS PERSONALES - INNOVA INVERSIONES

En estricto cumplimiento de la Ley N° 29733, Ley de Protección de Datos Personales del Perú, y su Reglamento, informamos a los usuarios sobre cómo recopilamos y tratamos su información:

1. Identidad del Responsable
El responsable del tratamiento de los datos recopilados es la ASOCIACIÓN DE VIVIENDA INNOVA INVERSIONES, AQP, con personería jurídica inscrita en la Zona Registral N° XII - Sede Arequipa, Partida Registral N° 11601536, con domicilio legal en Calle Octavio Muñoz Najar N° 137, oficina 204, Cercado, Arequipa - Perú.

2. Datos Personales Recopilados
A través de nuestros formularios, recopilamos estrictamente los siguientes datos proporcionados voluntariamente por el usuario: Nombres, Apellidos, Número de teléfono/celular, Correo electrónico, Selección de proyecto de interés, Motivo de compra, Distrito de residencia y Comentarios adicionales.

3. Finalidad del Tratamiento de los Datos
Al marcar la casilla de aceptación en nuestros formularios, el usuario otorga su consentimiento expreso, libre e inequívoco para que sus datos sean utilizados para las siguientes finalidades:
- Contactarlo vía llamada telefónica, WhatsApp o correo electrónico para brindarle información detallada, cotizaciones y asesoría sobre el proyecto de su interés (ej. "Las Bugambilias" u otros seleccionados).
- Responder a las consultas o requerimientos ingresados en el campo de comentarios.
- Fines Comerciales y Publicitarios: Enviarle información sobre futuros proyectos inmobiliarios, ofertas, promociones y novedades relacionadas con Innova Inversiones y sus proyectos asociados.
- Realizar perfiles estadísticos e investigación de mercado de manera interna.

4. Plazo de Conservación y Almacenamiento
Los datos personales serán almacenados en el banco de datos de titularidad del responsable por un tiempo indeterminado, o hasta que el usuario decida revocar su consentimiento. Toda la información será tratada con los más altos estándares de seguridad para evitar su alteración, pérdida o acceso no autorizado.

5. Ejercicio de los Derechos ARCO
El usuario tiene derecho a ejercer en cualquier momento sus derechos de Acceso, Rectificación, Cancelación y Oposición (Derechos ARCO) respecto a sus datos personales. Si el usuario desea actualizar sus datos o no desea recibir más comunicaciones publicitarias, puede enviar una solicitud formal al correo electrónico: innovai.dmnstrcn@gmail.com, indicando en el asunto "EJERCICIO DE DERECHOS ARCO".

6. Modificaciones a la Política
Innova Inversiones se reserva el derecho de modificar esta Política de Privacidad en cualquier momento. Las actualizaciones entrarán en vigencia desde el momento de su publicación en este sitio web.`;
