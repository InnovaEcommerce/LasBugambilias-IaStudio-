import { Check, Smartphone, Laptop } from 'lucide-react';

export default function AppPromo() {
  const bulletLines = [
    'Consulta el estado de tu financiamiento.',
    'Calcula tus cuotas en el simulador prepago.',
    'Revisa tus estados de cuenta al instante.',
  ];

  return (
    <section className="bg-[#D2007A] text-white py-14 md:py-20 overflow-hidden relative">
      
      {/* Decorative backdrop graphics */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-[#9E005B] rounded-3xl border border-white/10 p-6 md:p-10 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Left Block: Phone mock representation of Vecino Centenario */}
          <div className="w-full lg:w-1/2 flex justify-center shrink-0">
            <div className="relative w-64 md:w-72 aspect-[9/18] bg-[#1E1E24] rounded-[44px] p-3 shadow-2xl border-4 border-neutral-700 font-sans text-neutral-800 flex flex-col overflow-hidden">
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-4.5 bg-neutral-900 rounded-full z-20 flex items-center justify-center">
                {/* Simulated notch */}
                <span className="w-3 h-3 bg-neutral-950 rounded-full"></span>
                <span className="w-10 h-1 bg-neutral-800 rounded mx-3"></span>
              </div>

              {/* Viewport screen */}
              <div className="flex-1 bg-[#121214] rounded-[36px] overflow-hidden p-4 relative flex flex-col justify-between font-sans">
                
                {/* Simulated Header */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex flex-col text-white text-left font-sans">
                    <span className="text-[9px] uppercase font-bold text-pink-400 font-mono">Panel Mi Lote</span>
                    <span className="text-xs font-display font-black leading-none mt-0.5 tracking-tight font-sans">VECINO INNOVA</span>
                  </div>
                  <Smartphone className="w-4 h-4 text-[#FFD100]" />
                </div>

                {/* Simulated Active balance Card */}
                <div className="bg-white p-4 rounded-2xl space-y-3 shadow-lg">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-neutral-500 font-mono text-[9px] font-bold">MI FINANCIAMIENTO</span>
                    <span className="bg-pink-55 text-[#D2007A] text-[8px] font-black px-1.5 py-0.5 rounded uppercase">
                      Al día
                    </span>
                  </div>

                  <div className="space-y-0.5 text-left">
                    <span className="text-[9px] text-neutral-400 block font-mono">CREDITO DIRECTO ACTIVADO</span>
                    <span className="text-lg font-display font-black text-neutral-900 font-mono block">S/ 6,990</span>
                  </div>

                  {/* Meter graph progress bar */}
                  <div className="space-y-1">
                    <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#D2007A] h-full w-[60%]"></div>
                    </div>
                    <div className="flex justify-between text-[8px] text-neutral-450 font-mono">
                      <span>Pagado 60%</span>
                      <span>Restante 40%</span>
                    </div>
                  </div>
                </div>

                {/* Lower Action options list */}
                <div className="space-y-2 text-xs">
                  <div className="p-2 bg-neutral-900/80 border border-neutral-800 text-white font-semibold rounded-xl flex items-center justify-between">
                    <span className="text-[10px]">Simular Prepago</span>
                    <span className="text-[8px] text-[#FFD100] font-black">PROBAR</span>
                  </div>
                  <div className="p-2 bg-neutral-900/80 border border-neutral-800 text-white font-semibold rounded-xl flex items-center justify-between">
                    <span className="text-[10px]">Estados de Cuenta</span>
                    <span className="text-[8px] text-neutral-400 font-mono">PDF</span>
                  </div>
                </div>

                {/* Device indicator bar */}
                <div className="w-20 h-1 bg-white/30 mx-auto rounded-full mt-1"></div>
              </div>
            </div>
          </div>

          {/* Right descriptions columns block matching Image 10 */}
          <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left relative z-10 font-sans">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FFD100] bg-[#5C0035] px-3.5 py-1 rounded-full border border-white/10 font-mono">
              Mi Portal de Propietario
            </span>

            <div className="space-y-3">
              <h2 className="font-display font-black text-2xl md:text-3xl text-white tracking-tight leading-none uppercase">
                NUEVA APP VECINO INNOVA
              </h2>
              <p className="font-sans font-bold text-base text-[#FFD100] leading-snug">
                Revisa la información de tu lote al instante, de forma segura y mucho más...
              </p>
            </div>

            {/* Checked Bullets layout matching Image 10 (white checks in circles) */}
            <ul className="space-y-3.5">
              {bulletLines.map((line, idx) => (
                <li key={idx} className="flex gap-3 text-left">
                  <div className="w-5 h-5 rounded-full bg-white text-[#D2007A] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Check className="w-3.5 h-3.5 stroke-[4px]" />
                  </div>
                  <span className="text-sm text-neutral-100 leading-snug">
                    {line}
                  </span>
                </li>
              ))}
            </ul>

            {/* Apple Store and Google Play Badges Removed */}

          </div>

        </div>
      </div>
    </section>
  );
}
