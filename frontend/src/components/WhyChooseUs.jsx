"use client";

import React from "react";

export default function WhyChooseUs() {
  const items = [
    {
      title: "PERFORMANCE-DRIVEN EXPERTISE",
      desc:
        "From Stage 1 and 2 remaps to DPF, EGR, and AdBlue solutions, we fine-tune your car for maximum power, efficiency, and responsiveness.",
    },
    {
      title: "FULL-SERVICE SOLUTIONS",
      desc:
        "Whether it’s fault code diagnostics, stop-start system repairs, or routine servicing — we handle it under one roof to save you time.",
    },
    {
      title: "PRECISION. PASSION. CARE.",
      desc:
        "We treat every car like our own. With top-tier tools and genuine passion, you can count on results that feel as good as they drive.",
    },
    {
      title: "TRANSPARENT PRICING",
      desc:
        "Clear quotes with no surprises. You’ll know exactly what we’re doing and why — before we start any work.",
    },
    {
      title: "FAST TURNAROUND",
      desc:
        "Flexible scheduling and efficient workflow to get you back on the road quickly, without compromising quality.",
    },
    {
      title: "LOCAL & TRUSTED",
      desc:
        "Based in West Bromwich and serving the surrounding areas — relied on by drivers who value honest advice and solid results.",
    },
  ];

  return (
    <section id="why" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4 md:px-12">
        {/* Eyebrow */}
        <div className="text-center mb-2">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-gray-300">
            <span className="h-[2px] w-4 bg-gray-600 inline-block" />
            Built for Results
          </span>
        </div>

        {/* Heading + Sub */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold">
            <span className="text-white">Why Choose </span>
            <span className="gradient-text">Us?</span>
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            At{" "}
            <span className="font-semibold gradient-text">
              AF-MOK PERFORMANCE
            </span>
            , we do more than fix cars — we unlock their full potential.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <article
              key={i}
              className="bg-black border border-slate-800 rounded-2xl p-8 text-center shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 transition-shadow"
            >
              {/* Number badge */}
              <div className="mx-auto mb-6 w-20 h-20 rounded-full grid place-items-center relative">
                <span className="absolute inset-0 rounded-full ring-1 ring-white/10" />
                <span
                  className="badge-gradient relative inline-flex items-center justify-center w-14 h-14 rounded-full text-black font-extrabold"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Card title */}
              <h3 className="text-lg md:text-xl font-extrabold tracking-wide gradient-text">
                {it.title}
              </h3>

              <p className="mt-4 text-gray-300 leading-relaxed">{it.desc}</p>
            </article>
          ))}
        </div>
      </div>

      {/* ✅ iPhone-safe gradient rendering */}
      <style jsx global>{`
        .gradient-text {
          background: linear-gradient(90deg, #00e5ff, #ffffff, #ff2b2b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          -webkit-mask-image: linear-gradient(90deg, #00e5ff, #ffffff, #ff2b2b);
          -webkit-mask-clip: text;
          transform: translateZ(0);
          will-change: transform;
        }

        /* ✅ Force Safari to paint gradient in its own layer */
        .badge-gradient {
          background-image: linear-gradient(135deg, #00e5ff 0%, #ffffff 50%, #ff2b2b 100%);
          background-size: 100% 100%;
          background-repeat: no-repeat;
          -webkit-transform: translateZ(0);
          will-change: transform;
          backface-visibility: hidden;
          isolation: isolate;
        }
      `}</style>
    </section>
  );
}
