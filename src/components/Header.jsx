import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-[#0E1201] text-white relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 relative">

        {/* LOGO */}
        <a href="/" className="flex items-center z-20">
          <img
            src="https://framerusercontent.com/images/UO08WAP2Gw3s4SfewiR3XAaoAgk.png"
            alt="logo"
            className="w-28"
          />
        </a>

        {/* CENTERED MENU (DESKTOP ONLY) */}
        <div className="hidden lg:flex space-x-8 absolute left-1/2 -translate-x-1/2">
          <a href="/" className="text-[#CDF660] hover:text-[#e4ff8f]">Home</a>
          <a href="/pricing" className="hover:text-[#cdf660]">Pricing</a>
          <a href="/about-us" className="hover:text-[#cdf660]">About Us</a>
          <a href="/services-index" className="hover:text-[#cdf660]">Service</a>
          <a href="/projects-index" className="hover:text-[#cdf660]">Projects</a>
          <a href="/blog" className="hover:text-[#cdf660]">Blog</a>
        </div>

        {/* RIGHT BUTTON */}
        <a
          href="/contact-us"
          className="hidden lg:flex bg-[#CDF660] text-black px-4 py-2 rounded-sm font-medium z-20 hover:bg-[#e4ff8f]"
        >
          Get In Touch
        </a>

        {/* HAMBURGER (MOBILE) */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden z-20 text-white"
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`lg:hidden bg-[#0E1201] transition-all duration-300 overflow-hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-6 pb-4 space-y-4 pt-2">
          <a href="/" className="text-[#CDF660] text-lg">Home</a>
          <a href="/pricing" className="text-white text-lg">Pricing</a>
          <a href="/about-us" className="text-white text-lg">About Us</a>
          <a href="/services-index" className="text-white text-lg">Service</a>
          <a href="/projects-index" className="text-white text-lg">Projects</a>
          <a href="/blog" className="text-white text-lg">Blog</a>

          <a
            href="/contact-us"
            className="bg-[#CDF660] text-black text-center px-4 py-2 rounded-sm"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </nav>
  );
}
