import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ParticleCanvas } from '../components/common/ParticleCanvas';
import { Footer } from '../components/common/Footer';
import { ExternalLink, ArrowRight, Search, BookOpen, Calendar, CheckCircle2 } from 'lucide-react';

export const JournalPage = () => {
  const { journals, openJournalModal } = usePortfolio();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = journals.filter(
    (j) =>
      j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.week.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (j.progress && j.progress.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-kanit pt-24 pb-20">
      <ParticleCanvas opacity="opacity-20" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-10 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-white/50 border border-white/10 px-4 py-1.5 rounded-full inline-block mb-4">
            Weekly Documentation Log
          </span>
          <h1 className="hero-heading font-black uppercase tracking-tight text-[clamp(2.8rem,8vw,100px)] leading-none text-white">
            Jurnal Belajar
          </h1>
          <p className="font-light text-[clamp(0.9rem,1.4vw,1.05rem)] opacity-70 max-w-2xl mx-auto mt-4 leading-relaxed">
            Ferdy Fernando — 2411012007 — D4 Teknik Elektronika, Politeknik Negeri Padang. Catatan berkala dokumentasi praktikum, riset hardware, progres mingguan, kendala, dan Google Drive.
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
        </div>

        {/* Counter Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
          <span className="font-mono text-xs uppercase tracking-widest text-[#D7E2EA]/60">
            Total {filtered.length} Catatan Jurnal
          </span>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs text-white/60 hover:text-white underline font-mono"
            >
              Reset Pencarian
            </button>
          )}
        </div>

        {/* Journal Cards List */}
        <div className="flex flex-col gap-8">
          {filtered.length === 0 ? (
            <div className="py-24 text-center text-white/40 border border-white/10 rounded-3xl bg-white/[0.02]">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-base">Tidak ditemukan jurnal yang cocok dengan "{searchTerm}"</p>
            </div>
          ) : (
            filtered.map((j, i) => (
              <div
                key={j.week || i}
                className="group w-full rounded-[32px] sm:rounded-[40px] border-2 border-[#D7E2EA]/30 bg-[#111417]/85 backdrop-blur-sm p-6 sm:p-8 md:p-9 flex flex-col hover:border-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
              >
                {/* Top Row: Index number, Week pill, Date, Action buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-5 border-b border-white/10">
                  <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                    <span className="hero-heading font-black text-3xl sm:text-4xl text-white/90 group-hover:scale-105 transition-transform duration-300 origin-left">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-black bg-white px-3.5 py-1 rounded-full shadow-sm">
                      {j.week}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider text-[#D7E2EA]/60 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {j.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
                    {j.googleDrive && j.googleDrive !== 'MASUKKAN_LINK_GOOGLE_DRIVE_DI_SINI' && (
                      <a
                        href={j.googleDrive}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-white/20 px-3.5 py-2 text-xs font-mono text-white/80 uppercase tracking-widest hover:bg-white/10 flex items-center gap-1.5 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Drive
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => openJournalModal(j)}
                      className="rounded-full border-2 border-white px-5 sm:px-6 py-2 text-xs font-bold text-black bg-white uppercase tracking-widest hover:bg-transparent hover:text-white transition-all flex items-center gap-1.5 shadow-md"
                    >
                      Buka Rincian <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Card Body: Thumbnail & Details */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Left Column: Photo Thumbnail */}
                  <div className="md:col-span-4 cursor-pointer" onClick={() => openJournalModal(j)}>
                    {j.images && j.images.length > 0 && j.images[0] ? (
                      <div className="relative rounded-[20px] overflow-hidden border border-white/15 h-[170px] sm:h-[190px] bg-black group-hover:border-white/40 transition-colors">
                        <img
                          src={j.images[0]}
                          alt={j.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        {j.images.length > 1 && (
                          <div className="absolute bottom-2.5 right-2.5 bg-black/80 backdrop-blur-sm border border-white/20 rounded-full px-2.5 py-0.5 text-[10px] font-mono text-white/90">
                            +{j.images.length - 1} Foto
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="rounded-[20px] border border-white/15 h-[170px] sm:h-[190px] bg-white/[0.03] flex flex-col items-center justify-center text-white/30 gap-2">
                        <BookOpen className="w-8 h-8" />
                        <span className="text-xs font-mono">Dokumentasi</span>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Title & Structured Info */}
                  <div className="md:col-span-8 flex flex-col gap-3">
                    <h3
                      onClick={() => openJournalModal(j)}
                      className="text-lg sm:text-xl md:text-2xl font-bold uppercase text-white leading-snug cursor-pointer hover:text-[#D7E2EA] transition-colors"
                    >
                      {j.title}
                    </h3>

                    <p className="text-sm text-[#D7E2EA]/75 font-light leading-relaxed">
                      {j.summary}
                    </p>

                    {/* Progress highlight if present */}
                    {j.progress && (
                      <div className="mt-1 bg-white/[0.04] border border-white/10 rounded-2xl p-3 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-white/85 line-clamp-2 leading-relaxed">
                          <span className="font-semibold text-emerald-400 uppercase font-mono mr-1">Progres:</span>
                          {j.progress}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default JournalPage;
