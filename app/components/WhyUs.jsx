// components/WhyUsSection.jsx

import React from 'react';

const WhyUs = () => {
  return (
    <div className="relative py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Images and Floating Card */}
        <div className="relative h-[500px] md:h-[600px] flex items-center justify-center ">
          {/* Main large image (half circle) */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[170px] h-[190px] sm:w-[230px] sm:h-[230px] lg:w-[300px] lg:h-[300px] bg-gray-200 rounded-t-full rounded-md overflow-hidden shadow-xl z-10 left-[65%]">
            <img
              src="/images/w1.png"
              alt="Modern house"
              className="w-full h-full object-center"
            />
          </div>

          {/* Top left image (family) */}
          <div className="absolute top-14 left-5 w-[200px] h-[250px] sm:w-[230px] sm:h-[290px] rounded-5xl z-10">
            <img
              src="/images/w2.png"
              alt="Happy family"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating properties card */}
          <div className="absolute z-10 left-4 bottom-8 w-[100px] h-[100px] sm:w-[130px] sm:h-[130px] md:left-[7%] md:bottom-16 md:w-[160px] md:h-[160px] lg:w-[180px] lg:h-[180px]">
            <img
              src="/images/w3.png"
              alt="Floating Property Card"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Right Side: Text Content */}
        <div>
          <h2 className="text-4xl font-semibold leading-tight text-gray-900 mb-6">
            Why You Should Work With Us
          </h2>
          <p className="text-gray-600 mb-8">
            Pellentesque egestas elementum egestas faucibus sem. Velit nunc egestas ut morbi. Leo diam diam.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            <div className="flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E7C773]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.018A9.955 9.955 0 0112 2.118C7.172 2.118 3.118 6.172 3.118 11s4.054 8.882 8.882 8.882 8.882-4.054 8.882-8.882zm-8.882 0a1 1 0 000-2 1 1 0 000 2z" />
              </svg>
              <span className="text-gray-700">100% Secure</span>
            </div>
            <div className="flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E7C773]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-gray-700">Wide Range of Properties</span>
            </div>
            <div className="flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E7C773]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h-4a2 2 0 01-2-2v-3.586a1 1 0 00-.293-.707L6.707 9.293A2 2 0 016 7.828V5a2 2 0 012-2h8a2 2 0 012 2v2.828a2 2 0 01-.707 1.414L13 14.414V18a2 2 0 01-2 2z" />
              </svg>
              <span className="text-gray-700">Buy or Rent Homes</span>
            </div>
            <div className="flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E7C773]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 110-6 3 3 0 010 6z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5a7.5 7.5 0 10-15 0 7.5 7.5 0 0015 0z" />
              </svg>
              <span className="text-gray-700">Trusted by Thousands</span>
            </div>
          </div>
          <button className="bg-[#E7C873] text-gray-900 font-semibold px-6 py-3 rounded-xl hover:bg-amber-500 transition-colors flex items-center space-x-2">
            <span>Learn More</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
