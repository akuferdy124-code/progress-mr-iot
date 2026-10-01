import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ParticleCanvas } from '../components/common/ParticleCanvas';
import { Footer } from '../components/common/Footer';
import { ExternalLink, ArrowRight, Search, Cpu } from 'lucide-react';

export const ProjectsPage = () => {
  const { projects, openProjectModal } = usePortfolio();
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique categories
  const categories = ['All', ...new Set(projects.map((p) => p.category))];

  const filtered = projects.filter((p) => {
    const matchesCategory = filterCategory === 'All' || p.category === filterCategory;
    const matchesQuery =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.technologies || []).some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-kanit pt-24 pb-16">
      <ParticleCanvas opacity="opacity-20" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-white/50 border border-white/10 px-4 py-1.5 rounded-full inline-block mb-4">
            Engineering Portfolio & R&D
          </span>
          <h1 className="hero-heading font-black uppercase tracking-tight text-[clamp(2.8rem,9vw,110px)] leading-none text-white">
            Etalase Proyek
          </h1>
          <p className="font-light text-[clamp(0.9rem,1.4vw,1.05rem)] opacity-70 mt-4 leading-relaxed">
            Ferdy Fernando — 2411012007 — D4 Teknik Elektronika. Dokumentasi komprehensif, galeri foto, komponen hardware, skematik sistem kendali, dan link Google Drive.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  filterCategory === cat
                    ? 'bg-white text-black shadow-lg scale-105'
                    : 'bg-white/5 text-white/70 hover:bg-white/15 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari teknologi / judul..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded-full pl-11 pr-4 py-2.5 text-xs text-white placeholder-white/40 outline-none focus:border-white focus:bg-white/10 transition-all"
            />
          </div>
        </div>

        {/* Projects Cards List */}
        <div className="flex flex-col gap-10">
          {filtered.length === 0 ? (
            <div className="py-24 text-center text-white/40">
              <Cpu className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Tidak ada proyek yang sesuai dengan kriteria pencarian.</p>
            </div>
          ) : (
            filtered.map((p) => (
              <div
                key={p.id}
                className="group w-full rounded-[36px] sm:rounded-[48px] md:rounded-[56px] border-2 border-[#D7E2EA]/40 bg-[#111417]/80 backdrop-blur-sm p-5 sm:p-7 md:p-9 flex flex-col overflow-hidden hover:border-white transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <span className="hero-heading font-black text-4xl sm:text-5xl text-white group-hover:scale-110 transition-transform duration-300 origin-left">
                      {p.num}
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 group-hover:text-white transition-colors">
                        {p.category} {p.status ? `· ${p.status}` : ''}
                      </p>
                      <h3 className="text-xl sm:text-2xl font-bold uppercase text-white leading-tight">
                        {p.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    {p.googleDrive && p.googleDrive !== 'MASUKKAN_LINK_GOOGLE_DRIVE_DI_SINI' && (
                      <a
                        href={p.googleDrive}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-white/20 px-4 py-2 text-xs font-mono text-white/80 uppercase tracking-widest hover:bg-white/10 flex items-center gap-1.5 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Drive
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => openProjectModal(p)}
                      className="rounded-full border-2 border-white px-6 py-2.5 text-xs font-bold text-black bg-white uppercase tracking-widest hover:bg-transparent hover:text-white transition-colors flex items-center gap-1.5 shadow-md"
                    >
                      Lihat Detail <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Images Column */}
                  <div className="md:col-span-5 flex flex-col gap-3">
                    {p.images && p.images[0] && (
                      <div className="rounded-[24px] overflow-hidden border border-white/15 h-[200px] sm:h-[220px] bg-black">
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    )}
                    {p.images && p.images.length > 1 && (
                      <div className="flex gap-2">
                        {p.images.slice(1, 3).map((img, idx) => (
                          <div
                            key={idx}
                            className="w-1/2 rounded-2xl overflow-hidden border border-white/15 h-[110px] bg-black"
                          >
                            <img
                              src={img}
                              alt=""
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Info Column */}
                  <div className="md:col-span-7 flex flex-col gap-4">
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light">
                      {p.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {(p.technologies || p.tech || []).map((t, ti) => (
                        <span
                          key={ti}
                          className="text-xs px-3 py-1 rounded-full border border-white/20 text-white/80 bg-white/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {p.result && (
                      <div className="mt-2 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs">
                        <span className="font-bold text-emerald-400 uppercase tracking-widest block mb-1">
                          Hasil Capaian:
                        </span>
                        <span className="text-white/90">{p.result}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};
