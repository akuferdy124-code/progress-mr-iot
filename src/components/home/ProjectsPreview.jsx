import React from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import { ParticleCanvas } from '../common/ParticleCanvas';
import { ArrowRight, Shield } from 'lucide-react';

export const ProjectsPreview = () => {
  const { projects, openProjectModal } = usePortfolio();
  const previewItems = projects.slice(0, 3);

  return (
    <section id="projects" className="bg-[#FFFFFF] px-5 sm:px-8 md:px-10 py-24 text-[#0C0C0C] relative overflow-hidden border-t border-black/10">
      <ParticleCanvas isLight={true} opacity="opacity-15" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-black/50 border border-black/15 px-3 py-1 rounded-full inline-block mb-3">
              Selected Works
            </span>
            <h2 className="font-black uppercase tracking-tight text-[clamp(3rem,11vw,140px)] leading-none text-[#0C0C0C]">
              Etalase
            </h2>
          </div>

          <div className="flex flex-wrap gap-2.5 shrink-0 self-start md:self-auto">
            <Link
              to="/admin"
              className="rounded-full border border-black/25 px-4 py-2.5 text-xs font-mono uppercase tracking-widest text-[#0C0C0C] hover:bg-black/5 transition-colors flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5" /> Kelola via HP
            </Link>
            <Link
              to="/proyek"
              className="rounded-full border-2 border-[#0C0C0C] px-6 py-2.5 text-xs sm:text-sm font-bold text-[#0C0C0C] uppercase tracking-widest hover:bg-[#0C0C0C] hover:text-white transition-all flex items-center gap-2 group"
            >
              Lihat Semua ({projects.length}) <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {previewItems.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => openProjectModal(p)}
              className="group text-left w-full flex flex-col md:flex-row items-start md:items-center justify-between py-8 sm:py-10 border-b border-[rgba(12,12,12,0.15)] gap-6 px-6 -mx-6 rounded-3xl hover:bg-black/[0.05] hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 active:scale-[0.99]"
            >
              <div className="font-black text-[clamp(3.5rem,10vw,120px)] leading-none text-[#0C0C0C] group-hover:scale-110 transition-all origin-left">
                {p.num}
              </div>
              <div className="flex flex-col gap-2 max-w-2xl group-hover:translate-x-3 transition-transform duration-300">
                <span className="font-semibold text-xs uppercase tracking-widest text-[#0C0C0C]/60">
                  {p.category} {p.status ? `· ${p.status}` : ''}
                </span>
                <h3 className="font-bold uppercase text-[clamp(1.1rem,2.2vw,1.75rem)] text-[#0C0C0C] leading-tight">
                  {p.title}
                </h3>
                <p className="font-light leading-relaxed text-[clamp(0.85rem,1.4vw,1rem)] opacity-70 group-hover:opacity-100 text-[#0C0C0C] line-clamp-2 transition-opacity">
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {(p.technologies || p.tech || []).slice(0, 4).map((t, ti) => (
                    <span
                      key={ti}
                      className="text-[11px] px-3 py-1 rounded-full border border-black/20 text-black/75 bg-black/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="font-bold text-xs uppercase tracking-wider text-[#0C0C0C] underline underline-offset-4 mt-2 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Lihat Detail Skematik & Hardware <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
