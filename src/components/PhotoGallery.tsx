import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Camera, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion'; 

// Corrección del formato para imágenes de Google Drive (Bypass de CDN)
function getGoogleDriveImageUrl(url: string | undefined): string {
  if (!url) return '';
  if (url.includes('drive.google.com')) {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://docs.google.com/uc?export=download&id=${match[1]}`;
    }
  }
  return url;
}

// Declaración global para evitar errores de TypeScript con la API de YouTube
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

// Extractor universal de IDs de YouTube
function parseYouTubeId(url: string | undefined): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2] && match[2].length === 11) {
    return match[2];
  }
  return null;
}

// ==========================================
// REPRODUCTOR DE VIDEO UNIVERSAL (YOUTUBE / NATIVO)
// ==========================================
function UniversalVideoPlayer({ 
  url, 
  title, 
  onEnded,
  hasUserInteracted, // <-- Recibe el estado de interacción de la página
  durationMs = 35000
}: { 
  url: string; 
  title: string; 
  onEnded?: () => void;
  hasUserInteracted: boolean;
  durationMs?: number;
}) {
  const [useIframe, setUseIframe] = useState(false);
  
  // El estado inicial del mute dependerá de si el usuario ya hizo clic en la web o no
  const [isMuted, setIsMuted] = useState(!hasUserInteracted);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const youtubeId = parseYouTubeId(url);
  const isYoutube = !!youtubeId;
  const ytPlayerRef = useRef<any>(null);
  const [ytPlayerReady, setYtPlayerReady] = useState(false);

  // 1. DETECCIÓN DE SCROLL: Intersection Observer (Autoplay dinámico)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.15 } // Se activa cuando el 15% del reproductor es visible
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // 2. REACCIÓN AL CLIC LEGAL: Si el usuario interactúa con la web, desmuteamos en tiempo real
  useEffect(() => {
    if (hasUserInteracted) {
      setIsMuted(false);
      if (isYoutube && ytPlayerRef.current && ytPlayerReady) {
        try { ytPlayerRef.current.unMute(); } catch (e) {}
      } else if (videoRef.current) {
        videoRef.current.muted = false;
      }
    }
  }, [hasUserInteracted, ytPlayerReady, isYoutube]);

  // 2b. CARGA DE VIDEO NATIVO: Se ejecuta únicamente al cambiar la URL del recurso nativo
  useEffect(() => {
    if (!isYoutube && !useIframe && videoRef.current) {
      videoRef.current.load();
    }
  }, [url, isYoutube, useIframe]);

  // 3. CONTROL DE REPRODUCCIÓN NATIVO BASADO EN EL SCROLL (PLAY/PAUSA SIN REINICIAR)
  useEffect(() => {
    if (!isYoutube && !useIframe && videoRef.current) {
      if (isIntersecting) {
        videoRef.current.muted = isMuted;
        videoRef.current.play().catch(err => {
          console.log("Autoplay bloqueado con sonido, reintentando mutiado de respaldo:", err);
          videoRef.current!.muted = true;
          setIsMuted(true);
          videoRef.current!.play().catch(e => console.error(e));
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isIntersecting, isYoutube, useIframe, isMuted]);

  // Resetear estados al cambiar de slide
  useEffect(() => {
    setUseIframe(false);
    setIsMuted(!hasUserInteracted);
    setYtPlayerReady(false);
  }, [url, hasUserInteracted]);

  // 4. CONTROL DE API DE YOUTUBE: Inicialización estable una sola vez por recurso
  useEffect(() => {
    if (!isYoutube) return;

    let active = true;
    let player: any = null;

    const initPlayer = () => {
      if (!active) return;
      try {
        const targetId = `yt-player-${youtubeId}`;
        player = new window.YT.Player(targetId, {
          height: '100%',
          width: '100%',
          videoId: youtubeId,
          playerVars: {
            autoplay: isIntersecting ? 1 : 0,
            mute: isMuted ? 1 : 0, // Configuración inicial inteligente basada en el clic legal
            controls: 1,
            rel: 0,
            showinfo: 0,
            modestbranding: 1,
            playsinline: 1,
            vq: 'hd1080' // Sugiere calidad Full HD desde las variables de carga
          },
          events: {
            onReady: (event: any) => {
              if (!active) return;
              setYtPlayerReady(true);
              
              // Forzar calidad máxima sugerida a 1080p mediante software API
              if (event.target.setPlaybackQuality) {
                event.target.setPlaybackQuality('hd1080');
              }
              
              // Aplicar estado de audio inicial explícito
              if (isMuted) {
                event.target.mute();
              } else {
                event.target.unMute();
              }

              // Aplicar estado de reproducción inicial basado en visibilidad actual
              if (isIntersecting) {
                event.target.playVideo();
              } else {
                event.target.pauseVideo();
              }
            },
            onStateChange: (event: any) => {
              if (!active) return;
              // Detecta de forma estricta que el video de YouTube terminó (State 0 = ENDED)
              if (event.data === window.YT.PlayerState.ENDED && onEnded) {
                onEnded(); // Envía la orden al carrusel para avanzar de slide
              }
            }
          }
        });
        ytPlayerRef.current = player;
      } catch (err) {
        console.error("Error al instanciar la API de YouTube:", err);
      }
    };

    // Carga perezosa de los scripts de YouTube
    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
      }
      const interval = setInterval(() => {
        if (window.YT && window.YT.Player) {
          clearInterval(interval);
          initPlayer();
        }
      }, 100);
      return () => {
        clearInterval(interval);
        active = false;
        if (player && typeof player.destroy === 'function') {
          player.destroy();
        }
        setYtPlayerReady(false);
      };
    }

    return () => {
      active = false;
      if (player && typeof player.destroy === 'function') {
        player.destroy();
      }
      setYtPlayerReady(false);
    };
  }, [url, youtubeId]); // Excluido 'isIntersecting' para evitar re-instanciación del iframe al hacer scroll

  // 4b. CONTROL DE REPRODUCCIÓN RECONECTADO DE YOUTUBE: Play/Pausa al hacer Scroll
  useEffect(() => {
    if (isYoutube && ytPlayerRef.current && ytPlayerReady) {
      try {
        if (isIntersecting) {
          ytPlayerRef.current.playVideo();
        } else {
          ytPlayerRef.current.pauseVideo();
        }
      } catch (e) {
        console.warn("Error al controlar reproducción de YouTube por visibilidad:", e);
      }
    }
  }, [isIntersecting, ytPlayerReady, isYoutube]);

  // Manejador del botón manual de Mute/Unmute
  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuteState = !isMuted;
    setIsMuted(nextMuteState);

    if (isYoutube && ytPlayerRef.current && ytPlayerReady) {
      if (nextMuteState) ytPlayerRef.current.mute();
      else ytPlayerRef.current.unMute();
    } else if (videoRef.current) {
      videoRef.current.muted = nextMuteState;
    }
  };

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full bg-black rounded-[24px] overflow-hidden">
      {isYoutube ? (
        <div className="absolute inset-0 w-full h-full">
          <div id={`yt-player-${youtubeId}`} className="absolute inset-0 w-full h-full object-cover rounded-[24px]" />
          <button onClick={handleToggleMute} className="absolute bottom-16 left-4 bg-black/75 backdrop-blur-md px-3.5 py-2 rounded-full text-white z-20 text-xs flex items-center gap-1.5 cursor-pointer select-none">
            {isMuted ? <VolumeX className="w-4 h-4 text-[#FFD100]" /> : <Volume2 className="w-4 h-4 text-green-400" />}
            <span className="font-extrabold uppercase text-[10px]">{isMuted ? "Activar Sonido" : "Silenciar"}</span>
          </button>
        </div>
      ) : (
        <div className="absolute inset-0 w-full h-full">
          <video ref={videoRef} src={url} autoPlay={isIntersecting} muted={isMuted} playsInline controls className="absolute inset-0 w-full h-full object-cover rounded-[24px]" onEnded={onEnded} />
          <button onClick={handleToggleMute} className="absolute bottom-16 left-4 bg-black/75 backdrop-blur-md px-3.5 py-2 rounded-full text-white z-20 text-xs flex items-center gap-1.5 cursor-pointer">
            {isMuted ? <VolumeX className="w-4 h-4 text-[#FFD100]" /> : <Volume2 className="w-4 h-4 text-green-400" />}
            <span className="font-extrabold uppercase text-[10px]">{isMuted ? "Activar Sonido" : "Silenciar"}</span>
          </button>
        </div>
      )}
    </div>
  );
}

interface PhotoGalleryProps {
  onOpenLeadPopup: () => void;
}

// ==========================================
// COMPONENTE DE LA GALERÍA PRINCIPAL
// ==========================================
export default function PhotoGallery({ onOpenLeadPopup }: PhotoGalleryProps) {
  
  // 📥 ESTADO GLOBAL DE INTERACCIÓN HUMANA
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  useEffect(() => {
    const handleGlobalClick = () => {
      setHasUserInteracted(true);
      // Una vez validado el primer clic real, removemos el listener para limpiar memoria
      document.removeEventListener('click', handleGlobalClick);
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  // Tu lista de slides integrada con tus enlaces limpios de YouTube
  const slides = [
    { id: 1, title: 'Proyecto Las Bugambilias de San Isidro - La Joya', tag: 'Lotes Disponibles', videoUrl: 'https://www.youtube.com/watch?v=5jCMD-j5x6E', type: 'video' },
    { id: 2, title: 'Garantía INNOVA', tag: 'Confianza y Garantía', imageUrl: 'https://drive.google.com/file/d/1J0OOJ4y05WwODpToofSsimdrXHMRWcJm/view?usp=sharing', type: 'image' },
    { id: 3, title: 'Asesoramiento personalizado', tag: 'Asesoramiento Personalizado', imageUrl: 'https://drive.google.com/file/d/1H_EEFrPDSV2VeXW641c6AX_HmhQMwbZj/view?usp=drive_link', type: 'image' },
    { id: 4, title: '+16,000 m2 áreas verdes', tag: '+16,000 m2 áreas verdes', videoUrl: 'https://www.youtube.com/watch?v=wn5bxBV4sRp', type: 'video' }, // Ejemplo futuro de YT
    { id: 5, title: 'Ingreso señalizado', tag: 'Ingreso Señalizado', imageUrl: 'https://drive.google.com/file/d/16OrnQY4ZUyNW3Xgq2rk5xfglbGGA0-o0/view?usp=drive_link', type: 'image' },
    { id: 6, title: 'Áreas de juego', tag: 'separa tu lote hoy!', imageUrl: 'https://drive.google.com/file/d/1HjcGwfzD4U1ftx9YkuWqHnUyo1H6NO9h/view?usp=drive_link', type: 'image' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // CONTROL DEL CARRUSEL: El temporizador solo corre si el slide actual NO es un video
  useEffect(() => {
    if (slides[currentIndex].type === 'video') return; 

    const timer = setInterval(() => {
      handleNext();
    }, 6000); // 6 segundos para slides de imágenes
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
          <div className="lg:col-span-8 space-y-10">
            
            <div className="text-center md:text-left space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-[#FFD100] bg-white/10 px-3 py-1 rounded-full border border-white/15">
                conoce nuestro proyecto
              </span>
              <h2 className="font-sans font-black text-3xl md:text-4xl text-white uppercase mt-2">
                Galería de Fotos y Videos
              </h2>
              <div className="w-16 h-1 bg-[#FFD100] md:mx-0 mx-auto rounded-full mt-2"></div>
            </div>

            <div className="relative w-full bg-neutral-900 rounded-[24px] overflow-hidden shadow-2xl h-[340px] xs:h-[400px] md:h-[550px]">
              <AnimatePresence mode="wait">
                {slides[currentIndex].type === 'video' ? (
                  <motion.div key={`video-${currentIndex}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 w-full h-full">
                    <UniversalVideoPlayer
                      url={slides[currentIndex].videoUrl || ''}
                      title={slides[currentIndex].title}
                      onEnded={handleNext} // Avanza al terminar el video
                      hasUserInteracted={hasUserInteracted} // Transmite el permiso de audio en vivo
                    />
                  </motion.div>
                ) : (
                  <motion.img key={currentIndex} src={getGoogleDriveImageUrl(slides[currentIndex].imageUrl)} alt={slides[currentIndex].title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 w-full h-full object-cover" />
                )}
              </AnimatePresence>

              {/* Capas estéticas y textos informativos */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/60 via-transparent to-[#000000]/30 pointer-events-none" />

              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-mono font-extrabold text-white z-10">
                <span>{currentIndex + 1}</span><span className="opacity-50 mx-1">/</span><span>{slides.length}</span>
              </div>

              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-full text-[12px] font-extrabold text-white uppercase flex items-center gap-2 border border-white/30 z-10">
                <Camera className="w-4 h-4 text-[#FFD100]" />
                <span>{slides[currentIndex].tag}</span>
              </div>

              {/* Botones Manuales de Navegación */}
              <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all duration-200 z-10 cursor-pointer">
                <ChevronLeft className="w-6 h-6 stroke-[3px]" />
              </button>
              <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all duration-200 z-10 cursor-pointer">
                <ChevronRight className="w-6 h-6 stroke-[3px]" />
              </button>
            </div>

            {/* Banner de llamada a la acción */}
            <div className="relative w-full mt-8">
              <div className="absolute top-[-9px] left-14 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-white z-10" />
              <div className="bg-white text-neutral-900 p-6 md:p-8 rounded-[24px] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5 relative border border-neutral-100">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-sm font-sans font-black uppercase text-[#D2007A] block tracking-wide">¿TE GUSTÓ EL PROYECTO?</span>
                  <p className="font-sans font-extrabold text-[#111111] text-base md:text-lg leading-snug">
                    ¡Coordina tu visita guiada hoy!<br />
                    <span className="text-xs md:text-sm font-bold text-neutral-600 block mt-1">Aprovecha que sólo por esta semana es SIN COSTO</span>
                  </p>
                </div>
                <button onClick={onOpenLeadPopup} className="px-7 py-3.5 bg-[#FFD100] hover:bg-amber-400 text-neutral-900 font-black text-sm rounded-full flex items-center gap-2 shadow-md transition-all duration-300 transform active:scale-95 cursor-pointer">
                  <span className="uppercase tracking-wider">Coordina tu visita</span>
                  <ArrowRight className="w-4 h-4 stroke-[3px]" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}