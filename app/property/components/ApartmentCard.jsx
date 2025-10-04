// components/PropertyPage/ApartmentCard.jsx
import React from "react";

const ApartmentCard = ({ type, area, priceRange }) => (
  <div className="bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300">
    <div className="p-4">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{type} Apartment</h3>
      <div className="flex justify-between items-center text-sm text-gray-600 border-t border-gray-100 pt-3">
        <p className="font-semibold">Super Built-up Area</p>
        <div className="flex items-center space-x-1">
          <span className="font-bold text-gray-700">{area.sqFt} sq.ft.</span>
          <span className="text-xs text-gray-500">({area.sqM})</span>
        </div>
      </div>
    </div>

    <div className="p-4 border-t border-gray-200 mt-auto bg-blue-50/50">
      <p className="text-xl font-extrabold text-blue-800">
        ₹{priceRange.min} - {priceRange.max} Cr
        <span className="text-blue-600 font-semibold text-sm ml-2 cursor-pointer hover:underline">
          + Charges
        </span>
      </p>
    </div>
  </div>
);

export default ApartmentCard;
