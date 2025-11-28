import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function ProductCard() {
  const cars = [
    {
      id: 1,
      brand: 'Audi',
      model: 'TT TDI',
      year: 2014,
      mileage: '78,546',
      fuel: 'Diesel',
      price: '$40,000',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80'
    },
    {
      id: 2,
      brand: 'BMW',
      model: 'Series 2 Diesel',
      year: 2016,
      mileage: '81,050',
      fuel: 'Diesel',
      price: '$45,000',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80'
    },
    {
      id: 3,
      brand: 'Jeep',
      model: 'Wrangler Unlimited 4xe Sahara',
      year: 2021,
      mileage: '42,235',
      fuel: 'Hybrid',
      price: '$39,000',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl mt-20 font-bold text-[#317F21] mb-8 text-center">
          Featured Vehicles
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div
              key={car.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <img
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Brand and Model Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-1">
                    {car.brand}
                  </h2>
                  <p className="text-sm sm:text-base font-medium opacity-90">
                    {car.model}
                  </p>
                </div>
              </div>

              {/* Details Section */}
              <div className="p-6">
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 uppercase tracking-wide font-medium">
                      Year
                    </span>
                    <span className="text-gray-900 font-semibold text-lg">
                      {car.year}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 uppercase tracking-wide font-medium">
                      Mileage
                    </span>
                    <span className="text-gray-900 font-semibold text-lg">
                      {car.mileage}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 uppercase tracking-wide font-medium">
                      Fuel
                    </span>
                    <span className="text-gray-900 font-semibold text-lg">
                      {car.fuel}
                    </span>
                  </div>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-3xl font-bold text-gray-900">
                    {car.price}
                  </span>
                  <button className="flex items-center gap-2 text-[#317F21]  hover:text-[#3ad81a]  font-semibold group/btn transition-colors">
                    View Details
                    <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}