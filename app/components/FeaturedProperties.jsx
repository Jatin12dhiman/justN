// components/FeaturedProperties.jsx

import React from 'react';

const properties = [
  {
    features: ['Featured'],
    name: 'Luxury Family Home',
    price: '$395,000',
    address: '1800-1818 79th St',
    beds: 4,
    baths: 1,
    sqft: 400,
    image: '/images/prt1.png',
  },
  {
    status: 'For Sale',
    features: [],
    name: 'Skyper Pool Apartment',
    price: '$280,000',
    address: '1020 Bloomingdale Ave',
    beds: 4,
    baths: 2,
    sqft: 450,
    image: '/images/prt2.png',
  },
  {
    status: 'For Rent',
    features: [],
    name: 'North Dillard Street',
    price: '$250/month',
    address: '4330 Bell Shoals Rd',
    beds: 4,
    baths: 2,
    sqft: 400,
    image: '/images/prt3.png',
  },
  {
    status: 'For Sale',
    features: ['Featured'],
    name: 'Eaton Garth Penthouse',
    price: '$180,000',
    address: '7722 18th Ave, Brooklyn',
    beds: 4,
    baths: 2,
    sqft: 450,
    image: '/images/prt4.png',
  },
  {
    status: 'For Rent',
    features: ['Featured'],
    name: 'New Apartment Nice View',
    price: '$850/month',
    address: '42 Avenue O, Brooklyn',
    beds: 1,
    baths: 1,
    sqft: 460,
    image: '/images/prt5.png',
  },
  {
    features: ['Featured'],
    name: 'Diamond M...',
    price: '$259,000',
    address: '7802 20th Ave, Brooklyn',
    beds: 4,
    baths: 2,
    sqft: 500,
    image: '/images/prt6.png',
  },
];

const FeaturedProperties = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
        <div className="mb-4 md:mb-0">
          <h2 className="text-3xl font-semibold text-gray-900">Featured Properties</h2>
          <p className="mt-1 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-sm font-medium rounded-md bg-gray-900 text-white">
            All Properties
          </button>
          <button className="px-4 py-2 text-sm font-medium rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
            For Sale
          </button>
          <button className="px-4 py-2 text-sm font-medium rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
            For Rent
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300 p-2"
          >
            <div className="relative h-60 w-full">
              <img
                src={property.image}
                alt={property.name}
                className="w-full h-full object-cover rounded-md"
              />

              {/* Status badge (only if not 1st or 6th item) */}
              {(index !== 0 && index !== 5) && (
                <div className="absolute top-4 left-4 flex space-x-2 ">
                  <span className="bg-green-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {property.status}
                  </span>
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-gray-900">{property.name}</h3>
                <span className="text-lg font-bold text-[#E7C873]">{property.price}</span>
              </div>

              <div className="flex items-center mt-1 text-sm text-gray-500 space-x-1">
                <img src="/images/loc.png" alt="Location" className="w-3.5 h-3.5" />
                <p>{property.address}</p>
              </div>

              <div className="flex space-x-4 mt-4 text-gray-500">
                <div className="flex items-center space-x-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span className="text-sm">{property.beds} Beds</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h8m-8 4h8m4-4h.01M3 15h20M3 21h20a2 2 0 002-2v-4a2 2 0 00-2-2H3a2 2 0 00-2 2v4a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">{property.baths} Baths</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm">{property.sqft} sqft</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProperties;
