import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { base44Local } from '@/lib/localBackend';

const staticExperiences = [
  {
    title: 'Security Engineer Intern',
    company: 'Amazon',
    date: 'Mar 2026 – Present',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    logoBg: 'bg-[#FF9900]',
    points: [
      'Incoming Summer 2026 – On-site Security Engineering Internship.',
    ],
  },
  {
    title: 'Cyber Security Analyst | Government Consultant',
    company: 'Liberty Analytic Support Initiative',
    date: 'Feb 2026 – Present',
    logo: 'https://media.base44.com/images/public/69b99a1da1ddf45e7cfb0a87/2adf2606e_a4fd02bfbd7e42481cd387f38037d5f2.jpg',
    logoBg: 'bg-white',
    points: [
      'Providing cybersecurity analysis and government consulting services.',
    ],
  },
  {
    title: 'Club Vice President',
    company: 'Liberty University Cybersecurity Club',
    date: 'May 2025 – Present',
    logo: 'https://media.base44.com/images/public/69b99a1da1ddf45e7cfb0a87/2adf2606e_a4fd02bfbd7e42481cd387f38037d5f2.jpg',
    logoBg: 'bg-white',
    points: [
      'Led club officers in planning technical workshops, CTF events, speaker engagements, and competition prep.',
      'Collaborated with faculty to align club initiatives with academic and professional goals.',
      'Organized intercollegiate participation in cybersecurity competitions and expanded training opportunities.',
    ],
  },
  {
    title: 'IT Support Technician',
    company: 'CBTS Technology Solutions | Contract',
    date: 'May 2025 – July 2025',
    logo: 'https://media.base44.com/images/public/69b99a1da1ddf45e7cfb0a87/07819c394_download.png',
    logoBg: 'bg-[#0a1628]',
    points: [
      'Delivered remote and onsite support for cloud migrations with minimal user disruption.',
      'Troubleshot email, authentication, remote access, and cloud service issues to maintain uptime.',
      'Assisted in migrating legacy systems to Microsoft Azure cloud infrastructure.',
    ],
  },
  {
    title: 'SSH/FTP Services Specialist',
    company: 'National Centers of Academic Excellence | Cyber Games',
    date: 'Jan 2025 – May 2025',
    logo: 'https://media.base44.com/images/public/69b99a1da1ddf45e7cfb0a87/a7781e3fc_1682451946890.jpg',
    logoBg: 'bg-white',
    points: [
      'NSA-sponsored National Centers of Academic Excellence Cyber Games Competition.',
      'Placed 2nd in the regional NCAE Cyber Games 2025.',
      'Configured and secured FTP and SSH services on CentOS and Kali Linux.',
    ],
  },
];

export default function ExperienceSection({ hidePadding = false }) {
  const [experiences, setExperiences] = useState(staticExperiences);

  useEffect(() => {
    base44Local.entities.Experience.list('sort_order', 50).then(data => {
      if (data && data.length > 0) {
        setExperiences(data.map(e => ({
          title: e.title,
          company: e.company,
          date: e.date,
          logo: e.logo || null,
          logoBg: e.logo_bg || 'bg-card',
          points: e.points || [],
        })));
      }
    });
  }, []);

  return (
    <section className={`${hidePadding ? 'pt-8 pb-24' : 'py-24'} px-6`}>
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          badge="Work History"
          title="Experience"
          description="My professional experience in cybersecurity and technology."
        />

        <div className="relative">
          {/* Glowing timeline */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px"
            style={{ background: 'linear-gradient(to bottom, transparent, hsl(187 92% 52% / 0.4) 10%, hsl(187 92% 52% / 0.4) 90%, transparent)' }} />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Timeline node */}
                <div className={`absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 z-10 overflow-hidden flex items-center justify-center
                  border-2 border-primary/60 shadow-[0_0_14px_2px_hsl(187_92%_52%/0.4)]
                  ${exp.logoBg || 'bg-card'}`}
                  style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                  {exp.logo ? (
                    <img src={exp.logo} alt={exp.company} className="w-8 h-8 object-contain p-0.5" />
                  ) : (
                    <Briefcase className="w-5 h-5 text-primary" />
                  )}
                </div>

                <div className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${i % 2 === 0 ? 'md:pr-0' : 'md:pl-0'}`}>
                  <div className="relative bg-card/70 border border-primary/20 hover:border-primary/50 rounded p-5 transition-all duration-300 group backdrop-blur-sm">
                    {/* Scan line */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                    {/* Corner brackets */}
                    <span className="absolute top-1 left-1 w-3 h-3 border-t border-l border-primary/50" />
                    <span className="absolute top-1 right-1 w-3 h-3 border-t border-r border-primary/50" />
                    <span className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-primary/50" />
                    <span className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-primary/50" />

                    <span className="font-mono text-[11px] text-primary/70 tracking-widest">[{exp.date}]</span>
                    <h3 className="font-mono font-bold text-base text-foreground mt-1 group-hover:text-primary transition-colors">{exp.title}</h3>
                    <p className="font-mono text-xs text-primary/60 mt-0.5">@ {exp.company}</p>
                    <ul className="mt-4 space-y-2">
                      {exp.points.map((point, j) => (
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