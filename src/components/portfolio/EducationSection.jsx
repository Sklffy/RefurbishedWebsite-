import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import SectionHeading from './SectionHeading';

const education = [
  {
    title: 'B.S. Computer Science — Cybersecurity',
    company: 'Liberty University',
    date: '2024 – May 2027 (expected)',
    logo: 'https://media.base44.com/images/public/69b99a1da1ddf45e7cfb0a87/2adf2606e_a4fd02bfbd7e42481cd387f38037d5f2.jpg',
    logoBg: 'bg-white',
    points: [
      'ABET-accredited program · Minor in Strategic and Intelligence Studies',
      "Dean's List: Fall 2024 and Fall 2025",
      'Cybersecurity Club President (May 2026 – Present): lead officers in planning workshops, CTF events, and speaker engagements',
      'NCAE Cyber Games competition team: 2nd regionally in 2025, 4th overall in 2026',
    ],
  },
];

export default function EducationSection({ hidePadding = false }) {
  return (
    <section className={`${hidePadding ? 'pt-8 pb-24' : 'py-24'} px-6`}>
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          badge="Academic Background"
          title="Education"
          description="My academic journey and formal training in computer science and cybersecurity."
        />

        <div className="space-y-8">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative sm:pl-20"
            >
              <div className={`absolute left-0 top-5 z-10 hidden sm:flex w-12 h-12 rounded border border-primary/40 overflow-hidden items-center justify-center shadow-[0_0_12px_hsl(187_92%_52%/0.25)] ${edu.logoBg || 'bg-card'}`}>
                {edu.logo ? (
                  <img src={edu.logo} alt={edu.company} className="w-full h-full object-contain p-1.5" />
                ) : (
                  <GraduationCap className="w-5 h-5 text-primary" />
                )}
              </div>

              <div className="relative bg-card/70 border border-primary/20 hover:border-primary/50 rounded p-5 sm:p-6 transition-colors duration-300 backdrop-blur-sm">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                <span className="absolute top-1 left-1 w-3 h-3 border-t border-l border-primary/50" />
                <span className="absolute top-1 right-1 w-3 h-3 border-t border-r border-primary/50" />
                <span className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-primary/50" />
                <span className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-primary/50" />

                <p className="font-mono text-sm text-primary tracking-wide mb-4">@ {edu.company}</p>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-mono font-bold text-[15px] text-foreground">{edu.title}</h3>
                  <span className="font-mono text-[11px] text-primary/70 tracking-wider whitespace-nowrap">{edu.date}</span>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {edu.points.map((point, j) => (
                    <li key={j} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                      <span className="text-primary/60 font-mono text-xs flex-shrink-0 mt-0.5">&gt;_</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}