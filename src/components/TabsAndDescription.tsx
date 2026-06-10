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
            <div className="grid grid-cols-3 gap-2.5 sm:gap-6 bg-white py-2">
              
              {/* Highlight 1: Avenida Huarangal */}
              <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left gap-2 sm:gap-4 group">
                <div className="w-10 h-10 xs:w-12 xs:h-12 rounded-full bg-[#D2007A] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <MapPin className="w-4.5 h-4.5 xs:w-5.5 xs:h-5.5 text-white stroke-[2.5px]" />
                </div>
                <p className="font-sans font-extrabold text-[9px] xs:text-[10.5px] sm:text-[13.5px] md:text-[14.5px] text-neutral-850 leading-snug tracking-tight">
                  Cerca a Avenida principal y Panam. Sur
                </p>
              </div>

              {/* Highlight 2: Lotes desde 98m² */}
              <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left gap-2 sm:gap-4 group">
                <div className="w-10 h-10 xs:w-12 xs:h-12 rounded-full bg-[#D2007A] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <Layers className="w-4.5 h-4.5 xs:w-5.5 xs:h-5.5 text-white stroke-[2.5px]" />
                </div>
                <p className="font-sans font-extrabold text-[9px] xs:text-[10.5px] sm:text-[13.5px] md:text-[14.5px] text-neutral-850 leading-snug tracking-tight">
                  Lotes desde 98m²
                </p>
              </div>

              {/* Highlight 3: A 2 cdras del Mercado */}
              <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left gap-2 sm:gap-4 group">
                <div className="w-10 h-10 xs:w-12 xs:h-12 rounded-full bg-[#D2007A] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <Clock className="w-4.5 h-4.5 xs:w-5.5 xs:h-5.5 text-white stroke-[2.5px]" />
                </div>
                <p className="font-sans font-extrabold text-[9px] xs:text-[10.5px] sm:text-[13.5px] md:text-[14.5px] text-neutral-850 leading-snug tracking-tight">
                  A 3 min de Plaza de San Isidro
                </p>
              </div>

            </div>

            {/* 2. Narrative Description plain text list matching reference image style */}
            <div className="text-left py-4 pt-6 select-text">
              <p className="text-neutral-600 font-semibold text-[14px] md:text-[15.5px] leading-relaxed max-w-3xl">
                Terrenos desde 98 hasta 200 m² en La Joya, Arequipa. Más de 150 familias ya eligieron a Innova para cumplir el sueño de su hogar. Residencial con diseño moderno, parques, áreas comunes y financiamiento. Más de 15 años de experiencia transformando la zona.
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
