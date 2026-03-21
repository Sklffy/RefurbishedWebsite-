import React, { useEffect, useRef } from 'react';

export default function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEF';
    const fontSize = 13;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = Array(cols).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(8, 12, 20, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'hsl(187 92% 52% / 0.18)';
      ctx.font = `${fontSize}px JetBrains Mono, monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);
    window.addEventListener('resize', resize);
    return () => { 
      clearInterval(interval); 
      window.removeEventListener('resize', resize); 
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />
      {/* Fade overlays */}
      <div className="absolute inset-x-0 top-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to bottom, hsl(222 47% 6%), transparent)' }} />
      <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to top, hsl(222 47% 6%), transparent)' }} />
      <div className="absolute inset-y-0 left-0 w-32 pointer-events-none" style={{ background: 'linear-gradient(to left, transparent, hsl(222 47% 6%))' }} />
      <div className="absolute inset-y-0 right-0 w-32 pointer-events-none" style={{ background: 'linear-gradient(to right, transparent, hsl(222 47% 6%))' }} />
    </>
  );
}