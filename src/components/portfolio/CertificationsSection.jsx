import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import SectionHeading from './SectionHeading';

const certifications = [
  {
    title: 'CompTIA Security+',
    issuer: 'CompTIA',
    date: 'Jan 2026',
    badge: 'https://media.base44.com/images/public/69b99a1da1ddf45e7cfb0a87/cba27a626_images.png',
    credlyUrl: 'https://www.credly.com/badges/37966575-74ce-4c86-abc5-a63757cdcd73/public_url',
    description: 'Industry-standard certification validating core security skills and knowledge.',
  },
  {
    title: 'AWS Cloud Quest: Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: 'Aug 2026',
    badge: 'https://images.credly.com/images/30816e43-2550-4e1c-be22-3f03c5573bb9/blob',
    credlyUrl: 'https://www.credly.com/badges/7b8a5d1c-3b02-4b27-bd2d-9f84915e14d6/public_url',
    description: 'Training badge for hands-on solution building with AWS compute, networking, database, and security services.',
  },
  {
    title: 'AWS Knowledge: Cloud Essentials',
    issuer: 'Amazon Web Services',
    date: 'May 2026',
    badge: 'https://images.credly.com/images/7cf036b0-c609-4378-a7be-9969e1dea7ab/blob',
    credlyUrl: 'https://www.credly.com/badges/11e0f3d0-9c4a-492b-99b1-385c4bbd8030/public_url',
    description: 'Training badge covering foundational AWS concepts: compute, storage, networking, databases, security, architecture, and pricing.',
  },
  {
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco',
    date: null,
    badge: 'https://images.credly.com/images/af8c6b4e-fc31-47c4-8dcb-eb7a2065dc5b/I2CS__1_.png',
    credlyUrl: 'https://www.credly.com/badges/b1b5cf33-5744-40ac-aaf3-d744f5c76747/public_url',
    description: 'Introductory course covering cyber threats, network vulnerabilities, and how organizations defend against attacks.',
  },
  {
    title: 'NCAE Cyber Games 2025 Competitor',
    issuer: 'NCAE Cyber Games',
    date: 'Mar 2025',
    badge: 'https://api.badgr.io/public/assertions/ELYCh9a-TY6w_afwex_Zqw/image',
    credlyUrl: 'https://badgr.com/public/assertions/ELYCh9a-TY6w_afwex_Zqw',
    description: 'Competed in the 2025 Northeast 2 regional with a 10-person Liberty University team.',
  },
];

export default function CertificationsSection({ hidePadding = false }) {
  return (
    <section className={`${hidePadding ? 'pt-8 pb-24' : 'py-24'} px-6`}>
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          badge="Professional Credentials"
          title="Certifications"
          description="Industry-recognized certifications validating my expertise."
        />

        <div className="grid gap-6">
          {certifications.map((cert, i) => (
            <motion.a
              key={i}
              href={cert.credlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <div className="relative bg-card/70 border border-primary/20 hover:border-primary/50 rounded p-6 transition-all duration-300 flex items-center gap-6 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/20">
                {/* Scan line */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                
                {/* Corner brackets */}
                <span className="absolute top-1 left-1 w-3 h-3 border-t border-l border-primary/50" />
                <span className="absolute top-1 right-1 w-3 h-3 border-t border-r border-primary/50" />
                <span className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-primary/50" />
                <span className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-primary/50" />

                {/* Badge */}
                <div className="flex-shrink-0 w-24 h-24 rounded border border-primary/30 overflow-hidden bg-white p-2 group-hover:border-primary/60 transition-colors">
                  <img src={cert.badge} alt={cert.title} className="w-full h-full object-contain" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-mono font-bold text-base text-foreground group-hover:text-primary transition-colors">{cert.title}</h3>
                  <p className="font-mono text-xs text-primary/60 mt-0.5">by {cert.issuer}</p>
                  <p className="text-sm text-muted-foreground mt-2">{cert.description}</p>
                  {cert.date && <span className="font-mono text-[11px] text-primary/70 tracking-widest mt-2 inline-block">[{cert.date}]</span>}
                </div>

                {/* External link icon */}
                <div className="flex-shrink-0 w-10 h-10 rounded border border-primary/20 group-hover:border-primary/50 bg-primary/5 group-hover:bg-primary/10 flex items-center justify-center transition-all">
                  <ExternalLink className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}