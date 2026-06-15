import { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';

interface FinancingCalculatorProps {
  onOpenWithPlan: (planDetails: string) => void;
}

export default function FinancingCalculator({ onOpenWithPlan }: FinancingCalculatorProps) {
  // Simulator pricing params for direct financing
  const lotPrice = 7990;
  const [downPayment, setDownPayment] = useState(1998); // Starts with 25% of S/ 7,990 (S/ 1,998)
  const [months, setMonths] = useState(24); // Defaults to 24 months

  // Mortgage math computation (9.5% annual rate for direct financing)
  const calculateQuota = () => {
    const principal = lotPrice - downPayment;
    const monthlyRate = 0.095 / 12;
    const totalPayments = months;
    if (principal <= 0) return 0;
    
    const quota = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                  (Math.pow(1 + monthlyRate, totalPayments) - 1);
    
    return Math.round(quota);
  };

  const currentQuota = calculateQuota();

  const handleApplyPlan = () => {
    const planDetail = `Plan Financiado: Inicial S/${downPayment.toLocaleString('es-PE')}, ${months} meses, Cuota S/${currentQuota}/mes`;
    onOpenWithPlan(planDetail);
  };

  return (
    <section id="financiamiento" className="bg-[#D2007A] text-white py-14 md:py-20 scroll-mt-32 relative overflow-hidden font-sans">
      
      {/* Decorative backdrop glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: holds elements constrained to left */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Section Heading */}
            <div className="text-center md:text-left space-y-2 font-sans">
              <span className="text-xs font-black uppercase tracking-widest text-[#FFD100] bg-white/10 px-3 py-1 rounded-full border border-white/15">
                FACILIDADES DE PAGO
              </span>
              <h2 
                style={{ marginTop: '10px', marginLeft: '0px', marginBottom: '0px' }}
                className="font-sans font-black text-3xl md:text-4xl text-white tracking-tight leading-none uppercase"
              >
                Financia Tu LOTE hoy mismo
              </h2>
              <div className="w-16 h-1 bg-[#FFD100] md:mx-0 mx-auto rounded-full mt-2"></div>
            </div>

            {/* Combined Comparison Board */}
            <div className="relative group mt-16 text-left">
              
              {/* Centered circular yellow badge exactly matching Image 5 - shifted 20px to the right on Desktop/PC (297px margin-left) */}
              <div 
                style={{ marginLeft: '297px' }}
                className="absolute top-[-44px] left-1/2 -translate-x-1/2 md:left-14 md:translate-x-0 flex w-24 h-24 rounded-full bg-[#FFD100] border-4 border-[#D2007A] text-neutral-950 font-sans font-extrabold text-[11px] text-center items-center justify-center shadow-2xl uppercase leading-none z-25 select-none transition-transform hover:scale-105 duration-200"
              >
                <span 
                  style={{
                    fontSize: '13px',
                    paddingLeft: '0px',
                    paddingRight: '0px',
                    paddingTop: '10px',
                    lineHeight: '15px'
                  }}
                  className="text-[#D2007A] font-black text-center"
                >
                  Compra tu<br />lote<br />hoy
                </span>
              </div>

              <div className="bg-white rounded-[32px] overflow-hidden shadow-2xl text-neutral-800 border-none">
                
                {/* Top Comparative Columns - Image 5 Styling */}
                <div className="grid grid-cols-1 md:grid-cols-2">
                  
                  {/* Left Column Head: Intense Orange theme */}
                  <div className="bg-[#FF7A00] py-8 px-6 text-center text-white flex flex-col justify-center select-none relative">
                    <span className="text-sm font-sans font-bold uppercase tracking-wider text-white/90">
                      Lotes desde
                    </span>
                    <h3 className="font-sans font-black text-3xl md:text-4xl text-white mt-1.5 leading-none tracking-tight">
                      S/ 7,990
                    </h3>
                  </div>

                  {/* Right Column Head: Intense Yellow theme with red font */}
                  <div className="bg-[#FFD100] py-8 px-6 text-center text-[#D2007A] flex flex-col justify-center select-none relative">
                    <span className="text-sm font-sans font-bold uppercase tracking-wider text-[#D2007A]/90">
                      Al contado desde
                    </span>
                    <h3 className="font-sans font-black text-3xl md:text-4xl text-[#D2007A] mt-1.5 leading-none tracking-tight">
                      S/ 6,990
                    </h3>
                  </div>

                </div>

                {/* Bottom Combined Sheet with Dotted Row Dividers */}
                <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 md:gap-y-0 divide-y md:divide-y-0 md:divide-x divide-neutral-200 text-left">
                  
                  {/* Left Column Content - Financiado */}
                  <div className="space-y-0 pb-6 md:pb-0 font-sans">
                    
                    <div className="flex items-center gap-3.5 py-3 border-b border-dashed border-neutral-200">
                      <div className="w-5.5 h-5.5 rounded-full bg-[#D2007A] text-white flex items-center justify-center shrink-0 border border-transparent shadow-sm">
                        <Check className="w-3.5 h-3.5 stroke-[4px]" />
                      </div>
                      <span className="text-neutral-700 text-xs md:text-sm font-semibold">
                        Hasta <strong className="text-neutral-900 font-extrabold">24 meses para pagar</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-3.5 py-3 border-b border-dashed border-neutral-200">
                      <div className="w-5.5 h-5.5 rounded-full bg-[#D2007A] text-white flex items-center justify-center shrink-0 border border-transparent shadow-sm">
                        <Check className="w-3.5 h-3.5 stroke-[4px]" />
                      </div>
                      <span className="text-neutral-700 text-xs md:text-sm font-semibold">
                        Cuotas desde <strong className="text-neutral-900 font-extrabold">S/ 199</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-3.5 py-3 border-b border-dashed border-neutral-200">
                      <div className="w-5.5 h-5.5 rounded-full bg-[#D2007A] text-white flex items-center justify-center shrink-0 border border-transparent shadow-sm">
                        <Check className="w-3.5 h-3.5 stroke-[4px]" />
                      </div>
                      <span className="text-neutral-700 text-xs md:text-sm font-semibold">
                        Descuento y/o regalo por <strong className="text-neutral-900 font-extrabold">2 LOTES</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-3.5 py-3">
                      <div className="w-5.5 h-5.5 rounded-full bg-[#D2007A] text-white flex items-center justify-center shrink-0 border border-transparent shadow-sm">
                        <Check className="w-3.5 h-3.5 stroke-[4px]" />
                      </div>
                      <span className="text-neutral-700 text-xs md:text-sm font-semibold">
                        Crédito directo, sin bancos
                      </span>
                    </div>

                  </div>

                  {/* Right Column Content - Contado */}
                  <div className="space-y-0 pt-6 md:pt-0 md:pl-8 font-sans">
                    
                    <div className="flex items-center gap-3.5 py-3 border-b border-dashed border-neutral-200">
                      <div className="w-5.5 h-5.5 rounded-full bg-[#D2007A] text-white flex items-center justify-center shrink-0 border border-transparent shadow-sm">
                        <Check className="w-3.5 h-3.5 stroke-[4px]" />
                      </div>
                      <span className="text-neutral-700 text-xs md:text-sm font-semibold">
                        Compra 100% segura
                      </span>
                    </div>

                    <div className="flex items-center gap-3.5 py-3 border-b border-dashed border-neutral-200">
                      <div className="w-5.5 h-5.5 rounded-full bg-[#D2007A] text-white flex items-center justify-center shrink-0 border border-transparent shadow-sm">
                        <Check className="w-3.5 h-3.5 stroke-[4px]" />
                      </div>
                      <span className="text-neutral-700 text-xs md:text-sm font-semibold">
                        Sin evaluación crediticia
                      </span>
                    </div>

                    <div className="flex items-center gap-3.5 py-3 border-b border-dashed border-neutral-200">
                      <div className="w-5.5 h-5.5 rounded-full bg-[#D2007A] text-white flex items-center justify-center shrink-0 border border-transparent shadow-sm">
                        <Check className="w-3.5 h-3.5 stroke-[4px]" />
                      </div>
                      <span className="text-neutral-700 text-xs md:text-sm font-semibold">
                        Descuento al contado hasta <strong className="text-neutral-900 font-extrabold">S/ 1,000</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-3.5 py-3">
                      <div className="w-5.5 h-5.5 rounded-full bg-[#D2007A] text-white flex items-center justify-center shrink-0 border border-transparent shadow-sm">
                        <Check className="w-3.5 h-3.5 stroke-[4px]" />
                      </div>
                      <span className="text-neutral-700 text-xs md:text-sm font-semibold">
                        Respaldo de INNOVA Inversiones
                      </span>
                    </div>

                  </div>

                </div>

              </div>
            </div>

            {/* Dynamic Simulator Integration Box */}
            <div className="w-full bg-neutral-950/20 p-6 md:p-8 rounded-[32px] border border-white/10 mt-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-left">
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#FFD100] text-[#D2007A] text-[9px] font-black tracking-widest uppercase font-mono px-2 py-0.5 rounded">
                      Simulador
                    </span>
                    <h4 className="text-base font-sans font-black tracking-tight text-white uppercase">de Cuotas Mensuales</h4>
                  </div>
                  <p className="text-xs text-neutral-200 leading-relaxed">
                    Ajusta los deslizadores para proyectar la cuota de tu financiamiento según tu capacidad de cuota inicial.
                  </p>

                  <div className="space-y-4 pt-1">
                    {/* Cuota inicial */}
                    <div className="space-y-1">
                      <div className="flex justify-between font-mono text-[10px] font-bold text-neutral-300">
                        <span>CUOTA INICIAL (MÍN. S/ 1,998)</span>
                        <span className="text-[#FFD100] font-black">S/ {downPayment.toLocaleString('es-PE')}</span>
                      </div>
                      <input
                        type="range"
                        min="1998"
                        max="7000"
                        step="10"
                        value={downPayment}
                        onChange={(e) => setDownPayment(Math.max(1998, Number(e.target.value)))}
                        className="w-full accent-[#FFD100] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                      />
                    </div>

                    {/* Plazo */}
                    <div className="space-y-1">
                      <div className="flex justify-between font-mono text-[10px] font-bold text-neutral-300">
                        <span>PLAZO PARA INVERTIR</span>
                        <span className="text-[#FFD100] font-black">{months} MESES</span>
                      </div>
                      <input
                        type="range"
                        min="3"
                        max="24"
                        step="1"
                        value={months}
                        onChange={(e) => setMonths(Number(e.target.value))}
                        className="w-full accent-[#FFD100] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Display Simulator math result */}
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center flex flex-col justify-center items-center space-y-4">
                  <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#FFD100]">
                    Cuota Referencial
                  </span>
                  <div className="text-4xl md:text-5xl font-sans font-black text-white font-mono leading-none">
                    S/ {currentQuota.toLocaleString('es-PE')}
                  </div>
                  <p className="text-[10px] text-neutral-300 font-mono">
                    Saldo a financiar: S/ {(lotPrice - downPayment).toLocaleString('es-PE')}{" "}
                  </p>
                  
                  <button
                    onClick={handleApplyPlan}
                    className="w-full py-3.5 bg-[#FFD100] text-[#D2007A] text-xs font-black uppercase rounded-full hover:bg-white hover:text-[#D2007A] transition-all duration-300 flex items-center justify-center gap-1.5 shadow cursor-pointer"
                  >
                    <span>Solicitar esta cotización</span>
                    <ArrowRight className="w-4 h-4 text-[#D2007A] stroke-[3px]" />
                  </button>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: Empty space for desktop sticky form alignment */}
          <div className="hidden lg:block lg:col-span-4 h-10 w-full" />

        </div>
      </div>
    </section>
  );
}
