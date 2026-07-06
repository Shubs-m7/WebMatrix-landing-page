'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

const FEATURES = [
  {
    title: "Strategic Design",
    description: "We craft ultra-premium user interfaces that instantly communicate value and leave a lasting impression on your users.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Flawless Development",
    description: "Built on next-generation architecture. Lightning-fast performance, flawless responsive design, and bulletproof security.",
    image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Immersive 3D",
    description: "Stand out with gorgeous WebGL and Three.js 3D experiences that elevate your brand narrative into the future.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Global Deployment",
    description: "Seamlessly shipped to the edge. Enjoy 99.99% uptime and blazing fast delivery to users anywhere in the world.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
  }
];

const PhoneMockup = ({ image }: { image: string }) => (
  <div className="relative rounded-[2.5rem] border border-white/20 dark:border-white/10 bg-zinc-800 dark:bg-zinc-900 shadow-2xl overflow-hidden ring-4 ring-black/10 dark:ring-black/40 w-full max-w-[340px] mx-auto aspect-[9/19.5]">
    {/* iPhone Bezel */}
    <div className="absolute inset-[4px] rounded-[2.2rem] bg-[#0a0a0a] overflow-hidden ring-1 ring-white/10">
      {/* Dynamic Island */}
      <div className="absolute top-2 left-1/2 h-[16px] w-[54px] -translate-x-1/2 bg-[#050505] rounded-full z-20 flex items-center justify-end px-2 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]">
        <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
      </div>
      {/* Screen Content */}
      <img
        src={image}
        alt="Mockup"
        className="h-full w-full object-cover object-top"
      />
      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 h-[4px] w-[35%] -translate-x-1/2 bg-white/40 backdrop-blur-md rounded-full z-20" />
    </div>
  </div>
);

const ParallaxCard = ({ 
  progress, 
  startY, 
  endY, 
  className,
  children 
}: { 
  progress: MotionValue<number>, 
  startY: number, 
  endY: number, 
  className: string,
  children: React.ReactNode 
}) => {
  const y = useTransform(progress, [0, 1], [startY, endY]);
  return (
    <motion.div style={{ y }} className={`absolute z-30 hidden md:block ${className}`}>
      {children}
    </motion.div>
  );
};

export const ScrollyTellingSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const getAnimMaps = (i: number) => {
    const yOff = 150; // Larger vertical offset to prevent physical overlap on mobile
    switch (i) {
      case 0:
        return { in: [0, 0.18, 0.23], op: [1, 1, 0], y: [0, 0, -yOff] };
      case 1:
        return { in: [0.22, 0.28, 0.43, 0.48], op: [0, 1, 1, 0], y: [yOff, 0, 0, -yOff] };
      case 2:
        return { in: [0.47, 0.53, 0.68, 0.73], op: [0, 1, 1, 0], y: [yOff, 0, 0, -yOff] };
      case 3:
        return { in: [0.72, 0.78, 1], op: [0, 1, 1], y: [yOff, 0, 0] };
      default:
        return { in: [0,1], op: [1,1], y: [0,0] };
    }
  };

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-background">
      <div className="sticky top-0 h-[100dvh] w-full flex items-center justify-center overflow-hidden">
        
        {/* Subtle background glow */}
        <div className="absolute inset-0 z-0">
          <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
          <div className="absolute right-1/4 bottom-1/4 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-12 items-center h-full max-h-[900px] relative z-10 pt-16 md:pt-0 pb-20 md:pb-0">
          
          {/* Left Side: Text Reveals */}
          <div className="relative h-[40%] md:h-full w-full flex flex-col justify-end md:justify-center items-center md:items-start text-center md:text-left z-20">
             {FEATURES.map((feature, index) => {
               const anim = getAnimMaps(index);
               
               // eslint-disable-next-line react-hooks/rules-of-hooks
               const opacity = useTransform(scrollYProgress, anim.in, anim.op);
               // eslint-disable-next-line react-hooks/rules-of-hooks
               const y = useTransform(scrollYProgress, anim.in, anim.y);

               return (
                 <motion.div 
                   key={index}
                   style={{ opacity, y }}
                   className="absolute md:left-auto md:top-1/2 md:-translate-y-1/2 w-full max-w-xl px-4 md:px-0 bottom-4 md:bottom-auto pointer-events-none"
                 >
                   <div className="text-primary text-[10px] md:text-sm font-semibold tracking-widest uppercase mb-1 md:mb-3">0{index + 1} — Step</div>
                   <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-bold tracking-tight mb-2 md:mb-6 leading-tight">
                     {feature.title}
                   </h2>
                   <p className="text-sm md:text-xl text-muted-foreground leading-relaxed font-light line-clamp-3 md:line-clamp-none max-w-[280px] sm:max-w-md mx-auto md:mx-0">
                     {feature.description}
                   </p>
                 </motion.div>
               );
             })}
          </div>
          
          {/* Right Side: Sticky Device */}
          <div className="relative h-[60%] md:h-full flex items-center justify-center w-full z-10">
             <div className="relative h-[100%] max-h-[45vh] md:max-h-[70vh] aspect-[9/19.5] mx-auto">
               {FEATURES.map((feature, index) => {
                 const anim = getAnimMaps(index);
                 
                 // eslint-disable-next-line react-hooks/rules-of-hooks
                 const opacity = useTransform(scrollYProgress, anim.in, anim.op);
                 // eslint-disable-next-line react-hooks/rules-of-hooks
                 const scale = useTransform(
                   scrollYProgress,
                   anim.in,
                   anim.op.map(o => o === 1 ? 1 : 0.95)
                 );

                 return (
                   <motion.div
                     key={index}
                     style={{ opacity, scale }}
                     className="absolute inset-0 origin-center"
                   >
                     <PhoneMockup image={feature.image} />
                   </motion.div>
                 );
               })}
             </div>
             
             {/* Floating Parallax Cards around the device */}
             <ParallaxCard progress={scrollYProgress} startY={200} endY={-300} className="top-1/4 -left-12 lg:-left-24">
               <div className="glass p-4 rounded-xl border border-white/10 shadow-2xl flex items-center gap-3 backdrop-blur-xl bg-background/60">
                 <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shadow-[0_0_15px_rgba(108,92,231,0.5)]">
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                 </div>
                 <div className="text-sm font-semibold tracking-wide">High ROI</div>
               </div>
             </ParallaxCard>
             
             <ParallaxCard progress={scrollYProgress} startY={400} endY={-500} className="bottom-1/3 -right-8 lg:-right-20">
               <div className="glass p-4 rounded-xl border border-white/10 shadow-2xl flex items-center gap-3 backdrop-blur-xl bg-background/60">
                 <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold shadow-[0_0_15px_rgba(0,209,255,0.5)]">
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                 </div>
                 <div className="text-sm font-semibold tracking-wide">99.9% Uptime</div>
               </div>
             </ParallaxCard>

             <ParallaxCard progress={scrollYProgress} startY={100} endY={-100} className="bottom-1/4 -left-8 lg:-left-12">
               <div className="glass px-4 py-2 rounded-full border border-white/10 shadow-xl flex items-center gap-2 backdrop-blur-xl bg-background/60">
                 <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                 <div className="text-xs font-medium uppercase tracking-wider">Live Global</div>
               </div>
             </ParallaxCard>
          </div>
          
        </div>
      </div>
    </section>
  );
};
