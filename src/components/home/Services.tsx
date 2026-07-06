'use client';

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { Code, Palette, Zap, Layers, Sparkles, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const services = [
  {
    icon: Palette,
    title: 'Digital Design',
    description: 'Immersive, award-winning interfaces that captivate and convert.',
    className: 'md:col-span-2 md:row-span-2'
  },
  {
    icon: Code,
    title: 'Frontend Engineering',
    description: 'Pixel-perfect, high-performance React and Next.js applications.',
    className: 'md:col-span-2'
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Lightning-fast load times with guaranteed 90+ Lighthouse scores.',
    className: 'md:col-span-1'
  },
  {
    icon: Sparkles,
    title: '3D & WebGL Experiences',
    description: 'Pushing the boundaries of the web with immersive Three.js scenes.',
    className: 'md:col-span-1'
  },
  {
    icon: Layers,
    title: 'Full-Stack Architecture',
    description: 'Scalable, secure, and robust backend solutions.',
    className: 'md:col-span-2'
  },
  {
    icon: TrendingUp,
    title: 'AI Integrations',
    description: 'Next-generation AI features to supercharge your product.',
    className: 'md:col-span-2'
  }
];

const TiltServiceCard = ({ service, index }: { service: any, index: number }) => {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);
  
  const springConfig = { stiffness: 300, damping: 20 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  
  // Subtle 3D tilt
  const rotateX = useTransform(y, [0, 1], [4, -4]);
  const rotateY = useTransform(x, [0, 1], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
    spotX.set(e.clientX - rect.left);
    spotY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // Dynamic spotlight background that tracks the mouse
  const bgGradient = useMotionTemplate`radial-gradient(400px circle at ${spotX}px ${spotY}px, rgba(108, 92, 231, 0.15), transparent 80%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`${service.className} h-full relative`}
      style={{ perspective: 1000 }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="h-full relative will-change-transform"
      >
        <Card className="group h-full border-border/40 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgba(108,92,231,0.15)] glass overflow-hidden relative">
          
          {/* Spotlight Effect */}
          <motion.div 
            className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
            style={{ background: bgGradient }} 
          />
          
          <CardContent className="p-8 h-full flex flex-col justify-between relative z-10" style={{ transform: "translateZ(20px)" }}>
            {/* Giant Faded Icon Watermark to fill empty space */}
            <div className="absolute -bottom-12 -right-12 opacity-[0.03] dark:opacity-[0.02] group-hover:opacity-[0.08] dark:group-hover:opacity-[0.05] transition-all duration-700 pointer-events-none transform group-hover:scale-110 group-hover:-rotate-12 z-0">
              <service.icon className="w-72 h-72 text-primary" />
            </div>

            <div className="mb-8 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(108,92,231,0.3)] transition-all duration-500 relative z-10">
              <service.icon className="h-8 w-8 text-primary group-hover:text-accent transition-colors duration-500" />
            </div>
            <div className="relative z-10 mt-16">
              <h3 className="text-2xl font-display font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed font-light">
                {service.description}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export const Services = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-background">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-display-sm font-display font-bold mb-6">
            Expertise that <span className="text-gradient">drives impact</span>
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-light">
            We combine cutting-edge technology with world-class design to deliver digital products that stand out.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">
          {services.map((service, index) => (
            <TiltServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
