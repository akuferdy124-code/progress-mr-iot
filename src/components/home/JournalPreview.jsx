import React from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import { ParticleCanvas } from '../common/ParticleCanvas';
import { ArrowRight } from 'lucide-react';

export const JournalPreview = () => {
  const { journals, openJournalModal } = usePortfolio();
  const previewItems = journals.slice(0, 3);

  return (
    <section id="jurnal" className="bg-[#FFFFFF] px-5 sm:px-8 md:px-10 py-24 sm:py-32 text-[#0C0C0C] relative overflow-hidden">
      <ParticleCanvas isLight={true} opacity="opacity-15" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-black/50 border border-black/15 px-3 py-1 rounded-full inline-block mb-3">
              Weekly Progress Log
            </span>
            <h2 className="font-black uppercase tracking-tight text-[clamp(2.5rem,7vw,76px)] leading-none text-[#0C0C0C]">
              Jurnal Belajar
            </h2>
          </div>
          <Link
            to="/jurnal"
            className="rounded-full border-2 border-[#0C0C0C] px-6 py-3 text-xs sm:text-sm font-bold text-[#0C0C0C] uppercase tracking-widest hover:bg-[#0C0C0C] hover:text-white transition-all shrink-0 flex items-center gap-2 group self-start md:self-auto"
          >
            Lihat Semua ({journals.length}) <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <p className="font-light text-[clamp(0.95rem,1.5vw,1.1rem)] opacity-70 max-w-2xl mb-12 leading-relaxed">
          Perjalanan belajar mingguan: ringkasan capaian, progres praktikum, kendala & debugging, serta link dokumentasi Google Drive.
        </p>

        <div className="flex flex-col">
          {previewItems.map((j, i) => (
            <button
              key={i}
              type="button"
              onClick={() => openJournalModal(j)}
              className="group text-left w-full flex flex-col md:flex-row items-start md:items-center justify-between py-8 sm:py-10 md:py-12 border-b border-[rgba(12,12,12,0.15)] gap-6 px-6 -mx-6 rounded-3xl hover:bg-black/[0.05] hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 active:scale-[0.99]"
            >
              <div className="font-black text-[clamp(3.5rem,10vw,120px)] leading-none text-[#0C0C0C] group-hover:scale-110 group-hover:tracking-tighter transition-all duration-300 origin-left">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="flex flex-col gap-2 max-w-2xl group-hover:translate-x-3 transition-transform duration-300">
                <span className="font-medium text-xs uppercase tracking-widest text-[#0C0C0C]/60">
                  {j.week} — {j.date}
                </span>
                <h3 className="font-bold uppercase text-[clamp(1.1rem,2.2vw,1.75rem)] text-[#0C0C0C] leading-tight group-hover:text-black">
                  {j.title}
                </h3>
                <p className="font-light leading-relaxed text-[clamp(0.85rem,1.4vw,1rem)] opacity-70 group-hover:opacity-100 text-[#0C0C0C] line-clamp-2 transition-opacity">
                  {j.summary}
                </p>
                <span className="font-bold text-xs uppercase tracking-wider text-[#0C0C0C] underline underline-offset-4 mt-2 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Lihat Detail & Foto <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
