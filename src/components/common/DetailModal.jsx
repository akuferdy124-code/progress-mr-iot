import React, { useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { X, ExternalLink, Cpu, BookOpen, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

export const DetailModal = () => {
  const { modalState, closeModal } = usePortfolio();
  const { isOpen, type, data } = modalState;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeModal]);

  if (!isOpen || !data) return null;

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0C0C0C] border-2 border-[#D7E2EA]/80 rounded-[32px] sm:rounded-[40px] p-6 sm:p-8 md:p-10 shadow-2xl text-[#D7E2EA] animate-scaleUp"
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 w-11 h-11 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] flex items-center justify-center hover:bg-white hover:text-black transition-colors z-20 group"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
        </button>

        {/* PROJECT MODAL */}
        {type === 'project' && (
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#D7E2EA]/60 bg-white/10 px-3 py-1 rounded-full">
                {data.num} — {data.category}
              </span>
              {data.status && (
                <span className="font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full border border-white/20 text-white/80">
                  {data.status}
                </span>
              )}
            </div>

            <h2 className="font-black uppercase text-2xl sm:text-4xl text-white tracking-tight leading-tight mt-3">
              {data.title}
            </h2>

            {/* Tech stack tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {(data.technologies || data.tech || []).map((t, idx) => (
                <span
                  key={idx}
                  className="text-xs px-3 py-1 rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] bg-white/5"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Images */}
            {data.images && data.images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                {data.images.map((imgUrl, i) => (
                  <div key={i} className="overflow-hidden rounded-2xl border border-white/15 aspect-[4/3] bg-black">
                    <img
                      src={imgUrl}
                      alt={`${data.title} screenshot ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            )}

            <p className="text-sm sm:text-base text-[#D7E2EA]/80 mt-6 leading-relaxed">
              {data.desc}
            </p>

            {/* Technical Breakdown */}
            <div className="space-y-4 mt-8 pt-6 border-t border-white/10 text-sm text-[#D7E2EA]/90">
              {data.problem && (
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <h4 className="font-bold text-xs uppercase tracking-widest text-amber-300 mb-1 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" /> Masalah & Latar Belakang
                  </h4>
                  <p className="text-white/80">{data.problem}</p>
                </div>
              )}

              {data.objective && (
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <h4 className="font-bold text-xs uppercase tracking-widest text-blue-300 mb-1 flex items-center gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5" /> Tujuan Perancangan
                  </h4>
                  <p className="text-white/80">{data.objective}</p>
                </div>
              )}

              {data.systemDesign && (
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <h4 className="font-bold text-xs uppercase tracking-widest text-emerald-300 mb-1 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" /> Desain Sistem & Arsitektur
                  </h4>
                  <p className="text-white/80">{data.systemDesign}</p>
                </div>
              )}

              {data.hardware && (
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <h4 className="font-bold text-xs uppercase tracking-widest text-purple-300 mb-2 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" /> Komponen Hardware
                  </h4>
                  {Array.isArray(data.hardware) ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-white/80">
                      {data.hardware.map((item, hi) => (
                        <li key={hi} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-white/80">{data.hardware}</p>
                  )}
                </div>
              )}

              {data.result && (
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <h4 className="font-bold text-xs uppercase tracking-widest text-green-400 mb-1 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" /> Hasil Pengujian & Efisiensi
                  </h4>
                  <p className="text-white/90 font-medium">{data.result}</p>
                </div>
              )}
            </div>

            {/* Links */}
            <div className="mt-8 flex flex-wrap gap-3">
              {data.googleDrive && data.googleDrive !== 'MASUKKAN_LINK_GOOGLE_DRIVE_DI_SINI' ? (
                <a
                  href={data.googleDrive}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full px-6 py-3 text-xs font-bold uppercase tracking-widest bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-2 transition-all shadow-lg"
                >
                  <ExternalLink className="w-4 h-4" /> Buka Google Drive Proyek
                </a>
              ) : null}

              {data.projectLink && (
                <a
                  href={data.projectLink}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border-2 border-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black flex items-center gap-2 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              )}
            </div>
          </div>
        )}

        {/* JOURNAL MODAL */}
        {type === 'journal' && (
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#D7E2EA]/60 bg-white/10 px-3 py-1 rounded-full">
              {data.week} — {data.date}
            </span>

            <h2 className="font-black uppercase text-2xl sm:text-4xl text-white tracking-tight leading-tight mt-3">
              {data.title}
            </h2>

            <p className="text-sm sm:text-base text-[#D7E2EA]/70 mt-2 leading-relaxed">
              {data.summary}
            </p>

            {/* Images */}
            {data.images && data.images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                {data.images.map((imgUrl, i) => (
                  <div key={i} className="overflow-hidden rounded-2xl border border-white/15 aspect-[16/10] bg-black">
                    <img
                      src={imgUrl}
                      alt={`${data.title} dokumentasi ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Breakdown */}
            <div className="space-y-4 mt-8 pt-6 border-t border-white/10 text-sm">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <h4 className="font-bold text-xs uppercase tracking-widest text-emerald-400 mb-1 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" /> Progres Mingguan
                </h4>
                <p className="text-white/85 leading-relaxed">{data.progress}</p>
              </div>

              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <h4 className="font-bold text-xs uppercase tracking-widest text-amber-300 mb-1 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" /> Kendala & Tantangan
                </h4>
                <p className="text-white/85 leading-relaxed">{data.challenges || '-'}</p>
              </div>

              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <h4 className="font-bold text-xs uppercase tracking-widest text-cyan-300 mb-1 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" /> Hasil Capaian
                </h4>
                <p className="text-white/85 leading-relaxed">{data.result || '-'}</p>
              </div>

              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <h4 className="font-bold text-xs uppercase tracking-widest text-violet-300 mb-1 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" /> Pembelajaran Penting
                </h4>
                <p className="text-white/85 leading-relaxed">{data.learning || '-'}</p>
              </div>
            </div>

            {/* Drive Link */}
            {data.googleDrive && data.googleDrive !== 'MASUKKAN_LINK_GOOGLE_DRIVE_DI_SINI' ? (
              <a
                href={data.googleDrive}
                target="_blank"
                rel="noreferrer"
                className="mt-6 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-widest bg-blue-600 hover:bg-blue-500 text-white inline-flex items-center gap-2 transition-all shadow-lg"
              >
                <ExternalLink className="w-4 h-4" /> Dokumentasi Lengkap di Google Drive
              </a>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};
