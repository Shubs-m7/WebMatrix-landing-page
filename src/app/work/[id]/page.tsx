'use client';

import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiRequest } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Loader2, Target, Zap, Layout } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import NotFound from '../../not-found';
import { PreviewModes } from '@/components/work/PreviewModes';
import { MediaSlider } from '@/components/ui/media-slider';
import { projects as staticProjects } from '@/data/projects';
import { adaptStaticProject } from '@/utils/project-adapters';

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

export default function WorkDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  return <WorkDetailContent id={id} />;
}

function WorkDetailContent({ id }: { id: string }) {
  const [previewMode, setPreviewMode] = useState<'both' | 'desktop' | 'mobile' | 'video'>(
    'both'
  );
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await apiRequest<ApiProject>(`/api/projects/${id}`, { method: 'GET' });
        const mappedProject: Project = {
          id: data.id,
          title: data.title,
          description: data.description,
          category: data.category,
          tags: data.tags ?? [],
          image: data.image,
          mobileImage: data.mobile_image ?? undefined,
          gallery: data.gallery ?? undefined,
          metrics: data.metrics ?? undefined,
          longDescription: data.long_description ?? undefined,
          websiteUrl: data.website_url ?? undefined,
          videoSrc: data.video_src ?? undefined,
          isFeatured: Boolean(data.is_featured),
          featuredOrder: data.featured_order,
        };
        setProject(mappedProject);
      } catch (err) {
        console.warn('Failed to load project from API, using fallback. Error:', err instanceof Error ? err.message : String(err));
        const staticIndex = staticProjects.findIndex(p => p.id.toString() === id);
        if (staticIndex >= 0) {
          const fallbackProject = adaptStaticProject(staticProjects[staticIndex], staticIndex);
          setProject(fallbackProject as unknown as Project);
        } else {
          setProject(null);
        }
      } finally {
        setLoading(false);
      }
    };
    loadProject();
  }, [id]);

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

  if (!project) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-background">
      {/* Immersive Mesh Gradient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[0%] left-[20%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-float" style={{ animationDuration: '15s' }}></div>
        <div className="absolute bottom-[20%] right-[10%] w-[60vw] h-[60vw] bg-accent/10 rounded-full blur-[120px] mix-blend-screen opacity-40 animate-float" style={{ animationDuration: '20s', animationDelay: '2s' }}></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-background/10 via-background/90 to-background" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button variant="outline" asChild className="glass border-border/30 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300">
            <Link href="/work">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Work
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 max-w-4xl"
        >
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 text-sm px-4 py-1.5 uppercase tracking-wider font-semibold">
            {project.category}
          </Badge>
          <h1 className="text-5xl md:text-6xl lg:text-display-lg font-display font-black tracking-tighter mb-6 leading-[1.1]">
            <span className="relative whitespace-nowrap">
              <span className="absolute -inset-1 bg-gradient-to-r from-primary to-accent blur-2xl opacity-40"></span>
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/70">{project.title}</span>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl">
            {project.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-accent/5 to-transparent rounded-3xl blur-2xl opacity-50" />
          <div className="relative p-[1px] rounded-3xl overflow-hidden glass border-border/30 bg-card/30">
            <PreviewModes
              desktopImage={project.image}
              mobileImage={project.mobileImage}
              videoSrc={project.videoSrc}
              title={project.title}
              mode={previewMode}
              onModeChange={setPreviewMode}
              className="max-w-6xl mx-auto"
              showDevicePreview={previewMode !== 'video'}
            />
          </div>
        </motion.div>

        {project.gallery && project.gallery.length > 0 && (previewMode === 'desktop' || previewMode === 'mobile') && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <div className={previewMode === 'mobile' ? 'max-w-[420px] mx-auto' : 'max-w-6xl mx-auto'}>
              <div className="p-4 rounded-3xl glass border border-border/30 bg-card/20 backdrop-blur-xl">
                <MediaSlider
                  media={project.gallery
                    .filter(src => {
                      const s = src.toLowerCase();
                      const isMobileName = s.includes('mobile') || s.includes('phone') || s.endsWith('-m.png') || s.endsWith('-m.jpg') || s.endsWith('-mobile.png') || s.endsWith('-mobile.jpg');
                      return previewMode === 'mobile' ? isMobileName : !isMobileName;
                    })
                    .map(src => ({ type: 'image' as const, src }))}
                  interval={4000}
                />
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-primary/20">
                <Layout className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-4xl font-display font-bold text-gradient">Project Overview</h2>
            </div>
            
            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed p-8 rounded-3xl glass border-border/30 bg-card/30">
              <p>{project.longDescription || 'No detailed description available.'}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-1"
          >
            <Card className="glass border-border/30 bg-card/40 sticky top-32 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {project.metrics && (
                <div className="p-8 border-b border-border/30 relative z-10 bg-gradient-to-br from-primary/10 to-transparent">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-display font-bold uppercase tracking-wider text-foreground">Key Result</h3>
                  </div>
                  <div>
                    <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">
                      {project.metrics.improvement}
                    </div>
                    <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      {project.metrics.metric}
                    </div>
                  </div>
                </div>
              )}

              <CardContent className="p-8 relative z-10">
                <h4 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-accent" />
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="bg-background/50 border-border/50 text-muted-foreground/80 hover:border-primary/50 hover:text-foreground transition-colors py-1.5 px-3">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {project.websiteUrl && (
                  <Button asChild className="w-full h-14 rounded-xl text-lg shadow-[0_0_20px_rgba(108,92,231,0.2)] hover:shadow-[0_0_40px_rgba(108,92,231,0.4)] transition-all duration-300 bg-primary hover:bg-primary-glow text-primary-foreground group/btn">
                    <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer">
                      <span className="flex items-center">
                        Visit Live Site
                        <ExternalLink className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </span>
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
