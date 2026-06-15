import { ShieldCheck, Check, MapPin, Facebook, Instagram, Youtube, MessageCircle } from 'lucide-react';
import { Lead } from '../types';
import LeadCard from './LeadCard';
import { useDynamicImages, getGoogleDriveImageUrl } from '../hooks/useDynamicImages';

interface HeroProps {
  onSubmitSuccess: (lead: Lead) => void;
  onOpenLeadPopup: () => void;
}

export default function Hero({ onSubmitSuccess }: HeroProps) {
  const { images } = useDynamicImages();
  return (
    <div className="w-full">
      
      {/* ======================================================= */}
      {/* 1. DESKTOP-SPECIFIC HERO VIEW (Hidden on Mobile viewports) */}
      {/* ======================================================= */}
      <section className="hidden lg:flex relative w-full min-h-[640px] md:min-h-[720px] pt-[110px] pb-14 items-center overflow-hidden bg-neutral-900 font-sans">
        
        {/* Background drone photography */}
        <img
          src={getGoogleDriveImageUrl(images.heroBanner)}
          alt="Residencial Las Bugambilias en La Joya Arequipa"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover select-none object-center"
        />

        {/* Subtle overlay protecting contrast */}
        <div className="absolute inset-0 bg-neutral-950/20" />

        {/* Main layout container */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6 md:pt-10">
          
          {/* Left Area: Visual Safety Badge (Image 1) */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
            
            {/* COMPRA 100% SEGURA - Image 1 Badge */}
            <div className="relative flex items-center mb-4 select-none mr-24">
              
              {/* Red/pink container */}
              <div className="bg-[#D2007A] text-white px-8 py-5 rounded-[28px] shadow-2xl border-4 border-white/20 flex flex-col items-start pr-16 relative z-10">
                <span className="text-[23px] font-display font-extrabold uppercase tracking-widest text-white leading-none">
                  COMPRA
                </span>
                <span className="text-3xl md:text-5xl font-display font-black uppercase text-[#FFD100] mt-1.5 tracking-tight leading-none font-sans">
                  100% SEGURA
                </span>
                <span className="text-[22px] font-sans font-semibold text-white mt-2 leading-none">
                  1ra ETAPA
                </span>
              </div>

              {/* Overlapping Yellow Circle */}
              <div className="absolute right-[-69px] top-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-[#FFD100] border-4 border-white shadow-2xl flex flex-col items-center justify-center text-center font-sans z-20 scale-[1.05] transition-transform hover:scale-110 duration-200">
                <span 
                  style={{ fontSize: '17px', lineHeight: '17px' }}
                  className="font-display font-black text-[#D2007A] uppercase font-sans"
                >
                  Crédito
                </span>
                <span 
                  style={{ fontSize: '17px', lineHeight: '17px' }}
                  className="font-display font-black text-[#D2007A] uppercase font-sans"
                >
                  directo
                </span>
              </div>

            </div>

            {/* Subtitle / context description card and logo */}
            <div className="bg-black/60 backdrop-blur-md p-5 rounded-[20px] max-w-lg border border-white/10 shadow-lg text-white">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-[#FFD100]" />
                <span className="text-xs uppercase font-mono tracking-widest font-black text-[#FFD100]">
                  PROYECTO RESIDENCIAL
                </span>
              </div>
              <p className="text-xs md:text-sm leading-relaxed text-neutral-100">
                Inicia formalmente tu patrimonio en <strong className="text-[#FFD100]">Las Bugambilias - La Joya</strong>. Proyecta tu lote de terreno de manera segura, directa y ágil con el respaldo de INNOVA Inversiones.
              </p>
            </div>

          </div>

          {/* Right Area: Placeholder on desktop viewports to give grid spacing to the sticky floating form */}
          <div className="hidden lg:block lg:col-span-4 h-[620px] w-full max-w-sm" />

        </div>
      </section>

      {/* ======================================================= */}
      {/* 2. MOBILE-SPECIFIC HERO VIEW (Active on Mobile viewports) */}
      {/* ======================================================= */}
      <section className="block lg:hidden w-full bg-white pt-[64px] pb-0 font-sans">
        
        {/* A. Drone Visual Cover photo block with layout labels inside */}
        <div className="relative w-full h-[250px] xs:h-[280px] overflow-hidden bg-neutral-900 shadow-inner">
          <img
            src={getGoogleDriveImageUrl(images.heroBanner)}
            alt="Residencial Las Bugambilias en La Joya Arequipa"
            className="w-full h-full object-cover select-none object-center"
          />
          <div className="absolute inset-0 bg-neutral-950/15" />

          {/* Floating safety badge (Scaled cleanly for mobile screens) */}
          <div className="absolute top-[26px] left-4 flex items-center select-none">
            
            {/* Red container pill */}
            <div className="bg-[#D2007A] text-white pl-4 pr-10 py-3 rounded-2xl shadow-xl flex flex-col items-start relative z-10 border border-white/10">
              <span className="text-[9px] font-sans font-black uppercase tracking-wider text-pink-100 leading-none">
                COMPRA
              </span>
              <span className="text-lg font-sans font-black uppercase text-[#FFD100] mt-0.5 tracking-tight leading-none">
                100% SEGURA
              </span>
              <span className="text-[10px] font-sans font-bold text-white mt-1 leading-none">
                1ra ETAPA
              </span>
            </div>

            {/* Yellow circle overlapping */}
            <div className="absolute left-[157px] w-18 h-18 rounded-full bg-[#FFD100] border border-white shadow-xl flex flex-col items-center justify-center text-center font-sans z-20">
              <span className="text-[9.5px] font-sans font-black text-[#D2007A] leading-[1.1] uppercase leading-none">
                Crédito
              </span>
              <span className="text-[9.5px] font-sans font-black text-[#D2007A] leading-[1.1] uppercase leading-none">
                directo
              </span>
            </div>

          </div>

          {/* Images label Bottom-Left */}
          <span className="absolute bottom-[22px] left-4 text-[9px] font-bold text-white/90 leading-none select-none drop-shadow-md bg-black/35 px-2 py-1 rounded">
            Imágenes reales y referenciales
          </span>
        </div>

        {/* B. Horizontal white information capsule matching Image 2 exactly */}
        <div className="mx-4 -mt-4.5 relative z-20 bg-white py-3.5 px-4.5 rounded-full shadow-md flex items-center justify-between text-neutral-800">
          
          {/* Location display detail block */}
          <div className="flex items-center gap-1.5 xs:gap-2">
            <MapPin className="w-4 h-4 text-neutral-800 stroke-[3px]" />
            <span className="font-sans font-extrabold text-[10.5px] xs:text-[11.5px] text-neutral-800 uppercase tracking-tight">
              La Joya / Arequipa
            </span>
          </div>

          {/* Fine vertical light separator bar */}
          <div className="w-[1.5px] h-4 bg-neutral-200" />

          {/* Stage information indicator badge */}
          <div className="flex items-center gap-1.5 xs:gap-2">
            <div className="w-4 h-4 rounded-full border border-[#D2007A] flex items-center justify-center shrink-0 bg-white">
              <Check className="w-2.5 h-2.5 text-[#D2007A] stroke-[4.5px]" />
            </div>
            <span className="font-sans font-black text-[10.5px] xs:text-[11.5px] text-[#D2007A] uppercase tracking-tight">
              1ra ETAPA
            </span>
          </div>

        </div>

        {/* C. Solid brand Crimson Container bar matching Image 2 perfectly */}
        <div className="mx-4 mt-3 bg-[#D2007A] text-white py-4.5 px-5.5 rounded-2xl shadow-md flex items-center justify-between gap-4">
          <div className="flex flex-col text-left">
            <span className="text-[9px] uppercase font-bold text-pink-100 tracking-wider">
              Residencial
            </span>
            <span className="text-[17px] font-black text-white leading-none mt-1.5 tracking-tight uppercase">
              Las Bugambilias
            </span>
          </div>

          <div className="flex flex-col text-right shrink-0">
            <span className="text-[9px] uppercase font-bold text-pink-100 tracking-wider leading-none">
              Cuotas desde
            </span>
            <span className="text-xl font-black text-[#FFD100] mt-1.5 tracking-tight leading-none">
              S/199
            </span>
          </div>
        </div>

        {/* D. Overlapping floating Share Pill bar */}
        <div className="mt-[-4px] flex justify-center relative z-20">
          <div className="bg-white px-4 py-2 rounded-full shadow-md border border-neutral-100 flex items-center gap-3">
            <span className="text-[9.5px] font-bold text-neutral-500 uppercase tracking-wider">
              Compartir
            </span>
            <div className="flex items-center gap-2">
              {/* Facebook */}
              <a href="https://www.facebook.com/innovainversiones.oficial" target="_blank" rel="noopener noreferrer" className="w-5.5 h-5.5 rounded-full bg-neutral-600 hover:bg-[#D2007A] flex items-center justify-center text-white transition-colors cursor-pointer">
                <Facebook className="w-3 h-3" />
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/innovainversiones.oficial" target="_blank" rel="noopener noreferrer" className="w-5.5 h-5.5 rounded-full bg-neutral-600 hover:bg-[#D2007A] flex items-center justify-center text-white transition-colors cursor-pointer">
                <Instagram className="w-3 h-3" />
              </a>
              {/* Youtube */}
              <a href="https://www.youtube.com/@innovainversiones" target="_blank" rel="noopener noreferrer" className="w-5.5 h-5.5 rounded-full bg-neutral-600 hover:bg-[#D2007A] flex items-center justify-center text-white transition-colors cursor-pointer">
                <Youtube className="w-3 h-3" />
              </a>
              {/* WhatsApp */}
              <a href="https://api.whatsapp.com/send/?phone=51926289293&text=%C2%A1Hola%EF%BF%BD%21+INNOVA%2C+deseo+recibir+m%C3%A1s+informaci%C3%B3n+sobre+los+lotes+y+financiamientos+del+proyecto+Las+Bugambilias&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="w-5.5 h-5.5 rounded-full bg-neutral-600 hover:bg-[#D2007A] flex items-center justify-center text-white transition-colors cursor-pointer">
                <MessageCircle className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* E. Solid Crimson background enclosure preventing layout blend, staging yellow form */}
        <div className="bg-[#D2007A] px-4 pt-8 pb-14 mt-6 rounded-b-[40px] shadow-sm">
          <div className="w-full max-w-sm mx-auto">
            <LeadCard 
              onSubmitSuccess={onSubmitSuccess}
            />
          </div>
        </div>

      </section>

    </div>
  );
}
