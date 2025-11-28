import React, { useState } from "react";
import { HashLink } from "react-router-hash-link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const waNumber = "447494481443";
  const waHref = `https://wa.me/${waNumber}`;

  // Scroll offset function (accounts for fixed header height)
  const scrollWithOffset = (el) => {
    const yOffset = -80; // adjust this to your header height
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 w-full bg-black/90 backdrop-blur-sm z-50 border-b border-gray-800">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo only */}
          <div className="flex items-center min-w-0">
            <img
              src="/logo.jpeg"
              alt="AF-MOK Logo"
              className="rounded-full w-14 h-14 lg:w-16 lg:h-16 flex-shrink-0"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            <HashLink smooth to="/#home" scroll={scrollWithOffset} className="text-gray-300 hover:text-white transition-colors">
              Home
            </HashLink>
            <HashLink smooth to="/#services" scroll={scrollWithOffset} className="text-gray-300 hover:text-white transition-colors">
              Services
            </HashLink>
            <HashLink smooth to="/#about" scroll={scrollWithOffset} className="text-gray-300 hover:text-white transition-colors">
              About
            </HashLink>
            <HashLink smooth to="/#testimonials" scroll={scrollWithOffset} className="text-gray-300 hover:text-white transition-colors">
              Testimonials
            </HashLink>
            <HashLink smooth to="/#contact" scroll={scrollWithOffset} className="text-gray-300 hover:text-white transition-colors">
              Contact
            </HashLink>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* WhatsApp (Desktop) */}
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="hidden md:inline-flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-emerald-300 hover:text-white hover:bg-emerald-500/20 transition-colors"
            >
              {/* WhatsApp Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M128 24a104 104 0 0 0-88.61 156.7L32 232l52.15-6.94A104 104 0 1 0 128 24Zm0 192a88 88 0 0 1-45.13-12.46l-3.26-1.94-31.1 4.14 4.22-30.62-2-3.33A88 88 0 1 1 128 216Zm48.9-54.21c-2.69 7.6-13.31 14.27-18.69 14.56-5 .28-11.34.4-32.82-9.72-27.6-13.18-45.51-39.08-46.91-40.94s-11.21-14.95-11.21-28.55 7.1-20.27 9.63-23.08a10.51 10.51 0 0 1 7.67-3.59c1.88 0 3.83 0 5.5.09a9.37 9.37 0 0 1 6.19 2.91c1.93 2.11 6.86 8.41 7.43 9.91s1.87 4.34.27 6.93-2.41 3.86-4.38 6.22c-2 2.35-4.15 4.19-1.78 8s7.69 12.63 16.53 20.45c11.36 10.09 20.92 13.21 24.59 14.7s5.93 1.24 8.13-.75 9.39-10.95 11.89-14.71 4.94-3.05 8.31-1.84 21.56 10.16 25.29 12c3.73 1.84 6.22 2.75 7.14 4.24s.95 7.54-1.74 15.13Z" />
              </svg>
              <span className="text-sm font-semibold whitespace-nowrap">WhatsApp</span>
            </a>

            {/* WhatsApp (Mobile icon only) */}
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-emerald-300 hover:text-white hover:bg-emerald-500/20 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="22" height="22" fill="currentColor" aria-hidden="true">
                <path d="M128 24a104 104 0 0 0-88.61 156.7L32 232l52.15-6.94A104 104 0 1 0 128 24Zm0 192a88 88 0 0 1-45.13-12.46l-3.26-1.94-31.1 4.14 4.22-30.62-2-3.33A88 88 0 1 1 128 216Zm48.9-54.21c-2.69 7.6-13.31 14.27-18.69 14.56-5 .28-11.34.4-32.82-9.72-27.6-13.18-45.51-39.08-46.91-40.94s-11.21-14.95-11.21-28.55 7.1-20.27 9.63-23.08a10.51 10.51 0 0 1 7.67-3.59c1.88 0 3.83 0 5.5.09a9.37 9.37 0 0 1 6.19 2.91c1.93 2.11 6.86 8.41 7.43 9.91s1.87 4.34.27 6.93-2.41 3.86-4.38 6.22c-2 2.35-4.15 4.19-1.78 8s7.69 12.63 16.53 20.45c11.36 10.09 20.92 13.21 24.59 14.7s5.93 1.24 8.13-.75 9.39-10.95 11.89-14.71 4.94-3.05 8.31-1.84 21.56 10.16 25.29 12c3.73 1.84 6.22 2.75 7.14 4.24s.95 7.54-1.74 15.13Z" />
              </svg>
            </a>

            {/* Mobile Menu Button */}
            <button
              type="button"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="md:hidden ml-1 text-white inline-flex items-center justify-center p-2 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
              onClick={() => setIsMenuOpen((v) => !v)}
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 6h18M3 12h18M3 18h18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              <HashLink smooth to="/#home" scroll={scrollWithOffset} className="text-gray-300 hover:text-white transition-colors">
                Home
              </HashLink>
              <HashLink smooth to="/#services" scroll={scrollWithOffset} className="text-gray-300 hover:text-white transition-colors">
                Services
              </HashLink>
              <HashLink smooth to="/#about" scroll={scrollWithOffset} className="text-gray-300 hover:text-white transition-colors">
                About
              </HashLink>
              <HashLink smooth to="/#testimonials" scroll={scrollWithOffset} className="text-gray-300 hover:text-white transition-colors">
                Testimonials
              </HashLink>
              <HashLink smooth to="/#contact" scroll={scrollWithOffset} className="text-gray-300 hover:text-white transition-colors">
                Contact
              </HashLink>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
