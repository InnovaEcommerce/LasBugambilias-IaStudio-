import { useState, useEffect, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import fam1Image from '../assets/images/images-testimonials/fam1.webp';
import fam2Image from '../assets/images/images-testimonials/fam2.webp';
import fam3Image from '../assets/images/images-testimonials/fam3.webp';
import fam4Image from '../assets/images/images-testimonials/fam4.webp';
import fam5Image from '../assets/images/images-testimonials/fam5.webp';
import fam6Image from '../assets/images/images-testimonials/fam6.webp';
import fam7Image from '../assets/images/images-testimonials/fam7.webp';
import fam8Image from '../assets/images/images-testimonials/fam8.webp';
import fam9Image from '../assets/images/images-testimonials/fam9.webp';

export interface FamilyCard {
  id: string;
  familyName: string;
  imageUrl: string;
  role: string;
  description: string;
}

export const SATISFIED_FAMILIES: FamilyCard[] = [
  {
    id: 'fam-1',
    familyName: 'Apaza Barriga',
    imageUrl: fam1Image,
    role: 'Lote J-20',
    description: 'Orgullosos propietarios de su lote campestre en La Joya, listos para construir un hogar de ensueño para su familia.',
  },
  {
    id: 'fam-2',
    familyName: 'Cornejo García',
    imageUrl: fam2Image,
    role: 'Lote P-1',
    description: 'Lograron adquirir su terreno a un paso del campo con financiamiento directo y sin intermediarios molestos.',
  },
  {
    id: 'fam-3',
    familyName: 'Bendezu Olivares',
    imageUrl: fam3Image,
    role: 'Lote K-10',
    description: 'Aseguraron el futuro de sus hijos con una excelente inversión de alta plusvalía en el proyecto de La Joya.',
  },
  {
    id: 'fam-4',
    familyName: 'Gutiérrez Mendoza',
    imageUrl: fam4Image,
    role: 'Lote B-15',
    description: 'Felices de haber encontrado la combinación perfecta de naturaleza, seguridad y facilidades de pago para su inversión.',
  },
  {
    id: 'fam-5',
    familyName: 'Huamán Quispe',
    imageUrl: fam5Image,
    role: 'Lote C-08',
    description: 'Agradecidos por la asesoría transparente y la rapidez en los trámites de titulación para su lote propio.',
  },
  {
    id: 'fam-6',
    familyName: 'Vargas Romero',
    imageUrl: fam6Image,
    role: 'Lote D-04',
    description: 'Eligieron el mejor espacio para su casa de campo con amplias áreas verdes y excelente clima todo el año.',
  },
  {
    id: 'fam-7',
    familyName: 'Salazar Flores',
    imageUrl: fam7Image,
    role: 'Lote E-12',
    description: 'Cumplieron el sueño de tener una propiedad segura en una zona de constante desarrollo y alta rentabilidad.',
  },
  {
    id: 'fam-8',
    familyName: 'Ramos Morales',
    imageUrl: fam8Image,
    role: 'Lote F-07',
    description: 'Inversionistas satisfechos con el respaldo y la seriedad que ofrece Innova Inversiones en cada etapa del proyecto.',
  },
  {
    id: 'fam-9',
    familyName: 'Pérez Castillo',
    imageUrl: fam9Image,
    role: 'Lote M-03',
    description: 'Listos para disfrutar de fines de semana inolvidables junto a su familia en su nuevo terreno campestre.',
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(1);

  const total = SATISFIED_FAMILIES.length;

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleGoTo = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [handleNext]);

  // For desktop side-by-side view, get current and next family card
  const firstCard = SATISFIED_FAMILIES[currentIndex];
  const secondCard = SATISFIED_FAMILIES[(currentIndex + 1) % total];

  const carouselVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
      scale: 0.96,
    }),
  };

  return (
    <section 
      id="testimonios"
      className="bg-[#FFD100] py-14 md:py-20 font-sans text-neutral-900 relative overflow-hidden"
    >
      {/* Decorative background gradients */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-300/30 rounded-full blur-3xl pointer-events-none" />

      {/* DESKTOP VIEW: hidden on mobile, shown on lg screens and up */}
      <div className="hidden lg:grid max-w-7xl mx-auto px-4 md:px-8 relative z-10 grid-cols-12 gap-10 items-center">
        {/* Left Branding Block */}
        <div className="col-span-4 space-y-4 text-left relative">
          <span className="text-[10px] font-black uppercase tracking-widest text-white bg-[#D2007A] px-3.5 py-1 rounded-full font-mono">
            Nuestra Comunidad
          </span>

          <div className="space-y-1.5 pt-1">
            <h2 className="font-display font-black text-4xl md:text-5xl text-[#D2007A] tracking-tighter uppercase">
              TESTIMONIOS
            </h2>
            <p className="font-sans font-extrabold text-[#111111] text-sm md:text-base leading-relaxed">
              Invierte con confianza en un futuro seguro. ¡Familias felices disfrutando de su lote propio!
            </p>
          </div>

          <div className="flex gap-1 justify-start pt-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-5 h-5 fill-[#D2007A] text-[#D2007A]" />
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center gap-3 pt-4">
            <button
              onClick={handlePrev}
              aria-label="Anterior testimonio"
              className="w-10 h-10 rounded-full bg-white text-[#D2007A] flex items-center justify-center shadow-md hover:bg-[#D2007A] hover:text-white transition-colors duration-200 cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Siguiente testimonio"
              className="w-10 h-10 rounded-full bg-white text-[#D2007A] flex items-center justify-center shadow-md hover:bg-[#D2007A] hover:text-white transition-colors duration-200 cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-neutral-800 ml-2">
              {currentIndex + 1} / {total}
            </span>
          </div>

          {/* Curly Playful SVG Arrow pointing right on desktop */}
          <div className="absolute right-[-40px] bottom-[-60px] w-40 h-24 text-[#D2007A] opacity-80 z-20 pointer-events-none">
            <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transform rotate-[-5deg]">
              <path 
                d="M10,25 C30,35 60,10 75,25 C82,32 80,45 68,48 C55,50 48,35 60,30 C75,22 88,38 92,42" 
                stroke="currentColor" 
                strokeWidth="3" 
                strokeLinecap="round" 
                fill="none" 
              />
              <path 
                d="M84,36 L93,43 L91,32" 
                stroke="currentColor" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                fill="none" 
              />
            </svg>
          </div>
        </div>

        {/* Right Columns: Testimonial Cards with Overlapping Avatars & Animated Transition */}
        <div className="col-span-8 min-h-[380px] flex items-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={carouselVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
              className="grid grid-cols-2 gap-y-24 gap-x-6 w-full"
            >
              {[firstCard, secondCard].map((fam, idx) => (
                <div
                  key={`${fam.id}-${idx}`}
                  className="bg-white p-8 rounded-[36px] shadow-xl flex flex-col justify-between relative group mt-16 border border-neutral-100 min-h-[310px] transition-all duration-300 hover:shadow-2xl"
                >
                  {/* Overlapping Avatar centered at top edge - Enlarged to w-36 h-36 (144px) / md:w-40 md:h-40 (160px) */}
                  <div className="absolute top-[-72px] md:top-[-80px] left-1/2 -translate-x-1/2 w-36 h-36 md:w-40 md:h-40 rounded-full border-4 border-[#FFD100] overflow-hidden shadow-2xl select-none bg-neutral-100 ring-4 ring-white/90">
                    <img
                      src={fam.imageUrl}
                      alt={`Familia ${fam.familyName}`}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Top Double Quote */}
                  <div className="text-left select-none text-[32px] font-serif text-[#D2007A] leading-none mb-1 font-bold pt-12 md:pt-14">
                    “
                  </div>

                  {/* Quote Body */}
                  <p className="text-neutral-700 text-sm md:text-base italic leading-relaxed text-center font-sans font-medium px-2">
                    {fam.description}
                  </p>

                  {/* Bottom Double Quote */}
                  <div className="text-right select-none text-[32px] font-serif text-[#D2007A] leading-none mt-1 font-bold">
                    ”
                  </div>

                  {/* Author specifications details bottom centered */}
                  <div className="text-center pt-3 border-t border-neutral-100 mt-3">
                    <h3 className="font-display font-black text-base md:text-lg text-[#D2007A] uppercase leading-none">
                      Familia {fam.familyName}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1 font-bold uppercase tracking-wider">
                      {fam.role}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Dots at very bottom spanning both columns */}
        <div className="col-span-12 flex justify-center items-center gap-2 pt-6">
          {SATISFIED_FAMILIES.map((_, i) => (
            <button
              key={i}
              onClick={() => handleGoTo(i)}
              aria-label={`Ir al testimonio ${i + 1}`}
              className={`transition-all duration-300 cursor-pointer ${
                i === currentIndex
                  ? 'w-8 h-2.5 rounded-full bg-[#D2007A]'
                  : 'w-2.5 h-2.5 rounded-full bg-white/60 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </div>

      {/* MOBILE-OPTIMIZED VIEW: shown on mobile, hidden on lg screens */}
      <div className="block lg:hidden max-w-xl mx-auto px-6 relative z-10 text-center">
        <span className="text-[10px] font-black uppercase tracking-widest text-white bg-[#D2007A] px-3.5 py-1 rounded-full font-mono mb-3 inline-block">
          Nuestra Comunidad
        </span>
        <h2 className="font-display font-black text-3xl sm:text-4xl text-[#D2007A] tracking-tighter leading-none uppercase mb-2">
          TESTIMONIOS
        </h2>
        <p className="text-xs text-neutral-900 font-bold mb-4">
          Invierte con confianza en un futuro seguro.
        </p>

        {/* Testimonial Card with Animated Sliding */}
        <div className="min-h-[350px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={carouselVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
              className="bg-white p-6 rounded-[32px] shadow-xl relative mt-20 border border-neutral-100 text-left w-full"
            >
              {/* Circular avatar centered on top border - Enlarged to w-32 h-32 (128px) / sm:w-36 sm:h-36 (144px) */}
              <div className="absolute top-[-60px] sm:top-[-68px] left-1/2 -translate-x-1/2 w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-[#FFD100] overflow-hidden shadow-2xl select-none bg-neutral-100 ring-4 ring-white/90">
                <img
                  src={firstCard.imageUrl}
                  alt={`Familia ${firstCard.familyName}`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="pt-12 sm:pt-14 space-y-2">
                {/* Top Double Quote */}
                <div className="text-left select-none text-[32px] font-serif text-[#D2007A] leading-none font-black -mb-2">
                  “
                </div>

                {/* Quote text */}
                <p className="text-neutral-800 text-[14px] leading-relaxed font-sans font-medium text-center px-2 italic">
                  {firstCard.description}
                </p>

                {/* Bottom details block with red/pink title and black subtitle */}
                <div className="text-center pt-3 border-t border-neutral-100 mt-4">
                  <h3 className="font-sans font-extrabold text-base text-[#D2007A] uppercase leading-tight tracking-tight">
                    Familia {firstCard.familyName}
                  </h3>
                  <p className="text-[11px] text-neutral-500 font-bold uppercase tracking-wider mt-0.5">
                    {firstCard.role}
                  </p>
                </div>

                {/* Bottom Double Quote */}
                <div className="text-right select-none text-[32px] font-serif text-[#D2007A] leading-none font-black -mt-2">
                  ”
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Navigation controls & indicators */}
        <div className="flex justify-between items-center mt-6 px-2">
          <button
            onClick={handlePrev}
            aria-label="Anterior"
            className="w-9 h-9 rounded-full bg-white text-[#D2007A] flex items-center justify-center shadow-md active:scale-95 transition-transform cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Carousel indicators */}
          <div className="flex justify-center items-center gap-1.5">
            {SATISFIED_FAMILIES.map((_, i) => (
              <button
                key={i}
                onClick={() => handleGoTo(i)}
                aria-label={`Ir al testimonio ${i + 1}`}
                className={`transition-all duration-300 cursor-pointer ${
                  i === currentIndex
                    ? 'w-7 h-1.5 rounded-full bg-[#D2007A]'
                    : 'w-1.5 h-1.5 rounded-full bg-white/60'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            aria-label="Siguiente"
            className="w-9 h-9 rounded-full bg-white text-[#D2007A] flex items-center justify-center shadow-md active:scale-95 transition-transform cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}


