import { MapPin, Clock, Navigation2, Milestone, ShieldCheck, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import { useDynamicImages } from '../hooks/useDynamicImages';

export default function LocationSection() {
  const { images } = useDynamicImages();
  const pointsOfInterests = [
    { title: 'Colegio Innova Schools', desc: 'A solo 4 minutos. Educación de prestigio para tus hijos.', stat: '4 min' },
    { title: 'Mercado de La Joya', desc: 'Abastecimiento conveniente cerca de tu hogar.', stat: '5 min' },
    { title: 'Panamericana Sur', desc: 'Vía principal con conexión directa a todo Arequipa.', stat: 'Cerca' },
    { title: 'Plaza de San Isidro', desc: 'A solo 3 minutos del desarrollo. Espacio cívico principal.', stat: '3 min' },
  ];

  return (
    <section id="mapa" className="bg-[#fafafa] py-14 md:py-20 font-sans scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-centenario-magenta font-mono bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
            Conectividad Extrema
          </span>
          <h2 className="font-display font-black text-3xl md:text-4xl text-neutral-900 tracking-tight leading-none uppercase">
            Ubicación Ideal de Las Bugambilias
          </h2>
          <div className="w-16 h-1 bg-centenario-magenta mx-auto rounded-full mt-2"></div>
        </div>

        {/* Layout Grid: Big Map layout representation & landmarks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Simulated Map Visual rendering (Left & Middle container) */}
          <div className="lg:col-span-2 relative min-h-[355px] lg:min-h-full rounded-3xl overflow-hidden shadow-xl border border-neutral-200 group">
            {/* Visual background map illustration representing Carabayllo landmarks */}
            <img
              src={images.mapPlan}
              alt="Ubicación Las Bugambilias La Joya"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover saturate-120 group-hover:scale-[1.03] transition-transform duration-700"
            />
            {/* Map Marker overlay layout */}
            <div className="absolute inset-0 bg-neutral-900/10 pointer-events-none" />

            {/* Glowing pin marker representing Alameda del Sol */}
            <div className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <span className="relative flex h-5 w-5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-centenario-magenta opacity-75"></span>
                <span className="relative inline-flex rounded-full h-5 w-5 bg-centenario-magenta"></span>
              </span>
              <div className="bg-neutral-900 text-white font-display font-black text-xs px-3 py-1.5 rounded-lg shadow-lg border border-centenario-yellow mt-2 flex items-center gap-1.5 whitespace-nowrap">
                <Compass className="w-3.5 h-3.5 text-centenario-yellow animate-spin-slow" />
                <span>Las Bugambilias</span>
              </div>
            </div>

            {/* Google Maps / Waze Launch Action floating bar */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-neutral-100 shadow-lg flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-pink-100 rounded-xl text-centenario-magenta">
                  <MapPin className="w-5 h-5 text-centenario-magenta" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-neutral-800 leading-none">Coordenadas GPS de la Obra</h4>
                  <p className="text-[11px] text-neutral-500 font-mono mt-1">16°24'00"S | 71°32'00"W • La Joya</p>
                </div>
              </div>

              <div className="flex gap-2">
                <a
                  href="https://waze.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 hover:bg-neutral-900 bg-neutral-100 hover:text-white border border-neutral-200 text-neutral-700 text-xs font-bold rounded-xl transition duration-200 cursor-pointer flex items-center gap-1"
                >
                  <Navigation2 className="w-3.5 h-3.5 text-sky-500" />
                  Ir con Waze
                </a>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 bg-centenario-magenta text-white hover:bg-pink-800 text-xs font-bold rounded-xl transition duration-200 cursor-pointer flex items-center gap-1"
                >
                  <Navigation2 className="w-3.5 h-3.5 text-centenario-yellow" />
                  Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Right Landmark lists column */}
          <div className="space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                Puntos de Interés Cercanos
              </span>

              <div className="space-y-3 font-sans text-neutral-800">
                {pointsOfInterests.map((poi, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white border border-neutral-200 rounded-2xl flex gap-4 hover:border-pink-200 shadow-sm hover:shadow transition duration-200 group"
                  >
                    <div className="p-2.5 rounded-xl bg-pink-light border border-pink-100 flex items-center justify-center shrink-0 h-11 w-11 group-hover:scale-105 transition">
                      <Milestone className="w-5 h-5 text-centenario-magenta" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-display font-bold text-sm text-neutral-800 leading-tight">
                          {poi.title}
                        </h4>
                        <span className="text-[10px] bg-neutral-150 px-2 py-0.5 rounded font-mono font-bold text-neutral-600 block shrink-0">
                          {poi.stat}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 leading-relaxed">
                        {poi.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Trust badge */}
            <div className="p-4 bg-neutral-900 text-neutral-100 rounded-2xl flex items-center gap-3 border border-neutral-800 shadow-md">
              <ShieldCheck className="w-8 h-8 text-centenario-yellow shrink-0 animate-pulse" />
              <p className="text-xs leading-relaxed opacity-90">
                Lugar de alta revalorización y crecimiento del <strong className="text-centenario-yellow">15% anual</strong> proyectado. Adquiere tu patrimonio de manera formal.
              </p>
            </div>
          </div>

        </div>

        {/* Physical Office locator Row - Recreating "Visítanos en nuestras oficinas" */}
        <div id="oficinas" className="bg-white p-6 md:p-8 rounded-3xl border border-neutral-200 shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          
          <div className="flex items-center gap-4 border-b md:border-b-0 md:border-r border-neutral-100 pb-4 md:pb-0 pr-0 md:pr-6">
            <div className="w-12 h-12 bg-pink-light rounded-full flex items-center justify-center text-centenario-magenta ring-8 ring-pink-50 shrink-0">
              <MapPin className="w-6 h-6 text-centenario-magenta" />
            </div>
            <div>
              <h4 className="text-[10px] font-mono font-bold uppercase text-neutral-450 tracking-wider">Lugar de Atención Presencial</h4>
              <p className="font-display font-extrabold text-sm md:text-base text-neutral-800 mt-1">
                Panamericana Sur Km 975 - La Joya, Arequipa
              </p>
              <p className="text-xs text-neutral-500">Módulo de ventas Las Bugambilias, cerca a Avenida principal.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pl-0 md:pl-6">
            <div className="w-12 h-12 bg-pink-light rounded-full flex items-center justify-center text-centenario-magenta ring-8 ring-pink-50 shrink-0">
              <Clock className="w-6 h-6 text-centenario-magenta" />
            </div>
            <div>
              <h4 className="text-[10px] font-mono font-bold uppercase text-neutral-450 tracking-wider">Horario de Atención</h4>
              <p className="font-display font-extrabold text-sm md:text-base text-neutral-800 mt-1">
                Lunes a Domingo — 09:00 am a 06:00 pm
              </p>
              <p className="text-xs text-neutral-500">Atención ininterrumpida incluso feriados.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
