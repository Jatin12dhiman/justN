import React from 'react';

const steps = [
  {
    icon: '/images/prf1.png',
    title: 'Find Real Estate',
    description:
      'Sumo petentium ut per, at his wisiim utinam adipiscing. Est ei graeco',
  },
  {
    icon: '/images/prf2.png',
    title: 'Meet Relator',
    description:
      'Sumo petentium ut per, at his wisiim utinam adipiscing. Est ei graeco',
  },
  {
    icon: '/images/prf3.png',
    title: 'Take The Keys',
    description:
      'Sumo petentium ut per, at his wisiim utinam adipiscing. Est ei graeco',
  },
];

const HowItWorks = () => {
  return (
    <div className="bg-[#FFF8F6] py-16 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-900">
          How it works? Find a perfect home
        </h2>
        <p className="mt-2 text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

        {/* Steps Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center p-4">
              {/* Icon */}
              <div className="w-20 h-20 bg-[#F0E6D3] rounded-full flex items-center justify-center">
                <img
                  src={step.icon}
                  alt={step.title}
                  className="w-10 h-10 object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                {step.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-sm text-gray-500 max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
