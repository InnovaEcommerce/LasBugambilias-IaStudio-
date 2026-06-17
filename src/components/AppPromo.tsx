import image1 from '../assets/images/images-appPromo/imagen_1.jpg';
import image2 from '../assets/images/images-appPromo/imagen_2.jpg';
import imageCajachina from '../assets/images/images-appPromo/imagen_cajachina.webp';

export default function AppPromo() {
  return (
    <section className="bg-[#D2007A] text-white py-12 md:py-16 overflow-hidden relative">
      
      {/* Decorative backdrop graphics */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Transparent container that matches the web styles */}
        <div className="bg-[#9E005B] rounded-3xl border border-white/10 p-6 md:p-10 shadow-2xl">
          
          {/* Grid layout for the three showcase images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center">
            
            {/* Left Image: imagen_1 */}
            <div className="group overflow-hidden rounded-2xl border border-white/10 shadow-lg aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/5] bg-neutral-900 flex items-center justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
              <img 
                src={image1} 
                alt="Proyecto Las Bugambilias - Vista 1" 
                className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Middle Image: imagen_cajachina */}
            <div className="group overflow-hidden rounded-2xl border border-white/10 shadow-lg aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/5] bg-neutral-900 flex items-center justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
              <img 
                src={imageCajachina} 
                alt="Proyecto Las Bugambilias - Área de Recreación" 
                className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Right Image: imagen_2 */}
            <div className="group overflow-hidden rounded-2xl border border-white/10 shadow-lg aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/5] bg-neutral-900 flex items-center justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
              <img 
                src={image2} 
                alt="Proyecto Las Bugambilias - Vista 2" 
                className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
