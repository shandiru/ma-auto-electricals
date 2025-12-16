import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Camera,
  Settings,
  Info,
  Heart,
  Share2,
} from "lucide-react";

const VehicleDetailsPage = ({ vehicle }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const details = [
    { value: "ULEZ Compliant" },
    { value: `${vehicle.year} (${vehicle.registration})` },
    { value: `${vehicle.mileage.toLocaleString()} mi` },
    { value: vehicle.fuelType },
    { value: vehicle.transmission },
    { value: vehicle.bodyType },
    { value: `${vehicle.engine} ${vehicle.fuelType}` },
    { value: vehicle.colour },
  ];

  const nextImage = () =>
    setCurrentImageIndex(
      (prev) => (prev + 1) % vehicle.images.length
    );

  const prevImage = () =>
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + vehicle.images.length) %
        vehicle.images.length
    );

  return (
    <div className="min-h-screen bg-[#0B1F1A] text-white py-20">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT – IMAGES */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="sticky top-4">
              <div className="relative rounded-2xl overflow-hidden bg-black/30 backdrop-blur">

                <img
                  src={vehicle.images[currentImageIndex]}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  className="w-full h-64 sm:h-96 md:h-[520px] object-cover"
                />

                {/* Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full transition"
                >
                  <ChevronLeft className="w-6 h-6 text-[#72EF36]" />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full transition"
                >
                  <ChevronRight className="w-6 h-6 text-[#72EF36]" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 px-4 py-1 rounded-full text-sm text-[#72EF36]">
                  {currentImageIndex + 1} / {vehicle.images.length}
                </div>

                {/* Icons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="bg-black/60 hover:bg-black/80 p-2 rounded-full">
                    <Heart className="w-5 h-5 text-[#72EF36]" />
                  </button>
                  <button className="bg-black/60 hover:bg-black/80 p-2 rounded-full">
                    <Share2 className="w-5 h-5 text-[#72EF36]" />
                  </button>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 mt-4">
                {vehicle.images.slice(0, 8).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`rounded-lg overflow-hidden border-2 transition ${
                      currentImageIndex === idx
                        ? "border-[#72EF36]"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt="thumb"
                      className="w-full h-16 sm:h-20 object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Quick Links */}
              <div className="flex gap-2 mt-5 bg-black/40 rounded-full p-2">
                <a className="flex-1 text-center py-2 hover:bg-[#72EF36]/10 rounded-full text-sm">
                  <Camera className="inline w-4 h-4 mr-1" />
                  Photos
                </a>
                <a className="flex-1 text-center py-2 hover:bg-[#72EF36]/10 rounded-full text-sm border-x border-white/10">
                  <Settings className="inline w-4 h-4 mr-1" />
                  Tech
                </a>
                <a className="flex-1 text-center py-2 hover:bg-[#72EF36]/10 rounded-full text-sm">
                  <Info className="inline w-4 h-4 mr-1" />
                  Info
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT – DETAILS */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-4 space-y-5">

              {/* Title */}
              <div>
                <h1 className="text-4xl font-bold">
                  {vehicle.make} {vehicle.model}
                </h1>
                <p className="opacity-70 mt-1">{vehicle.variant}</p>
              </div>

              {/* Finance Card */}
              <div className="bg-[#1A5E20] rounded-2xl p-6 text-center border border-[#72EF36]/30">
                <div className="text-sm opacity-80 mb-2">
                  Finance from
                </div>
                <div className="text-4xl font-bold text-[#72EF36] mb-3">
                  £{vehicle.monthlyPayment}
                </div>
                <button className="bg-[#72EF36] text-black px-6 py-2 rounded-full font-semibold hover:opacity-90 transition">
                  Apply for Finance
                </button>
              </div>

              {/* Buy Card */}
              <div className="bg-black/40 rounded-2xl p-6 border border-[#72EF36]/20 text-center">
                <div className="text-sm opacity-80 mb-2">
                  Buy this Car
                </div>
                <div className="text-4xl font-bold text-[#72EF36] mb-4">
                  £{vehicle.price.toLocaleString()}
                </div>

                <div className="flex flex-col gap-3">
                  <button className="bg-[#72EF36] text-black py-3 rounded-full font-semibold hover:opacity-90">
                    Contact Seller
                  </button>
                  <button className="border border-[#72EF36] text-[#72EF36] py-3 rounded-full hover:bg-[#72EF36]/10">
                    Save Vehicle
                  </button>
                  <p className="text-xs opacity-60">
                    Trusted Gumtree-style listing
                  </p>
                </div>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {details.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-black/40 border border-white/10 rounded-full px-3 py-2 text-center text-sm"
                  >
                    {item.value}
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsPage;
