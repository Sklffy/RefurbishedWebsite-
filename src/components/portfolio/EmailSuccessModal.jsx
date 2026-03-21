import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X, Radio } from 'lucide-react';

export default function EmailSuccessModal({ open, onClose }) {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          style={{ background: 'rgba(8,12,20,0.85)', backdropFilter: 'blur(6px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md border border-primary/50 rounded-lg bg-card overflow-hidden"
            style={{ boxShadow: '0 0 40px rgba(0,200,255,0.25), 0 0 80px rgba(0,200,255,0.08)' }}
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-primary/20 bg-black/40">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <span className="font-mono text-[10px] text-primary/50 ml-2 tracking-widest">transmission_status.sh</span>
              <button onClick={onClose} className="ml-auto text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scan line */}
            <div className="absolute inset-x-0 top-10 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent pointer-events-none" />

            {/* Content */}
            <div className="p-8 text-center space-y-5">
              {/* Pulsing icon */}
              <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-primary/30 animate-ping opacity-30" />
                <div className="absolute inset-2 rounded-full border border-primary/40" />
                <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/50 flex items-center justify-center"
                  style={{ boxShadow: '0 0 20px rgba(0,200,255,0.3)' }}>
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-mono text-[11px] text-primary/50 tracking-widest">$ ./send_message.sh --status</p>
                <h2 className="font-mono font-bold text-2xl text-foreground"
                  style={{ textShadow: '0 0 20px hsl(187 92% 52% / 0.4)' }}>
                  TRANSMISSION SENT
                </h2>
                <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                  Message encrypted and delivered successfully.<br />
                  <span className="text-primary/70">Response expected within 24h.</span>
                </p>
              </div>

              {/* Status line */}
              <div className="flex items-center justify-center gap-3 font-mono text-[10px] text-muted-foreground/60 pt-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  STATUS: OK
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <Radio className="w-3 h-3 text-primary/50" />
                  ENCRYPTED
                </span>
                <span>·</span>
                <span>CODE 200</span>
              </div>

              <button
                onClick={onClose}
                className="font-mono text-xs text-primary/60 hover:text-primary transition-colors tracking-widest"
              >
                [ DISMISS ]
              </button>
            </div>

            {/* Corner brackets */}
            <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/60" />
            <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary/60" />
            <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary/60" />
            <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/60" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}