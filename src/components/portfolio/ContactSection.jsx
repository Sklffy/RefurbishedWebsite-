import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, Mail, Linkedin, Github, Terminal, Shield, Radio } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';
import SectionHeading from './SectionHeading';
import EmailSuccessModal from './EmailSuccessModal';

const EMAILJS_SERVICE_ID = 'service_7af8r0l';
const EMAILJS_TEMPLATE_ID = 'template_mlpi23p';
const EMAILJS_PUBLIC_KEY = 'Y_GBT5OcSCrQHS7jT';

const socials = [
  { icon: Mail, label: 'jdgeisler@liberty.edu', cmd: 'mailto:', href: 'mailto:jdgeisler@liberty.edu' },
  { icon: Linkedin, label: '/in/jonathan-geisler', cmd: 'open:', href: 'https://www.linkedin.com/in/jonathan-geisler/' },
  { icon: Github, label: 'github/Sklffy', cmd: 'clone:', href: 'https://github.com/Sklffy' },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all fields.');
      return;
    }
    setSending(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, email: form.email, name: form.name, message: form.message, reply_to: form.email },
        EMAILJS_PUBLIC_KEY
      );
      setShowSuccess(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      toast.error('Failed to send message. Please try again.');
      console.error('EmailJS error:', err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
    <EmailSuccessModal open={showSuccess} onClose={() => setShowSuccess(false)} />
    <section id="contact" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          badge="Get in Touch"
          title="Let's Connect"
          description="Have something to discuss? Send me a message and let's talk."
        />

        <div className="grid md:grid-cols-5 gap-10">
          {/* Info side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 space-y-6"
          >
            {/* Terminal identity card */}
            <div className="relative border border-primary/30 rounded bg-primary/5 overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-2 border-b border-primary/20 bg-black/20">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <span className="font-mono text-[10px] text-primary/50 ml-1 tracking-widest">whoami.sh</span>
              </div>
              <div className="p-5 font-mono space-y-2">
                <p className="text-[11px] text-primary/50">$ whoami</p>
                <p className="text-primary font-bold tracking-wide">jonathan_geisler</p>
                <p className="text-[11px] text-primary/50 mt-2">$ cat bio.txt</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Cybersecurity student at Liberty University. Always open to discussing
                  new opportunities, projects, or just talking tech.
                </p>
                <p className="text-[11px] text-primary/50 mt-2">$ status</p>
                <span className="inline-flex items-center gap-1.5 text-xs text-green-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  AVAILABLE FOR OPPORTUNITIES
                </span>
              </div>
              {/* Corner brackets */}
              <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/60" />
              <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/60" />
              <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary/60" />
              <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/60" />
            </div>

            {/* Social links */}
            <div className="space-y-2">
              <p className="font-mono text-[11px] text-primary/50 tracking-widest mb-3">$ ls ./contact/</p>
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group border border-border hover:border-primary/40 rounded px-4 py-2.5 bg-card/50 hover:bg-primary/5 transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded border border-primary/20 group-hover:border-primary/50 bg-primary/5 flex items-center justify-center transition-colors flex-shrink-0">
                    <s.icon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] text-primary/40">{s.cmd}</p>
                    <p className="font-mono text-xs text-muted-foreground group-hover:text-primary transition-colors truncate">{s.label}</p>
                  </div>
                  <span className="ml-auto font-mono text-[10px] text-primary/30 group-hover:text-primary/60 transition-colors">&gt;</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-3"
          >
            <div className="relative border border-primary/30 rounded overflow-hidden bg-card/60 backdrop-blur-sm">
              {/* Terminal title bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-primary/20 bg-black/30">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <Terminal className="w-3 h-3 text-primary/50 ml-2" />
                <span className="font-mono text-[10px] text-primary/50 tracking-widest">send_message.sh</span>
                <div className="ml-auto flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-primary/40" />
                  <span className="font-mono text-[9px] text-primary/40 tracking-widest">ENCRYPTED</span>
                </div>
              </div>

              {/* Top scan line */}
              <div className="absolute inset-x-0 top-10 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent pointer-events-none" />

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[11px] text-primary/60 tracking-widest flex items-center gap-1">
                      <span className="text-primary/40">&gt;</span> name:
                    </label>
                    <Input
                      placeholder="your_name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="bg-black/30 border-primary/20 focus:border-primary/60 font-mono text-sm text-foreground placeholder:text-muted-foreground/40"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-mono text-[11px] text-primary/60 tracking-widest flex items-center gap-1">
                      <span className="text-primary/40">&gt;</span> email:
                    </label>
                    <Input
                      type="email"
                      placeholder="you@domain.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="bg-black/30 border-primary/20 focus:border-primary/60 font-mono text-sm text-foreground placeholder:text-muted-foreground/40"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[11px] text-primary/60 tracking-widest flex items-center gap-1">
                    <span className="text-primary/40">&gt;</span> message:
                  </label>
                  <Textarea
                    placeholder="// describe your project or inquiry..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="bg-black/30 border-primary/20 focus:border-primary/60 font-mono text-sm text-foreground placeholder:text-muted-foreground/40 min-h-[130px] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="relative w-full group font-mono font-bold text-sm tracking-widest uppercase px-8 py-3 text-primary-foreground overflow-hidden"
                >
                  <span className="absolute inset-0 bg-primary transition-all duration-200 group-hover:bg-primary/80" />
                  <span className="absolute inset-0 shadow-[0_0_18px_3px_hsl(187_92%_52%/0.4)] group-hover:shadow-[0_0_28px_6px_hsl(187_92%_52%/0.6)] transition-all duration-200" />
                  <span className="absolute top-0.5 left-0.5 w-2.5 h-2.5 border-t-2 border-l-2 border-primary-foreground/40" />
                  <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 border-b-2 border-r-2 border-primary-foreground/40" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Radio className="w-4 h-4" />}
                    {sending ? 'transmitting...' : './send_message.sh'}
                  </span>
                </button>

                <p className="font-mono text-[10px] text-muted-foreground/40 text-center tracking-widest">
                  // end-to-end encrypted · response within 24h
                </p>
              </form>

              {/* Corner brackets */}
              <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/60" />
              <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/60" />
              <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary/60" />
              <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/60" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
    </div>
  );
}