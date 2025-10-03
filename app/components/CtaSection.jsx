// components/AgentCTABanner.jsx
import React from 'react';

const CTASection = () => {
  return (
    <section className="bg-[#2A524A] py-12 px-6 sm:px-10 lg:px-16 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Flex container: vertical on mobile, horizontal on md+ */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left: Heading + Subtitle */}
          <div className="text-white text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Become a Real Estate Agent
            </h2>
            <p className="text-gray-300 text-base">
              We only work with the best companies around the globe
            </p>
          </div>

          {/* Right: CTA Button */}
          <div className="w-full sm:w-auto">
            <a
              href="#"
              className="inline-flex items-center justify-center 
                         px-8 py-3 w-full sm:w-auto
                         bg-[#D1B17A] text-gray-900 font-semibold text-lg 
                         rounded-xl shadow-lg 
                         hover:bg-yellow-600 transition duration-300 transform hover:scale-105"
            >
              Sign in or create an account
              <span className="ml-2 font-bold text-xl">&rarr;</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CTASection;
