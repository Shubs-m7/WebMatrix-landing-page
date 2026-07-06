// src/components/home/FeaturedWork.tsx

'use client';

import React, { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ExternalLink, RefreshCw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DevicePreview } from '@/components/ui/device-preview';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useProjects, type Project } from '@/hooks/useProjects';
import { projects as staticProjects } from '@/data/projects';
import { adaptStaticProject } from '@/utils/project-adapters';

const getFallbackProjects = (limit: number): Project[] =>
  [...staticProjects]
    .map((project, index) => ({ project, index }))
    .sort((a, b) => {
      const orderA = typeof a.project.featuredOrder === 'number' ? a.project.featuredOrder : a.index + 1000;
      const orderB = typeof b.project.featuredOrder === 'number' ? b.project.featuredOrder : b.index + 1000;
      return orderA - orderB;
    })
    .slice(0, limit)
    .map(({ project }, index) => adaptStaticProject(project, index));

const FeaturedProjectSkeleton = () => (
  <Card className="h-full overflow-hidden border border-border/40 dark:border-white/5 bg-card dark:bg-[#050505] rounded-3xl flex flex-col shadow-lg dark:shadow-none">
    <div className="p-4 pb-0">
      <div className="aspect-[4/3] rounded-2xl bg-muted/40 dark:bg-white/5 animate-pulse" />
    </div>
    <CardContent className="p-8 space-y-6 flex-1 flex flex-col">
      <div>
        <Skeleton className="h-4 w-20 bg-muted/40 dark:bg-white/5 mb-3" />
        <Skeleton className="h-8 w-3/4 bg-muted/40 dark:bg-white/5" />
      </div>
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-full bg-muted/40 dark:bg-white/5" />
        <Skeleton className="h-4 w-5/6 bg-muted/40 dark:bg-white/5" />
      </div>
      <div className="flex gap-4 mt-auto">
        <Skeleton className="h-4 w-16 bg-muted/40 dark:bg-white/5" />
        <Skeleton className="h-4 w-20 bg-muted/40 dark:bg-white/5" />
      </div>
    </CardContent>
  </Card>
);

const TiltProjectCard = ({ project, index }: { project: Project, index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  const springConfig = { stiffness: 300, damping: 20 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  
  const rotateX = useTransform(y, [0, 1], [5, -5]);
  const rotateY = useTransform(x, [0, 1], [-5, 5]);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  const watermarkY = useTransform(scrollYProgress, [0, 1], [30, -30]);

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
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1200 }}
      className="h-full"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="h-full relative will-change-transform"
      >
        <Link href={`/work/${project.id}`} className="block h-full outline-none">
          <Card className="group overflow-hidden border border-border/40 dark:border-white/5 bg-card dark:bg-[#050505] hover:border-primary/30 dark:hover:border-white/10 transition-colors duration-500 rounded-3xl h-full flex flex-col relative z-0 shadow-xl dark:shadow-2xl">
            <div className="p-4 pb-0" style={{ transform: "translateZ(30px)" }}>
              <div className="relative aspect-video sm:aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 to-transparent dark:from-white/5 border border-border/30 dark:border-white/5 flex items-center justify-center p-4 sm:p-6 md:p-8 group-hover:scale-[1.02] transition-transform duration-700 ease-out">
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="w-full relative drop-shadow-2xl z-10 transform group-hover:scale-105 transition-transform duration-1000 ease-out">
                  <DevicePreview
                    desktopImage={project.image}
                    mobileImage={project.mobileImage}
                    title={project.title}
                    className="mx-auto"
                    display="both"
                  />
                </div>

                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20">
                  <div className="bg-background/80 backdrop-blur-md p-1.5 sm:p-2 rounded-full border border-border/50 dark:border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 shadow-lg">
                    <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                  </div>
                </div>
              </div>
            </div>
            
            <CardContent className="p-6 md:p-8 flex-1 flex flex-col relative overflow-hidden" style={{ transform: "translateZ(20px)" }}>
              {/* Giant Number Watermark with Parallax */}
              <motion.div 
                style={{ y: watermarkY }}
                className="absolute -right-4 -bottom-4 text-[80px] md:text-[120px] font-black text-foreground/[0.03] dark:text-white/[0.02] leading-none pointer-events-none font-display"
              >
                0{index + 1}
              </motion.div>

              <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-3 sm:gap-0 mb-6 relative z-10">
                <div>
                  <div className="text-primary text-xs sm:text-sm font-medium mb-1 sm:mb-2">{project.category}</div>
                  <h3 className="text-xl sm:text-2xl font-display font-semibold text-foreground/90 group-hover:text-foreground dark:group-hover:text-white transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>
                {project.metrics && (
                  <div className="text-left sm:text-right">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium mb-1">{project.metrics.metric}</div>
                    <div className="inline-block text-xs sm:text-sm font-bold text-foreground dark:text-white bg-primary/10 dark:bg-white/5 px-2 sm:px-3 py-1 rounded-full border border-primary/20 dark:border-white/10">
                      {project.metrics.improvement}
                    </div>
                  </div>
                )}
              </div>

              <p className="text-muted-foreground font-light leading-relaxed mb-8 flex-1 relative z-10">
                {project.description}
              </p>
              
              <div className="mt-auto relative z-10">
                <div className="flex flex-wrap gap-x-4 gap-y-2 mb-8 text-xs text-muted-foreground/70">
                  {project.tags.map((tag) => (
                    <span key={tag} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-2 text-sm font-medium text-foreground dark:text-white group-hover:text-primary transition-colors duration-300 cursor-pointer">
                  View Case Study
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export const FeaturedWork = () => {
  const maxProjects = 3;
  const fallbackProjects = useMemo(() => getFallbackProjects(maxProjects), []);

  const { projects: projectsToShow, isLoading, isError, error, isFallback, refetch } = useProjects({
    featuredOnly: false,
    limit: maxProjects,
    order: 'admin',
    fallback: fallbackProjects,
  });

  const hasProjects = projectsToShow.length > 0;
  const skeletonCount = Math.max(projectsToShow.length || fallbackProjects.length || 6, 3);

  return (
    <section className="py-32 bg-background relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-display-sm font-display font-bold mb-6">
            Featured <span className="text-gradient">Work</span>
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-light">
            Explore our newest projects showcasing cutting-edge web experiences and digital products.
          </p>
        </motion.div>

        {isFallback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 rounded-lg border border-border/30 glass px-6 py-4 text-sm text-muted-foreground shadow-sm max-w-3xl mx-auto text-center"
          >
            We&apos;re showing a curated selection while we reconnect to the live portfolio.
          </motion.div>
        )}

        {isError && !hasProjects && (
          <div className="mb-12 flex flex-col items-center justify-center gap-4 rounded-lg border border-destructive/40 bg-destructive/10 p-6 text-center max-w-3xl mx-auto glass">
            <div className="text-destructive font-medium">We couldn&apos;t load our featured projects.</div>
            <p className="text-sm text-muted-foreground">
              {error ?? 'Please try again in a moment or view all projects from the work page.'}
            </p>
            <Button variant="outline" size="sm" onClick={refetch} className="inline-flex items-center gap-2 mt-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        )}

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {isLoading
            ? Array.from({ length: skeletonCount }).map((_, index) => (
              <motion.div
                key={`skeleton-${index}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <FeaturedProjectSkeleton />
              </motion.div>
            ))
            : projectsToShow.map((project, index) => (
              <TiltProjectCard key={project.id} project={project} index={index} />
            ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <Button asChild size="lg" variant="outline" className="h-14 px-8 rounded-full text-lg glass hover:bg-white/5 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.1)] group">
            <Link href="/work">
              View All Projects
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};