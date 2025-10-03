import React from "react";

// Mock data
const articles = [
  {
    category: "Apartment",
    date: "March 19, 2024",
    title: "Housing Markets That Changed the Most This Week",
    imageUrl: "/images/A1.png",
  },
  {
    category: "Apartment",
    date: "March 19, 2024",
    title: "Read Unveils the Best Canadian Cities for Biking",
    imageUrl: "/images/A2.png",
  },
  {
    category: "Office",
    date: "March 19, 2024",
    title: "10 Walkable Cities Where You Can Live Affordably",
    imageUrl: "/images/A3.png",
  },
  {
    category: "Shop",
    date: "March 19, 2024",
    title: "New Apartment Nice in the Best Canadian Cities",
    imageUrl: "/images/A4.png",
  },
];

const logos = [
  { name: "Amazon", url: "/images/l2.png" },
  { name: "AMD", url: "/images/l3.png" },
  { name: "Cisco", url: "/images/l4.png" },
  { name: "dropcam", url: "/images/l5.png" },
  { name: "logitech", url: "/images/l6.png" },
  { name: "Spotify", url: "/images/l1.png" },
];

const RecentArticles = () => {
  return (
    <section className="bg-white py-16 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Recent Articles & News</h2>
          <p className="text-gray-600">Stay updated with our latest news.</p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {articles.map((article, i) => (
            <div key={i} className="rounded-lg overflow-hidden shadow bg-white">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-auto object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-gray-500 mb-1">
                  {article.category} • {article.date}
                </p>
                <h3 className="font-semibold text-gray-800">{article.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Logos / Company Trust Bar */}
        <div className="text-center mb-12">
          <h3 className="text-lg font-semibold text-gray-700 mb-12">
            Thousands of world’s leading companies trust Space
          </h3>

          {/* Responsive Logo Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-6 items-center justify-items-center opacity-80">
            {logos.map((logo, i) => (
              <img
                key={i}
                src={logo.url}
                alt={logo.name}
                className="object-contain w-[120px] h-[40px]"
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default RecentArticles;
