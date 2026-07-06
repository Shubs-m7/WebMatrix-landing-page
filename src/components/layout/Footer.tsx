'use client';

import Link from 'next/link';
import { Mail } from 'lucide-react';

// GitHub icon component (replacement for deprecated Github icon)
const GitHubIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

// LinkedIn icon component (replacement for deprecated Linkedin icon)
const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// X.com logo component
const XIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Instagram icon component
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-background border-t border-border/30">
      {/* Immersive mesh glow for footer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-[-20%] left-[20%] w-[40vw] h-[40vw] bg-primary/10 rounded-full blur-[100px] mix-blend-screen opacity-40"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[30vw] h-[30vw] bg-accent/10 rounded-full blur-[100px] mix-blend-screen opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-12 lg:col-span-4">
            <h3 className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-6 inline-block">WebMatrix</h3>
            <p className="text-base text-muted-foreground mb-8 leading-relaxed max-w-sm">
              Crafting premium digital experiences through immersive design, modern web technologies, and seamless animations.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/WebMatrix-Technology?tab=repositories" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-card/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300">
                <GitHubIcon className="h-4 w-4" />
              </a>
              <a href="https://x.com/Webmatrix_Tech" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-card/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300">
                <XIcon className="h-4 w-4" />
              </a>
              <a href="https://www.linkedin.com/in/webmatrix-technologies-951652392" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-card/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/50 hover:bg-accent/10 transition-all duration-300">
                <LinkedInIcon className="h-4 w-4" />
              </a>
              <a href="https://www.instagram.com/webmatrix_technologies" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-card/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300">
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a href="mailto:webmatrix.work@gmail.com"
                className="w-10 h-10 rounded-full bg-card/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/50 hover:bg-accent/10 transition-all duration-300">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-4 lg:col-span-2 lg:col-start-6">
            <h4 className="font-display font-semibold mb-6 text-foreground tracking-wide uppercase text-sm">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-primary transition-all duration-300" />About Us</Link></li>
              <li><Link href="/work" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-primary transition-all duration-300" />Our Work</Link></li>
              <li><Link href="/process" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-primary transition-all duration-300" />The Process</Link></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-primary transition-all duration-300" />Insights</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1 md:col-span-4 lg:col-span-2">
            <h4 className="font-display font-semibold mb-6 text-foreground tracking-wide uppercase text-sm">Services</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/services" className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-accent transition-all duration-300" />Web Design</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-accent transition-all duration-300" />Development</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-accent transition-all duration-300" />3D & WebGL</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-accent transition-all duration-300" />Performance</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1 md:col-span-4 lg:col-span-3">
            <h4 className="font-display font-semibold mb-6 text-foreground tracking-wide uppercase text-sm">Get in Touch</h4>
            <ul className="space-y-4 text-sm text-muted-foreground mb-8">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                webmatrix.work@gmail.com
              </li>
            </ul>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center h-12 px-6 rounded-xl text-sm font-bold shadow-[0_0_20px_rgba(108,92,231,0.2)] hover:shadow-[0_0_40px_rgba(108,92,231,0.5)] transition-all duration-300 bg-primary hover:bg-primary-glow text-primary-foreground group"
            >
              Start a Project
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} WebMatrix. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
