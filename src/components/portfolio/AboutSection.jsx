import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Lock, Network } from 'lucide-react';
import SectionHeading from './SectionHeading';

const highlights = [
  { text: "Computer Science – Cybersecurity Major", icon: Cpu },
  { text: "Building defense labs & cyber ranges", icon: Lock },
  { text: "Blue & Red team competition experience", icon: Network },
  { text: "Securing systems & infrastructure automation", icon: Lock },
  { text: "Creating immersive technical experiences", icon: Cpu },
];

const stats = [
  { label: 'CTF Competitions', value: '10+' },
  { label: 'Lab Machines', value: '15+' },
  { label: 'Regional Placement', value: '2nd' },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="About Me"
          title="Who I Am"
          description="Cybersecurity-focused CS major with expertise in building defense labs, configuring secure infrastructure, and leading hands-on cyber exercises."
        />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative w-72 h-72 md:w-80 md:h-80 mx-auto">
              {/* Corner brackets */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-primary z-20" />
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-primary z-20" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-primary z-20" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-primary z-20" />

              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded rotate-3 shadow-lg shadow-primary/10" />
              <div className="absolute inset-0 bg-card border border-primary/20 rounded overflow-hidden shadow-xl shadow-primary/5">
                <img
                  src="https://media.base44.com/images/public/69b99a1da1ddf45e7cfb0a87/ed4fe8560_IMG_2971.jpg"
                  alt="Jonathan Geisler"
                  className="w-full h-full object-cover opacity-90"
                />
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.3) 3px, rgba(0,0,0,0.3) 4px)' }}
                />
              </div>

              {/* ID badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-44 bg-card border border-primary/30 rounded px-3 py-1.5 font-mono text-xs text-center shadow-lg shadow-primary/10 z-20">
                <span className="text-primary/60">ID: </span>
                <span className="text-foreground">J.Geisler</span>
                <span className="ml-2 text-green-400 text-[10px]">● ACTIVE</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-6 mt-12">
              {stats.map((s, i) => (
                <div key={i} className="text-center border border-border rounded-lg px-4 py-3 bg-card hover:border-primary/30 transition-colors">
                  <div className="font-mono font-bold text-xl text-primary">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Terminal block */}
            <div className="bg-card border border-border rounded-xl overflow-hidden mb-6 shadow-lg">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-secondary/50">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <span className="ml-2 font-mono text-xs text-muted-foreground">about.txt</span>
              </div>
              <div className="p-4 font-mono text-sm text-muted-foreground leading-relaxed">
                <span className="text-primary/60">$ cat about.txt</span>
                <p className="mt-2">
                  My journey into cybersecurity began when I witnessed a hack on my father's
                  ministry website. Since then, I've been diving deep into Linux hardening,
                  scoring engines, Proxmox cyber ranges, network forensics, and both blue
                  team defense and red team tactics.
                </p>
                <p className="mt-3">
                  I actively participate in competitions like the NCAE-C Cyber Games where
                  my team placed <span className="text-primary font-semibold">2nd regionally</span>.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-3 px-4 py-2.5 border border-border rounded hover:border-primary/30 hover:bg-primary/3 transition-all font-mono text-sm group"
                >
                  <span className="text-primary/60 group-hover:text-primary transition-colors">▶</span>
                  <span className="text-foreground">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}