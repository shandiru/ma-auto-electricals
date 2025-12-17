"use client";
import React from 'react';

const MajorServicesTemplate = ({ data }) => {
  const { service_name, intro_description, benefits, signs } = data;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}


      {/* Why Choose Us Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 text-center mb-6">
            Why Choose MA Auto Electrics for {service_name}?
          </h2>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            {intro_description}
          </p>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-blue-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                  ✓
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signs You Need Service Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 text-center mb-12">
            Signs You Need Professional {service_name}
          </h2>

          {/* Signs List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {signs.map((sign, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 bg-gray-50 border-l-4 border-blue-900 rounded-md hover:bg-gray-100 transition-colors duration-300"
              >
                <span className="text-blue-900 text-2xl font-bold flex-shrink-0">
                  →
                </span>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {sign}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-16 px-4 text-center">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Contact MA Auto Electrics today for professional {service_name}
          </p>
          <a
            href="#contact"
            className="inline-block bg-white text-blue-900 px-10 py-4 rounded-full text-lg font-bold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Get a Quote
          </a>
        </div>
      </section>
    </div>
  );
};

export default MajorServicesTemplate;