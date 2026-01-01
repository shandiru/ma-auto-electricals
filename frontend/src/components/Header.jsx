"use client";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const serviceRef = useRef(null);

  const waNumber = "447494481443";
  const waHref = `https://wa.me/${waNumber}`;

  const scrollWithOffset = (el) => {
    const yOffset = -80;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  };

  useEffect(() => {
    updateCartCount();
    const handleStorage = () => updateCartCount();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (serviceRef.current && !serviceRef.current.contains(event.target)) {
        setIsServiceOpen(false);
        setOpenSubMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const serviceCategories = [
    {
      category: "Mechanical & Servicing",
      items: [
        { title: "Mechanical Repairs (All)", link: "/Mechanical" },
        { title: "Car Repairs & Servicing", link: "/car-repair" },
        { title: "Brake Pads", link: "/BrakePads" },
        { title: "MOT", link: "/mot" },
      ],
    },
    {
      category: "Diagnostics & Electrical",
      items: [
        { title: "Vehicle Diagnostics", link: "/diagnostics" },
        { title: "Fault Finding", link: "/diagnostics" },
        { title: "All Car Electrics", link: "/Car-Electrics" },
        { title: "ECU Repairs & Services", link: "/ECURepair&Services" },
        { title: "Window Regulators", link: "/WindowRegulators" },
        { title: "Wiper Motors", link: "/WiperMotors" },
        { title: "Central Door Motors", link: "/central-door-motors" },
      ],
    },
    {
      category: "Emissions & Engine Systems",
      items: [
        { title: "EGR Services", link: "/EGR" },
        { title: "AdBlue Services", link: "/AdBlue" },
      ],
    },
    {
      category: "Safety, Security & Tracking",
      items: [
        { title: "Car Security", link: "/car-security" },
        { title: "Vehicle Tracking Systems", link: "/vehicle-tracking" },
      ],
    },
    {
      category: "Accessories & Installations",
      items: [
        { title: "Car Stereos", link: "/car-stereos" },
        { title: "Handsfree Car Kits", link: "/handfree" },
        { title: "Parking Sensors / Cameras", link: "/parking" },
        { title: "Installations & Fitting", link: "/installation" },
      ],
    },
  ];

  const handleServiceClick = () => {
    setIsServiceOpen(false);
    setOpenSubMenu(null);
  };

  return (
    <header className="fixed top-0 w-full bg-black/90 backdrop-blur-sm z-50 border-b border-gray-800">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/logo.png" alt="AF-MOK Logo" className="w-35 h-14 flex-shrink-0" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10 relative">
            <HashLink smooth to="/#home" scroll={scrollWithOffset} className="text-gray-300 hover:text-white transition-colors">
              Home
            </HashLink>

            {/* Services Dropdown */}
            <div ref={serviceRef} className="relative">
              <button
                onClick={() => {
                  setIsServiceOpen((prev) => !prev);
                  setOpenSubMenu(null);
                }}
                className="text-gray-300 hover:text-white transition-colors flex items-center gap-1"
              >
                Services
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isServiceOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-black/95 border border-gray-800 rounded-md shadow-xl z-50">
                  {serviceCategories.map((category, catIndex) => (
                    <div key={catIndex} className="relative border-b border-gray-800 last:border-b-0">
                      <button
                        onClick={() => setOpenSubMenu(openSubMenu === catIndex ? null : catIndex)}
                        className="w-full px-4 py-3 text-white font-semibold text-sm hover:bg-gray-800 cursor-pointer flex items-center justify-between text-left"
                      >
                        {category.category}
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      
                      {/* Sub-dropdown */}
                      {openSubMenu === catIndex && (
                        <div className="absolute left-full top-0 ml-1 w-64 bg-black/95 border border-gray-800 rounded-md shadow-xl z-50">
                          <div className="py-2">
                            {category.items.map((item, itemIndex) => (
                              <HashLink
                                key={itemIndex}
                                smooth
                                to={item.link}
                                scroll={scrollWithOffset}
                                className="block px-4 py-2 text-gray-400 hover:bg-gray-800 hover:text-white text-sm transition-colors"
                                onClick={handleServiceClick}
                              >
                                {item.title}
                              </HashLink>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <HashLink smooth to="/#about" scroll={scrollWithOffset} className="text-gray-300 hover:text-white transition-colors">
              About
            </HashLink>
            <HashLink smooth to="/product" scroll={scrollWithOffset} className="text-gray-300 hover:text-white transition-colors">
              Product
            </HashLink>
            <HashLink smooth to="/contact" scroll={scrollWithOffset} className="text-gray-300 hover:text-white transition-colors">
              Contact
            </HashLink>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="hidden md:inline-flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-emerald-300 hover:text-white hover:bg-emerald-500/20 transition-colors"
            >
              <span className="text-sm font-semibold whitespace-nowrap">WhatsApp</span>
            </a>

            <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
              <ShoppingCart size={28} className="text-[#317F21]" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 rounded-full">
                  {cartCount}
                </span>
              )}
            </div>

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

              {/* Mobile Services Dropdown */}
              <div>
                <button
                  className="w-full text-left text-gray-300 hover:text-white transition-colors flex justify-between items-center"
                  onClick={() => setIsServiceOpen((v) => !v)}
                >
                  Services <span>{isServiceOpen ? "▲" : "▼"}</span>
                </button>
                {isServiceOpen && (
                  <div className="flex flex-col ml-2 mt-3 space-y-3">
                    {serviceCategories.map((category, catIndex) => (
                      <div key={catIndex}>
                        <h3 className="text-white font-semibold text-sm mb-2">{category.category}</h3>
                        <div className="flex flex-col ml-2 space-y-2">
                          {category.items.map((item, itemIndex) => (
                            <HashLink
                              key={itemIndex}
                              smooth
                              to={item.link}
                              scroll={scrollWithOffset}
                              className="text-gray-400 hover:text-white text-sm"
                              onClick={() => {
                                setIsServiceOpen(false);
                                setIsMenuOpen(false);
                              }}
                            >
                              • {item.title}
                            </HashLink>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <HashLink smooth to="/#about" scroll={scrollWithOffset} className="text-gray-300 hover:text-white transition-colors">
                About
              </HashLink>
              <HashLink smooth to="/product" scroll={scrollWithOffset} className="text-gray-300 hover:text-white transition-colors">
                Product
              </HashLink>
              <HashLink smooth to="/contact" scroll={scrollWithOffset} className="text-gray-300 hover:text-white transition-colors">
                Contact
              </HashLink>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}