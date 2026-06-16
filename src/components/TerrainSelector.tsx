import { useState } from 'react';
import { Target, Search, CheckCircle, Landmark, MapPin, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useDynamicImages } from '../hooks/useDynamicImages';

interface TerrainSelectorProps {
  onOpenWithLot: (lotName: string) => void;
}

interface Lote {
  id: string;
  manzana: string;
  numero: number;
  area: string;
  precio: string;
  estado: 'Disponible' | 'Reservado' | 'Vendido';
  precioEspecial?: string;
}

export default function TerrainSelector({ onOpenWithLot }: TerrainSelectorProps) {
  const { images } = useDynamicImages();
  const [started, setStarted] = useState(false);
  const [selectedManzana, setSelectedManzana] = useState<'MZ A' | 'MZ B' | 'MZ C'>('MZ A');
  const [activeLote, setActiveLote] = useState<Lote | null>(null);

  // Generate realistic lots for Alameda del Sol
  const lotesData: Lote[] = [
    // Manzana A
    { id: 'a1', manzana: 'MZ A', numero: 1, area: '98m²', precio: 'S/7,900', estado: 'Disponible', precioEspecial: 'S/6,900' },
    { id: 'a2', manzana: 'MZ A', numero: 2, area: '98m²', precio: 'S/7,900', estado: 'Vendido' },
    { id: 'a3', manzana: 'MZ A', numero: 3, area: '99m²', precio: 'S/8,390', estado: 'Disponible', precioEspecial: 'S/7,290' },
    { id: 'a4', manzana: 'MZ A', numero: 4, area: '98m²', precio: 'S/7,900', estado: 'Reservado' },
    { id: 'a5', manzana: 'MZ A', numero: 5, area: '98m²', precio: 'S/7,900', estado: 'Disponible', precioEspecial: 'S/6,900' },
    { id: 'a6', manzana: 'MZ A', numero: 6, area: '112m²', precio: 'S/9,590', estado: 'Disponible', precioEspecial: 'S/8,390' },
    { id: 'a7', manzana: 'MZ A', numero: 7, area: '98m²', precio: 'S/7,900', estado: 'Vendido' },
    { id: 'a8', manzana: 'MZ A', numero: 8, area: '98m²', precio: 'S/7,900', estado: 'Disponible', precioEspecial: 'S/6,900' },

    // Manzana B
    { id: 'b1', manzana: 'MZ B', numero: 1, area: '98m²', precio: 'S/8,190', estado: 'Vendido' },
    { id: 'b2', manzana: 'MZ B', numero: 2, area: '98m²', precio: 'S/7,900', estado: 'Disponible', precioEspecial: 'S/6,900' },
    { id: 'b3', manzana: 'MZ B', numero: 3, area: '98m²', precio: 'S/7,900', estado: 'Disponible', precioEspecial: 'S/6,900' },
    { id: 'b4', manzana: 'MZ B', numero: 4, area: '124m²', precio: 'S/10,290', estado: 'Reservado' },
    { id: 'b5', manzana: 'MZ B', numero: 5, area: '98m²', precio: 'S/7,900', estado: 'Vendido' },
    { id: 'b6', manzana: 'MZ B', numero: 6, area: '98m²', precio: 'S/7,900', estado: 'Disponible', precioEspecial: 'S/6,900' },
    { id: 'b7', manzana: 'MZ B', numero: 7, area: '99m²', precio: 'S/8,390', estado: 'Vendido' },
    { id: 'b8', manzana: 'MZ B', numero: 8, area: '98m²', precio: 'S/7,900', estado: 'Disponible', precioEspecial: 'S/6,900' },

    // Manzana C
    { id: 'c1', manzana: 'MZ C', numero: 1, area: '98m²', precio: 'S/7,900', estado: 'Disponible', precioEspecial: 'S/6,900' },
    { id: 'c2', manzana: 'MZ C', numero: 2, area: '98m²', precio: 'S/7,900', estado: 'Disponible', precioEspecial: 'S/6,900' },
    { id: 'c3', manzana: 'MZ C', numero: 3, area: '98m²', precio: 'S/7,900', estado: 'Vendido' },
    { id: 'c4', manzana: 'MZ C', numero: 4, area: '98m²', precio: 'S/7,900', estado: 'Vendido' },
    { id: 'c5', manzana: 'MZ C', numero: 5, area: '104m²', precio: 'S/8,690', estado: 'Disponible', precioEspecial: 'S/7,590' },
    { id: 'c6', manzana: 'MZ C', numero: 6, area: '98m²', precio: 'S/7,900', estado: 'Reservado' },
    { id: 'c7', manzana: 'MZ C', numero: 7, area: '98m²', precio: 'S/7,900', estado: 'Disponible', precioEspecial: 'S/6,900' },
    { id: 'c8', manzana: 'MZ C', numero: 8, area: '108m²', precio: 'S/9,190', estado: 'Disponible', precioEspecial: 'S/7,995' },
  ];

  const visibleLotes = lotesData.filter((l) => l.manzana === selectedManzana);

  const handleLoteClick = (lote: Lote) => {
    setActiveLote(lote);
  };



  return (
    <section id="lotes-map" className="bg-white py-14 md:py-20 font-sans scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: holds map applet */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Section Heading */}
            <div className="text-center md:text-left space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D2007A] font-mono bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
                Plano del Proyecto
              </span>
              <h2 
                style={{ marginRight: '0px', paddingLeft: '2px', marginBottom: '8px', marginTop: '9px' }}
                className="font-sans font-black text-3xl md:text-4xl text-neutral-900 tracking-tight leading-none uppercase"
              >
                Elige tu lote propio!
              </h2>
              <div className="w-16 h-1 bg-[#D2007A] md:mx-0 mx-auto rounded-full mt-2"></div>
            </div>

            {/* Start Overlay state */}
            {!started ? (
              <div className="flex flex-col gap-6">
                <a 
                  href="https://api.whatsapp.com/send/?phone=51926289293&text=%C2%A1QUIERO+PLANO+PDF%21+de+1+etapa+del+proyecto+LB&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block w-full h-[400px] md:h-[500px] rounded-[32px] overflow-hidden shadow-2xl group border border-neutral-200 cursor-pointer"
                >
                  <img
                    src={images.mapPlan}
                    alt="Planificación Las Bugambilias"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-neutral-950/75 flex flex-col items-center justify-center text-center p-6 md:p-8" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 md:p-8 space-y-5">
                    <div className="transform transition-transform duration-300 group-hover:scale-105">
                      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        {/* The box in the middle/right */}
                        <rect x="22" y="10" width="28" height="28" rx="2" />
                        {/* Divider inside box */}
                        <path d="M36 10v28" />
                        <path d="M36 24h14" />

                        {/* Vertical arrow on the left */}
                        <path d="M14 10v28" />
                        <path d="M11 13l3-3 3 3" />
                        <path d="M11 35l3 3 3-3" />

                        {/* Horizontal arrow on the bottom */}
                        <path d="M22 46h28" />
                        <path d="M25 43l-3 3 3 3" />
                        <path d="M47 43l3 3-3 3" />
                      </svg>
                    </div>
                    <div className="max-w-md">
                      <p 
                        style={{ height: '84px', width: '300px' }}
                        className="font-sans font-extrabold text-lg sm:text-xl md:text-[21px] text-white tracking-normal leading-snug"
                      >
                        Mira el plano del proyecto, elige tu lote y cotízalo
                      </p>
                    </div>

                    <span className="px-8 py-[14px] bg-[#FFD100] group-hover:bg-amber-400 text-[#0c152b] font-black text-sm rounded-full shadow-xl transition-all duration-300 md:animate-bounce uppercase tracking-wider inline-flex items-center justify-center select-none">
                      PLANO PDF AQUÍ
                    </span>
                  </div>
                </a>

                {/* Relocated Physical Office locator block right above the map/grid area */}
                <div 
                  id="oficinas" 
                  style={{ height: '190px', width: '801px', marginTop: '70px', paddingLeft: '46px', paddingTop: '30px' }}
                  className="bg-white p-6 md:p-10 rounded-3xl border border-neutral-100 shadow-sm flex flex-col gap-8 font-sans select-text"
                >
                  <h3 
                    style={{ 
                      fontFamily: 'system-ui', 
                      fontWeight: 'bold', 
                      color: '#D2007A',
                      lineHeight: '30px',
                      fontSize: '30px',
                      marginBottom: '-10px',
                      marginRight: '0px',
                      marginLeft: '0px',
                      marginTop: '5px'
                    }} 
                    className="text-2.5xl md:text-3xl uppercase tracking-tight text-center md:text-left"
                  >
                    VISITA NUESTRA OFICINA
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    
                    {/* Left Column: Address */}
                    <a 
                      href="https://maps.app.goo.gl/gndDDuCDEJWJKkXCA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 group cursor-pointer"
                    >
                      <div style={{ backgroundColor: '#d2007a' }} className="w-14 h-14 rounded-full flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-all duration-300">
                        <MapPin className="w-7 h-7" />
                      </div>
                      <div 
                        style={{ fontSize: '16px', color: '#525252', fontWeight: 'normal' }}
                        className="font-normal font-sans leading-snug group-hover:text-black transition-colors duration-300"
                      >
                        Calle Octavio Muñoz Najar N° 137, oficina 204, Cercado, Arequipa
                      </div>
                    </a>

                    {/* Right Column: Clock */}
                    <div className="flex items-center gap-4">
                      <div style={{ backgroundColor: '#d2007a' }} className="w-14 h-14 rounded-full flex items-center justify-center text-white shrink-0">
                        <Clock className="w-7 h-7" />
                      </div>
                      <div className="text-neutral-800 text-sm md:text-[15px] font-semibold font-sans leading-snug">
                        <strong className="font-bold">Horario Atención:</strong>
                        <p 
                          style={{ fontSize: '16px', color: '#525252', fontWeight: 'normal' }}
                          className="mt-0.5 font-normal"
                        >
                          Lunes a Domingo
                        </p>
                        <p 
                          style={{ fontSize: '16px', color: '#525252', fontWeight: 'normal' }}
                          className="mt-0.5 font-normal"
                        >
                          09:00 am - 06:00 pm
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

                <div id="mapa" className="space-y-4 scroll-mt-32">
                  {/* Title corresponding to the clean editorial style of the image */}
                  <div className="text-left mt-2">
                    <h2 
                      style={{ 
                        fontFamily: 'system-ui', 
                        fontWeight: 'bold', 
                        color: '#D2007A',
                        fontSize: '30px',
                        lineHeight: '30px',
                        paddingLeft: '0px',
                        marginLeft: '0px',
                        marginTop: '45px',
                        marginBottom: '25px'
                      }}
                      className="text-2.5xl md:text-3.5xl uppercase tracking-tight"
                    >
                      UBICACIÓN estratégica
                    </h2>
                  </div>

                  {/* Outer Card of the Map representing the image */}
                  <div className="bg-white rounded-[32px] border border-neutral-200/50 shadow-md hover:shadow-lg transition-all duration-350 overflow-hidden">
                    
                    {/* Map Iframe block - Flush with the top, left and right edges */}
                    <div style={{ height: '400px' }} className="relative w-full">
                      <iframe
                         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110142.77947277184!2d-71.98767098041122!3d-16.621707854263466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9143d7003bc2807d%3A0x661ec878c3c3fcd!2sLas%20Bugambilias%20de%20San%20Isidro!5e0!3m2!1ses-419!2spe!4v1781455338847!5m2!1ses-419!2spe"
                        width="100%"
                        height="100%"
                        style={{ border: 0, height: '400px' }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        title="Ubicación de Nueva La Joya Arequipa"
                      />
                    </div>

                    {/* White bottom bar containing GPS markers and Quick Nav links */}
                    <div className="bg-white px-6 py-5 md:px-8 md:py-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-100">
                      
                      {/* Left side: Red Circle Pin & Location Address */}
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#ff3366] shrink-0 border border-neutral-200/50 shadow-md">
                          <MapPin className="w-6 h-6 text-[#D2007A] stroke-[1.8px]" />
                        </div>
                        <span className="font-sans font-semibold text-neutral-800 text-base md:text-[17px] tracking-tight select-text">
                          Proy. Las Bugambilias - La Joya - Arequipa
                        </span>
                      </div>

                      {/* Right side: Stylized Google Maps direct link */}
                      <div className="flex items-center gap-3">
                        
                        {/* Google Maps Pin Button styled as a clean premium plate */}
                        <a
                          href="https://maps.app.goo.gl/ZftqZu32KXqTT7JUA"
                          target="_blank"
                          rel="noreferrer"
                          title="Abrir con Google Maps"
                          className="h-[60px] w-[140px] pl-[5px] pr-[5px] rounded-full bg-white hover:bg-[#f0f4f9] border border-neutral-200/50 shadow-sm flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 shrink-0"
                        >
                          <img 
                            src="https://drive.google.com/thumbnail?id=15jvPnenKGaTKwoLFSKQrqu6tfg_6J9U7&sz=w500" 
                            alt="Google Maps Logo" 
                            className="h-11 w-auto object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </a>

                      </div>

                    </div>

                  </div>
                </div>
              </div>
            ) : (
              /* Interactive Terrain Selector Applet */
              <div className="w-full bg-neutral-50 rounded-[32px] border border-neutral-200 overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-12">
                
                {/* Left/Middle Content Area: Lot Selector grid */}
                <div className="md:col-span-8 p-6 space-y-6 border-b md:border-b-0 md:border-r border-neutral-200">
                  
                  {/* Selector Bar */}
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <h3 className="font-sans font-black text-base text-neutral-800 uppercase tracking-tight">
                      Selecciona tu Manzana
                    </h3>

                    <div className="flex gap-1 bg-neutral-200/60 p-1 rounded-full">
                      {(['MZ A', 'MZ B', 'MZ C'] as const).map((mz) => (
                        <button
                          key={mz}
                          onClick={() => {
                            setSelectedManzana(mz);
                            setActiveLote(null);
                          }}
                          className={`px-4 py-2 text-xs font-black rounded-full transition-all duration-300 ${
                            selectedManzana === mz
                              ? 'bg-[#D2007A] text-white shadow-md'
                              : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200'
                          }`}
                        >
                          {mz}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Grid map representing the lots */}
                  <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm relative">
                    <div className="grid grid-cols-4 gap-4 relative">
                      {visibleLotes.map((lote) => (
                        <button
                          key={lote.id}
                          onClick={() => handleLoteClick(lote)}
                          className={`aspect-square rounded-xl border flex flex-col items-center justify-between p-3 transition-all duration-300 relative overflow-hidden group ${
                            lote.estado === 'Vendido'
                              ? 'bg-rose-50 border-rose-200 text-rose-450 cursor-not-allowed'
                              : lote.estado === 'Reservado'
                              ? 'bg-amber-50 border-amber-200 text-amber-650 cursor-not-allowed'
                              : activeLote?.id === lote.id
                              ? 'bg-[#D2007A] border-[#D2007A] shadow-md text-white scale-105 ring-4 ring-pink-100'
                              : 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100/80 hover:border-emerald-300 text-emerald-800'
                          }`}
                          disabled={lote.estado === 'Vendido' || lote.estado === 'Reservado'}
                        >
                          <span className="text-[10px] font-mono font-bold tracking-wider opacity-60">
                            {lote.manzana}
                          </span>
                          <span className="font-sans font-black text-lg md:text-xl font-mono">
                            {lote.numero}
                          </span>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                            lote.estado === 'Vendido'
                              ? 'bg-rose-200 text-rose-700'
                              : lote.estado === 'Reservado'
                              ? 'bg-amber-200 text-amber-800'
                              : activeLote?.id === lote.id
                              ? 'bg-white text-red-950 font-black'
                              : 'bg-emerald-200 text-emerald-900'
                          }`}>
                            {lote.estado === 'Vendido' ? 'Vendido' : lote.estado === 'Reservado' ? 'Reserv.' : lote.area}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Legend indicator */}
                    <div className="flex gap-4 text-xs font-semibold justify-center mt-6 text-neutral-600 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3.5 h-3.5 rounded-md bg-emerald-100 border border-emerald-200 block"></span>
                        <span>Disponible</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3.5 h-3.5 rounded-md bg-amber-150 border border-amber-200 block"></span>
                        <span>Reservado</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3.5 h-3.5 rounded-md bg-rose-150 border border-rose-250 block"></span>
                        <span>Vendido</span>
                      </div>
                    </div>
                  </div>

                  {/* Switch back button */}
                  <button
                    onClick={() => setStarted(false)}
                    className="text-xs text-neutral-400 hover:text-neutral-600 font-mono flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    ← Volver a vista panorámica
                  </button>

                </div>

                {/* Right Panel Card: Current Selected Lot inspect detail */}
                <div className="md:col-span-4 p-6 bg-neutral-100 flex flex-col justify-between">
                  
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <p className="text-[10px] text-neutral-400 font-mono font-bold uppercase">Detalles del Lote</p>
                      <h3 className="font-sans font-black text-lg text-neutral-900 leading-tight uppercase">
                        {activeLote ? `${activeLote.manzana} - Lote ${activeLote.numero}` : 'Ninguno'}
                      </h3>
                    </div>

                    <AnimatePresence mode="wait">
                      {activeLote ? (
                        <motion.div
                          key={activeLote.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-4 text-left"
                        >
                          <div className="p-4 bg-white rounded-xl shadow-sm border border-neutral-200 divide-y divide-neutral-100">
                            <div className="py-2 flex justify-between text-xs font-semibold text-neutral-600">
                              <span>Área total:</span>
                              <span className="font-bold text-neutral-900 font-mono">{activeLote.area}</span>
                            </div>
                            <div className="py-2 flex justify-between text-xs font-semibold text-neutral-600">
                              <span>Precio regular:</span>
                              <span className="line-through font-mono">{activeLote.precio}</span>
                            </div>
                            <div className="py-2 flex justify-between text-xs font-bold text-neutral-800">
                              <span>Precio Contado:</span>
                              <span className="text-emerald-600 font-black font-mono text-sm">{activeLote.precioEspecial}</span>
                            </div>
                            <div className="py-2 flex justify-between text-xs font-bold text-neutral-800">
                              <span>Cuotas desde:</span>
                              <span className="text-[#D2007A] font-black font-mono text-sm">S/ 199/mes</span>
                            </div>
                          </div>

                          <div className="flex gap-2 text-[11px] bg-emerald-50 text-emerald-800 p-3 rounded-xl border border-emerald-100 leading-relaxed">
                            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                            <div>
                              <strong>¡Habilitado!</strong> Con luz, agua, vías afirmadas y áreas de recreación listas.
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <div className="text-center py-8 text-neutral-450 text-xs flex flex-col items-center gap-3">
                          <Search className="w-10 h-10 text-neutral-300" />
                          <p className="max-w-[180px] leading-relaxed mx-auto">
                            Haz clic sobre cualquier lote verde en la cuadrícula para ver dimensiones y ofertas especiales.
                          </p>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>



                </div>

              </div>
            )}

          </div>

          {/* Right Column: Empty space for desktop sticky form alignment */}
          <div className="hidden lg:block lg:col-span-4 h-10 w-full" />

        </div>
      </div>
    </section>
  );
}
