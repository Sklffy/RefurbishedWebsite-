import React from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

export default function SectionHeading({ badge, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      {badge && (
        <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-primary/30 rounded bg-primary/5 mb-4 font-mono text-xs text-primary tracking-widest shadow-sm shadow-primary/10">
          <Terminal className="w-3 h-3" />
          <span>$ {badge.toLowerCase().replace(/ /g, '_')}</span>
        </div>
      )}
      <h2 className="font-inter font-bold text-3xl md:text-4xl text-foreground mt-2" style={{ textShadow: '0 0 30px hsl(187 92% 52% / 0.15)' }}>
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed font-mono text-sm">
          <span className="text-primary/50">// </span>
          {description}
        </p>
      )}
      <div className="mt-6 flex items-center justify-center gap-3">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/40" />
        <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-sm shadow-primary/60" />
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/40" />
      </div>
    </motion.div>
  );
}