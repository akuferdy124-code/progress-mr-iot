import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ParticleCanvas } from '../components/common/ParticleCanvas';
import { Footer } from '../components/common/Footer';
import { ArrowRight, Search, BookOpen } from 'lucide-react';

export const JournalPage = () => {
  const { journals, openJournalModal } = usePortfolio();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = journals.filter(
    (j) =>
      j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.week.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-kanit pt-20">
      {/* Top Banner */}
      <section className="px-6 md:px-10 py-12 max-w-5xl mx-auto text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-white/50 border border-white/10 px-4 py-1.5 rounded-full inline-block mb-4">
          Weekly Documentation Log
        </span>
        <h1 className="hero-heading font-black uppercase tracking-tight text-[clamp(2.8rem,8vw,90px)] leading-none text-white">
          Jurnal Belajar
        </h1>
        <p className="font-light text-[clamp(0.9rem,1.4vw,1.05rem)] opacity-70 max-w-2xl mx-auto mt-4">
          Ferdy Fernando — 2411012007 — D4 Teknik Elektronika, Politeknik Negeri Padang. Klik tiap minggu untuk detail dokumentasi, progres, tantangan, hasil, dan link Google Drive.
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mt-8 relative">
          <Search className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari minggu atau materi (cth: ESP32, PID, PLC)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/15 rounded-full pl-11 pr-5 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-white focus:bg-white/10 transition-all"
          />
        </div>
      </section>

      {/* Main Content White Container */}
      <section className="bg-[#FFFFFF] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-16 sm:py-24 text-[#0C0C0C] relative">
        <ParticleCanvas isLight={true} opacity="opacity-15" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex items-center justify-between border-b border-black/10 pb-6 mb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-black/60">
              Total {filtered.length} Catatan Jurnal
            </span>
          </div>

          <div className="flex flex-col">
            {filtered.length === 0 ? (
              <div className="py-20 text-center text-black/50">
                <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Tidak ditemukan jurnal yang cocok dengan "{searchTerm}"</p>
              </div>
            ) : (
              filtered.map((j, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => openJournalModal(j)}
                  className="group text-left w-full flex flex-col md:flex-row items-start md:items-center justify-between py-8 sm:py-10 md:py-12 border-b border-[rgba(12,12,12,0.15)] gap-6 px-6 -mx-6 rounded-3xl hover:bg-black/[0.05] hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300"
                >
                  <div className="font-black text-[clamp(3.5rem,9vw,110px)] leading-none text-[#0C0C0C] group-hover:scale-105 group-hover:tracking-tighter transition-all duration-300 origin-left">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="flex flex-col gap-2 max-w-2xl group-hover:translate-x-3 transition-transform duration-300">
                    <span className="font-semibold text-xs uppercase tracking-widest text-[#0C0C0C]/60">
                      {j.week} — {j.date}
                    </span>
                    <h3 className="font-bold uppercase text-[clamp(1.1rem,2.2vw,1.75rem)] text-[#0C0C0C] leading-tight">
                      {j.title}
                    </h3>
                    <p className="font-light leading-relaxed text-[clamp(0.85rem,1.4vw,1rem)] opacity-70 group-hover:opacity-100 text-[#0C0C0C] transition-opacity">
                      {j.summary}
                    </p>
                    <span className="font-bold text-xs uppercase tracking-wider text-[#0C0C0C] underline underline-offset-4 mt-2 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Buka Rincian Progres & Tantangan <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
