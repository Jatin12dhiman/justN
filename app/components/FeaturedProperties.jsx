import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getProperties } from "../services/propertyService";

export function getPropertyPrice(property) {
  if (!property || !property.transactionType || !property.pricing) return "";

  const { transactionType, pricing } = property;

  switch (transactionType.toLowerCase()) {
    case "rent":
      return pricing?.rent;
    case "buy":
      return pricing?.buyPrice;
    case "lease":
      return pricing?.leaseRent;
    case "pg":
      return pricing?.pgRent;
    default:
      return "";
  }
}

const FeaturedProperties = async ({ searchQuery }) => {
  const type = searchQuery?.type || "";

  const query = type
    ? `?isFeatured=true&transactionType=${type}`
    : "?isFeatured=true";

  const { data } = await getProperties(query);

  return (
    <div className="container mx-auto px-4 py-16 bg-white">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
        <div className="mb-4 md:mb-0">
          <h2 className="text-3xl font-semibold text-gray-900">
            Featured Properties
          </h2>
          <p className="mt-1 text-gray-600">
            Browse our top-rated featured properties available for rent or sale.
          </p>
        </div>

        <div className="flex space-x-2">
          <Link
            href="/"
            scroll={false}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${!type
              ? "bg-gray-900 text-white"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
          >
            All Properties
          </Link>

          <Link
            href="/?type=Buy"
            scroll={false}
            prefetch
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${type === "Buy"
              ? "bg-gray-900 text-white"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
          >
            For Sale
          </Link>

          <Link
            href="/?type=Rent"
            scroll={false}
            prefetch
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${type === "Rent"
              ? "bg-gray-900 text-white"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
          >
            For Rent
          </Link>
        </div>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.properties?.length > 0 ? (
          data.properties.map((property, index) => (
            <Link
              href={`/property/${property.slug}`}
              key={property._id || index}
              className="block group"
            >
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-shadow duration-300 p-2 hover:shadow-xl cursor-pointer">
                <div className="relative w-full h-60">
                  <Image
                    src={
                      property?.media?.find((media) => media?.type === "image")
                        ?.url
                    }
                    alt={property?.title || "Property"}
                    width={500}
                    height={240}
                    className="w-full h-full object-cover rounded-md"
                  />
                  <div className="absolute top-4 left-4 flex space-x-2">
                    <span className="bg-green-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {"For " + property?.transactionType}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-gray-900">
                      {property?.title}
                    </h3>
                    <span className="text-lg font-bold text-[#E7C873]">
                      ₹{getPropertyPrice(property)}
                    </span>
                  </div>

                  <p className="line-clamp-2 text-sm text-gray-600 mt-2">
                    {property?.description}
                  </p>

                  <div className="flex items-center mt-3 text-sm text-gray-500 space-x-1">
                    <Image
                      src="/images/loc.png"
                      alt="Location"
                      width={14}
                      height={14}
                    />
                    <p
                      className="truncate"
                      title={property?.fullAddressSearch}
                    >
                      {property?.fullAddressSearch}
                    </p>
                  </div>

                  <div className="flex space-x-4 mt-4 text-gray-500">
                    <div className="flex items-center flex-shrink-0 space-x-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                      <span className="text-sm">{property?.bedrooms} Beds</span>
                    </div>

                    <div className="flex items-center flex-shrink-0 space-x-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 7V3m8 4V3m-9 8h8m-8 4h8m4-4h.01M3 15h20M3 21h20a2 2 0 002-2v-4a2 2 0 00-2-2H3a2 2 0 00-2 2v4a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-sm">{property?.bathrooms} Baths</span>
                    </div>

                    <div className="flex items-center flex-shrink-0 space-x-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-sm">
                        {property?.carpetArea + " " + property?.sizeUnit}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center py-8">
            No properties found.
          </p>
        )}
      </div>
    </div>
  );
};

export default FeaturedProperties;