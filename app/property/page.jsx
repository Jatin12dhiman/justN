import React from "react";
import GallerySection from "./components/GallerySection";
import ProjectHeader from "./components/ProjectHeader";
import ProjectOverview from "./components/ProjectOverview";
import PriceRangeSection from "./components/PriceRangeSection";
import SidebarInfo from "./components/SidebarInfo";
import LocationOverview from "./components/LocationOverview";
import LocationAdv from "./components/LocationAdv";
import TopFacilities from "./components/TopFacilities";

// Main Property Component
const Property = () => {
  const apartments = [
    {
      id: "2bhk",
      type: "2 BHK",
      area: { sqFt: "1385 - 1575", sqM: "128.67 - 146.32 sqm" },
      priceRange: { min: "1.02", max: "1.17" },
    },
    {
      id: "3bhk",
      type: "3 BHK",
      area: { sqFt: "1795 - 2470", sqM: "166.76 - 229.47 sqm" },
      priceRange: { min: "1.33", max: "1.83" },
    },
    {
      id: "4bhk",
      type: "4 BHK",
      area: { sqFt: "2500 - 3200", sqM: "232.25 - 297.28 sqm" },
      priceRange: { min: "1.95", max: "2.64" },
    },
  ];

  return (
    <div className="bg-white rounded-lg overflow-hidden max-w-6xl mx-auto my-10 font-sans">
      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 relative bg-white">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Images Section */}
          <GallerySection />

          {/* Project Header */}
          <ProjectHeader />

          {/* Project Overview */}
          <ProjectOverview />

          {/* Apartment Price Range Section */}
          <PriceRangeSection apartments={apartments} />

          <LocationOverview />
          <LocationAdv />
          <TopFacilities />
        </div>

        {/* RIGHT SIDE — Sticky Info Card */}
        <SidebarInfo />
      </div>
    </div>
  );
};

export default Property;
