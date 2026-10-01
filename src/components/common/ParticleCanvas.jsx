import React, { useRef, useEffect } from 'react';

export const ParticleCanvas = ({ isLight = false, opacity = 'opacity-20', className = '' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = 0;
    let height = 0;
    let dots = [];

    const resize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      const count = isLight ? 60 : 80;
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.5 + 0.4,
        o: Math.random() * 0.5 + 0.15,
        vx: (Math.random() - 0.5) * 0.35,
        vy: Math.random() * 0.5 + 0.1,
      }));
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = isLight ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.07)';
      ctx.lineWidth = 1;

      dots.forEach((d, i) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > width) d.vx *= -1;
        if (d.y > height) {
          d.y = 0;
          d.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? `rgba(0,0,0,${d.o})` : `rgba(255,255,255,${d.o})`;
        ctx.fill();

        for (let j = i + 1; j < dots.length; j++) {
          const o = dots[j];
          const dx = d.x - o.x;
          const dy = d.y - o.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 95) {
            ctx.globalAlpha = (1 - dist / 95) * 0.12;
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(o.x, o.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLight]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${opacity} ${className}`}
    />
  );
};
