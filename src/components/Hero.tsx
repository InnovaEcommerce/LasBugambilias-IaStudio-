import { ShieldCheck, Check, MapPin } from 'lucide-react';
import { Lead } from '../types';
import LeadCard from './LeadCard';
import { useDynamicImages } from '../hooks/useDynamicImages';

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
          src={images.heroBanner}
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
                <span className="text-lg md:text-xl font-display font-extrabold uppercase tracking-widest text-white leading-none">
                  COMPRA
                </span>
                <span className="text-3xl md:text-5xl font-display font-black uppercase text-[#FFD100] mt-1.5 tracking-tight leading-none font-sans">
                  100% SEGURA
                </span>
                <span className="text-sm md:text-lg font-sans font-semibold text-white mt-2 leading-none">
                  1ra ETAPA
                </span>
              </div>

              {/* Overlapping Yellow Circle */}
              <div className="absolute right-[-94px] top-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-[#FFD100] border-4 border-white shadow-2xl flex flex-col items-center justify-center text-center font-sans z-20 scale-[1.05] transition-transform hover:scale-110 duration-200">
                <span className="text-sm font-display font-black text-[#D2007A] leading-[1.1] uppercase font-sans">
                  Crédito
                </span>
                <span className="text-sm font-display font-black text-[#D2007A] leading-[1.1] uppercase font-sans">
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
            src={images.heroBanner}
            alt="Residencial Las Bugambilias en La Joya Arequipa"
            className="w-full h-full object-cover select-none object-center"
          />
          <div className="absolute inset-0 bg-neutral-950/15" />

          {/* Floating safety badge (Scaled cleanly for mobile screens) */}
          <div className="absolute top-4 left-4 flex items-center select-none">
            
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
            <div className="absolute left-[112px] w-18 h-18 rounded-full bg-[#FFD100] border border-white shadow-xl flex flex-col items-center justify-center text-center font-sans z-20">
              <span className="text-[9.5px] font-sans font-black text-[#D2007A] leading-[1.1] uppercase leading-none">
                Crédito
              </span>
              <span className="text-[9.5px] font-sans font-black text-[#D2007A] leading-[1.1] uppercase leading-none">
                directo
              </span>
            </div>

          </div>

          {/* Images label Bottom-Left */}
          <span className="absolute bottom-3 left-4 text-[9px] font-bold text-white/90 leading-none select-none drop-shadow-md bg-black/35 px-2 py-1 rounded">
            Imágenes referenciales Hornos
          </span>
        </div>

        {/* B. Horizontal white information capsule matching Image 2 exactly */}
        <div className="mx-4 -mt-4.5 relative z-20 bg-white border border-neutral-150 py-3.5 px-4.5 rounded-full shadow-md flex items-center justify-between text-neutral-800">
          
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
        <div className="-mt-3.5 flex justify-center relative z-20">
          <div className="bg-white px-4 py-2 rounded-full shadow-md border border-neutral-100 flex items-center gap-3">
            <span className="text-[9.5px] font-bold text-neutral-500 uppercase tracking-wider">
              Compartir
            </span>
            <div className="flex items-center gap-2">
              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-5.5 h-5.5 rounded-full bg-neutral-600 hover:bg-[#D2007A] flex items-center justify-center text-white transition-colors">
                <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current">
                  <path d="M14 13.5h2.5l1-3H14V8.6c0-.8.2-1.1 1-1.1h1.5V4.6a20 20 0 00-2.3-.1c-2.3 0-3.7 1.3-3.7 3.8v2.2H8v3h2.5v7h3.5v-7z"/>
                </svg>
              </a>
              {/* WhatsApp */}
              <a href="https://wa.me" target="_blank" rel="noopener noreferrer" className="w-5.5 h-5.5 rounded-full bg-neutral-600 hover:bg-[#D2007A] flex items-center justify-center text-white transition-colors">
                <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current">
                  <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.844.5 3.57 1.373 5.068L2.03 21.97l5.053-1.327c1.455.795 3.111 1.258 4.873 1.258a10.04 10.04 0 007.87-3.87 10.04 10.04 0 002.174-6.13c0-5.523-4.48-10.004-10.003-10.004zm5.83 14.155c-.244.686-1.201 1.252-1.666 1.309-.452.057-.9.278-2.91-.497-2.42-.932-3.95-3.374-4.072-3.535-.122-.16-.948-1.258-.948-2.398 0-1.14.596-1.7.808-1.921.21-.222.463-.278.618-.278.155 0 .31.006.442.012.138.006.326-.052.509.39.188.455.64 1.57.696 1.684.055.114.094.248.016.4-.078.156-.15.26-.294.434-.144.173-.304.385-.43.518-.14.144-.287.3-.122.585.166.284.736 1.213 1.58 1.966.864.773 1.59 1.012 1.895 1.164.304.152.48.128.663-.078.182-.206.786-.913.996-1.223.21-.31.42-.26.702-.155.282.105 1.785.84 2.095.996.31.155.514.23.58.344.067.114.067.66-.177 1.346z"/>
                </svg>
              </a>
              {/* Mail */}
              <a href="mailto:info@innova.com.pe" className="w-5.5 h-5.5 rounded-full bg-neutral-600 hover:bg-[#D2007A] flex items-center justify-center text-white transition-colors">
                <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-current" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none"/>
                  <polyline points="22,6 12,13 2,6" fill="none"/>
                </svg>
              </a>
              {/* Twitter / X */}
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-5.5 h-5.5 rounded-full bg-neutral-600 hover:bg-[#D2007A] flex items-center justify-center text-white transition-colors">
                <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
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
