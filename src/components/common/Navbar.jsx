import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Jurnal', path: '/jurnal' },
    { label: 'Proyek', path: '/proyek' },
    { label: 'Contact', path: '/#contact', isAnchor: true },
  ];

  const handleAnchorClick = (e, path) => {
    if (path.startsWith('/#')) {
      if (location.pathname === '/') {
        e.preventDefault();
        const element = document.getElementById(path.replace('/#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0C0C0C]/85 backdrop-blur-md py-4 border-b border-white/10 shadow-lg'
          : 'bg-transparent py-6 md:py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          to="/"
          className="font-black text-lg md:text-xl uppercase tracking-wider text-white hover:opacity-80 transition-opacity flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
          FERDY.F
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1.5 bg-[#121614]/85 backdrop-blur-md p-1.5 rounded-full border border-white/15 shadow-2xl">
          {navLinks.map((link) => {
            const isActive =
              link.path === '/'
                ? location.pathname === '/' && !location.hash
                : location.pathname === link.path;

            const baseClass = `px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
              isActive
                ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-105'
                : 'text-white/70 hover:text-black hover:bg-white hover:-translate-y-1 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.45)]'
            }`;

            return link.isAnchor && location.pathname === '/' ? (
              <a
                key={link.label}
                href={link.path.replace('/', '')}
                onClick={(e) => handleAnchorClick(e, link.path)}
                className={baseClass}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.path}
                className={baseClass}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            to="/admin"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/20 text-xs font-mono font-bold tracking-wider text-white/80 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.45)] ml-1"
            title="Admin HP Dashboard"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin HP</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            to="/admin"
            className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white hover:text-black transition-all duration-200"
            title="Admin HP"
          >
            <Shield className="w-4 h-4" />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0C0C0C]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 flex flex-col gap-3 animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={(e) => {
                if (link.isAnchor && location.pathname === '/') {
                  handleAnchorClick(e, link.path);
                  setMobileMenuOpen(false);
                }
              }}
              className="text-sm uppercase tracking-wider font-bold text-white/80 hover:text-black hover:bg-white px-4 py-3 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg border border-transparent hover:border-white"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/admin"
            className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs mt-2 hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all"
          >
            <Shield className="w-4 h-4" />
            Admin Panel HP
          </Link>
        </div>
      )}
    </nav>
  );
};
