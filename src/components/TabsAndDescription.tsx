import { MapPin, Layers, Clock } from 'lucide-react';

interface TabsAndDescriptionProps {
  onOpenLead: () => void;
}

export default function TabsAndDescription({ onOpenLead }: TabsAndDescriptionProps) {
  return (
    <section id="proyecto" className="bg-white py-12 md:py-16 font-sans scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (8-column constraint on desktop) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* 1. Feature Bullet Points (horizontal Row/Col inside left space) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-6 bg-white py-2">
              
              {/* Highlight 1: Avenida Huarangal */}
              <div className="flex items-center text-left gap-4 group">
                <div className="w-12 h-12 rounded-full bg-[#D2007A] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <MapPin className="w-5.5 h-5.5 text-white stroke-[2.5px]" />
                </div>
                <p className="font-sans font-black text-[15px] sm:text-[16px] md:text-[18px] text-neutral-900 leading-tight tracking-tight">
                  Cerca a colegio, centro de salud, iglesia y comisaria
                </p>
              </div>

              {/* Highlight 2: Lotes desde 98m² */}
              <div className="flex items-center text-left gap-4 group">
                <div className="w-12 h-12 rounded-full bg-[#D2007A] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <Layers className="w-5.5 h-5.5 text-white stroke-[2.5px]" />
                </div>
                <p className="font-sans font-black text-[16px] sm:text-[18px] md:text-[20px] text-neutral-900 leading-tight tracking-tight">
                  Lotes con excelente ubicación
                </p>
              </div>

              {/* Highlight 3: A 2 cdras del Mercado */}
              <div className="flex items-center text-left gap-4 group">
                <div className="w-12 h-12 rounded-full bg-[#D2007A] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <Clock className="w-5.5 h-5.5 text-white stroke-[2.5px]" />
                </div>
                <p className="font-sans font-black text-[16px] sm:text-[18px] md:text-[20px] text-neutral-900 leading-tight tracking-tight">
                  A 3 min de avenida principal y 5 min de Panam. Sur
                </p>
              </div>

            </div>

            {/* 2. Narrative Description plain text list matching reference image style */}
            <div className="text-left py-4 pt-6 select-text">
              <p className="text-neutral-600 font-semibold text-[14px] md:text-[15.5px] leading-relaxed max-w-3xl">
                Terrenos de 98 hasta 200 m² en La Joya, Arequipa. Familias emprendedoras arequipeñas ya eligieron a INNOVA Inversiones para cumplir el sueño de su hogar. Nuestra residencial cuenta con diseño moderno, área de aportes, parques, áreas comunes y financiamiento rapidito.
              </p>
            </div>

          </div>

          {/* Right Column: Empty spacer allowing LeadCard on desktop inside scroll frame */}
          <div className="hidden lg:block lg:col-span-4" />

        </div>
      </div>
    </section>
  );
}
