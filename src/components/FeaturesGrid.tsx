import { Compass, Fence, Landmark, Trees, Smile, Droplet, Milestone, Trophy } from 'lucide-react';
import { motion } from 'motion/react';

export default function FeaturesGrid() {
  const features = [
    {
      icon: Compass,
      title: 'Entorno urbano',
    },
    {
      icon: Landmark,
      title: 'Pórtico de ingreso',
    },
    {
      icon: Fence,
      title: 'Cerco perimétrico',
    },
    {
      icon: Trees,
      title: 'Áreas de recreación',
    },
    {
      icon: Smile,
      title: 'Juegos para niños',
    },
    {
      icon: Droplet,
      title: 'Servicios de luz y agua colectivos',
    },
    {
      icon: Milestone,
      title: 'Vías afirmadas',
    },
    {
      icon: Trophy,
      title: 'Zonas deportivas',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120 } },
  };

  return (
    <section className="bg-white py-12 md:py-16 font-sans scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Constraints content to left */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Section Title matching Image style */}
            <div className="text-left">
              <h2 className="font-sans font-black text-2.5xl md:text-3xl text-[#D2007A] leading-none uppercase tracking-tight">
                ¡TENEMOS TODO LO QUE NECESITAS!
              </h2>
            </div>

            {/* Feature Cards Grid (Thin bordered, light gray cards) */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ y: -3, scale: 1.01 }}
                    className="bg-[#FAF9F8] py-7 px-4 rounded-2xl border border-neutral-200/80 shadow-xs flex flex-col items-center justify-center text-center space-y-4 cursor-default group hover:bg-neutral-50 transition-all duration-200"
                  >
                    {/* Red outline Icon (Thin strokes match vector art) */}
                    <div className="text-[#D2007A] group-hover:scale-105 transition-transform duration-200">
                      <Icon className="w-11 h-11 stroke-[1.5px]" />
                    </div>

                    {/* Title (Title-cased, semibold neutral-800 like image) */}
                    <h4 className="font-sans font-extrabold text-[12.5px] md:text-[13px] text-neutral-800 tracking-tight leading-snug">
                      {feat.title}
                    </h4>
                  </motion.div>
                );
              })}
            </motion.div>

          </div>

          {/* Right Column: Empty space for desktop sticky form alignment */}
          <div className="hidden lg:block lg:col-span-4 h-10 w-full" />

        </div>
      </div>
    </section>
  );
}
