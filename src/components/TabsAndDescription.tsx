import { MapPin, Layers, Clock, Compass, Fence, Landmark, Trees, Smile, Droplet, Milestone, Trophy } from 'lucide-react';
import { motion } from 'motion/react';

interface TabsAndDescriptionProps {
  onOpenLead: () => void;
}

export default function TabsAndDescription({ onOpenLead }: TabsAndDescriptionProps) {
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
      title: 'Áreas de arborización',
    },
    {
      icon: Smile,
      title: 'Juegos para niños',
    },
    {
      icon: Droplet,
      title: 'Luz y agua colectiva',
    },
    {
      icon: Milestone,
      title: 'Vías afirmadas',
    },
    {
      icon: Trophy,
      title: 'Zonas recreativas',
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
    <section id="proyecto" className="bg-white py-12 md:py-16 font-sans scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (8-column constraint on desktop) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* 1. Feature Bullet Points (horizontal Row/Col inside left space) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-6 bg-white py-2">
              
              {/* Highlight 1: Avenida Huarangal */}
              <div className="flex items-center text-left gap-4 group">
                <div className="w-12 h-12 rounded-full bg-[#D2007A] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <MapPin className="w-5.5 h-5.5 text-white stroke-[2.5px]" />
                </div>
                <p className="font-sans font-black text-[14px] sm:text-[15px] md:text-[17px] text-neutral-900 leading-[22px] tracking-tight">
                  Cerca a colegio, centro de salud, iglesia y comisaria
                </p>
              </div>

              {/* Highlight 2: Lotes desde 98m² */}
              <div className="flex items-center text-left gap-4 group">
                <div className="w-12 h-12 rounded-full bg-[#D2007A] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <Layers className="w-5.5 h-5.5 text-white stroke-[2.5px]" />
                </div>
                <p className="font-sans font-black text-[17px] text-neutral-900 leading-[22px] tracking-tight">
                  Lotes con excelente ubicación
                </p>
              </div>

              {/* Highlight 3: A 2 cdras del Mercado */}
              <div className="flex items-center text-left gap-4 group">
                <div className="w-12 h-12 rounded-full bg-[#D2007A] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <Clock className="w-5.5 h-5.5 text-white stroke-[2.5px]" />
                </div>
                <p className="font-sans font-black text-[17px] text-neutral-900 leading-[22px] tracking-tight">
                  A 3 min de avenida principal y 5 min de Panam. Sur
                </p>
              </div>

            </div>

            {/* 2. Narrative Description plain text list matching reference image style */}
            <div className="text-left py-4 pt-6 select-text space-y-8">
              <p 
                style={{ fontSize: '16px', fontWeight: 'normal' }}
                className="text-neutral-600 max-w-3xl leading-[25px]"
              >
                Terrenos de 98 hasta 200 m² en La Joya, Arequipa. Familias emprendedoras arequipeñas ya eligieron a INNOVA Inversiones para cumplir el sueño de su hogar. Nuestra residencial cuenta con diseño moderno, área de aportes, parques, áreas comunes y financiamiento rapidito.
              </p>
            </div>

            {/* 3. Reallocated Features Grid */}
            <div className="space-y-8 pt-4">
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
                      <h4 className="font-sans font-extrabold text-[15.5px] md:text-[16.5px] text-neutral-800 tracking-tight leading-snug">
                        {feat.title}
                      </h4>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

          </div>

          {/* Right Column: Empty spacer allowing LeadCard on desktop inside scroll frame */}
          <div className="hidden lg:block lg:col-span-4" />

        </div>
      </div>
    </section>
  );
}
