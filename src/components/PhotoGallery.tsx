import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Camera, ArrowRight, Play, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function getGoogleDriveImageUrl(url: string | undefined): string {
  if (!url) return '';
  if (url.includes('drive.google.com')) {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://lh3.googleusercontent.com/d/${match[1]}`;
    }
  }
  return url;
}

function GoogleDriveVideoPlayer({ url, title, onEnded }: { url: string; title: string; onEnded?: () => void }) {
  const [useIframe, setUseIframe] = useState(false);

  useEffect(() => {
    if (useIframe && onEnded) {
      // Backup timer of 35 seconds to auto-advance if using iframe fallback
      const timer = setTimeout(() => {
        onEnded();
      }, 35000);
      return () => clearTimeout(timer);
    }
  }, [useIframe, onEnded]);

  if (url.includes('drive.google.com')) {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      const videoId = match[1];
      const videoSrc = `https://drive.google.com/uc?id=${videoId}&export=download`;
      // The embed link ensures Google Drive's native web player loads with high quality stream,
      // optimized for cross-platform playback without quota issues!
      const iframeSrc = `https://drive.google.com/file/d/${videoId}/preview?autoplay=1&mute=1`;

      if (useIframe) {
        return (
          <iframe
            src={iframeSrc}
            className="absolute inset-0 w-full h-full border-0 rounded-[24px]"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            title={title}
          />
        );
      }

      return (
        <video
          src={videoSrc}
          autoPlay
          muted
          playsInline
          controls
          className="absolute inset-0 w-full h-full object-cover rounded-[24px]"
          onEnded={onEnded}
          onError={() => {
            console.warn("Direct video stream failed/restricted, falling back to Google Drive iframe player");
            setUseIframe(true);
          }}
        />
      );
    }
  }

  return (
    <video
      src={url}
      autoPlay
      muted
      playsInline
      controls
      className="absolute inset-0 w-full h-full object-cover rounded-[24px]"
      onEnded={onEnded}
    />
  );
}

interface PhotoGalleryProps {
  onOpenLeadPopup: () => void;
}

export default function PhotoGallery({ onOpenLeadPopup }: PhotoGalleryProps) {
  const slides = [
    {
      id: 1,
      title: '+150 clientes satisfechos confian en nosotros',
      tag: '+150 Clientes Satisfechos',
      videoUrl: 'https://drive.google.com/file/d/1bJvxfoBvNEmkP_zHILGoQSQUbtrDkjxz/view?usp=drive_link',
      type: 'video',
    },
    {
      id: 2,
      title: 'Con la confianza y garantía de INNOVA',
      tag: 'Confianza y Garantía',
      imageUrl: 'https://drive.google.com/file/d/1J0OOJ4y05WwODpToofSsimdrXHMRWcJm/view?usp=sharing',
      type: 'image',
    },
    {
      id: 3,
      title: 'Te brindamos asesoramiento personalizado',
      tag: 'Asesoramiento Personalizado',
      imageUrl: 'https://drive.google.com/file/d/1H_EEFrPDSV2VeXW641c6AX_HmhQMwbZj/view?usp=drive_link',
      type: 'image',
    },
    {
      id: 4,
      title: '+16,000 m2 destinados para áreas verdes',
      tag: '+16,000 m2 áreas verdes',
      videoUrl: 'https://drive.google.com/file/d/1wn5bxBV4sRpvk4NA3EjmAKp3uFOM_IE_/view?usp=drive_link',
      type: 'video',
    },
    {
      id: 5,
      title: 'Ingreso al proyecto totalmente señalizado',
      tag: 'Ingreso Señalizado',
      imageUrl: 'https://drive.google.com/file/d/16OrnQY4ZUyNW3Xgq2rk5xfglbGGA0-o0/view?usp=drive_link',
      type: 'image',
    },
    {
      id: 6,
      title: 'Áreas de juego infantil de primera calidad',
      tag: 'separa tu lote hoy!',
      imageUrl: 'https://drive.google.com/file/d/1HjcGwfzD4U1ftx9YkuWqHnUyo1H6NO9h/view?usp=drive_link',
      type: 'image',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // If active slide is media/video, do not auto-advance so that user can watch fully!
    if (slides[currentIndex].type === 'video') return;

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
              <span className="text-xs font-black uppercase tracking-widest text-[#FFD100] bg-white/10 px-3 py-1 rounded-full border border-white/15">
                conoce nuestro proyecto
              </span>
              <h2 className="font-sans font-black text-3xl md:text-4xl text-white tracking-tight leading-none uppercase mt-2 pl-[1px]">
                Galería de Fotos y Videos
              </h2>
              <div className="w-16 h-1 bg-[#FFD100] md:mx-0 mx-auto rounded-full mt-2"></div>
            </div>

            {/* Dynamic Image/Video Slideshow Container styled exact as Image 3 */}
            <div className="relative w-full bg-neutral-900 rounded-[24px] overflow-hidden shadow-2xl h-[340px] xs:h-[400px] md:h-[550px]">
              
              <AnimatePresence mode="wait">
                {slides[currentIndex].type === 'video' ? (
                  <motion.div
                    key={`video-${currentIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <GoogleDriveVideoPlayer
                      url={slides[currentIndex].videoUrl || ''}
                      title={slides[currentIndex].title}
                      onEnded={handleNext}
                    />
                  </motion.div>
                ) : (
                  <motion.img
                    key={currentIndex}
                    src={getGoogleDriveImageUrl(slides[currentIndex].imageUrl)}
                    alt={slides[currentIndex].title}
                    referrerPolicy="no-referrer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
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
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-[8px] font-bold text-white uppercase tracking-wider hidden sm:flex items-center gap-1.5 font-sans">
                <Camera className="w-3.5 h-3.5 text-[#FFD100]" />
                <span>{slides[currentIndex].tag}</span>
              </div>

              {/* Image referential disclaimer tag right bottom */}
              <div 
                style={{ fontSize: '12px' }}
                className="absolute bottom-4 right-4 text-white/80 font-semibold uppercase tracking-wider bg-black/45 backdrop-blur-sm px-2 px-2.5 py-1 rounded"
              >
                Imágenes reales y referenciales
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
                  <p className="font-sans font-extrabold text-[#111111] text-base md:text-lg leading-snug">
                    ¡Coordina tu visita guiada hoy!<br />
                    <span className="text-xs md:text-sm font-bold text-neutral-600 block mt-1">
                      Aprovecha que sólo por esta semana es SIN COSTO
                    </span>
                  </p>
                </div>

                <button
                  onClick={onOpenLeadPopup}
                  className="px-7 py-3.5 bg-[#FFD100] hover:bg-amber-400 text-neutral-900 font-black text-sm rounded-full flex items-center gap-2 shadow-md transition-all duration-300 transform active:scale-95 shrink-0 self-center"
                >
                  <span className="uppercase tracking-wider">Coordina tu visita</span>
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
