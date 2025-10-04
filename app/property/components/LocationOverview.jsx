import React from 'react';

const LocationOverview = () => {
  const greatPoints = [
    "Tellapur is a rapidly growing residential suburb in Western Hyderabad",
    "The area mainly offers apartments, followed by independent houses",
    "Majority of the housing options fall in the premium budget range",
    "Lies next to Nehru Outer Ring Road, which further links to NH-65"
  ];

  const attentionPoints = [
    "Inadequate water supply is among the major concerns in Tellapur",
    "Locals complain of sewage on roads from weak civic setup",
    "Rising pollution in Gopanpally Lake poses health hazards"
  ];

  return (
    <div className="bg-white p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Heading and Subtitle */}
        <h2 className="text-2xl font-bold text-gray-900">Explore Tellapur, Hyderabad</h2>
        <p className="text-base text-gray-500 mt-1">
          Telangana | Pincode - 502032
        </p>

        {/* YoY Growth Tag */}
        <div className="mt-4 mb-6">
          <span className="inline-block px-3 py-1 text-sm font-semibold bg-gray-100 text-gray-700 rounded-md border border-gray-300">
            10.0% YoY
          </span>
        </div>

        {/* Content Box with Two Columns */}
        <div className="p-6 border border-gray-200 rounded-xl shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* What's great here! */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">What's great here!</h3>
              <ul className="space-y-3 text-gray-700">
                {greatPoints.map((point, index) => (
                  <li key={`great-${index}`} className="leading-relaxed">
                    {/* Optional: Add a subtle bullet or checkmark if needed, keeping it simple for now */}
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* What needs attention! */}
            <div className="md:border-l md:pl-8 border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">What needs attention!</h3>
              <ul className="space-y-3 text-gray-700">
                {attentionPoints.map((point, index) => (
                  <li key={`attention-${index}`} className="leading-relaxed">
                    {/* Optional: Add a subtle bullet or warning icon if needed */}
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationOverview;
