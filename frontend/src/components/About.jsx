import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image Section */}
          <div className="order-1 lg:order-1">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=800&fit=crop"
                alt="Luxury car interior"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="order-2 lg:order-2 space-y-6 lg:space-y-8">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                We help you{' '}
                <span className="text-[#317F21]">get credit.</span>
              </h1>
            </div>

            <div>
              <p className="text-xl sm:text-2xl text-gray-900 font-medium leading-relaxed">
                Get pre-approved in minutes and let our finance team get you the best rate from our top lenders.
              </p>
            </div>

            <div>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Our extensive experience in the industry has enabled us to cultivate valuable relationships that we leverage to your advantage. This includes our partnerships with trusted lenders, guaranteeing you the most competitive rates available. Apply now through our fully secure credit application and kickstart your journey to a newer, more luxurious car today.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}