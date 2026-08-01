import imageCajachina from '../assets/images/images-appPromo/imagen_cajachina.webp';

export default function AppPromo() {
  return (
    <section className="bg-[#D2007A] text-white py-12 md:py-16 overflow-hidden relative">
      
      {/* Decorative backdrop graphics */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Transparent container that matches the web styles */}
        <div className="bg-[#9E005B] rounded-3xl border border-white/10 p-4 md:p-8 shadow-2xl">
          
          {/* Grid layout for Facebook iframe, middle image, and TikTok embed */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center">
            
            {/* Left Column: Facebook Iframe Embed */}
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-lg bg-white flex items-center justify-center transition-all duration-300 hover:shadow-xl h-[520px]">
              <iframe 
                src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fterrenos.innova%2Fposts%2Fpfbid0ZuAY5QZ2tjFGjikuTwHkam7oUQWTenuMQ57RBzrhZe5KzpsG85dHPbkA1d9kjuqDl&show_text=true&width=500" 
                width="100%" 
                height="100%" 
                style={{ border: 'none', overflow: 'hidden' }} 
                scrolling="no" 
                frameBorder="0" 
                allowFullScreen={true} 
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title="Facebook Post Innova Inversiones"
                className="w-full h-full rounded-2xl"
              />
            </div>

            {/* Middle Image: imagen_cajachina */}
            <div className="group overflow-hidden rounded-2xl border border-white/10 shadow-lg bg-neutral-900 flex items-center justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-xl h-[520px]">
              <img 
                src={imageCajachina} 
                alt="Proyecto Las Bugambilias - Área de Recreación" 
                className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Right Column: TikTok Video Embed / Direct Player */}
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-lg bg-black flex items-center justify-center transition-all duration-300 hover:shadow-xl h-[520px] relative">
              <iframe 
                src="https://www.tiktok.com/embed/v2/7666724298819783957?lang=es-ES" 
                width="100%" 
                height="100%" 
                style={{ border: 'none', overflow: 'hidden' }} 
                scrolling="no" 
                frameBorder="0" 
                allowFullScreen={true} 
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title="TikTok Video Innova Inversiones"
                className="w-full h-full rounded-2xl"
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

