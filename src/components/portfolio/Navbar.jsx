import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, Shield, Wifi } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '#home', cmd: '~' },
  { label: 'About', href: '#about', cmd: 'whoami' },
  { label: 'Experience', href: '#experience', cmd: 'history' },
  { label: 'Projects', href: '#projects', cmd: 'ls /projects' },
  { label: 'Skills', href: '#skills', cmd: 'cat skills.txt' },
  { label: 'Contact', href: '#contact', cmd: 'ping me' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [activeLink, setActiveLink] = useState('Home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (href, label) => {
    setMobileOpen(false);
    setActiveLink(label);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-background/95 backdrop-blur-xl border-b border-primary/20 shadow-lg shadow-primary/10'
        : 'bg-transparent'
    }`}>
      {/* Top scan line */}
      {scrolled && (
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none overflow-hidden"
          style={{ background: 'linear-gradient(90deg, transparent, hsl(187 92% 52% / 0.6), transparent)' }}
        />
      )}

      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <button onClick={() => handleClick('#home', 'Home')} className="flex items-center gap-3 group">
          <div className="relative w-9 h-9">
            <div className="absolute inset-0 rounded border border-primary/40 group-hover:border-primary/80 transition-colors" />
            <div className="absolute -inset-1 rounded border border-primary/10 group-hover:border-primary/30 transition-colors" />
            <div className="w-full h-full rounded overflow-hidden bg-primary/5 p-0.5">
              <img src="https://media.base44.com/images/public/69b99a1da1ddf45e7cfb0a87/d25bfcedb_logo.png" alt="JG Logo" className="w-full h-full object-contain" />
            </div>
          </div>

        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-0.5 bg-background/40 border border-border/50 rounded-lg px-2 py-1 backdrop-blur-sm">
          {/* Status dot */}
          <div className="flex items-center gap-1.5 px-3 border-r border-border/50 mr-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-sm shadow-green-400/80 animate-pulse" />
            <span className="font-mono text-[9px] text-green-400/70 tracking-widest">ONLINE</span>
          </div>

          {navLinks.map((link) => {
            const isHovered = hoveredLink === link.label;
            const isActive = activeLink === link.label;
            return (
              <button
                key={link.label}
                onClick={() => handleClick(link.href, link.label)}
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
                className={`relative px-3 py-1.5 text-xs font-mono rounded transition-all duration-200 group ${
                  isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {/* Active/hover underline */}
                <span
                  className={`absolute bottom-0.5 left-2 right-2 h-px transition-all duration-200 ${
                    isActive ? 'bg-primary opacity-100' : isHovered ? 'bg-primary/50 opacity-100' : 'opacity-0'
                  }`}
                />
                {/* Hover prefix */}
                <span className="flex items-center gap-1">
                  <span className={`font-mono transition-all duration-150 ${isHovered || isActive ? 'text-primary/60 opacity-100 w-3' : 'opacity-0 w-0'} overflow-hidden text-[10px]`}>
                    &gt;
                  </span>
                  {link.label}
                </span>

                {/* Corner brackets on hover */}
                {isHovered && (
                  <>
                    <span className="absolute top-0.5 left-1 w-2 h-2 border-t border-l border-primary/60 pointer-events-none" />
                    <span className="absolute bottom-0.5 right-1 w-2 h-2 border-b border-r border-primary/60 pointer-events-none" />
                  </>
                )}
              </button>
            );
          })}
        </div>

        {/* Right status badges */}
        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 border border-primary/20 rounded bg-primary/5 font-mono text-[10px] text-primary/60 tracking-widest">
            <Shield className="w-3 h-3 text-primary/60" />
            <span>ENC</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded bg-card/50 font-mono text-[10px] text-muted-foreground tracking-widest">
            <Wifi className="w-3 h-3" />
            <span>TLS</span>
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden font-mono text-[10px] text-primary border border-primary/30 rounded px-3 py-2 hover:bg-primary/10 transition-colors flex items-center gap-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span>{mobileOpen ? 'CLOSE' : 'MENU'}</span>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/98 backdrop-blur-xl border-b border-primary/20 overflow-hidden"
          >
            <div className="px-6 py-5 flex flex-col gap-1 font-mono">
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <span className="text-[10px] text-muted-foreground ml-2">root@portfolio — nav</span>
              </div>

              <div className="text-[10px] text-primary/40 mb-2 flex items-center gap-1">
                <Terminal className="w-3 h-3" />
                <span>navigate to:</span>
              </div>

              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleClick(link.href, link.label)}
                  className="px-4 py-2.5 text-sm font-mono text-muted-foreground hover:text-primary transition-colors text-left rounded hover:bg-primary/5 flex items-center gap-3 group border border-transparent hover:border-primary/15"
                >
                  <span className="text-primary/40 text-xs w-4">$</span>
                  <span className="text-primary/30 text-xs">cd</span>
                  <span className="group-hover:text-primary transition-colors">{link.cmd}</span>
                  <span className="ml-auto text-[10px] text-muted-foreground/40">{link.label}</span>
                </motion.button>
              ))}

              <div className="mt-3 pt-3 border-t border-border flex items-center gap-4 text-[10px] text-muted-foreground/50 font-mono">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400/70" />SECURE</span>
                <span className="flex items-center gap-1"><Shield className="w-3 h-3" />ENCRYPTED</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}