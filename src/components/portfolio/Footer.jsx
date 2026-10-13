import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

const links = [
  { icon: Github, href: 'https://github.com/Sklffy', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/jdgeisler/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:jdgeisler@gmail.com', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <img src="https://media.base44.com/images/public/69b99a1da1ddf45e7cfb0a87/d25bfcedb_logo.png" alt="JG Logo" className="w-6 h-6 object-contain" />
            <span className="font-inter font-bold text-foreground">
              Jonathan Geisler
            </span>
          </div>

          <div className="flex items-center gap-4">
            {links.map((l, i) => (
              <a
                key={i}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={l.label}
                className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <l.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mt-8 pt-6 border-t border-border gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Jonathan Geisler. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            Back to top
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}