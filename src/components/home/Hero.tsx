'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Scene3D } from '@/components/3d/Scene3D';
import Link from 'next/link';
import { useRef } from 'react';

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section ref={ref} className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-background">
      {/* Immersive 3D Background */}
      <div className="absolute inset-0 z-0">
        <Scene3D />
      </div>

      {/* Cyber-Glass Mesh Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background/40 to-background dark:from-primary/10 dark:via-background/80 dark:to-background z-10 pointer-events-none" />

      {/* Hero Content */}
      <motion.div 
        style={{ opacity, y, scale }}
        className="relative z-20 container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-primary/30 text-sm font-medium text-foreground/90 shadow-[0_0_30px_rgba(108,92,231,0.2)] hover:shadow-[0_0_40px_rgba(108,92,231,0.4)] transition-shadow cursor-default">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Welcome to the Future of the Web
            </span>
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-display-xl font-display font-black tracking-tighter mb-6 max-w-5xl leading-[1.1]"
        >
          We engineer <br className="hidden md:block" />
          <span className="relative md:whitespace-nowrap">
            <span className="absolute -inset-1 bg-gradient-to-r from-primary to-accent blur-2xl opacity-40"></span>
            <span className="relative text-gradient">digital excellence</span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 font-light"
        >
          Elevate your brand with award-winning 3D experiences, motion design, and high-performance development.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full sm:w-auto"
        >
          <Button asChild size="lg" className="h-14 px-8 rounded-full text-lg shadow-[0_0_40px_rgba(108,92,231,0.4)] hover:shadow-[0_0_60px_rgba(108,92,231,0.6)] transition-all duration-300 bg-primary hover:bg-primary-glow text-primary-foreground border border-primary-glow/50 group w-full sm:w-auto relative overflow-hidden">
            <Link href="/contact">
              <span className="relative z-10 flex items-center">
                Start your journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-glow to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-14 px-8 rounded-full text-lg glass hover:bg-white/10 transition-colors duration-300 w-full sm:w-auto">
            <Link href="/work">Explore our work</Link>
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Scroll down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6 text-muted-foreground/70" />
        </motion.div>
      </motion.div>
    </section>
  );
};
