import React from "react";

// Categories data with PNG icons
const categories = [
  { title: "Town House", properties: 2, icon: "/images/h1.png" },
  { title: "Modern Villa", properties: 10, icon: "/images/h2.png" },
  { title: "Apartment", properties: 3, icon: "/images/h3.png" },
  { title: "Office", properties: 3, icon: "/images/h4.png" },
  { title: "Single Family", properties: 5, icon: "/images/h5.png" },
];

// Reusable card component
const CategoryCard = ({ title, properties, icon }) => (
  <div
    className="flex flex-col items-center justify-center p-6 sm:p-8 
               bg-white rounded-2xl shadow-lg transition-transform 
               duration-300 hover:scale-[1.03] hover:shadow-xl cursor-pointer
               min-h-[160px] md:min-h-[200px]"
  >
    <div className="mb-4 p-4 bg-white rounded-full flex items-center justify-center">
      <img src={icon} alt={title} className="w-12 h-12 object-contain" />
    </div>
    <h3 className="text-lg font-bold text-gray-900 mt-2 text-center">{title}</h3>
    <p className="text-sm text-gray-500 mt-1 text-center">{properties} Properties</p>
  </div>
);

// Main component
const FeaturedCategories = () => {
  return (
    <div className="p-8 md:p-16 bg-[#2A524A] font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 max-w-7xl mx-auto">
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Featured Categories
          </h2>
          <p className="text-gray-300 mt-2 text-sm">Lorem ipsum dolor sit amet</p>
        </div>
        <a
          href="#"
          className="text-white text-base font-medium mt-4 md:mt-0 
                     hover:text-amber-300 transition-colors flex items-center"
        >
          View All Categories
          <span className="ml-2">&rarr;</span>
        </a>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            title={category.title}
            properties={category.properties}
            icon={category.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;
