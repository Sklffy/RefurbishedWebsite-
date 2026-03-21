import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Terminal } from 'lucide-react';
import SectionHeading from './SectionHeading';

const projects = [
  {
    title: 'RedGuard AI',
    cmd: 'honeypot-threat-intel',
    description: 'An AI-driven honeypot threat intelligence system for simulating live attacks and analyzing attacker behavior in real-time.',
    tech: ['Python', 'Docker', 'JavaScript'],
    link: 'https://github.com/Sklffy',
    image: 'https://media.base44.com/images/public/69b99a1da1ddf45e7cfb0a87/bc91a6a8b_RED.png',
    accent: 'rgba(239,68,68,0.6)',
    status: 'IN PROGRESS',
  },
  {
    title: 'ATLANTIS Scoreboard',
    cmd: 'scoring-engine',
    description: 'A C++ and HTML-based scoring engine with inject tracking and live service checks for cybersecurity competitions.',
    tech: ['C++', 'HTML', 'CSS', 'JSON'],
    link: 'https://github.com/Sklffy/Scoring-Engine',
    image: 'https://media.base44.com/images/public/69b99a1da1ddf45e7cfb0a87/41428aa6a_favicon.png',
    accent: 'rgba(0,229,255,0.6)',
    status: 'DEPLOYED',
  },
  {
    title: 'Proxmox Cyber Lab',
    cmd: 'home-lab-infra',
    description: 'Home lab for cyber defense testing with GPU passthrough, pfSense, VLANs, and AI/ML support on enterprise hardware.',
    tech: ['Proxmox', 'Linux', 'Networking', 'pfSense'],
    link: null,
    image: 'https://media.base44.com/images/public/69b99a1da1ddf45e7cfb0a87/a4eca180b_proxmox.jpg',
    accent: 'rgba(34,197,94,0.6)',
    status: 'ONLINE',
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Portfolio"
          title="Featured Projects"
          description="A collection of my recent work across cybersecurity, infrastructure, and software development."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group"
            >
              <div className="h-full bg-card/70 border border-primary/20 rounded overflow-hidden hover:border-primary/60 transition-all duration-300 flex flex-col backdrop-blur-sm"
                style={{ boxShadow: '0 0 0 0 transparent', transition: 'box-shadow 0.3s, border-color 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 24px 2px ${proj.accent.replace('0.6','0.2')}`}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              >
                {/* Image header */}
                <div className="relative h-44 overflow-hidden">
                  <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                  {/* Scanlines */}
                  <div className="absolute inset-0 pointer-events-none opacity-30"
                    style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)' }} />
                  {/* Status badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded bg-black/60 border backdrop-blur-sm"
                    style={{ borderColor: proj.status === 'IN PROGRESS' ? 'rgba(251,146,60,0.4)' : 'rgba(0,229,255,0.3)' }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ backgroundColor: proj.status === 'IN PROGRESS' ? '#fb923c' : '#4ade80' }} />
                    <span className="font-mono text-[9px] tracking-widest"
                      style={{ color: proj.status === 'IN PROGRESS' ? '#fb923c' : '#4ade80' }}>{proj.status}</span>
                  </div>
                  {/* Terminal label */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                    <Terminal className="w-3 h-3 text-primary/70" />
                    <span className="font-mono text-[10px] text-primary/70 tracking-widest">./{proj.cmd}</span>
                  </div>
                  {/* Corner brackets */}
                  <span className="absolute top-2 left-2 w-3 h-3 border-t border-l border-primary/60" />
                  <span className="absolute top-2 right-2 w-3 h-3 border-t border-r border-primary/60" />
                </div>

                {/* Scan line */}
                <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-mono font-bold text-base text-foreground group-hover:text-primary transition-colors">{proj.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{proj.description}</p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {proj.tech.map((t, j) => (
                      <span key={j} className="font-mono text-[10px] px-2 py-0.5 border border-primary/20 bg-primary/5 text-primary/70 rounded-sm tracking-wide">
                        {t}
                      </span>
                    ))}
                  </div>

                  {proj.link ? (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 font-mono text-xs text-primary hover:text-primary/80 transition-colors border border-primary/20 hover:border-primary/50 px-3 py-1.5 rounded-sm bg-primary/5 hover:bg-primary/10 w-fit"
                    >
                      <Github className="w-3.5 h-3.5" />
                      git clone ./repo
                      <ExternalLink className="w-3 h-3 ml-auto" />
                    </a>
                  ) : (
                    <span className="mt-5 inline-flex items-center gap-2 font-mono text-xs text-muted-foreground/50 border border-border/30 px-3 py-1.5 rounded-sm w-fit">
                      // private repository
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}