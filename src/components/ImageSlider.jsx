import React, { useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1541542684-4e0b0b1d99c3?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1587402092301-725e37c70fd3?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1400&q=80",
];

const ImageSlider3 = () => {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((index - 1 + images.length) % images.length);
  };

  const next = () => {
    setIndex((index + 1) % images.length);
  };

  return (
    <section className="py-16 bg-[#eef0f4]">
      <div className="max-w-7xl mx-auto px-6">

        <div className="relative flex items-center">

          {/* Left Arrow */}
          <button
            onClick={prev}
            className="absolute left-0 z-10 bg-white/80 hover:bg-white w-10 h-10 rounded-full flex items-center justify-center shadow"
          >
            <span className="text-xl">&#8249;</span>
          </button>

          {/* Slider */}
          <div className="flex overflow-hidden w-full">
            <div
              className="flex transition-transform duration-500 gap-6"
              style={{ transform: `translateX(-${index * 33.33}%)` }}
            >
              {images.map((img, i) => (
                <div
                  key={i}
                  className="min-w-[33.33%] md:min-w-[33.33%] sm:min-w-[50%] min-[300px]:min-w-full"
                >
                  <img
                    src={img}
                    className="w-full h-[450px] object-cover rounded-3xl"
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={next}
            className="absolute right-0 z-10 bg-white/80 hover:bg-white w-10 h-10 rounded-full flex items-center justify-center shadow"
          >
            <span className="text-xl">&#8250;</span>
          </button>

        </div>

      </div>
    </section>
  );
};

export default ImageSlider3;
