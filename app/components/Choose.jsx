// components/Choose.jsx
import React from 'react';

const Choose = () => {
  return (
    <section className="bg-white py-16 lg:py-24 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Responsive Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT CONTENT SECTION */}
          <div className="lg:pr-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-6">
              Why You Should Work With Us
            </h1>
            
            <p className="text-gray-600 mb-10 text-lg">
              Pellentesque egestas elementum egestas faucibus sem. Velit nunc egestas ut
              morbi. Leo diam diam nibh eget fermentum massa pretium. Mi mauris nulla ac
              dictum ut mauris non.
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-bold mb-2">Buy or Rent Homes</h3>
                <p className="text-gray-600 text-base">
                  We sell your home at the best market price and very quickly as well.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">Trusted by Thousands</h3>
                <p className="text-gray-600 text-base">
                  We offer you free consultancy to get a loan for your new home.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <button 
              className="inline-flex items-center justify-center px-8 py-3 
                         bg-yellow-500 text-gray-900 font-semibold 
                         rounded-xl shadow-md hover:bg-yellow-600 transition duration-300"
            >
              Learn More 
              <span className="ml-2 font-bold text-lg">&rarr;</span>
            </button>
          </div>

          {/* RIGHT IMAGE SECTION */}
          <div className="relative w-full flex justify-center">
            <div className="relative w-full sm:w-[80%] lg:w-[80%] min-h-[480px] md:min-h-[590px] overflow-hidden rounded-3xl shadow-2xl">
              <img
                src="/images/w-4.png"
                alt="Modern luxury house"
                className="object-fill rounded-3xl w-full h-full"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Choose;
