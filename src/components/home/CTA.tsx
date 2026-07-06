'use client';

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, MessageSquare, Sparkles } from 'lucide-react';

export const CTA = () => {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  const springConfig = { stiffness: 300, damping: 20 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  
  // 3D tilt for the massive container
  const rotateX = useTransform(y, [0, 1], [3, -3]);
  const rotateY = useTransform(x, [0, 1], [-3, 3]);

  // Translate background orbs inversely for parallax
  const orbX = useTransform(x, [0, 1], [30, -30]);
  const orbY = useTransform(y, [0, 1], [30, -30]);
  const orbXReverse = useTransform(x, [0, 1], [-40, 40]);
  const orbYReverse = useTransform(y, [0, 1], [-40, 40]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <section className="py-32 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 relative z-10" style={{ perspective: 1200 }}>
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative overflow-hidden rounded-[3rem] p-8 md:p-12 lg:p-24 text-center border border-primary/20 bg-card/10 backdrop-blur-3xl shadow-[0_0_100px_rgba(108,92,231,0.15)] group will-change-transform"
          >
            {/* Animated Background Orbs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full overflow-hidden z-0 rounded-[3rem]" style={{ transform: "translateZ(-20px)" }}>
              <motion.div style={{ x: orbX, y: orbY }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[100px] animate-pulse pointer-events-none group-hover:scale-110 group-hover:bg-primary/30 transition-all duration-1000" />
              <motion.div style={{ x: orbXReverse, y: orbYReverse }} className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[80px] animate-float pointer-events-none" />
              <motion.div style={{ x: orbX, y: orbYReverse, animationDelay: '2s' }} className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[80px] animate-float pointer-events-none" />
              
              {/* Grid Pattern Overlay */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50 mask-image-[radial-gradient(ellipse_at_center,black,transparent)] pointer-events-none" />
            </div>

            <div className="relative z-10 flex flex-col items-center" style={{ transform: "translateZ(40px)" }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-sm font-medium text-primary shadow-[0_0_20px_rgba(108,92,231,0.2)]">
                  <Sparkles className="h-4 w-4" />
                  Let's Build the Future
                </span>
              </motion.div>

              <h2 className="text-4xl md:text-6xl lg:text-display-md font-display font-black text-foreground mb-6 max-w-4xl tracking-tight">
                Ready to create something <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient-x">extraordinary?</span>
              </h2>
              
              <p className="text-muted-foreground text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                Partner with us to transform your vision into an award-winning digital experience that drives real business results.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto">
                <Button asChild size="lg" className="h-16 px-10 rounded-full text-lg shadow-[0_0_40px_rgba(108,92,231,0.5)] hover:shadow-[0_0_60px_rgba(108,92,231,0.7)] transition-all duration-300 bg-primary hover:bg-primary-glow text-primary-foreground group w-full sm:w-auto relative overflow-hidden border border-primary-glow/50">
                  <Link href="/contact">
                    <span className="relative z-10 flex items-center">
                      <MessageSquare className="mr-3 h-5 w-5" />
                      Start a Project
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-glow to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-16 px-10 rounded-full text-lg glass border-border/50 hover:bg-white/10 transition-colors duration-300 w-full sm:w-auto group">
                  <Link href="/work">
                    View Our Work
                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
