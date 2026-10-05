import React, { useState } from 'react';
import { engineeringTags, dynamicTechVisuals } from '../../data/portfolioData';
import { ParticleCanvas } from '../common/ParticleCanvas';
import { usePortfolio } from '../../context/PortfolioContext';

export const MarqueeSection = () => {
  const { galleryPhotos } = usePortfolio();
  const [activePhotoIdx, setActivePhotoIdx] = useState(null);

  // Gunakan foto galeri dari admin jika ada, fallback ke foto default
  const visualSources = galleryPhotos.length > 0 ? galleryPhotos : dynamicTechVisuals;

  return (
    <section id="marquee" className="bg-[#0C0C0C] py-20 overflow-hidden relative border-y border-white/5">
      <ParticleCanvas opacity="opacity-20" />

      <div className="flex flex-col gap-6 relative z-10">
        {/* Row 1: Tags Marquee */}
        <div className="flex overflow-hidden select-none whitespace-nowrap group">
          <div className="flex gap-4 animate-marquee group-hover:[animation-play-state:paused]">
            {[...engineeringTags, ...engineeringTags, ...engineeringTags].map((tag, idx) => (
              <div
                key={idx}
                className="group/tag px-6 py-3.5 rounded-2xl bg-[#121614] border border-[#D7E2EA]/20 font-mono text-xs sm:text-sm tracking-widest text-[#D7E2EA] shrink-0 flex items-center gap-3 cursor-pointer hover:text-black hover:bg-white hover:border-white transition-all duration-200 shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-[#D7E2EA] opacity-80 group-hover/tag:bg-black transition-colors" />
                <span>{tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Visuals Marquee */}
        <div className="flex overflow-hidden select-none whitespace-nowrap group">
          <div className="flex gap-4 animate-marquee-reverse group-hover:[animation-play-state:paused]">
            {[...visualSources, ...visualSources].map((imgUrl, idx) => {
              const isActive = activePhotoIdx === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActivePhotoIdx(isActive ? null : idx)}
                  className={`w-[280px] sm:w-[340px] h-[180px] sm:h-[210px] rounded-2xl overflow-hidden shrink-0 border bg-black cursor-pointer group/img transition-all duration-300 ${
                    isActive
                      ? 'border-white ring-2 ring-white/40 scale-[1.02]'
                      : 'border-[#D7E2EA]/20 hover:border-white'
                  }`}
                  title="Arahkan kursor atau klik untuk memunculkan warna"
                >
                  <img
                    src={imgUrl}
                    alt="Engineering Hardware"
                    className={`w-full h-full object-cover transition-all duration-500 filter ${
                      isActive
                        ? 'grayscale-0 scale-105'
                        : 'grayscale contrast-110 group-hover/img:grayscale-0 group-hover/img:scale-105 active:grayscale-0'
                    }`}
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
