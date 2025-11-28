"use client";
import React from "react";
import { Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const address =
    "AF-MOK Performance, Unit 6, Spon Lane Trading Estate, Varney Ave, West Bromwich B70 6AE, United Kingdom";
  const mapsUrl =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(address);

  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="container mx-auto px-4 md:px-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-bold gradient-blue">
                kwon Wei
              </span>
            </div>
            <p className="text-gray-400 mb-4 mt-2">
              High-quality performance tuning and emissions solutions for cars
              and LCVs. Maximize your vehicle’s power, efficiency, and
              reliability.
            </p>
            <div className="flex space-x-4">
              {/* Facebook */}
              <a
                //href="https://www.facebook.com/share/16eb5kcuGU/?mibextid=wwXIfr"
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
               // href="https://www.instagram.com/afmokperformance/"
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
                //href="https://www.tiktok.com/@afmok.performance"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  className="text-gray-400 hover:text-white transition-colors"
                  width={20}
                  height={20}
                  fill="currentColor"
                >
                  <path d="M240 80a64 64 0 0 1-64-64h-32v168a40 40 0 1 1-40-40 39.6 39.6 0 0 1 8 .8V112a72 72 0 1 0 64 71.6V97.7A95.6 95.6 0 0 0 240 112Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold mb-4 gradient-blue">Quick Link</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                 Venues
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-gray-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="hover:text-gray-300">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold mb-4 gradient-blue">Contact Info</h3>
            <ul className="space-y-2 text-gray-400">
              <li>kwon Wei</li>
              <li>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Unit 6, Spon Lane Trading Estate,
                  <br />
                  Varney Ave, West Bromwich B70 6AE,
                  <br />
                  United Kingdom
                </a>
              </li>

              {/* Phone */}
              <li>
                <a
                  href="tel:+447494481443"
                  className="hover:text-white transition-colors"
                >
                  +44 7494 481443
                </a>
              </li>

              {/* Email */}
              <li>
                <a
                  href="mailto:afmok.performance@outlook.com"
                  className="hover:text-white transition-colors break-all"
                >
                  Benihana Main@outlook.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 AF-MOK Performance. All rights reserved.</p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-2 text-center font-semibold text-gray-400">
          <p>
            Powered by{" "}
            <a
              href="https://www.ansely.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline"
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
