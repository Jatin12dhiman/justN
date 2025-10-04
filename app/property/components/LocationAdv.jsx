import React from "react";

// ✅ Data for 3-column location advantages
const locationAdvantages = [
  { title: "Open Minds Birla School", distance: "3.1 Km", icon: "school" },
  { title: "Nehru Outer Ring Road", distance: "6 Km", icon: "road" },
  { title: "Citizen's Hospital", distance: "7 Km", icon: "hospital" },
  { title: "Inorbit Mall", distance: "12 Km", icon: "mall" },
  { title: "Wipro Junction", distance: "10 Km", icon: "office" },
  { title: "Lingampally Railway Station", distance: "8 Km", icon: "train" },
];

// ✅ Inline Icon component with consistent color logic
const Icon = ({ type }) => {
  let svgPath = "";
  let bgColor = "bg-blue-100 text-blue-600"; // Default

  switch (type) {
    case "school":
      svgPath =
        "M12 3L6 7v4l6 4 6-4V7zM6 7v4M18 7v4M12 11v4M12 7l-6 4M12 7l6 4";
      break;
    case "road":
      svgPath =
        "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 12h8M8 16h8";
      break;
    case "hospital":
      bgColor = "bg-orange-100 text-orange-600";
      svgPath = "M12 6v12m-6-6h12"; // Simplified clean cross icon
      break;
    case "mall":
      bgColor = "bg-green-100 text-green-600";
      svgPath = "M3 7h18v14H3zM8 7V3h8v4"; // Storefront shape
      break;
    case "office":
      bgColor = "bg-purple-100 text-purple-600";
      svgPath = "M4 20h16V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2zM10 10h4v10h-4z";
      break;
    case "train":
      bgColor = "bg-red-100 text-red-600";
      svgPath =
        "M5 3h14a2 2 0 0 1 2 2v9a3 3 0 0 1-3 3l2 3H6l2-3a3 3 0 0 1-3-3V5a2 2 0 0 1 2-2z";
      break;
    default:
      svgPath = "M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20z"; // default circle
  }

  return (
    <div
      className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${bgColor}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d={svgPath} />
      </svg>
    </div>
  );
};

// ✅ Individual Advantage Card
const AdvantageCard = ({ title, distance, icon }) => (
  <div className="p-5 border border-gray-200 rounded-xl flex items-start gap-4 hover:shadow-lg transition-all duration-300 bg-white">
    <Icon type={icon} />
    <div>
      <h4 className="text-base font-semibold text-gray-900">{title}</h4>
      <p className="text-sm text-gray-500 mt-1">{distance}</p>
    </div>
  </div>
);

// ✅ Main Component
const LocationAdv = () => {
  return (
    <section className="mt-10 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 mx-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Location Advantages
          </h2>
          <p className="text-base text-gray-500 mt-1">
            Tellapur is one of the prime locations to buy a home in Hyderabad.
            There are 66+ residential projects within this locality.
          </p>
        </div>
        
      </div>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locationAdvantages.map((advantage, index) => (
          <AdvantageCard
            key={index}
            title={advantage.title}
            distance={advantage.distance}
            icon={advantage.icon}
          />
        ))}
      </div>
    </section>
  );
};

export default LocationAdv;
