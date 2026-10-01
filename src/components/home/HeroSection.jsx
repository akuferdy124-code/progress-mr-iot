import React from 'react';
import { Link } from 'react-router-dom';
import { ParticleCanvas } from '../common/ParticleCanvas';
import { ArrowUpRight } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col justify-between overflow-x-clip relative bg-[#0C0C0C] pt-24 pb-8 md:pb-12">
      <ParticleCanvas opacity="opacity-30" />

      {/* Spacer to align center */}
      <div className="hidden md:block"></div>

      {/* Center Huge Typography */}
      <div className="w-full text-center px-4 z-10 my-auto">
        <div className="inline-block relative">
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-white/50 border border-white/10 px-4 py-1.5 rounded-full mb-3 inline-block">
            Electronics Engineer · Robotics & Embedded
          </span>
          <h1 className="font-black uppercase tracking-tight leading-none whitespace-nowrap block text-[8.2vw] sm:text-[8.5vw] md:text-[9vw] lg:text-[8.8vw] text-white drop-shadow-sm select-none">
            Ferdy Fernando
          </h1>
          <p className="text-[#D7E2EA] font-light uppercase tracking-[0.2em] text-[clamp(0.65rem,1.1vw,0.9rem)] mt-3 opacity-60">
            2411012007 — D4 Teknik Elektronika — Politeknik Negeri Padang
          </p>
        </div>
      </div>

      {/* Bottom Bar: Subtitle & CTA buttons */}
      <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-end px-6 md:px-10 z-20 gap-6 mt-8">
        <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-relaxed text-[clamp(0.75rem,1.2vw,1.05rem)] max-w-md opacity-80">
          Mahasiswa Teknik Elektronika — Robotika · Embedded System · Otomasi · Kontrol · Elektronika
        </p>

        <div className="flex flex-wrap gap-3 shrink-0">
          <Link
            to="/jurnal"
            className="rounded-full border-2 border-[#D7E2EA] px-6 py-3 text-xs font-semibold text-[#D7E2EA] uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all duration-200"
          >
            Jurnal Belajar
          </Link>
          <Link
            to="/proyek"
            className="rounded-full px-6 py-3 text-xs font-black uppercase tracking-widest inline-flex items-center gap-1.5 text-center bg-white text-black border-2 border-white hover:bg-black hover:text-white transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            Etalase Proyek <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
