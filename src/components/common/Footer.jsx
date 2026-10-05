import React from 'react';
import { ParticleCanvas } from './ParticleCanvas';
import { Mail, MessageCircle, Instagram, Github, ArrowUpRight } from 'lucide-react';

export const Footer = () => {
  const socials = [
    {
      name: 'Gmail',
      icon: <Mail className="w-4 h-4 text-red-400 group-hover:text-black transition-colors" />,
      href: 'mailto:akuferdy124@gmail.com',
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:text-black transition-colors" />,
      href: 'https://wa.me/6283874536719',
    },
    {
      name: 'Instagram',
      icon: <Instagram className="w-4 h-4 text-pink-400 group-hover:text-black transition-colors" />,
      href: 'https://www.instagram.com/feerddyy__/?hl=en',
    },
    {
      name: 'GitHub',
      icon: <Github className="w-4 h-4 text-white group-hover:text-black transition-colors" />,
      href: 'https://github.com/akuferdy124-code',
    },
  ];

  return (
    <footer id="contact" className="bg-[#0C0C0C] text-[#D7E2EA] px-6 md:px-10 py-24 border-t border-white/10 relative overflow-hidden">
      <ParticleCanvas opacity="opacity-15" />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12 relative z-10">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-white/50 border border-white/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Get In Touch
          </span>
          <h3 className="font-black uppercase text-[clamp(2.5rem,7vw,72px)] leading-none text-white tracking-tight">
            Let's Talk
          </h3>
          <p className="mt-3 text-white/70 text-sm sm:text-base max-w-md leading-relaxed">
            Ada yang mau didiskusikan terkait embedded system, robotika, atau IoT? Langsung kirim pesan aja ya!
          </p>

          <div className="mt-8 grid grid-cols-2 sm:flex sm:flex-wrap gap-3">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="group px-4 py-3 rounded-2xl bg-[#181818] border border-white/10 flex items-center gap-2.5 hover:bg-white hover:text-black transition-all duration-300 hover:-translate-y-1 shadow-md"
              >
                {s.icon}
                <span className="text-[11px] font-bold uppercase tracking-widest">{s.name}</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ml-auto sm:ml-0" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
          <a
            href="https://wa.me/6283874536719"
            target="_blank"
            rel="noreferrer"
            className="rounded-full px-8 py-3.5 sm:px-10 sm:py-4 text-xs sm:text-sm font-black text-black bg-white uppercase tracking-widest inline-block text-center hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all duration-200"
          >
            Contact Me →
          </a>
          <p className="text-xs text-white/40 font-mono">
            Padang, Indonesia · Politeknik Negeri Padang
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/40 font-mono relative z-10">
        <p>© {new Date().getFullYear()} Ferdy Fernando — 2411012007 (D4 Teknik Elektronika)</p>
        <p>Built with React + Vite + Tailwind CSS</p>
      </div>
    </footer>
  );
};
