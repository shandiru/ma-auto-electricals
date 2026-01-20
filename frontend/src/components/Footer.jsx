"use client";
import React from "react";
import { Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export default function Footer() {
  const address =
    "13 laburnum drive oswaldtwistele accrington bb5 3aw";
  const mapsUrl = "https://maps.app.goo.gl/kRTMxN6CGvHz1B548"

  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="container mx-auto px-4 md:px-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-bold text-[#317F21]">
                MA Auto Electrics
              </span>
            </div>
            <p className="text-gray-400 mb-4 mt-2">
              Expert Auto Electrical Repairs & Advanced Diagnostics Balanced, professional, and fits your full service range.
            </p>
            <div className="flex space-x-4">
              {/* Facebook */}
              <a
                href="https://web.facebook.com/maautoelectrics/#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook
                  className="text-gray-400 hover:text-white cursor-pointer transition-colors"
                  size={20}
                />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/mobirise/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram
                  className="text-gray-400 hover:text-white cursor-pointer transition-colors"
                  size={20}
                />
              </a>

              {/* TikTok */}
              <a
                href="https://www.youtube.com/c/mobirise"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={20}
                  height={20}
                  className="text-gray-400 hover:text-white transition-colors"
                  fill="currentColor"
                >
                  <path d="M19.615 3.184a3.016 3.016 0 0 1 2.121 2.121C22.5 7.5 22.5 12 22.5 12s0 4.5-.764 6.695a3.016 3.016 0 0 1-2.121 2.121C17.5 21.5 12 21.5 12 21.5s-5.5 0-7.695-.684a3.016 3.016 0 0 1-2.121-2.121C1.5 16.5 1.5 12 1.5 12s0-4.5.684-6.695A3.016 3.016 0 0 1 4.305 3.184C6.5 2.5 12 2.5 12 2.5s5.5 0 7.615.684ZM10 15.5l6-3.5-6-3.5v7Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold mb-4 text-[#317F21]">Quick Link</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <HashLink
                  smooth
                  to="/#"
                  className="hover:text-white transition-colors"
                >
                  Home
                </HashLink>
              </li>

              <li>
                <HashLink
                  smooth
                  to="/#about"
                  className="hover:text-white transition-colors"
                >
                  About
                </HashLink>
              </li>

              <li>
                <HashLink
                  smooth
                  to="/#services"
                  className="hover:text-white transition-colors"
                >
                  Services
                </HashLink>
              </li>

              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>

              <li>
                <Link to="/product" className="hover:text-gray-300">
                  Product
                </Link>
              </li>

              <li>
                <Link to="/car" className="hover:text-gray-300">
                  Car
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold mb-4 text-[#317F21]">Contact Info</h3>
            <ul className="space-y-2 text-gray-400">
              <li>MA Auto Electrics</li>
              <li>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  13 laburnum drive oswaldtwistele
                  <br />
                  accrington bb5 3aw,
                  <br />
                  United Kingdom
                </a>
              </li>

              {/* Phone */}
              <li>
                <a
                  href="tel:+44 7889 133123"
                  className="hover:text-white transition-colors"
                >
                  +44 7889 133123
                </a>
              </li>

              {/* Email */}
              <li>
                <a
                  href="mailto:maautoelectrics@gmail.com"
                  className="hover:text-white transition-colors break-all"
                >
                  maautoelectrics@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 MA Auto Electrics. All rights reserved.</p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-2 flex flex-col sm:flex-row justify-center items-center gap-3 text-center font-semibold text-gray-400">
          {/* Left: Terms & Privacy */}
          <div className="flex gap-4 text-sm">
            <Link
              to="/terms"
              className="text-gray-400 hover:text-[#317F21] transition duration-300"
            >
              Terms & Conditions
            </Link>
            <span className="text-gray-500">|</span>
            <Link
              to="/privacy"
              className="text-gray-400 hover:text-[#317F21] transition duration-300"
            >
              Privacy Policy
            </Link>
          </div>

          {/* Center: Powered by Ansely (unchanged) */}
          <p className="text-center font-semibold text-gray-400">
            Powered by{" "}
            <a
              href="https://www.ansely.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#317F21] hover:underline"
            >
              Ansely
            </a>
          </p>
        </div>
      </div>

      {/* ✅ Safari gradient rendering fix */}
      <style jsx global>{`
        .gradient-blue {
          background: linear-gradient(90deg, #00c6ff, #0072ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;

          /* Safari/iPhone fix */
          -webkit-mask-image: linear-gradient(90deg, #00c6ff, #0072ff);
          -webkit-mask-clip: text;
          -webkit-mask-composite: source-over;

          transform: translateZ(0);
          will-change: transform;
        }
      `}</style>
    </footer>
  );
}
