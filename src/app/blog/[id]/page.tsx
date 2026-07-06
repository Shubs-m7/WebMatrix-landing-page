'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { apiRequest } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, Share2, Sparkles, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

import { getPosts } from '@/data/contentStore';

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    content: string;
    read_time?: string;
    published_at?: string;
    hero_image?: string;
    tags?: string[];
}

export default function BlogPostPage() {
    const { id } = useParams();
    const router = useRouter();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    useEffect(() => {
        if (id) loadPost(id as string);
    }, [id]);

    const loadPost = async (postId: string) => {
        try {
            setLoading(true);
            const data = await apiRequest<BlogPost>(`/api/posts/${postId}`);
            setPost(data);
        } catch (err) {
            console.warn('Failed to load post from API, using fallback data.', err);
            const staticPost = getPosts().find(p => p.id.toString() === postId);
            if (staticPost) {
                setPost({
                    id: staticPost.id.toString(),
                    title: staticPost.title,
                    excerpt: staticPost.excerpt,
                    category: staticPost.category,
                    content: staticPost.excerpt + '\n\n(This is a preview using mock data as the backend is unreachable.)',
                    tags: staticPost.tags,
                    read_time: staticPost.readTime,
                    published_at: staticPost.date,
                    hero_image: undefined,
                });
            } else {
                setError('Article not found.');
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin relative z-10" />
                </div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background p-4">
                <Card className="max-w-md w-full glass border-border/30 bg-card/40 text-center">
                    <CardContent className="p-12">
                        <div className="w-16 h-16 bg-destructive/20 rounded-2xl mx-auto flex items-center justify-center mb-6">
                            <AlertCircle className="h-8 w-8 text-destructive" />
                        </div>
                        <h1 className="text-3xl font-display font-bold mb-4 text-foreground">Oops!</h1>
                        <p className="text-muted-foreground mb-8 text-lg">{error || 'Something went wrong.'}</p>
                        <Button asChild size="lg" className="rounded-full shadow-glow">
                            <Link href="/blog">Back to Blog</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <article className="min-h-screen pb-24 bg-background relative overflow-hidden">
            {/* Immersive Mesh Gradient Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none fixed">
                <div className="absolute top-[20%] left-[-10%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-float" style={{ animationDuration: '20s' }}></div>
                <div className="absolute top-[60%] right-[-10%] w-[60vw] h-[60vw] bg-accent/10 rounded-full blur-[120px] mix-blend-screen opacity-40 animate-float" style={{ animationDuration: '25s', animationDelay: '2s' }}></div>
            </div>

            {/* Hero Section */}
            <div className="relative w-full h-[60vh] min-h-[500px] bg-black overflow-hidden z-0">
                <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
                    {post.hero_image ? (
                        <img
                            src={post.hero_image}
                            alt={post.title}
                            className="w-full h-full object-cover opacity-60"
                        />
                    ) : (
                        <div className="w-full h-full bg-[linear-gradient(45deg,var(--tw-gradient-stops))] from-primary/20 via-accent/10 to-primary/20 bg-[length:400%_400%] animate-gradient-xy opacity-50" />
                    )}
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
            </div>

            <div className="container mx-auto px-4 -mt-64 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-4xl mx-auto"
                >
                    <Button
                        variant="ghost"
                        asChild
                        className="mb-8 glass bg-background/20 hover:bg-background/40 backdrop-blur-md border border-border/30 rounded-full transition-all duration-300 group"
                    >
                        <Link href="/blog">
                            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Blog
                        </Link>
                    </Button>

                    <div className="space-y-6 mb-12">
                        <div className="flex flex-wrap items-center gap-4">
                            <Badge className="bg-primary/20 text-primary border-primary/30 text-sm px-4 py-1.5 uppercase tracking-wider font-semibold shadow-[0_0_15px_rgba(108,92,231,0.2)]">
                                {post.category}
                            </Badge>
                            {post.read_time && (
                                <div className="flex items-center text-sm text-muted-foreground font-medium bg-background/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-border/30">
                                    <Clock className="h-4 w-4 mr-2 text-accent" />
                                    {post.read_time}
                                </div>
                            )}
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/70 leading-[1.1] tracking-tighter drop-shadow-sm">
                            {post.title}
                        </h1>

                        <div className="flex items-center justify-between text-muted-foreground py-6 border-b border-border/30">
                            <div className="flex items-center gap-4">
                                {post.published_at && (
                                    <div className="flex items-center gap-2 font-medium">
                                        <Calendar className="h-4 w-4 text-primary" />
                                        <span>{new Date(post.published_at).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                                    </div>
                                )}
                            </div>
                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
                                <Share2 className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-3xl mx-auto"
                >
                    <div className="glass bg-card/30 border border-border/30 rounded-3xl p-8 md:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.2)] relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                        
                        <div className="prose prose-lg md:prose-xl dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-a:text-primary hover:prose-a:text-primary-glow prose-a:transition-colors prose-img:rounded-2xl prose-img:border prose-img:border-border/30 prose-hr:border-border/30 text-muted-foreground leading-relaxed">
                            <ReactMarkdown>{post.content}</ReactMarkdown>
                        </div>

                        {post.tags && post.tags.length > 0 && (
                            <div className="mt-16 pt-8 border-t border-border/30">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                                    <Sparkles className="h-4 w-4 text-accent" /> Tags
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map(tag => (
                                        <Badge key={tag} variant="outline" className="px-4 py-1.5 text-sm bg-background/50 border-border/50 text-foreground/80 hover:border-primary/50 hover:text-primary transition-colors cursor-pointer">
                                            #{tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </article>
    );
}
