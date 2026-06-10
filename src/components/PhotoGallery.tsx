import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Camera, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PhotoGalleryProps {
  onOpenLeadPopup: () => void;
}

export default function PhotoGallery({ onOpenLeadPopup }: PhotoGalleryProps) {
  const slides = [
    {
      id: 1,
      title: 'Pórtico de ingreso controlado las 24 horas',
      tag: 'Pórtico de ingreso',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
    },
    {
      id: 2,
      title: 'Vista de la alameda principal y habilitación urbana',
      tag: 'Alameda principal',
      imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200',
    },
    {
      id: 3,
      title: 'Hermosos parques centrales del proyecto',
      tag: 'Parque central',
      imageUrl: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8c5c8?auto=format&fit=crop&q=80&w=1200',
    },
    {
      id: 4,
      title: 'Losas deportivas multiusos construidas',
      tag: 'Zonas deportivas',
      imageUrl: 'https://images.unsplash.com/photo-1544698310-74ea9d1c8258?auto=format&fit=crop&q=80&w=1200',
    },
    {
      id: 5,
      title: 'Áreas de juego infantil de primera calidad',
      tag: 'Juegos infantiles',
      imageUrl: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=1200',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000); 
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="galeria" className="bg-[#D2007A] text-white py-14 md:py-20 scroll-mt-32 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: holds entire gallery widget and CTA */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Section Heading */}
            <div className="text-center md:text-left space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FFD100] font-mono bg-pink-850/80 px-3 py-1 rounded-full border border-white/15">
                Vista del Proyecto
              </span>
              <h2 className="font-sans font-black text-3xl md:text-4xl text-white tracking-tight leading-none uppercase">
                Galería de Fotos y Diseños
              </h2>
              <div className="w-16 h-1 bg-[#FFD100] md:mx-0 mx-auto rounded-full mt-2"></div>
            </div>

            {/* Dynamic Image Slideshow Container styled exact as Image 3 */}
            <div className="relative w-full bg-neutral-900 rounded-[24px] overflow-hidden shadow-2xl aspect-[16/10] md:aspect-[16/9]">
              
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={slides[currentIndex].imageUrl}
                  alt={slides[currentIndex].title}
                  referrerPolicy="no-referrer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/60 via-transparent to-[#000000]/30 pointer-events-none" />

              {/* Counter Tag (Image 3 style: top left capsule) */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-mono font-extrabold text-white">
                <span>{currentIndex + 1}</span>
                <span className="opacity-50 mx-1">/</span>
                <span>{slides.length}</span>
              </div>

              {/* Center-Top Title Badge (Image 3 style: top center label) */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-white uppercase tracking-wider hidden sm:flex items-center gap-1.5 font-sans">
                <Camera className="w-3.5 h-3.5 text-[#FFD100]" />
                <span>{slides[currentIndex].tag}</span>
              </div>

              {/* Image referential disclaimer tag right bottom */}
              <div className="absolute bottom-4 right-4 text-[10px] text-white/80 font-semibold uppercase tracking-wider bg-black/45 backdrop-blur-sm px-2 px-2.5 py-1 rounded">
                Imágenes referenciales
              </div>

              {/* Left / Right chevron buttons floating at the exact middle */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all duration-200 shadow-md backdrop-blur-sm cursor-pointer z-10"
                aria-label="Anterior foto"
              >
                <ChevronLeft className="w-6 h-6 stroke-[3px]" />
              </button>
              
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all duration-200 shadow-md backdrop-blur-sm cursor-pointer z-10"
                aria-label="Siguiente foto"
              >
                <ChevronRight className="w-6 h-6 stroke-[3px]" />
              </button>

            </div>

            {/* Visitor CTA Banner with Upward Pointing Triangle Pointer (Image 3 style) */}
            <div className="relative w-full mt-8">
              
              {/* Subtle triangle indicator overlapping representing tooltips details */}
              <div className="absolute top-[-9px] left-14 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-white z-10" />

              {/* White container */}
              <div className="bg-white text-neutral-900 p-6 md:p-8 rounded-[24px] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5 relative border border-neutral-100">
                
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-sm font-sans font-black uppercase text-[#D2007A] block tracking-wide">
                    ¿TE GUSTÓ EL PROYECTO?
                  </span>
                  <p className="font-sans font-extrabold text-[#111111] text-base md:text-lg leading-tight">
                    ¡Coordina una visita guiada para conocer la urbanización!
                  </p>
                </div>

                <button
                  onClick={onOpenLeadPopup}
                  className="px-7 py-3.5 bg-[#FFD100] hover:bg-amber-400 text-neutral-900 font-black text-sm rounded-full flex items-center gap-2 shadow-md transition-all duration-300 transform active:scale-95 shrink-0 self-center"
                >
                  <span className="uppercase tracking-wider">Coordinar mi visita</span>
                  <ArrowRight className="w-4 h-4 text-neutral-900 stroke-[3px]" />
                </button>

              </div>

            </div>

          </div>

          {/* Right Blank Gutter Space on Desktop */}
          <div className="hidden lg:block lg:col-span-4 h-10 w-full" />

        </div>
      </div>
    </section>
  );
}
