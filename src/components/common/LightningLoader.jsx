import React, { useState, useEffect, useRef } from 'react';

export const LightningLoader = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const [stepLabel, setStepLabel] = useState('Preparing');
  const [isFading, setIsFading] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Check if user already saw loader this session to avoid annoyance on quick refreshes
    const hasLoaded = sessionStorage.getItem('portfolio_loaded');
    if (hasLoaded) {
      setIsMounted(false);
      if (onComplete) onComplete();
      return;
    }

    const milestones = [
      { p: 24, label: 'Initializing Toolchain' },
      { p: 52, label: 'Loading Hardware Assets' },
      { p: 81, label: 'Compiling Engineering Data' },
      { p: 100, label: 'Ready' }
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < milestones.length) {
        setPercent(milestones[current].p);
        setStepLabel(milestones[current].label);
        current++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsFading(true);
          sessionStorage.setItem('portfolio_loaded', 'true');
          setTimeout(() => {
            setIsMounted(false);
            if (onComplete) onComplete();
          }, 600);
        }, 300);
      }
    }, 450);

    return () => clearInterval(interval);
  }, []);

  // Lightning canvas effect
  useEffect(() => {
    if (!isMounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    let dots = Array.from({ length: 180 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.3,
      o: Math.random() * 0.7 + 0.2,
      vx: (Math.random() - 0.5) * 0.4,
      vy: Math.random() * 0.8 + 0.2,
    }));

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, '#050505');
      gradient.addColorStop(1, '#0c0c0c');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 1;

      dots.forEach((d, i) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y > h) {
          d.y = 0;
          d.x = Math.random() * w;
        }

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${d.o})`;
        ctx.fill();

        for (let j = i + 1; j < dots.length; j++) {
          const o = dots[j];
          const dx = d.x - o.x;
          const dy = d.y - o.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.globalAlpha = (1 - dist / 110) * 0.15;
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(o.x, o.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0C0C0C] transition-opacity duration-700 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-wider mb-2 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
          Welcome To My
        </h1>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white uppercase tracking-wider mb-10 drop-shadow-[0_0_25px_rgba(255,255,255,0.5)]">
          Portofolio Website
        </h2>

        <div className="w-72 sm:w-96 flex justify-between items-center text-xs sm:text-sm font-mono tracking-widest text-white/60 mb-2">
          <span>{stepLabel}</span>
          <span>{percent}%</span>
        </div>

        <div className="w-72 sm:w-96 h-[4px] bg-white/10 rounded-full overflow-hidden border border-white/15">
          <div
            className="h-full bg-white transition-all duration-300 ease-out shadow-[0_0_12px_#fff]"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
