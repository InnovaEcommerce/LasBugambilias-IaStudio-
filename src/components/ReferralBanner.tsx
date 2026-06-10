import { Megaphone, Award } from 'lucide-react';

interface ReferralBannerProps {
  onOpenWithPlan: (details: string) => void;
}

export default function ReferralBanner({ onOpenWithPlan }: ReferralBannerProps) {
  const handleAction = () => {
    onOpenWithPlan('Programa de Refiere y Gana - Solicitud de inscripción');
  };

  return (
    <section id="refiere" className="bg-white py-14 md:py-20 font-sans relative overflow-hidden">
      
      {/* Decorative backdrop gradients */}
      <div className="absolute top-1/2 -right-48 w-96 h-96 bg-pink-50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Core content arrangement based on Image 9 */}
        <div className="bg-[#FAF9F6] rounded-[32px] border border-neutral-200 p-6 md:p-10 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden text-neutral-800">
          
          {/* Left Block matching Image 9 Layout */}
          <div className="space-y-5 lg:max-w-xl text-center lg:text-left relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D2007A] font-mono bg-white border border-pink-100 px-3 py-1 rounded-full block w-max mx-auto lg:mx-0">
              Programa de Recompensas
            </span>

            <h2 className="font-display font-black text-2xl md:text-3xl text-neutral-900 tracking-tight leading-none uppercase font-sans">
              REFIERE Y GANA CON <span className="text-[#D2007A]">INNOVA</span>
            </h2>

            <p className="text-neutral-600 text-xs md:text-sm leading-relaxed font-semibold">
              Si eres propietario o copropietario de un lote con Innova, refiere a familiares y/o amigos. Registra sus datos y si compran, podrás ganar una <span className="text-[#D2007A] font-black">Tarjeta Visa Compras con un saldo de S/1,000</span> para comprar lo que desees. No hay límites en la cantidad de referidos.
            </p>

            <div className="flex justify-center lg:justify-start pt-2">
              <button
                onClick={handleAction}
                className="px-8 py-3.5 bg-[#FFD100] hover:bg-amber-400 text-[#D2007A] font-black text-xs uppercase tracking-wider rounded-full shadow-md cursor-pointer transition-all duration-200 transform active:scale-95 flex items-center gap-1.5"
              >
                <Award className="w-4 h-4 text-[#D2007A]" />
                <span>¿Cómo lo hago?</span>
              </button>
            </div>
          </div>

          {/* Right graphics represent Megaphone and big yellow/orange speech bubble (Image 9 style) */}
          <div className="relative w-72 h-64 shrink-0 flex items-center justify-center">
            
            {/* Ambient gold background circle representing lightburst */}
            <div className="absolute inset-0 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

            {/* Megaphone vector overlay on left */}
            <div className="absolute left-[-20px] bottom-4 z-20 text-[#D2007A] bg-white p-3.5 rounded-full shadow-lg border border-neutral-100 transform -rotate-12 select-none">
              <Megaphone className="w-10 h-10 text-[#D2007A] stroke-[2.5px]" />
            </div>

            {/* Big speech bubble circle matching Image 9 */}
            <div className="w-52 h-52 rounded-full bg-gradient-to-tr from-[#FF7A00] to-[#FFD100] border-8 border-white shadow-2xl flex flex-col items-center justify-center text-center text-neutral-900 font-sans relative overflow-hidden select-none z-10">
              <div className="space-y-1 p-2">
                <span className="text-[10px] tracking-widest font-black text-[#D2007A] uppercase font-mono leading-none block">
                  GANA HASTA
                </span>
                <div className="font-display font-black text-3xl md:text-4xl text-neutral-950 tracking-tighter leading-none mt-1 font-sans">
                  S/1,000
                </div>
                <p className="text-[10px] uppercase font-mono font-bold text-neutral-800 tracking-wide mt-2 max-w-[125px] mx-auto leading-tight">
                  Saldo Tarjeta Visa por Compra
                </p>
              </div>
            </div>

            {/* Small floating red/pink circles with S/ (Image 9 style) */}
            <div className="absolute top-2 right-12 w-9 h-9 rounded-full bg-[#D2007A] border-2 border-white shadow-md flex items-center justify-center text-white font-sans font-extrabold text-xs select-none z-20 transform rotate-12">
              S/
            </div>
            <div className="absolute bottom-1 right-6 w-7 h-7 rounded-full bg-[#D2007A] border-2 border-white shadow-md flex items-center justify-center text-white font-sans font-extrabold text-[10px] select-none z-20 transform -rotate-12">
              S/
            </div>
            <div className="absolute top-24 left-[-15px] w-8 h-8 rounded-full bg-[#D2007A] border-2 border-white shadow-md flex items-center justify-center text-white font-sans font-extrabold text-[11px] select-none z-20 transform rotate-45">
              S/
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
