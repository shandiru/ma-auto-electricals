import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Camera, Settings, Info, Heart, Share2 } from 'lucide-react';

const VehicleDetailsPage = ({ vehicle }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [showReserveModal, setShowReserveModal] = useState(false);

  const details = [
    { label: 'ULEZ Compliant', value: 'ULEZ Compliant' },
    { label: 'Year', value: `${vehicle.year} (${vehicle.registration})` },
    { label: 'Mileage', value: `${vehicle.mileage.toLocaleString()} mi` },
    { label: 'Fuel Type', value: vehicle.fuelType },
    { label: 'Transmission', value: vehicle.transmission },
    { label: 'Body Type', value: vehicle.bodyType },
    { label: 'Engine', value: `${vehicle.engine} ${vehicle.fuelType}` },
    { label: 'Colour', value: vehicle.colour }
  ];

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % vehicle.images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="sticky top-4">
              <div className="relative rounded-2xl overflow-hidden bg-black/20 backdrop-blur">
                <img
                  src={vehicle.images[currentImageIndex]}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  className="w-full h-64 sm:h-96 md:h-[500px] object-cover"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-2 md:p-3 rounded-full transition"
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-2 md:p-3 rounded-full transition"
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur px-4 py-2 rounded-full text-sm font-semibold">
                  {currentImageIndex + 1} / {vehicle.images.length}
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-2 rounded-full transition">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-2 rounded-full transition">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Navigation */}
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 mt-3">
                {vehicle.images.slice(0, 8).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`rounded-lg overflow-hidden border-2 transition ${
                      currentImageIndex === idx ? 'border-blue-400' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-16 sm:h-20 object-cover" />
                  </button>
                ))}
              </div>

              {/* Quick Links */}
              <div className="flex flex-wrap gap-2 mt-4 bg-white/5 backdrop-blur rounded-full p-2">
                <a href="#photos" className="flex-1 text-center py-2 px-3 hover:bg-white/10 rounded-full transition text-sm md:text-base">
                  <Camera className="w-4 h-4 inline mr-1 md:mr-2" />
                  <span className="hidden sm:inline">50 </span>Photos
                </a>
                <a href="#tech" className="flex-1 text-center py-2 px-3 hover:bg-white/10 rounded-full transition text-sm md:text-base border-x border-white/10">
                  <Settings className="w-4 h-4 inline mr-1 md:mr-2" />
                  <span className="hidden sm:inline">Tech </span>Data
                </a>
                <a href="#info" className="flex-1 text-center py-2 px-3 hover:bg-white/10 rounded-full transition text-sm md:text-base">
                  <Info className="w-4 h-4 inline mr-1 md:mr-2" />
                  Info
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-4 space-y-4">
              {/* Title */}
              <div className="text-center lg:text-left">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                  {vehicle.make} {vehicle.model}
                </h1>
                <h2 className="text-lg md:text-xl opacity-75 font-light">{vehicle.variant}</h2>
              </div>

              {/* Pricing Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <div className="bg-[#C8102E] rounded-2xl p-6 text-center">
                  <div className="text-sm opacity-75 mb-2">Finance this Car from</div>
                  <div className="text-4xl font-bold mb-3">£{vehicle.monthlyPayment}</div>
                  <button className="bg-white text-black hover:bg-blue-50 px-6 py-2 rounded-full font-semibold transition text-sm">
                    Apply Now
                  </button>
                </div>
                <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl p-6 text-center">
                  <div className="text-sm opacity-75 mb-2">Buy this Car</div>
                  <div className="text-4xl font-bold mb-3">£{vehicle.price.toLocaleString()}</div>
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                    <button
                      onClick={() => setShowEnquiryModal(true)}
                      className="flex-1 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full font-semibold transition text-sm border border-white/20"
                    >
                      Enquire Now
                    </button>
                    <div className="flex-1">
                      <button
                        onClick={() => setShowReserveModal(true)}
                        className="w-full bg-[#C8102E] hover:bg-red-600 px-4 py-2 rounded-full font-semibold transition text-sm animate-pulse"
                      >
                        Reserve for £100
                      </button>
                      <div className="text-xs opacity-50 mt-1">Fully Refundable</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vehicle Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
                {details.map((detail, idx) => (
                  <div
                    key={idx}
                    className="bg-white/5 backdrop-blur border border-white/10 rounded-full px-3 py-2 text-center"
                  >
                    <div className="font-semibold text-xs sm:text-sm truncate">{detail.value}</div>
                  </div>
                ))}
              </div>

              
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showEnquiryModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setShowEnquiryModal(false)}>
          <div className="bg-slate-800 rounded-2xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold mb-4">Enquire Now</h3>
            <p className="mb-4">Get in touch with us about this {vehicle.make} {vehicle.model}</p>
            <button onClick={() => setShowEnquiryModal(false)} className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-lg font-semibold">
              Close
            </button>
          </div>
        </div>
      )}

      {showReserveModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setShowReserveModal(false)}>
          <div className="bg-slate-800 rounded-2xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold mb-4">Reserve Vehicle</h3>
            <p className="mb-4">Reserve this {vehicle.make} {vehicle.model} for just £100 (fully refundable)</p>
            <button onClick={() => setShowReserveModal(false)} className="w-full bg-green-500 hover:bg-green-600 py-3 rounded-lg font-semibold">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleDetailsPage;
