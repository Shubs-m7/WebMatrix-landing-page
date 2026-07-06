'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import './scene3d.css';

export const Scene3D = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Track mouse position and rotation
    let mouseX = -1000;
    let mouseY = -1000;
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    
    // Set canvas size (larger than screen so edges don't show when rotated)
    const resizeCanvas = () => {
      canvas.width = window.innerWidth * 1.5;
      canvas.height = window.innerHeight * 1.5;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const handleMouseMove = (e: MouseEvent) => {
      // Mouse position relative to canvas for the matrix interaction
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      // 3D rotation based on mouse position relative to center of screen
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Rotate up to 25 degrees for a very strong 3D effect
      targetRotY = ((e.clientX - centerX) / centerX) * 25;
      targetRotX = -((e.clientY - centerY) / centerY) * 25;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
      targetRotX = 0;
      targetRotY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Matrix configuration
    const fontSize = 22; // Slightly larger font size
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);
    const dropSpeeds: number[] = Array(columns).fill(1);
    
    // Coding characters
    const chars = '01{}</>[]();.,/*+-=@#$%&|~абвгдежзийклмнопрстуфхцчшщъыьэюяABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    // Animation loop
    const draw = () => {
      // Smooth out the 3D rotation interpolation
      currentRotX += (targetRotX - currentRotX) * 0.05;
      currentRotY += (targetRotY - currentRotY) * 0.05;
      
      // Apply 3D transform directly to bypass React renders for smooth 60fps
      if (canvasRef.current) {
         canvasRef.current.style.transform = `translate(-50%, -50%) translate3d(0, 0, -100px) rotateX(${currentRotX}deg) rotateY(${currentRotY}deg)`;
      }

      ctx.fillStyle = theme === 'dark' 
        ? 'rgba(0, 0, 0, 0.15)' 
        : 'rgba(255, 255, 255, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;
      ctx.textAlign = 'center';
      
      for (let i = 0; i < drops.length; i++) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        const dx = mouseX - x;
        const dy = mouseY - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxInfluence = 300; // Huge interactive radius
        
        // Mouse proximity speeds up drops and adds glow
        if (distance < maxInfluence) {
          const influence = 1 - (distance / maxInfluence);
          dropSpeeds[i] = 1 + influence * 5; 
          
          const glowSize = fontSize * (1 + influence * 4);
          ctx.save();
          ctx.globalAlpha = influence * 0.5;
          ctx.fillStyle = theme === 'dark' ? 'rgba(25, 210, 100, 0.8)' : 'rgba(38, 112, 232, 0.7)';
          ctx.fillRect(x - glowSize/2, y - glowSize/2, glowSize, glowSize);
          ctx.restore();
        } else {
          dropSpeeds[i] = Math.max(0.8, dropSpeeds[i] * 0.95);
        }
        
        const char = chars[Math.floor(Math.random() * chars.length)];
        let color;
        const alpha = theme === 'dark' ? 1 : 1; // Full alpha for light mode as well
        
        if (distance < maxInfluence / 2) {
          // Bright Accent (Green) near mouse
          color = theme === 'dark'
            ? `rgba(25, 255, 120, ${(0.95 + Math.random() * 0.05) * alpha})`
            : `rgba(25, 210, 100, ${(0.95 + Math.random() * 0.05) * alpha})`; // Accent
        } else if (distance < maxInfluence) {
          // Primary (Blue) in medium range
          color = theme === 'dark'
            ? `rgba(60, 140, 255, ${(0.85 + Math.random() * 0.15) * alpha})`
            : `rgba(38, 112, 232, ${(0.85 + Math.random() * 0.15) * alpha})`; // Primary
        } else if (Math.random() > 0.95) {
          // Bright highlights
          color = theme === 'dark'
            ? `rgba(25, 255, 120, ${(0.9 + Math.random() * 0.1) * alpha})`
            : `rgba(38, 112, 232, ${(0.9 + Math.random() * 0.1) * alpha})`; // Primary highlight
        } else {
          // Base matrix color (Subtle Blue)
          color = theme === 'dark'
            ? `rgba(38, 112, 232, ${(0.4 + Math.random() * 0.3) * alpha})`
            : `rgba(38, 112, 232, ${(0.5 + Math.random() * 0.3) * alpha})`; // Vibrant primary base for light mode
        }
        
        ctx.fillStyle = color;
        
        // 3D pop effect for characters near cursor
        if (distance < maxInfluence / 2) {
          const influence = 1 - (distance / (maxInfluence / 2));
          const scale = 1 + influence * 2.2; // Massive pop effect
          ctx.save();
          ctx.font = `bold ${fontSize * scale}px monospace`;
          ctx.shadowBlur = 15 * influence;
          ctx.shadowColor = color;
          ctx.fillText(char, x, y);
          ctx.restore();
        } else {
          ctx.fillText(char, x, y);
        }
        
        // Reset drop to top randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        // Move drop down
        drops[i] += dropSpeeds[i];
      }
    };

    const interval = setInterval(draw, 40);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [theme]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full bg-white dark:bg-black transition-colors duration-300 absolute inset-0 overflow-hidden"
      style={{ perspective: '800px' }}
    >
      <canvas
        ref={canvasRef}
        className="scene3d-canvas absolute top-1/2 left-1/2 will-change-transform"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: 'translate(-50%, -50%) translate3d(0, 0, -100px)'
        }}
      />
    </div>
  );
};
