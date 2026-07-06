'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Loader2, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { apiRequest } from '@/lib/api';
import { DevicePreview } from '@/components/ui/device-preview';
import { useEffect, useState } from 'react';

type ApiProject = {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[] | null;
  image: string;
  mobile_image: string | null;
  gallery: string[] | null;
  metrics: { improvement: string; metric: string } | null;
  long_description: string | null;
  website_url: string | null;
  video_src: string | null;
  is_featured: boolean | null;
  featured_order: number | null;
};

type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  mobileImage?: string;
  gallery?: string[];
  metrics?: { improvement: string; metric: string };
  longDescription?: string;
  websiteUrl?: string;
  videoSrc?: string;
  isFeatured: boolean;
  featuredOrder: number | null;
};

import { projects as staticProjects } from '@/data/projects';
import { adaptStaticProject } from '@/utils/project-adapters';

export default function WorkPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await apiRequest<ApiProject[]>('/api/projects', { method: 'GET' });
        const mappedProjects: Project[] = (data || []).map((p) => ({
          id: p.id,
          title: p.title,
          description: p.description,
          category: p.category,
          tags: p.tags ?? [],
          image: p.image,
          mobileImage: p.mobile_image ?? undefined,
          gallery: p.gallery ?? undefined,
          metrics: p.metrics ?? undefined,
          longDescription: p.long_description ?? undefined,
          websiteUrl: p.website_url ?? undefined,
          videoSrc: p.video_src ?? undefined,
          isFeatured: Boolean(p.is_featured),
          featuredOrder: p.featured_order,
        }));
        setProjects(mappedProjects);
      } catch (err) {
        console.warn('Failed to load projects from API, using fallback data.', err);
        const fallbackProjects = staticProjects.map((p, i) => adaptStaticProject(p, i) as unknown as Project);
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-background">
        <div className="text-center relative">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
          <Loader2 className="h-12 w-12 animate-spin text-primary relative z-10" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-background">
      {/* Immersive Mesh Gradient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[-10%] w-[50vw] h-[50vw] bg-primary/15 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-float" style={{ animationDuration: '15s' }}></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[60vw] h-[60vw] bg-accent/15 rounded-full blur-[120px] mix-blend-screen opacity-40 animate-float" style={{ animationDuration: '20s', animationDelay: '2s' }}></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-background/10 via-background/90 to-background" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass border border-primary/30 text-sm font-medium mb-8 shadow-glow"
          >
            <Sparkles className="h-4 w-4 text-accent animate-pulse" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Selected Works
            </span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl lg:text-display-lg font-display font-black tracking-tighter mb-8 leading-[1.1]">
            Our <span className="relative whitespace-nowrap">
              <span className="absolute -inset-1 bg-gradient-to-r from-primary to-accent blur-2xl opacity-40"></span>
              <span className="relative text-gradient">Portfolio</span>
            </span>
          </h1>
          <p className="text-muted-foreground text-xl md:text-2xl font-light leading-relaxed">
            Explore our curated selection of digital experiences, crafted with precision and passion.
          </p>
        </motion.div>

        {projects.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 glass rounded-3xl border border-border/30 max-w-2xl mx-auto"
          >
            <p className="text-xl text-muted-foreground">No projects available at the moment.</p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: (index % 2) * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href={`/work/${project.id}`}>
                  <Card className="group overflow-hidden border-border/30 bg-card/40 hover:bg-card/60 transition-all duration-500 hover:shadow-glow hover:-translate-y-2 h-full flex flex-col relative glass">
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                    
                    <div className="aspect-[16/10] relative overflow-hidden bg-black/50 p-6 flex items-center justify-center z-10">
                      <div className="w-full transform group-hover:scale-[1.02] transition-transform duration-700 ease-out">
                        <DevicePreview
                          desktopImage={project.image}
                          mobileImage={project.mobileImage}
                          title={project.title}
                          className="mx-auto"
                          display="both"
                        />
                      </div>
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />
                      
                      <div className="absolute top-6 right-6">
                        <div className="w-12 h-12 rounded-full bg-background/50 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 border border-border/50">
                          <ExternalLink className="h-5 w-5 text-foreground" />
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-8 relative z-10 flex-grow flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-display font-bold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent transition-all duration-300">
                          {project.title}
                        </h3>
                      </div>
                      
                      <p className="text-muted-foreground mb-6 line-clamp-2 text-lg">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-primary/5 hover:bg-primary/10 border-primary/20 text-foreground/80 font-medium">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {project.metrics && (
                        <div className="mt-auto pt-6 border-t border-border/30 flex items-center justify-between">
                          <div>
                            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                              {project.metrics.improvement}
                            </div>
                            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mt-1">
                              {project.metrics.metric}
                            </div>
                          </div>
                          <div className="text-primary font-medium flex items-center group/link">
                            Case Study
                            <ArrowRight className="ml-2 h-4 w-4 transform group-hover/link:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
