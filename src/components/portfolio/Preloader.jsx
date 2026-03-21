import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield } from 'lucide-react'; // kept for fallback

const bootLines = [
  { text: 'Initializing secure connection...', delay: 0 },
  { text: 'Loading encryption modules...', delay: 400 },
  { text: 'Authenticating identity...', delay: 800 },
  { text: 'Scanning for vulnerabilities...', delay: 1200 },
  { text: 'Firewall rules applied ✓', delay: 1600 },
  { text: 'Mounting portfolio filesystem...', delay: 2000 },
  { text: 'ACCESS GRANTED', delay: 2500, highlight: true },
];

export default function Preloader({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    bootLines.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, line]);
        setProgress(Math.round(((i + 1) / bootLines.length) * 100));
        if (i === bootLines.length - 1) {
          setTimeout(() => {
            setDone(true);
            setTimeout(onComplete, 600);
          }, 600);
        }
      }, line.delay);
    });
  }, []);

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          key="preloader"
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-background flex items-center justify-center p-6"
        >
          {/* Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)',
            }}
          />

          <div className="w-full max-w-xl">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded overflow-hidden bg-primary/5 shadow-lg shadow-primary/20">
                <img src="https://media.base44.com/images/public/69b99a1da1ddf45e7cfb0a87/d25bfcedb_logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="font-mono font-bold text-primary text-sm tracking-widest">GEISLER SECURITY</div>
                <div className="font-mono text-[10px] text-muted-foreground tracking-widest">SYSTEM BOOT v2.0.25</div>
              </div>
            </div>

            {/* Terminal window */}
            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-2xl shadow-primary/10">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-secondary/60">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <span className="ml-2 font-mono text-xs text-muted-foreground">root@jgeisler — portfolio — bash</span>
              </div>

              {/* Terminal output */}
              <div className="p-5 min-h-[220px] font-mono text-sm space-y-1.5">
                <div className="text-muted-foreground text-xs mb-3">Last login: {new Date().toDateString()} from 192.168.1.1</div>
                {visibleLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-start gap-2 ${line.highlight ? 'mt-3' : ''}`}
                  >
                    {line.highlight ? (
                      <span className="text-green-400 font-bold tracking-widest text-base w-full text-center py-1 border border-green-400/30 bg-green-400/5 rounded">
                        ✓ {line.text}
                      </span>
                    ) : (
                      <>
                        <span className="text-primary/60 flex-shrink-0">$</span>
                        <span className="text-muted-foreground">{line.text}</span>
                      </>
                    )}
                  </motion.div>
                ))}
                {/* Blinking cursor */}
                {!done && (
                  <div className="flex items-center gap-2">
                    <span className="text-primary/60">$</span>
                    <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
                  </div>
                )}
              </div>

              {/* Progress bar */}
              <div className="px-5 pb-5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[10px] text-muted-foreground tracking-widest">LOADING SYSTEM</span>
                  <span className="font-mono text-[10px] text-primary">{progress}%</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full shadow-sm shadow-primary/50"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}