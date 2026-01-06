import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import {
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const navigate = useNavigate();
  const serviceRef = useRef(null);

  const waNumber = "447889133123";
  const waHref = `https://wa.me/${waNumber}`;

  const scrollWithOffset = (el) => {
    const yOffset = -80;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
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

  const carPages = [
    { title: "Ford", link: "/ford" },
    { title: "Vauxhall", link: "/vauxhall" },
    { title: "Nissan", link: "/gumtree" },
  ];

  const closeAll = () => {
    setIsMenuOpen(false);
    setIsServiceOpen(false);
    setOpenSubMenu(null);
  };

  return (
    <header className="fixed top-0 w-full bg-black/90 backdrop-blur-sm z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">

          {/* Logo */}
          <div onClick={() => navigate("/")} className="cursor-pointer">
            <img src="/logo.png" alt="Logo" className="h-12" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">

            <HashLink smooth to="/#home" scroll={scrollWithOffset} className="text-gray-300 hover:text-white">
              Home
            </HashLink>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsServiceOpen((v) => !v)}
                className="flex items-center gap-1 text-gray-300 hover:text-white"
              >
                Services
                {isServiceOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {isServiceOpen && (
                <div className="absolute left-0 mt-2 w-72 bg-black border border-gray-800 rounded-md shadow-xl">
                  {serviceCategories.map((cat, i) => (
                    <div key={i} className="border-b border-gray-800">
                      <button
                        onClick={() => setOpenSubMenu(openSubMenu === i ? null : i)}
                        className="w-full px-4 py-3 flex justify-between items-center text-white font-semibold hover:bg-gray-800"
                      >
                        {cat.category}
                        {openSubMenu === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>

                      {openSubMenu === i && (
                        <div className="bg-gray-900">
                          {cat.items.map((item, j) => (
                            <HashLink
                              key={j}
                              to={item.link}
                              onClick={closeAll}
                              className="block px-6 py-2 text-gray-400 hover:text-white hover:bg-gray-800 text-sm"
                            >
                              {item.title}
                            </HashLink>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cars Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenSubMenu(openSubMenu === "cars" ? null : "cars")}
                className="flex items-center gap-1 text-gray-300 hover:text-white"
              >
                Cars
                {openSubMenu === "cars" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {openSubMenu === "cars" && (
                <div className="absolute left-0 mt-2 w-48 bg-black border border-gray-800 rounded-md shadow-xl">
                  {carPages.map((car, i) => (
                    <HashLink
                      key={i}
                      to={car.link}
                      onClick={closeAll}
                      className="block px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800"
                    >
                      {car.title}
                    </HashLink>
                  ))}
                </div>
              )}
            </div>

            <HashLink to="/product" className="text-gray-300 hover:text-white">Product</HashLink>
            <HashLink to="/#about" className="text-gray-300 hover:text-white">About</HashLink>
            <HashLink to="/contact" className="text-gray-300 hover:text-white">Contact</HashLink>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
              <ShoppingCart size={26} className="text-green-500" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white px-2 rounded-full">
                  {cartCount}
                </span>
              )}
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => {
                setIsMenuOpen((v) => !v);
                setIsServiceOpen(false);
                setOpenSubMenu(null);
              }}
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800 space-y-4">

            <HashLink to="/#home" onClick={closeAll} className="block text-gray-300">Home</HashLink>

            {/* Services Mobile */}
            <div>
              <button
                onClick={() => setIsServiceOpen((v) => !v)}
                className="w-full flex justify-between items-center text-gray-300"
              >
                Services
                {isServiceOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {isServiceOpen && (
                <div className="mt-3 border-l border-gray-700 pl-3">
                  {serviceCategories.map((cat, i) => (
                    <div key={i} className="mb-3">
                      <button
                        onClick={() => setOpenSubMenu(openSubMenu === i ? null : i)}
                        className="w-full flex justify-between items-center text-white font-semibold"
                      >
                        {cat.category}
                        {openSubMenu === i ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>

                      {openSubMenu === i && (
                        <div className="ml-3 mt-2 space-y-1">
                          {cat.items.map((item, j) => (
                            <HashLink
                              key={j}
                              to={item.link}
                              onClick={closeAll}
                              className="block text-gray-400 hover:text-white text-sm"
                            >
                              {item.title}
                            </HashLink>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cars Mobile */}
            <div>
              <button
                onClick={() => setOpenSubMenu(openSubMenu === "cars" ? null : "cars")}
                className="w-full flex justify-between items-center text-gray-300"
              >
                Cars
                {openSubMenu === "cars" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {openSubMenu === "cars" && (
                <div className="mt-3 border-l border-gray-700 pl-3 space-y-2">
                  {carPages.map((car, i) => (
                    <HashLink
                      key={i}
                      to={car.link}
                      onClick={closeAll}
                      className="block text-gray-400 hover:text-white text-sm"
                    >
                      {car.title}
                    </HashLink>
                  ))}
                </div>
              )}
            </div>

            <HashLink to="/product" onClick={closeAll} className="block text-gray-300">Product</HashLink>
            <HashLink to="/#about" onClick={closeAll} className="block text-gray-300">About</HashLink>
            <HashLink to="/contact" onClick={closeAll} className="block text-gray-300">Contact</HashLink>

            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="block text-center bg-emerald-500/10 text-emerald-400 py-3 rounded-lg"
            >
              WhatsApp Us
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
