import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { base44Local } from '@/lib/localBackend';

const LIBERTY_LOGO = 'https://media.base44.com/images/public/69b99a1da1ddf45e7cfb0a87/2adf2606e_a4fd02bfbd7e42481cd387f38037d5f2.jpg';

// Flat list, newest first. Consecutive entries with the same company are grouped into one card.
const staticExperiences = [
  {
    title: 'Security Engineer | AWS GuardDuty',
    company: 'Amazon Web Services (AWS)',
    date: 'Starting Jul 2027',
    location: 'Seattle, WA',
    tag: 'Incoming',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
    logoBg: 'bg-white',
    points: [
      'Returning full-time to the GuardDuty team after my internship.',
    ],
  },
  {
    title: 'Security Engineer Intern | AWS GuardDuty',
    company: 'Amazon Web Services (AWS)',
    date: 'May 2026 – Aug 2026',
    location: 'Seattle, WA',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
    logoBg: 'bg-white',
    points: [
      'Worked on GuardDuty Runtime Monitoring, which detects threats in workloads running on EC2, EKS, and ECS.',
      'Focused on security analytics and AI research for runtime threat detection.',
    ],
  },
  {
    title: 'Cybersecurity Analyst (FBI) | Government Consultant',
    company: 'Liberty Analytic Support Initiative',
    date: 'Feb 2026 – May 2026',
    location: 'Lynchburg, VA',
    logo: LIBERTY_LOGO,
    logoBg: 'bg-white',
    points: [
      'Conducted OSINT collection and analysis on cyber threat actors, TTPs, and infrastructure for federal and international government partners.',
      'Produced cyber threat intelligence briefings for government stakeholders on national security priorities.',
      'Performed threat research spanning campaign tracking and vulnerability exploitation analysis.',
    ],
  },
  {
    title: 'IT Support Technician',
    company: 'CBTS Technology Solutions',
    date: 'May 2025 – Jul 2025',
    location: 'Hybrid · Contract',
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
    company: 'NCAE Cyber Games',
    date: 'Jan 2025 – May 2025',
    location: 'Lynchburg, VA',
    logo: 'https://media.base44.com/images/public/69b99a1da1ddf45e7cfb0a87/a7781e3fc_1682451946890.jpg',
    logoBg: 'bg-white',
    points: [
      'Placed 2nd in the regional round of the NSA-sponsored NCAE Cyber Games 2025.',
      'Configured and secured FTP and SSH services on CentOS and Kali Linux against live red-team attacks.',
    ],
  },
];

function groupByCompany(list) {
  return list.reduce((groups, exp) => {
    const last = groups[groups.length - 1];
    if (last && last.company === exp.company) last.roles.push(exp);
    else groups.push({ company: exp.company, logo: exp.logo, logoBg: exp.logoBg, roles: [exp] });
    return groups;
  }, []);
}

function CompanyLogo({ logo, logoBg, company }) {
  return (
    <div className={`w-12 h-12 flex-shrink-0 rounded border border-primary/40 overflow-hidden flex items-center justify-center shadow-[0_0_12px_hsl(187_92%_52%/0.25)] ${logoBg || 'bg-card'}`}>
      {logo ? (
        <img src={logo} alt={company} className="w-full h-full object-contain p-1.5" />
      ) : (
        <Briefcase className="w-5 h-5 text-primary" />
      )}
    </div>
  );
}

function Role({ role, nested }) {
  return (
    <div className={nested ? 'relative pl-5 border-l border-primary/20' : ''}>
      {nested && <span className="absolute -left-[4px] top-1.5 w-[7px] h-[7px] rounded-full bg-primary/70 shadow-[0_0_6px_hsl(187_92%_52%/0.6)]" />}
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h4 className="font-mono font-bold text-[15px] text-foreground flex items-center gap-2 flex-wrap">
          {role.title}
          {role.tag && (
            <span className="px-1.5 py-0.5 text-[10px] tracking-widest uppercase border border-primary/40 text-primary rounded-sm">
              {role.tag}
            </span>
          )}
        </h4>
        <span className="font-mono text-[11px] text-primary/70 tracking-wider whitespace-nowrap">{role.date}</span>
      </div>
      {role.location && (
        <p className="mt-1 font-mono text-[11px] text-muted-foreground/70 flex items-center gap-1">
          <MapPin className="w-3 h-3" /> {role.location}
        </p>
      )}
      {role.points.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {role.points.map((point, j) => (
            <li key={j} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
              <span className="text-primary/60 font-mono text-xs flex-shrink-0 mt-0.5">&gt;_</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ExperienceSection({ hidePadding = false }) {
  const [experiences, setExperiences] = useState(staticExperiences);

  useEffect(() => {
    base44Local.entities.Experience.list('sort_order', 50).then(data => {
      if (data && data.length > 0) {
        setExperiences(data.map(e => ({
          title: e.title,
          company: e.company,
          date: e.date,
          location: e.location || null,
          tag: e.tag || null,
          logo: e.logo || null,
          logoBg: e.logo_bg || 'bg-card',
          points: e.points || [],
        })));
      }
    }).catch(() => {
      // No local backend (e.g. GitHub Pages) - keep the static list
    });
  }, []);

  const groups = groupByCompany(experiences);

  return (
    <section className={`${hidePadding ? 'pt-8 pb-24' : 'py-24'} px-6`}>
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          badge="Work History"
          title="Experience"
          description="My professional experience in cybersecurity and technology."
        />

        <div className="relative">
          {/* Glowing timeline, centered on the logo column */}
          <div className="absolute left-6 top-0 bottom-0 w-px hidden sm:block"
            style={{ background: 'linear-gradient(to bottom, transparent, hsl(187 92% 52% / 0.4) 5%, hsl(187 92% 52% / 0.4) 95%, transparent)' }} />

          <div className="space-y-8">
            {groups.map((group, i) => (
              <motion.div
                key={group.company + i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: Math.min(i * 0.08, 0.3) }}
                className="relative sm:pl-20"
              >
                <div className="absolute left-0 top-5 z-10 hidden sm:block">
                  <CompanyLogo logo={group.logo} logoBg={group.logoBg} company={group.company} />
                </div>

                <div className="relative bg-card/70 border border-primary/20 hover:border-primary/50 rounded p-5 sm:p-6 transition-colors duration-300 backdrop-blur-sm">
                  {/* Scan line */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                  {/* Corner brackets */}
                  <span className="absolute top-1 left-1 w-3 h-3 border-t border-l border-primary/50" />
                  <span className="absolute top-1 right-1 w-3 h-3 border-t border-r border-primary/50" />
                  <span className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-primary/50" />
                  <span className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-primary/50" />

                  <div className="flex items-center gap-3 mb-4">
                    <div className="sm:hidden">
                      <CompanyLogo logo={group.logo} logoBg={group.logoBg} company={group.company} />
                    </div>
                    <h3 className="font-mono text-sm text-primary tracking-wide">@ {group.company}</h3>
                  </div>

                  <div className="space-y-6">
                    {group.roles.map((role, j) => (
                      <Role key={j} role={role} nested={group.roles.length > 1} />
                    ))}
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
