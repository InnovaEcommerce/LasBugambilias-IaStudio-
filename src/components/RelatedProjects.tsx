import { MapPin, ArrowRight, Video, Image as ImageIcon, Shrink } from 'lucide-react';
import { useDynamicImages } from '../hooks/useDynamicImages';

export default function RelatedProjects() {
  const { images } = useDynamicImages();
  const projects = [
    {
      id: 'huacho',
      title: 'Urbanización Mirador de Huacho',
      ubicacion: 'Lima / Huacho',
      areaBg: 'Desde 90 m²',
      tag: 'Agotado',
      tagColor: 'bg-[#D2007A] text-white',
      precioText: 'Al contado desde:',
      precio: 'S/ 162,504',
      imagenUrl: images.related1Huacho,
      mediaIcons: ['image'],
      agotado: true,
    },
    {
      id: 'planicie',
      title: 'Urbanización La Planicie',
      ubicacion: 'Lima Norte / Carabayllo',
      areaBg: 'Desde 90 m²',
      tag: 'Últimos terrenos',
      tagColor: 'bg-[#FF7A00] text-white',
      precioText: 'Cuotas desde:',
      precio: 'S/ 2,092',
      imagenUrl: images.related2Planicie,
      mediaIcons: ['video', 'image'],
      agotado: false,
    },
    {
      id: 'clara',
      title: 'Proyecto Golf de Santa Clara',
      ubicacion: 'Lima Este / Ate - Santa Clara',
      areaBg: 'Desde 93 m²',
      tag: 'Últimos terrenos',
      tagColor: 'bg-[#FF7A00] text-white',
      precioText: 'Hasta:',
      precio: 'S/ 69,305 DE DSCTO.',
      imagenUrl: images.related3SantaClara,
      mediaIcons: ['video', 'image'],
      agotado: false,
    },
  ];

  return (
    <section className="bg-white py-14 md:py-20 font-sans border-b border-neutral-150">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        
        {/* Section title */}
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D2007A] font-mono bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
            Alternativas Premium
          </span>
          <h2 className="font-display font-black text-3xl md:text-4xl text-neutral-900 tracking-tight leading-none uppercase">
            Más Proyectos Como Este
          </h2>
          <div className="w-16 h-1 bg-[#D2007A] mx-auto rounded-full mt-2"></div>
        </div>

        {/* DESKTOP VIEW: hidden on mobile, shown on md screens and up */}
        <div className="hidden lg:grid grid-cols-3 gap-8">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-[#FAF9F6] rounded-[24px] overflow-hidden shadow-md flex flex-col justify-between group h-full relative"
            >
              <div>
                
                {/* Product Thumbnail Asset */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={proj.imagenUrl}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  
                  {/* Status Indicator overlay label */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wide shadow-md ${proj.id === 'huacho' ? 'bg-[#D2007A] text-white' : proj.tagColor}`}>
                      {proj.tag}
                    </span>
                  </div>

                  {/* Top Right Media Circle Buttons */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    {proj.mediaIcons.map((iconType, idx) => (
                      <div 
                        key={idx} 
                        className="w-8 h-8 rounded-full bg-white text-neutral-800 shadow-md flex items-center justify-center select-none"
                      >
                        {iconType === 'video' ? (
                          <Video className="w-4 h-4 text-neutral-700" />
                        ) : (
                          <ImageIcon className="w-4 h-4 text-neutral-700" />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Dimension Tag inside image bottom right */}
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-mono text-white font-bold flex items-center gap-1">
                    <Shrink className="w-3.5 h-3.5 text-[#FFD100]" />
                    <span>{proj.areaBg}</span>
                  </div>
                </div>

                {/* Card descriptions details block */}
                <div className="p-6 space-y-4 font-sans text-neutral-800">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1 text-xs text-neutral-400 font-mono font-bold uppercase tracking-wider">
                      <MapPin className="w-3.5 h-3.5 text-[#D2007A]" />
                      <span>{proj.ubicacion}</span>
                    </div>

                    <h3 className="font-display font-black text-lg text-neutral-900 group-hover:text-[#D2007A] transition-colors leading-[1.25] uppercase mt-2">
                      {proj.title}
                    </h3>
                  </div>
                </div>

              </div>

              {/* Dynamic Bottom Row: Pink Price Tag on Left, Yellow Button on Right */}
              <div className="p-6 pt-0 flex items-center justify-between gap-2 mt-auto">
                
                {/* Price Tag Block of Card */}
                <div className="bg-[#D2007A] text-white px-4 py-2 rounded-xl flex flex-col justify-center min-w-[130px] shadow-sm select-none">
                  <span className="text-[9px] text-white/90 leading-none">
                    {proj.precioText}
                  </span>
                  <span className="text-sm font-display font-black leading-none mt-1 uppercase font-sans">
                    {proj.precio}
                  </span>
                </div>

                {/* Yellow Action Button */}
                <a
                  href="#financiamiento"
                  className="px-4 py-3 bg-[#FFD100] hover:bg-amber-400 text-neutral-900 border border-neutral-800/10 font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all duration-200 flex items-center gap-1 animate-none"
                >
                  <span>Ver proyecto</span>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-900 stroke-[3px]" />
                </a>

              </div>

            </div>
          ))}
        </div>

        {/* MOBILE-OPTIMIZED VIEW: shown on mobile, hidden on lg screens */}
        <div className="block lg:hidden px-2 relative">
          
          {/* Card exactly designed as Image 5 */}
          <div className="relative w-full rounded-[24px] overflow-hidden shadow-2xl bg-neutral-900 aspect-[5/6] sm:aspect-[4/3] flex flex-col justify-end">
            
            {/* Main project background image */}
            <img
              src={images.related3SantaClara}
              alt="Proyecto Golf de Santa Clara"
              className="absolute inset-0 w-full h-full object-cover brightness-[0.9]"
            />

            {/* Subtle Vignette Gradient Bottom, Top, Left */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 pointer-events-none" />

            {/* Top Left White Pill Badge with Red Outline Text */}
            <div className="absolute top-4 left-4">
              <span className="bg-white text-[#D2007A] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wide shadow border border-[#D2007A]/15 select-none block">
                Últimos terrenos
              </span>
            </div>

            {/* Top Right Pink Circle Media Buttons - exact as Image 5 */}
            <div className="absolute top-4 right-4 flex gap-2">
              <div className="w-9 h-9 rounded-full bg-[#D2007A] text-white shadow-md flex items-center justify-center select-none">
                <Video className="w-4 h-4 fill-white text-[#D2007A]" />
              </div>
              <div className="w-9 h-9 rounded-full bg-[#D2007A] text-white shadow-md flex items-center justify-center select-none">
                <ImageIcon className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Card text content block overlapping image centered bottom */}
            <div className="relative z-10 px-5 pb-20 space-y-3 text-left">
              
              {/* Overlaid Title */}
              <h3 className="text-white text-3xl font-display font-black tracking-tight leading-none uppercase">
                Proyecto Golf de Santa Clara
              </h3>

              {/* Subtitles: location and area */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-white/95 text-xs font-bold uppercase tracking-wide">
                  <MapPin className="w-4 h-4 text-white shrink-0 stroke-[2.5]" />
                  <span>Lima Este / Ate - Santa Clara</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/95 text-xs font-bold uppercase tracking-wide">
                  <Shrink className="w-4 h-4 text-white shrink-0 stroke-[2.5]" />
                  <span>Desde 93 m²</span>
                </div>
              </div>

            </div>

            {/* Interactive Float Controls: Red discount badge on left, Yellow select arrow at absolute bottom right */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-20">
              
              {/* Red Discount Banner exactly matching bottom-left portion */}
              <div className="bg-[#D2007A] text-white px-5 py-3 rounded-[20px] flex flex-col justify-center min-w-[150px] shadow-lg border border-white/10 select-none">
                <span className="text-[10px] text-white/85 uppercase leading-none font-bold">
                  Hasta:
                </span>
                <span className="text-lg font-sans font-black tracking-tight leading-none uppercase mt-1">
                  S/69,305 DE DSCTO.
                </span>
              </div>

              {/* Yellow block action button on bottom-right */}
              <a
                href="#financiamiento"
                className="w-14 h-14 bg-[#FFD100] hover:bg-amber-400 text-neutral-900 rounded-[20px] shadow-lg flex items-center justify-center transition-all duration-300 transform active:scale-95 shrink-0"
              >
                <ArrowRight className="w-7 h-7 text-[#D2007A] stroke-[4]" />
              </a>

            </div>

          </div>

          {/* Dots Carousel Indicators of Related Projects exactly matching Image 5 */}
          <div className="flex justify-center items-center gap-1.5 mt-8">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-200" />
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-200" />
            <span className="w-10 h-1.5 rounded-full bg-[#D2007A]" />
          </div>

        </div>

      </div>
    </section>
  );
}
