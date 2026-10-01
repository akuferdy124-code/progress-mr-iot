import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ParticleCanvas } from '../common/ParticleCanvas';

export const SkillsSection = () => {
  const { skills } = usePortfolio();

  return (
    <section id="skills" className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-24 sm:py-32 text-white relative overflow-hidden border-t border-white/5">
      <ParticleCanvas opacity="opacity-20" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-[11px] tracking-[0.2em] uppercase font-mono text-white/50 border border-white/10 rounded-full px-4 py-1.5 inline-block mb-3">
            Tech Stack & Tools
          </span>
          <h2 className="font-black uppercase tracking-tight text-[clamp(2.5rem,6vw,64px)] leading-none text-white">
            Skills & Keahlian
          </h2>
          <p className="text-white/60 text-sm max-w-lg mx-auto mt-3">
            Hardware, firmware, software simulasi, dan bahasa pemrograman yang digunakan dalam riset dan implementasi sistem.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {skills.map((s, idx) => (
            <div
              key={idx}
              className="group bg-[#151515] border border-white/10 rounded-[24px] p-6 sm:p-7 flex flex-col items-center justify-center gap-4 hover:-translate-y-2 hover:bg-white hover:border-white transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-black/5 transition-colors p-2.5">
                <img
                  src={s.icon}
                  alt={s.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-white group-hover:text-black text-center transition-colors">
                {s.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
