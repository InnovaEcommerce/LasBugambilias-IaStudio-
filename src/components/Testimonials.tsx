import { Star } from 'lucide-react';
import { useDynamicImages } from '../hooks/useDynamicImages';

export default function Testimonials() {
  const { images } = useDynamicImages();
  const reviews = [
    {
      id: 1,
      title: 'Entrega de terrenos',
      proyecto: 'Urbanización Valle Real',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
      quote: 'Hoy ha sido uno de los días más importantes – al fin hemos logrado el sueño que hemos perseguido durante años: tener nuestro propio lote',
    },
    {
      id: 2,
      title: 'Atilio Luque',
      proyecto: 'Urbanización Santa María',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      quote: 'Lo que más me gusto del financiamiento de Centenario fueron las facilidades de pago',
    },
  ];

  return (
    <section className="bg-[#FFD100] py-14 md:py-20 font-sans text-neutral-900 relative overflow-hidden">
      
      {/* Decorative background gradients */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-300/30 rounded-full blur-3xl pointer-events-none" />

      {/* DESKTOP VIEW: hidden on mobile, shown on lg screens and up */}
      <div className="hidden lg:grid max-w-7xl mx-auto px-4 md:px-8 relative z-10 grid-cols-12 gap-10 items-center">
        
        {/* Left Branding Block */}
        <div className="col-span-4 space-y-4 text-left relative">
          <span className="text-[10px] font-black uppercase tracking-widest text-white bg-[#D2007A] px-3.5 py-1 rounded-full font-mono">
            Nuestra Comunidad
          </span>

          <div className="space-y-1.5 pt-1">
            <h2 className="font-display font-black text-4xl md:text-5xl text-[#D2007A] tracking-tighter">
              CENTEGENTE
            </h2>
            <p className="font-sans font-extrabold text-[#111111] text-sm md:text-base leading-relaxed">
              Invierte con confianza en un futuro seguro. ¡Compra hoy tu terreno con Centenario!
            </p>
          </div>

          <div className="flex gap-1 justify-start pt-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-4 h-4 fill-[#D2007A] text-[#D2007A]" />
            ))}
          </div>

          {/* Curly Playful SVG Arrow pointing right on desktop (Image 8 Detail) */}
          <div className="absolute right-[-40px] bottom-[-60px] w-40 h-24 text-[#D2007A] opacity-80 z-20 pointer-events-none">
            <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transform rotate-[-5deg]">
              <path 
                d="M10,25 C30,35 60,10 75,25 C82,32 80,45 68,48 C55,50 48,35 60,30 C75,22 88,38 92,42" 
                stroke="currentColor" 
                strokeWidth="3" 
                strokeLinecap="round" 
                fill="none" 
              />
              <path 
                d="M84,36 L93,43 L91,32" 
                stroke="currentColor" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                fill="none" 
              />
            </svg>
          </div>
        </div>

        {/* Right Columns: Testimonial Cards with Overlapping Avatars (Image 8 Detail) */}
        <div className="col-span-8 grid grid-cols-2 gap-y-16 gap-x-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-8 rounded-[32px] shadow-xl flex flex-col justify-between relative group mt-8 border border-neutral-100"
            >
              {/* Overlapping Avatar centered at top edge */}
              <div className="absolute top-[-40px] left-1/2 -hover:scale-105 transition-transform duration-300 -translate-x-1/2 w-20 h-20 rounded-full border-4 border-[#FFD100] overflow-hidden shadow-lg select-none">
                <img
                  src={rev.avatarUrl}
                  alt={rev.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Top Double Quote */}
              <div className="text-left select-none text-[32px] font-serif text-[#D2007A] leading-none mb-1 font-bold pt-6">
                “
              </div>

              {/* Quote Body */}
              <p className="text-neutral-700 text-sm italic leading-relaxed text-center font-sans font-medium px-4">
                {rev.quote}
              </p>

              {/* Bottom Double Quote */}
              <div className="text-right select-none text-[32px] font-serif text-[#D2007A] leading-none mt-1 font-bold">
                ”
              </div>

              {/* Author specifications details bottom centered */}
              <div className="text-center pt-3 border-t border-neutral-150/60 mt-3">
                <h4 className="font-display font-black text-sm text-[#D2007A] uppercase leading-none">
                  {rev.title}
                </h4>
                <p className="text-[10px] text-neutral-400 mt-1 uppercase tracking-wider font-bold">
                  {rev.proyecto}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Pagination Dots at very bottom spanning both columns */}
        <div className="col-span-12 flex justify-center gap-2 pt-6">
          <span className="w-8 h-2.5 rounded-full bg-[#D2007A]" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/55 hover:bg-white cursor-pointer transition-colors" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/55 hover:bg-white cursor-pointer transition-colors" />
        </div>

      </div>

      {/* MOBILE-OPTIMIZED VIEW: shown on mobile, hidden on lg screens */}
      <div className="block lg:hidden max-w-xl mx-auto px-6 relative z-10 text-center">
        
        {/* Large red centered title CENTEGENTE */}
        <h2 className="font-display font-black text-4xl text-[#D2007A] tracking-tighter leading-none uppercase mb-2">
          CENTEGENTE
        </h2>

        {/* Testimonial Card */}
        <div className="bg-white p-6 rounded-[24px] shadow-xl relative mt-14 border border-neutral-100 text-left">
          
          {/* Circular avatar centered on top border - exactly matching Image 4 */}
          <div className="absolute top-[-44px] left-1/2 -translate-x-1/2 w-[88px] h-[88px] rounded-full border-4 border-[#FFD100] overflow-hidden shadow-md select-none bg-neutral-100 animate-none">
            <img
              src={images.testimonialsFamily}
              alt="Familia de nuestra comunidad Innova"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="pt-8 space-y-2">
            
            {/* Top Double Quote */}
            <div className="text-left select-none text-[36px] font-serif text-[#D2007A] leading-none font-black -mb-2">
              “
            </div>

            {/* Quote text exactly formatted as Image 4 */}
            <p className="text-neutral-800 text-[14px] leading-relaxed font-sans font-medium text-center px-2">
              “...la entrega es una experiencia bonita ya que por fin tienes algo que es tuyo, que es propio”
            </p>

            {/* Bottom details block with red/pink title and black subtitle */}
            <div className="text-center pt-2 mt-4">
              <h4 className="font-sans font-extrabold text-base text-[#D2007A] uppercase leading-tight tracking-tight">
                Entrega de terrenos Casablanca
              </h4>
              <p className="text-[11px] text-neutral-500 font-bold uppercase tracking-wider mt-0.5">
                Urbanización Casablanca
              </p>
            </div>

            {/* Bottom Double Quote */}
            <div className="text-right select-none text-[36px] font-serif text-[#D2007A] leading-none font-black -mt-2 animate-none">
              ”
            </div>

          </div>

        </div>

        {/* Carousel indicators exactly as Image 4 (First dot is slider rectangle, others are small bullet circles) */}
        <div className="flex justify-center items-center gap-1.5 mt-8">
          <span className="w-10 h-1.5 rounded-full bg-[#D2007A]" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
        </div>

      </div>

    </section>
  );
}
