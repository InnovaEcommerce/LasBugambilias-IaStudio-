import { ArrowRight } from 'lucide-react';

export default function BackupAndHistory() {
  const stats = [
    {
      value: '+10',
      unit: 'proyectos',
      label: 'entregados',
      bgGradient: 'from-black/75 via-black/40 to-transparent',
      imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=600', // chef grilling / family bbq feel
    },
    {
      value: '+15',
      unit: 'años',
      label: 'junto a ti',
      bgGradient: 'from-black/75 via-black/40 to-transparent',
      imageUrl: 'https://images.unsplash.com/photo-1543258103-a62bdc069871?auto=format&fit=crop&q=80&w=600', // people socializing / picnicking outdoor feel
    },
    {
      value: '+150',
      unit: 'familias',
      label: 'felices',
      bgGradient: 'from-black/75 via-black/40 to-transparent',
      imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600',
    },
    {
      value: '+5',
      unit: 'residenciales',
      label: 'en el país',
      bgGradient: 'from-black/75 via-black/40 to-transparent',
      imageUrl: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&q=80&w=600',
    },
  ];

  return (
    <section className="bg-white py-14 md:py-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        
        {/* DESKTOP VIEW: hidden on mobile, shown on lg screens and up */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-center text-neutral-800">
          
          {/* Left Block Description */}
          <div className="col-span-5 space-y-6 text-left">
            <div className="space-y-1.5 uppercase font-display font-black tracking-tight select-none">
              <span className="text-[15px] block font-semibold text-[#D2007A] font-sans">CON EL</span>
              <span className="text-2xl md:text-3xl block text-[#D2007A] tracking-tight font-sans">RESPALDO DE</span>
              
              {/* Centenario Logo representation (Grid of squares and name) */}
              <div className="flex items-center gap-3.5 justify-start pt-2">
                {/* Visual block logo mimicking the pink block structure */}
                <div className="grid grid-cols-2 gap-1 w-9 h-9 shrink-0">
                  <div className="bg-[#D2007A] rounded-sm"></div>
                  <div className="bg-[#D2007A] rounded-sm transform translate-y-0.5"></div>
                  <div className="bg-[#D2007A] rounded-sm transform -translate-y-0.5"></div>
                  <div className="bg-[#D2007A] rounded-sm"></div>
                </div>

                <div className="flex flex-col text-left">
                  <span className="text-2xl font-display font-black tracking-tight text-neutral-900 leading-none">
                    INNOVA
                  </span>
                  <span className="text-[8px] tracking-[4px] font-black uppercase text-neutral-500 leading-tight">
                    GRUPO
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3.5 text-neutral-600 text-sm md:text-base leading-relaxed max-w-md">
              <p className="font-extrabold text-neutral-900 text-lg md:text-xl">
                Invierte con confianza en un futuro seguro para tu familia.
              </p>
              <p className="text-neutral-500 text-sm">
                ¡Haz una compra 100% segura con INNOVA Inversiones! Disfruta de una residencial moderna concebida con la mayor calidad, solidez de entrega y confiabilidad del mercado.
              </p>
            </div>

            <div className="pt-2">
              <a
                href="#financiamiento"
                className="inline-block px-8 py-3.5 bg-[#FFD100] hover:bg-amber-400 text-[#D2007A] font-black text-xs uppercase tracking-wider rounded-full shadow-md transition-all duration-300 transform active:scale-95 animate-none"
              >
                ¡Conocer más!
              </a>
            </div>
          </div>

          {/* Right Statistics Bento-Grid layout */}
          <div className="col-span-7 grid grid-cols-2 gap-4 md:gap-5 text-white text-left font-sans">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="relative h-44 rounded-[24px] overflow-hidden shadow-lg border border-neutral-100 flex flex-col justify-end p-5 md:p-6 group cursor-default transition-all duration-300 hover:shadow-xl"
              >
                {/* Background Asset Image */}
                <img
                  src={stat.imageUrl}
                  alt={stat.label}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 saturate-[1.1]"
                />
                
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${stat.bgGradient} pointer-events-none`} />

                {/* Overlaid stats information exactly styled text vertically as Image 6 */}
                <div className="relative z-10 space-y-0 flex flex-col font-sans">
                  <span className="font-display font-black text-4xl md:text-5xl text-[#FFD100] leading-none mb-1 font-sans">
                    {stat.value}
                  </span>
                  <span className="text-sm md:text-base font-extrabold text-white leading-tight font-sans">
                    {stat.unit}
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-neutral-300 leading-none font-sans">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* MOBILE-OPTIMIZED RESILIENT LAYOUT: Shown on mobile viewport */}
        <div className="block lg:hidden space-y-8 text-center px-2">
          
          {/* Centered header label */}
          <div className="space-y-3">
            <h3 className="font-sans font-black text-xl text-[#D2007A] tracking-wider uppercase">
              CON EL RESPALDO DE
            </h3>

            {/* Brand logo centered */}
            <div className="flex items-center gap-3.5 justify-center">
              {/* Visual red/pink interlocking squares Centenario logo design */}
              <div className="grid grid-cols-2 gap-1 w-10 h-10 shrink-0">
                <div className="bg-[#D2007A] rounded-sm"></div>
                <div className="bg-[#D2007A] rounded-sm transform translate-y-0.5"></div>
                <div className="bg-[#D2007A] rounded-sm transform -translate-y-0.5"></div>
                <div className="bg-[#D2007A] rounded-sm"></div>
              </div>

              <div className="flex flex-col text-left">
                <span className="text-2xl font-display font-black tracking-tight text-neutral-900 leading-none">
                  INNOVA
                </span>
                <span className="text-[9px] tracking-[4px] font-black uppercase text-neutral-500 leading-tight">
                  GRUPO
                </span>
              </div>
            </div>
          </div>

          {/* Side-by-side or horizontal swipable cards preview precisely mimicking Image 6 */}
          <div className="flex gap-4 overflow-x-auto pb-6 pt-1 snap-x snap-mandatory scrollbar-none scroll-smooth">
            {stats.slice(0, 2).map((stat, idx) => (
              <div
                key={idx}
                className="relative h-56 min-w-[240px] w-[260px] rounded-[24px] overflow-hidden shadow-lg flex flex-col justify-end p-5 text-left font-sans snap-start shrink-0 border border-neutral-100/50"
              >
                {/* Background Image */}
                <img
                  src={stat.imageUrl}
                  alt={stat.label}
                  className="absolute inset-0 w-full h-full object-cover saturate-[1.15]"
                />
                
                {/* Dark Vignette Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

                {/* Left side text labels representing statistics */}
                <div className="relative z-10 flex flex-col font-sans">
                  {/* Big yellow value */}
                  <span className="font-sans font-black text-5xl text-[#FFD100] leading-none mb-1">
                    {stat.value}
                  </span>
                  {/* Unit label (e.g. proyectos, años) */}
                  <span className="text-base font-extrabold text-white leading-tight uppercase font-sans">
                    {stat.unit}
                  </span>
                  {/* Label (e.g. entregados, junto a ti) */}
                  <span className="text-sm font-semibold text-neutral-200 leading-normal font-sans">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Dots carousels indicators - matching Image 6 style */}
          <div className="flex justify-center items-center gap-1.5 mt-2">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-200" />
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-200" />
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-200" />
            <span className="w-10 h-1.5 rounded-full bg-[#D2007A]" />
          </div>

          {/* Bottom Yellow CTA capsule Button */}
          <div className="pt-4 max-w-sm mx-auto">
            <a
              href="#financiamiento"
              className="w-full bg-[#FFD100] hover:bg-amber-400 text-neutral-900 border border-transparent font-black px-6 py-4 rounded-full text-center hover:scale-[1.01] transition-all text-sm uppercase block shadow-md tracking-wider transform active:scale-95 cursor-pointer"
            >
              Conocer más
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
