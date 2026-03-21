import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import SectionHeading from './SectionHeading';

const education = [
  {
    title: "Bachelor's Degree — Computer Science (Cybersecurity)",
    company: 'Liberty University',
    date: '2024 – 2027',
    logo: 'https://media.base44.com/images/public/69b99a1da1ddf45e7cfb0a87/2adf2606e_a4fd02bfbd7e42481cd387f38037d5f2.jpg',
    logoBg: 'bg-white',
    points: [
      'Major: Computer Science – Cybersecurity',
      'Activities: Liberty Cyber Club, NCAE-C Competition team',
      'Skills: Vulnerability Assessment, VPN, Network Security, +13 more',
    ],
  },
  {
    title: 'High School Diploma',
    company: 'Liberty University Online Academy',
    date: '2024',
    logo: 'https://media.base44.com/images/public/69b99a1da1ddf45e7cfb0a87/2adf2606e_a4fd02bfbd7e42481cd387f38037d5f2.jpg',
    logoBg: 'bg-white',
    points: [
      'Activities: Beta Club Honor Society',
      'Skills: Python Programming',
    ],
  },
];

export default function EducationSection({ hidePadding = false }) {
  return (
    <section className={`${hidePadding ? 'pt-8 pb-24' : 'py-24'} px-6`}>
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          badge="Academic Background"
          title="Education"
          description="My academic journey and formal training in computer science and cybersecurity."
        />

        <div className="relative">
          {/* Glowing timeline */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px"
            style={{ background: 'linear-gradient(to bottom, transparent, hsl(187 92% 52% / 0.4) 10%, hsl(187 92% 52% / 0.4) 90%, transparent)' }} />

          <div className="space-y-12">
            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Hex node */}
                <div className={`absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 z-10 overflow-hidden flex items-center justify-center
                  border-2 border-primary/60 shadow-[0_0_14px_2px_hsl(187_92%_52%/0.4)]
                  ${edu.logoBg || 'bg-card'}`}
                  style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                  {edu.logo ? (
                    <img src={edu.logo} alt={edu.company} className="w-8 h-8 object-contain p-0.5" />
                  ) : (
                    <GraduationCap className="w-5 h-5 text-primary" />
                  )}
                </div>

                <div className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${i % 2 === 0 ? 'md:pr-0' : 'md:pl-0'}`}>
                  <div className="relative bg-card/70 border border-primary/20 hover:border-primary/50 rounded p-5 transition-all duration-300 group backdrop-blur-sm">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                    <span className="absolute top-1 left-1 w-3 h-3 border-t border-l border-primary/50" />
                    <span className="absolute top-1 right-1 w-3 h-3 border-t border-r border-primary/50" />
                    <span className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-primary/50" />
                    <span className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-primary/50" />

                    <span className="font-mono text-[11px] text-primary/70 tracking-widest">[{edu.date}]</span>
                    <h3 className="font-mono font-bold text-base text-foreground mt-1 group-hover:text-primary transition-colors">{edu.title}</h3>
                    <p className="font-mono text-xs text-primary/60 mt-0.5">@ {edu.company}</p>
                    <ul className="mt-4 space-y-2">
                      {edu.points.map((point, j) => (
                        <li key={j} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                          <span className="text-primary/60 font-mono text-xs flex-shrink-0 mt-0.5">&gt;_</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}