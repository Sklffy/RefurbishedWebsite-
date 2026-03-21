import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, FileText, Mail, Terminal, Wifi, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MatrixRain from './MatrixRain';
import GlitchText from './GlitchText';
import { useNavigate } from 'react-router-dom';

const phrases = [
  "Cybersecurity Student",
  "Blue Team Defender",
  "CTF Competitor",
  "Ethical Hacker in Training",
];

export default function HeroSection() {
  const [text, setText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const phrase = phrases[phraseIdx];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(phrase.substring(0, charIdx + 1));
        setCharIdx(charIdx + 1);
        if (charIdx + 1 === phrase.length) setTimeout(() => setIsDeleting(true), 1800);
      } else {
        setText(phrase.substring(0, charIdx - 1));
        setCharIdx(charIdx - 1);
        if (charIdx - 1 === 0) {
          setIsDeleting(false);
          setPhraseIdx((phraseIdx + 1) % phrases.length);
        }
      }
    }, isDeleting ? 40 : 90);
    return () => clearTimeout(timeout);
  }, [charIdx, isDeleting, phraseIdx]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Matrix rain with edge fades */}
      <div className="absolute inset-0 z-0">
        <MatrixRain />
        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-64 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, hsl(222 47% 6%))' }} />
        {/* Top fade */}
        <div className="absolute inset-x-0 top-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to top, transparent, hsl(222 47% 6%))' }} />
        {/* Left fade */}
        <div className="absolute inset-y-0 left-0 w-32 pointer-events-none" style={{ background: 'linear-gradient(to left, transparent, hsl(222 47% 6%))' }} />
        {/* Right fade */}
        <div className="absolute inset-y-0 right-0 w-32 pointer-events-none" style={{ background: 'linear-gradient(to right, transparent, hsl(222 47% 6%))' }} />
      </div>

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
        }}
      />

      {/* Neon glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-primary/6 rounded-full blur-3xl" />
      </div>

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.04] z-10"
        style={{
          backgroundImage: 'linear-gradient(hsl(187 92% 52%) 1px, transparent 1px), linear-gradient(90deg, hsl(187 92% 52%) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-32 pb-20 flex flex-col items-center text-center">

        {/* Terminal badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-primary/40 rounded bg-primary/5 mb-8 font-mono text-xs text-primary tracking-widest shadow-lg shadow-primary/10">
            <Terminal className="w-3 h-3" />
            <button
              onClick={() => navigate('/admin-login')}
              className="hover:text-primary/60 transition-colors cursor-pointer"
              title="Admin access"
            >root</button>
            <span>@portfolio:~$</span>
            <span className="text-foreground/60 animate-pulse">_</span>
          </div>
        </motion.div>

        {/* Name with glitch */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-inter font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none"
          style={{ textShadow: '0 0 40px hsl(187 92% 52% / 0.3)' }}
        >
          <GlitchText text="Jonathan" className="text-foreground" />
          <br />
          <GlitchText
            text="Geisler"
            className="text-primary"
            style={{ textShadow: '0 0 30px hsl(187 92% 52% / 0.6), 0 0 60px hsl(187 92% 52% / 0.3)' }}
          />
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 h-8"
        >
          <span className="font-mono text-base md:text-lg text-primary/80 bg-primary/5 border border-primary/20 px-4 py-1 rounded">
            <span className="text-primary/50 mr-2">&gt;</span>
            {text}
            <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 animate-pulse" />
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-8 text-muted-foreground max-w-lg leading-relaxed text-base font-mono"
        >
          <span className="text-primary/60">// </span>
          Computer Science major specializing in Cybersecurity at Liberty University.
          Passionate about defending digital infrastructure and building secure systems.
        </motion.p>

        {/* Status indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-6 flex items-center gap-6 font-mono text-xs text-muted-foreground"
        >
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400 shadow-sm shadow-green-400/50 animate-pulse" />
            SYSTEM ONLINE
          </span>
          <span className="flex items-center gap-1.5">
            <Shield className="w-3 h-3 text-primary" />
            ENCRYPTED
          </span>
          <span className="flex items-center gap-1.5">
            <Wifi className="w-3 h-3 text-primary" />
            SECURE
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          {/* Contact button */}
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="relative group font-mono font-bold text-sm tracking-widest uppercase px-8 py-3 text-primary-foreground overflow-hidden"
          >
            <span className="absolute inset-0 bg-primary transition-all duration-200 group-hover:bg-primary/80" />
            <span className="absolute inset-0 shadow-[0_0_18px_3px_hsl(187_92%_52%/0.45)] group-hover:shadow-[0_0_28px_6px_hsl(187_92%_52%/0.6)] transition-all duration-200" />
            <span className="absolute top-0.5 left-0.5 w-2.5 h-2.5 border-t-2 border-l-2 border-primary-foreground/40" />
            <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 border-b-2 border-r-2 border-primary-foreground/40" />
            <span className="relative z-10 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              ./contact.sh
            </span>
          </button>

          {/* Resume button */}
          <a
            href="https://media.base44.com/files/public/69b99a1da1ddf45e7cfb0a87/cf2631b56_JonathanGeislerResume2026Feb.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group font-mono font-bold text-sm tracking-widest uppercase px-8 py-3 text-primary overflow-hidden border border-primary/50"
          >
            <span className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-200" />
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <span className="absolute top-0.5 left-0.5 w-2.5 h-2.5 border-t-2 border-l-2 border-primary/50" />
            <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 border-b-2 border-r-2 border-primary/50" />
            <span className="relative z-10 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              cat resume.pdf
            </span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <button
            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-primary/40 hover:text-primary transition-colors"
          >
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}