// components/PropertyPage/PriceRangeSection.jsx
import ApartmentCard from "./ApartmentCard";

const PriceRangeSection = ({ apartments }) => (
  <div className="mt-6">
    <div className="mb-8 p-4 border-b border-gray-200">
      <h2 className="text-4xl font-extrabold text-gray-800">
        ₹1.02 - 2.64 Cr
        <span className="text-blue-600 font-semibold text-lg ml-3 cursor-pointer hover:underline">
          + Charges
        </span>
      </h2>
      <p className="text-sm text-gray-500 uppercase tracking-wider mt-1">
        PRICE RANGE
      </p>
    </div>

    <div className="mb-6 px-4">
      <p className="text-xl text-gray-700 font-medium">
        Available Apartment Types: 2, 3, & 4 BHK
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
      {apartments.map((apartment) => (
        <ApartmentCard
          key={apartment.id}
          type={apartment.type}
          area={apartment.area}
          priceRange={apartment.priceRange}
        />
      ))}
    </div>
  </div>
);

export default PriceRangeSection;
