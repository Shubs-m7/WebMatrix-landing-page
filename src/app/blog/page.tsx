'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { apiRequest } from '@/lib/api';

import { getPosts } from '@/data/contentStore';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  read_time?: string;
  published_at?: string;
  hero_image?: string;
}

export default function BlogPage() {
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await apiRequest<BlogPost[]>('/api/posts', { method: 'GET' });
      setArticles(data || []);
    } catch (err) {
      console.warn('Failed to load posts from API, using fallback data.', err);
      const fallbackPosts = getPosts().map(p => ({
        id: p.id.toString(),
        title: p.title,
        excerpt: p.excerpt,
        category: p.category,
        tags: p.tags,
        read_time: p.readTime,
        published_at: p.date,
        hero_image: undefined,
      }));
      setArticles(fallbackPosts);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-background">
      {/* Immersive Mesh Gradient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[5%] left-[5%] w-[40vw] h-[40vw] bg-primary/20 rounded-full blur-[100px] mix-blend-screen opacity-50 animate-float" style={{ animationDuration: '14s' }}></div>
        <div className="absolute bottom-[20%] right-[5%] w-[50vw] h-[50vw] bg-accent/15 rounded-full blur-[120px] mix-blend-screen opacity-40 animate-float" style={{ animationDuration: '18s', animationDelay: '1s' }}></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background/10 via-background/80 to-background" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass border border-primary/30 text-sm font-medium mb-8 shadow-glow"
          >
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Insights & Articles
            </span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl lg:text-display-lg font-display font-black tracking-tighter mb-8 leading-[1.1]">
            Our <span className="relative whitespace-nowrap">
              <span className="absolute -inset-1 bg-gradient-to-r from-primary to-accent blur-2xl opacity-40"></span>
              <span className="relative text-gradient">Blog</span>
            </span>
          </h1>
          <p className="text-muted-foreground text-xl md:text-2xl font-light leading-relaxed">
            Thoughts, tutorials, and deep dives into modern web development and design.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full animate-pulse" />
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin relative z-10" />
            </div>
          </div>
        ) : articles.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 glass rounded-3xl border border-border/30 max-w-2xl mx-auto bg-card/30"
          >
            <p className="text-xl text-muted-foreground">No blog posts published yet. Check back soon!</p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <Link href={`/blog/${article.id}`}>
                  <Card className="h-full glass border-border/30 hover:border-primary/50 transition-all duration-500 hover:shadow-glow hover:-translate-y-2 overflow-hidden bg-card/40 flex flex-col relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="aspect-[16/10] bg-zinc-900 relative overflow-hidden group-hover:bg-zinc-800 transition-colors duration-500 z-10 border-b border-border/30">
                      {article.hero_image ? (
                        <img 
                          src={article.hero_image} 
                          alt={article.title} 
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out opacity-80 group-hover:opacity-100" 
                        />
                      ) : (
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,var(--tw-gradient-stops))] from-primary/20 via-accent/20 to-primary/20 bg-[length:400%_400%] animate-gradient-xy opacity-60" />
                      )}
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />
                      
                      <div className="absolute top-4 left-4 z-20">
                        <Badge className="bg-background/80 backdrop-blur-md border-primary/30 text-foreground font-medium shadow-glow">
                          {article.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-8 flex flex-col flex-grow relative z-10">
                      <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent transition-all duration-300 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {article.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs border-border/50 text-muted-foreground/80 group-hover:border-primary/30 group-hover:text-foreground/80 transition-colors">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-xs font-medium text-muted-foreground pt-4 border-t border-border/30 mt-auto">
                        {article.published_at && (
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4 text-primary/70" />
                            <span>{new Date(article.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5">
                          {article.read_time ? (
                            <>
                              <Clock className="h-4 w-4 text-accent/70" />
                              <span>{article.read_time}</span>
                            </>
                          ) : (
                            <span className="text-primary group-hover:translate-x-1 transition-transform flex items-center">
                              Read More <ArrowRight className="ml-1 h-3 w-3" />
                            </span>
                          )}
                        </div>
                      </div>
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
