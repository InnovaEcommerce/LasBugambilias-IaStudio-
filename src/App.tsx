import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SubHeroBar from './components/SubHeroBar';
import TabsAndDescription from './components/TabsAndDescription';
import PhotoGallery from './components/PhotoGallery';
import TerrainSelector from './components/TerrainSelector';
import FinancingCalculator from './components/FinancingCalculator';
import BackupAndHistory from './components/BackupAndHistory';

import Testimonials from './components/Testimonials';
import ReferralBanner from './components/ReferralBanner';
import AppPromo from './components/AppPromo';
import WhatsAppBubble from './components/WhatsAppBubble';
import Footer from './components/Footer';
import { LeadPopup, ExitIntentPopup, SuccessPopup, SocialProofToasts } from './components/Popups';
import { Lead } from './types';
import LeadCard from './components/LeadCard';
import AdminPanel from './components/AdminPanel';

export default function App() {
  // Simple internal route detection based on current URL path
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);



  const isAdminRoute = currentPath.endsWith('/0000000001') || currentPath.endsWith('/0000000001/');

  // Popups visibility states
  const [isLeadPopupOpen, setIsLeadPopupOpen] = useState(false);
  const [prefilledComment, setPrefilledComment] = useState<string | undefined>(undefined);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<Lead | null>(null);

  // Floating sticky scroll positions state
  const [scrollState, setScrollState] = useState<'inline' | 'floating' | 'docked'>('inline');

  useEffect(() => {
    const handleScroll = () => {
      const track = document.getElementById('main-scroll-track');
      if (!track) return;

      const trackRect = track.getBoundingClientRect();
      const scrollY = window.scrollY;

      // Absolute top on inline is 748px. Floating top is 96px.
      // Transition is seamless when scroll reaches exactly 748 - 96 = 652px
      const scrollThreshold = 652; 

      // Dock precisely when the bottom of track (end of calculator) is near the card's viewport bottom
      // Card height is approx. 620px, plus 96px floating top + 40px margin = 756px
      const dockThreshold = 756;

      if (trackRect.bottom <= dockThreshold) {
        setScrollState('docked');
      } else if (scrollY >= scrollThreshold) {
        setScrollState('floating');
      } else {
        setScrollState('inline');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Success form handler callback
  const handleLeadSubmitSuccess = (lead: Lead) => {
    setSubmittedLead(lead);
    setIsLeadPopupOpen(false);
    setIsSuccessPopupOpen(true);
  };

  // Open popup triggered with custom note / plans
  const handleOpenPopupWithDetails = (details: string) => {
    // Determine context to set initial comment
    const commentStr = details.toUpperCase().includes('MZ') || details.toUpperCase().includes('LOTE')
      ? `Deseo recibir información y reservar el lote: ${details}`
      : `Deseo recibir información sobre el plan: ${details}`;
    setPrefilledComment(commentStr);
    setIsLeadPopupOpen(true);
  };

  // Click handler from header or general CTA
  const handleOpenGeneralPopup = () => {
    setPrefilledComment(undefined);
    setIsLeadPopupOpen(true);
  };

  if (isAdminRoute) {
    return <AdminPanel />;
  }

  return (
    <div className="min-h-screen bg-[#fafafa] selection:bg-centenario-magenta selection:text-white flex flex-col justify-between overflow-x-hidden">
      
      {/* 1. Header Navigation */}
      <Header
        onOpenLeadPopup={handleOpenGeneralPopup}
      />

      {/* 2. Page visual layout structures */}
      <main className="flex-1">
        
        {/* Scroll tracker container layout wraps from Hero to TerrainSelector */}
        <div id="main-scroll-track" className="relative">
          
          {/* Hero Banner with Multi-step Form overlay space */}
          <Hero
            onOpenLeadPopup={handleOpenGeneralPopup}
            onSubmitSuccess={handleLeadSubmitSuccess}
          />

          {/* Alameda del Sol Location-Financing Highlights tracker */}
          <SubHeroBar />

          {/* Multi-tier Navigation Tabs & Narrative Descriptions */}
          <TabsAndDescription onOpenLead={handleOpenGeneralPopup} />

          {/* Visual Premium Image Carousels */}
          <PhotoGallery onOpenLeadPopup={handleOpenGeneralPopup} />

          {/* Interactive Lots Selector Map visual representation */}
          <TerrainSelector onOpenWithLot={handleOpenPopupWithDetails} />

          {/* Financing options panels & Projected Mortgage calculator */}
          <FinancingCalculator onOpenWithPlan={handleOpenPopupWithDetails} />

          {/* Desktop Master Lead Card that floats along scroll track */}
          <div 
            className={`hidden lg:block transition-all duration-300 ${
              scrollState === 'inline' 
                ? 'absolute top-[748px] right-4 xl:right-[calc((100vw-1280px)/2+24px)] w-full max-w-sm z-30 animate-none'
                : scrollState === 'floating'
                ? 'fixed top-[96px] right-4 xl:right-[calc((100vw-1280px)/2+24px)] w-full max-w-sm z-40'
                : 'absolute bottom-[40px] right-4 xl:right-[calc((100vw-1280px)/2+24px)] w-full max-w-sm z-30 animate-none'
            }`}
          >
            <LeadCard 
              onSubmitSuccess={handleLeadSubmitSuccess}
            />
          </div>

        </div>

        {/* Corporate stats summary under Centenario Brand */}
        <BackupAndHistory />



        {/* User reviews sliding layout (CENTEGENTE) */}
        <Testimonials />

        {/* Loyalty Program panel */}
        <ReferralBanner onOpenWithPlan={handleOpenPopupWithDetails} />

        {/* Vecino Centenario app promo block */}
        <div id="app">
          <AppPromo />
        </div>

      </main>

      {/* 3. Footer element with Libro de Reclamaciones */}
      <Footer />

      {/* 4. Floating Action WhatsApp bubble widget */}
      <WhatsAppBubble />

      {/* 5. Smart popup triggers */}
      
      {/* Global standard / lote prefilled capture form popup */}
      <LeadPopup
        isOpen={isLeadPopupOpen}
        onClose={() => setIsLeadPopupOpen(false)}
        onSubmitSuccess={handleLeadSubmitSuccess}
        initialComment={prefilledComment}
      />

      {/* Hidden button with unique ID used by Exit-Intent Popup to open form */}
      <button
        id="demo-register-button-popup"
        onClick={handleOpenGeneralPopup}
        className="hidden"
        aria-hidden="true"
      />

      {/* Exit Intent Tracker overlay prompt */}
      <ExitIntentPopup onSubmitSuccess={handleLeadSubmitSuccess} />

      {/* Form Submission Success confirmation window overlay */}
      <SuccessPopup
        isOpen={isSuccessPopupOpen}
        onClose={() => setIsSuccessPopupOpen(false)}
        leadDetails={submittedLead}
      />

      {/* Sequential timed social proof conversion notifications */}
      <SocialProofToasts onOpenLeadPopup={handleOpenGeneralPopup} />

    </div>
  );
}
