import React from "react";
import { Car, Wrench, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section
      className="relative w-full min-h-[120vh] flex items-center text-white overflow-hidden"
      id="#"
    >
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        poster="/fall.png"
        onError={(e) => (e.currentTarget.style.display = "none")}
      >
      </video>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="max-w-3xl pt-20 md:pt-0">
          <h1 className="text-4xl md:text-6xl lg:text-[70px] font-bold leading-tight mb-6">
            Welcome to <br /> MA Auto Electrics
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-xl mb-10">
            Car Electric Specialists in Accrington, Lancashire
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10 sm:mb-20">
            <a
              href="#contact"
              className="px-6 py-3 bg-[#317F21] text-black font-semibold rounded-lg hover:bg-lime-400 transition"
            >
              Contact us
            </a>

            <Link
              to="/product"
              className="px-6 py-3 border border-white/40 rounded-lg backdrop-blur-sm hover:bg-white/10 transition"
            >
              See Products
            </Link>
          </div>
        </div>

        {/* FEATURE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-10">
          <FeatureCard
            icon={<Car className="w-6 h-6" />}
            title="Automotive Electrical Specialists"
            desc="Expert technicians skilled in diagnosing and repairing all car electrical issues."
          />

          <FeatureCard
            icon={<Wrench className="w-6 h-6" />}
            title="Advanced Diagnostic Tools"
            desc="We use modern diagnostic equipment to identify and fix problems accurately."
          />

          <FeatureCard
            icon={<Clock className="w-6 h-6" />}
            title="Quick Turnaround Time"
            desc="Fast, reliable service to get you back on the road as soon as possible."
          />
        </div>
      </div>
    </section>
  );
}

/* FEATURE CARD COMPONENT */
function FeatureCard({ icon, title, desc }) {
  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4 sm:p-6 flex flex-col gap-4 shadow-lg">
      <div className="flex items-center justify-center w-12 h-12 rounded-full border border-white/30 bg-white/10 mb-4">
        <div className="text-white">{icon}</div>
      </div>

      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-white/80">{desc}</p>
    </div>
  );
}
