'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Moon, Sun, ArrowRight, Home, Briefcase, Layers, MessageSquare, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Work', href: '/work' },
  { name: 'Services', href: '/services' },
  { name: 'Process', href: '/process' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

const mobileNavLinks = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Work', href: '/work', icon: Briefcase },
  { name: 'Services', href: '/services', icon: Layers },
  { name: 'Blog', href: '/blog', icon: Newspaper },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <>
      {/* Top Floating Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 pt-4 px-4 pointer-events-none"
      >
        <div className={`container mx-auto pointer-events-auto transition-all duration-500 rounded-2xl ${
          isScrolled
            ? 'glass py-3 px-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-border/30 backdrop-blur-xl bg-background/60'
            : 'bg-transparent py-4 px-2 lg:px-4'
        }`}>
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/"
                className="flex items-center gap-3 group"
                aria-label="WebMatrix Home"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                  <img
                    src="/favicon.ico"
                    alt="WebMatrix"
                    className={`relative transition-transform duration-300 group-hover:scale-110 ${
                      isScrolled ? 'h-9 w-9 sm:h-10 sm:w-10' : 'h-10 w-10 sm:h-12 sm:w-12'
                    }`}
                  />
                </div>
                <span className="text-xl sm:text-2xl font-furore font-bold text-gradient group-hover:opacity-90 transition-opacity">
                  WebMatrix
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group ${
                        isActive
                          ? 'text-primary'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <span className="relative z-10">{link.name}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute inset-0 bg-primary/20 rounded-lg border border-primary/30 shadow-[0_0_15px_rgba(108,92,231,0.3)]"
                          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      {!isActive && (
                        <div className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                aria-label="Toggle theme"
              >
                {!mounted ? (
                  <Sun className="h-5 w-5 opacity-0" />
                ) : theme === 'light' ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
              <Button
                asChild
                size="sm"
                className="rounded-full px-6 shadow-[0_0_20px_rgba(108,92,231,0.2)] hover:shadow-[0_0_40px_rgba(108,92,231,0.5)] transition-all duration-300 bg-primary hover:bg-primary-glow text-primary-foreground group"
              >
                <Link href="/contact">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            {/* Mobile Top Actions (Theme Toggle Only) */}
            <div className="flex lg:hidden items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full"
                aria-label="Toggle theme"
              >
                {!mounted ? (
                  <Sun className="h-5 w-5 opacity-0" />
                ) : theme === 'light' ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Navigation Menu Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm -z-10 lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-6 space-y-1 border-t border-border/50 mt-4">
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-3 mx-2 rounded-lg text-base font-medium transition-all duration-200 ${
                          isActive
                            ? 'text-primary bg-primary/10 border border-primary/20'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  className="px-4 pt-4"
                >
                  <Button
                    asChild
                    className="w-full h-14 rounded-xl text-lg shadow-[0_0_20px_rgba(108,92,231,0.2)] hover:shadow-[0_0_40px_rgba(108,92,231,0.5)] transition-all duration-300 bg-primary hover:bg-primary-glow text-primary-foreground group"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link href="/contact">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-6 left-4 right-4 z-50 pointer-events-none">
        <nav className="pointer-events-auto glass rounded-2xl border border-border/30 shadow-[0_8px_32px_rgba(0,0,0,0.3)] px-6 py-4 flex items-center justify-between backdrop-blur-xl bg-background/80">
          {mobileNavLinks.map((link, index) => {
            const isActive = pathname === link.href && !isOpen;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex flex-col items-center gap-1 relative ${
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                } transition-colors duration-300`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'drop-shadow-[0_0_8px_rgba(108,92,231,0.5)]' : ''}`} />
                <span className="text-[10px] font-medium">{link.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeBottomNav"
                    className="absolute -bottom-2 w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_rgba(108,92,231,0.8)]"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex flex-col items-center gap-1 relative ${
              isOpen ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            } transition-colors duration-300`}
          >
            {isOpen ? <X className="h-5 w-5 drop-shadow-[0_0_8px_rgba(108,92,231,0.5)]" /> : <Menu className="h-5 w-5" />}
            <span className="text-[10px] font-medium">Menu</span>
            {isOpen && (
              <motion.div
                layoutId="activeBottomNav"
                className="absolute -bottom-2 w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_rgba(108,92,231,0.8)]"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        </nav>
      </div>
    </>
  );
};
