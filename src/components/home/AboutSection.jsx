import React from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import { ParticleCanvas } from '../common/ParticleCanvas';
import { ArrowRight, FileText } from 'lucide-react';

export const AboutSection = () => {
  const { projects, journals, skills, aboutPhoto } = usePortfolio();

  return (
    <section id="about" className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-24 sm:py-32 relative overflow-hidden">
      <ParticleCanvas opacity="opacity-20" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Photo Card */}
        <div className="lg:col-span-5 relative group">
          <div className="relative rounded-[32px] overflow-hidden border border-white/10 bg-[#121622] p-3 shadow-2xl transition-all duration-300 group-hover:border-white/30">
            <img
              src={aboutPhoto}
              alt="Ferdy Fernando"
              className="w-full h-[380px] sm:h-[480px] object-cover rounded-[24px] filter brightness-95 contrast-105 group-hover:scale-[1.02] transition-transform duration-500"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80';
              }}
            />
            <div className="absolute bottom-6 left-6 right-6 bg-[#0C0C0C]/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-white/50">Mahasiswa Aktif</p>
                <p className="text-sm font-bold text-white uppercase">Politeknik Negeri Padang</p>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <span className="text-[11px] tracking-[0.2em] uppercase font-mono text-white/50 border border-white/10 rounded-full px-4 py-1.5 self-start">
            About Me — Ferdy Fernando
          </span>

          <h2 className="font-black uppercase leading-none tracking-tight text-[clamp(2.6rem,5.5vw,62px)] text-white">
            Mahasiswa D4<br />
            <span className="text-white/80">Teknik Elektronika</span>
          </h2>

          <p className="text-[#D7E2EA] font-normal leading-relaxed text-[15px] sm:text-[16px]">
            Politeknik Negeri Padang — Berfokus pada <strong className="text-white">Robotika, Embedded System, Otomasi Industri, Kontrol PID, dan Elektronika Terapan</strong>. Berkomitmen mengembangkan perangkat keras dan firmware mikrokontroler yang tidak hanya fungsional secara teknis, tetapi juga efisien dan presisi.
          </p>

          <p className="text-[#D7E2EA]/60 font-light leading-relaxed text-sm">
            Terbiasa merancang solusi dari level skematik & layout PCB di KiCad, firmware mikrokontroler (ESP32-S3 / STM32 / Arduino C++), hingga integrasi sistem tingkat lanjut seperti micro-ROS 2 Jazzy dan PLC Ladder Diagram.
          </p>

          {/* Interactive Stat Counters */}
          <div className="grid grid-cols-3 gap-3 mt-3">
            <Link
              to="/proyek"
              className="rounded-2xl bg-white text-black p-4 text-center transition-all duration-300 hover:-translate-y-1.5 hover:bg-black hover:text-white hover:border-white hover:border cursor-pointer shadow-lg group"
            >
              <p className="text-2xl sm:text-3xl font-black">{projects.length}+</p>
              <p className="text-[10px] sm:text-xs uppercase tracking-widest opacity-70 group-hover:opacity-100">Proyek</p>
            </Link>

            <Link
              to="/jurnal"
              className="rounded-2xl bg-white/10 border border-white/10 p-4 text-center transition-all duration-300 hover:-translate-y-1.5 hover:bg-white hover:text-black cursor-pointer shadow-lg group"
            >
              <p className="text-2xl sm:text-3xl font-black text-white group-hover:text-black">{journals.length}</p>
              <p className="text-[10px] sm:text-xs uppercase tracking-widest opacity-60 text-white group-hover:text-black group-hover:opacity-100">Minggu Jurnal</p>
            </Link>

            <a
              href="#skills"
              className="rounded-2xl bg-white/10 border border-white/10 p-4 text-center transition-all duration-300 hover:-translate-y-1.5 hover:bg-white hover:text-black cursor-pointer shadow-lg group"
            >
              <p className="text-2xl sm:text-3xl font-black text-white group-hover:text-black">{skills.length}</p>
              <p className="text-[10px] sm:text-xs uppercase tracking-widest opacity-60 text-white group-hover:text-black group-hover:opacity-100">Tech Stack</p>
            </a>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mt-4">
            <Link
              to="/jurnal"
              className="rounded-full border-2 border-[#D7E2EA] px-6 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center gap-1.5"
            >
              Jurnal Belajar <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/proyek"
              className="rounded-full px-6 py-3 text-xs font-bold uppercase tracking-widest bg-white text-black hover:bg-white/90 transition-all flex items-center gap-1.5 shadow-md"
            >
              Etalase Proyek <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href="assets/CV-Ferdy-Fernando.pdf"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 px-6 py-3 text-xs font-mono uppercase tracking-widest hover:border-white transition-colors flex items-center gap-1.5 text-white/80 hover:text-white"
            >
              <FileText className="w-3.5 h-3.5" /> Unduh CV ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
