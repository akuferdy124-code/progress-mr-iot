import React from 'react';
import { engineeringTags, dynamicTechVisuals } from '../../data/portfolioData';
import { ParticleCanvas } from '../common/ParticleCanvas';

export const MarqueeSection = () => {
  // Double arrays for seamless continuous looping
  const row1Items = [...engineeringTags, ...engineeringTags, ...engineeringTags];
  const row2Items = [...dynamicTechVisuals, ...dynamicTechVisuals];

  return (
    <section id="marquee" className="bg-[#0C0C0C] py-20 overflow-hidden relative border-y border-white/5">
      <ParticleCanvas opacity="opacity-20" />

      <div className="flex flex-col gap-6 relative z-10">
        {/* Row 1: Tags Marquee */}
        <div className="flex overflow-hidden select-none whitespace-nowrap group">
          <div className="flex gap-4 animate-marquee group-hover:[animation-play-state:paused]">
            {row1Items.map((tag, idx) => (
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
            {row2Items.map((imgUrl, idx) => (
              <div
                key={idx}
                className="w-[280px] sm:w-[340px] h-[180px] sm:h-[210px] rounded-2xl overflow-hidden shrink-0 border border-[#D7E2EA]/20 bg-black cursor-pointer group/img"
              >
                <img
                  src={imgUrl}
                  alt="Engineering Hardware"
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover/img:grayscale-0 group-hover/img:scale-105 transition-all duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
