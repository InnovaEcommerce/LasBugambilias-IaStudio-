import React, { useState, useEffect } from 'react';
import { Check, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export default function SubHeroBar() {
  const [activeTab, setActiveTab] = useState('Información');

  const tabs = [
    { label: 'Información', href: '#proyecto' },
    { label: 'Galería', href: '#galeria' },
    { label: 'Elige tu lote', href: '#lotes-map' },
    { label: 'Mapa Entorno', href: '#mapa' },
    { label: 'Oficinas', href: '#oficinas' },
    { label: 'Financiamiento', href: '#financiamiento' },
  ];

  // Sync active tab based on scroll position or manual clicking
  const handleTabClick = (label: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setActiveTab(label);
    const targetId = e.currentTarget.getAttribute('href')?.substring(1);
    const element = document.getElementById(targetId || '');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full bg-white z-20 relative font-sans">
      
      {/* 1. Main Promotional Band Grid - Aligned with image (Hidden on Mobile, handled directly under Hero photo) */}
      <div className="hidden lg:block max-w-7xl mx-auto px-4 md:px-8 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Area (8 cols on desktop): Contains Red Banner & Status features side-by-side */}
          <div className="lg:col-span-8 flex flex-col sm:flex-row items-stretch gap-4">
            
            {/* Red Container Block (Left Side) */}
            <div className="flex-1 bg-[#D2007A] text-white py-4.5 px-6 md:px-8 rounded-3xl shadow-md flex items-center justify-between gap-6">
              
              {/* Left group */}
              <div className="flex flex-col text-left">
                <span className="text-[10px] tracking-[2px] uppercase font-bold text-pink-100">
                  Residencial
                </span>
                <h2 className="text-xl md:text-2xl font-black tracking-tight uppercase leading-none mt-1 font-sans">
                  Las Bugambilias
                </h2>
              </div>

              {/* Right group */}
              <div className="flex flex-col text-right shrink-0">
                <span className="text-[9px] uppercase font-bold text-pink-100 leading-none">
                  Cuotas desde
                </span>
                <span className="text-2xl md:text-3xl font-black text-[#FFD100] mt-1 tracking-tight leading-none font-sans">
                  S/199
                </span>
              </div>

            </div>

            {/* White Status & Location Block (Stacked vertically like image) */}
            <div className="w-full sm:w-[240px] flex flex-col justify-center gap-3.5 bg-white p-5 rounded-3xl border border-neutral-150 shadow-sm shrink-0">
              
              {/* Option 1: Nueva etapa in bold Red Accent with circled red check icon */}
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border border-[#D2007A] flex items-center justify-center shrink-0 bg-white">
                  <Check className="w-3 h-3 text-[#D2007A] stroke-[4px]" />
                </div>
                <div className="flex flex-col text-left">
                  <p className="font-sans font-black text-[13px] text-[#D2007A] leading-none uppercase">
                    1ra ETAPA
                  </p>
                </div>
              </div>

              {/* Option 2: Lima Norte / Carabayllo with map pin icon */}
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border border-neutral-800 flex items-center justify-center shrink-0 bg-white">
                  <MapPin className="w-3 h-3 text-neutral-800 stroke-[3px]" />
                </div>
                <div className="flex flex-col text-left">
                  <p className="font-sans font-black text-[13px] text-neutral-800 leading-none uppercase">
                    La Joya / Arequipa
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Right Area (4 cols on desktop): Empty space allowing desktop form to sit perfectly without overlay */}
          <div className="hidden lg:block lg:col-span-4" />

        </div>
      </div>

      {/* 2. Interactive Navigation Tabs Bar - Visual Grid Alignment */}
      <div className="w-full bg-[#FAF9F6] border-b border-neutral-200 sticky top-[68px] md:top-[80px] z-30 shadow-xs mt-4">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left aligned tabs matching image column alignment */}
            <div className="lg:col-span-8 flex gap-1 overflow-x-auto scrollbar-none py-1.5 items-center justify-start">
              {tabs.map((tab) => (
                <a
                  key={tab.label}
                  href={tab.href}
                  onClick={(e) => handleTabClick(tab.label, e)}
                  className={`px-3 py-3 font-sans font-extrabold text-[12px] md:text-[13px] uppercase tracking-wide transition-all duration-300 whitespace-nowrap cursor-pointer relative ${
                    activeTab === tab.label
                      ? 'text-[#D2007A]'
                      : 'text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.label && (
                    <motion.div
                      layoutId="activeTabSubBarIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#D2007A] rounded-t-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </div>

            {/* Empty right area aligned with LeadCard column */}
            <div className="hidden lg:block lg:col-span-4" />

          </div>
        </div>
      </div>

    </div>
  );
}
