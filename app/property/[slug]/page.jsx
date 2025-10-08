"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

function getPropertyPrice(property) {
  if (!property?.pricing) return null;
  
  const { transactionType } = property;
  const pricing = property.pricing;
  
  if (transactionType?.toLowerCase() === "rent") {
    return {
      main: pricing.rent,
      deposit: pricing.deposit,
      frequency: pricing.rentFrequency || "monthly"
    };
  } else if (transactionType?.toLowerCase() === "buy") {
    return {
      main: pricing.buyPrice,
      deposit: null,
      frequency: null
    };
  } else if (transactionType?.toLowerCase() === "lease") {
    return {
      main: pricing.leaseRent,
      deposit: pricing.leaseDeposit,
      frequency: `${pricing.leaseTermYears} years`
    };
  } else if (transactionType?.toLowerCase() === "pg") {
    return {
      main: pricing.pgRent,
      deposit: pricing.deposit,
      frequency: "monthly"
    };
  }
  
  return null;
}

function GallerySection({ media }) {
  if (!media || media.length === 0) {
    return (
      <div className="bg-gray-200 h-96 flex items-center justify-center rounded-lg">
        <p className="text-gray-500">No media available</p>
      </div>
    );
  }

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const selectedMedia = media[selectedIndex];

  const handleMediaClick = (index) => {
    if (index === selectedIndex) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedIndex(index);
      setIsTransitioning(false);
    }, 150);
  };

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 h-[500px]">
        <div className="md:col-span-2 relative h-full rounded-lg overflow-hidden bg-gray-100">
          <div 
            className={`w-full h-full transition-all duration-300 ${
              isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            {selectedMedia?.type === "video" ? (
              <video
                key={selectedMedia.url}
                src={selectedMedia.url}
                controls
                autoPlay
                className="w-full h-full object-cover"
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <Image
                key={selectedMedia?.url}
                src={selectedMedia?.url || "/placeholder.jpg"}
                alt="Main property view"
                fill
                className="object-cover"
                priority
              />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div 
            className="relative h-1/2 rounded-lg overflow-hidden bg-gray-100 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => media[1] && handleMediaClick(1)}
          >
            {media[1] ? (
              <>
                {media[1]?.type === "video" ? (
                  <video
                    src={media[1]?.url}
                    className="w-full h-full object-cover pointer-events-none"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <Image
                    src={media[1]?.url}
                    alt="Property view 2"
                    fill
                    className="object-cover"
                  />
                )}
                {selectedIndex === 1 && (
                  <div className="absolute inset-0 border-4 border-emerald-500 rounded-lg"></div>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-400 text-sm">No image</p>
              </div>
            )}
          </div>

          <div 
            className="relative h-1/2 rounded-lg overflow-hidden bg-gray-100 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => media[2] && handleMediaClick(2)}
          >
            {media[2] ? (
              <>
                {media[2]?.type === "video" ? (
                  <video
                    src={media[2]?.url}
                    className="w-full h-full object-cover pointer-events-none"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <>
                    <Image
                      src={media[2]?.url}
                      alt="Property view 3"
                      fill
                      className="object-cover"
                    />
                    {media.length > 3 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">
                          +{media.length - 3} more
                        </span>
                      </div>
                    )}
                  </>
                )}
                {selectedIndex === 2 && (
                  <div className="absolute inset-0 border-4 border-emerald-500 rounded-lg"></div>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-400 text-sm">No image</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto pb-2">
        <div className="flex gap-3 min-w-min">
          {media.map((item, index) => (
            <div
              key={index}
              onClick={() => handleMediaClick(index)}
              className={`relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                selectedIndex === index
                  ? "ring-4 ring-emerald-500 scale-105"
                  : "hover:ring-2 hover:ring-emerald-300 opacity-70 hover:opacity-100"
              }`}
            >
              {item.type === "video" ? (
                <div className="relative w-full h-full">
                  <video
                    src={item.url}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>
              ) : (
                <Image
                  src={item.url}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectHeader({ property }) {
  const priceData = getPropertyPrice(property);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {property?.title}
          </h1>
          <p className="text-gray-600 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {property?.fullAddressSearch}
          </p>
        </div>
        {property?.adminFlags?.isFeatured && (
          <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-3 mb-4">
        <span className="text-4xl font-bold text-emerald-600">
          ₹{priceData?.main?.toLocaleString()}
        </span>
        {property?.transactionType?.toLowerCase() === "rent" && (
          <span className="text-gray-500 text-lg">/{priceData?.frequency}</span>
        )}
        {property?.pricing?.isNegotiable && (
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded">
            Negotiable
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        {priceData?.deposit && (
          <div>
            <p className="text-gray-500">Security Deposit</p>
            <p className="font-semibold text-gray-900">
              ₹{priceData.deposit.toLocaleString()}
            </p>
          </div>
        )}
        {property?.maintenanceCharge && (
          <div>
            <p className="text-gray-500">Maintenance</p>
            <p className="font-semibold text-gray-900">
              ₹{property.maintenanceCharge.toLocaleString()}
              {property?.maintenanceFrequency && ` /${property.maintenanceFrequency}`}
            </p>
          </div>
        )}
        {property?.pricing?.leasingTermMonths && (
          <div>
            <p className="text-gray-500">Lease Term</p>
            <p className="font-semibold text-gray-900">
              {property.pricing.leasingTermMonths} months
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectOverview({ property }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">Property Overview</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-sm mb-1">Property Type</p>
          <p className="font-semibold text-gray-900 text-lg">{property?.propertyType}</p>
        </div>
        
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-sm mb-1">Transaction</p>
          <p className="font-semibold text-gray-900 text-lg">{property?.transactionType}</p>
        </div>

        {property?.bedrooms && (
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-sm mb-1">Bedrooms</p>
            <p className="font-semibold text-gray-900 text-lg">{property.bedrooms}</p>
          </div>
        )}

        {property?.bathrooms && (
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-sm mb-1">Bathrooms</p>
            <p className="font-semibold text-gray-900 text-lg">{property.bathrooms}</p>
          </div>
        )}

        {property?.carpetArea && (
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-sm mb-1">Carpet Area</p>
            <p className="font-semibold text-gray-900 text-lg">
              {property.carpetArea} {property.sizeUnit}
            </p>
          </div>
        )}

        {property?.builtUpArea && (
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-sm mb-1">Built Up Area</p>
            <p className="font-semibold text-gray-900 text-lg">
              {property.builtUpArea} {property.sizeUnit}
            </p>
          </div>
        )}

        {property?.floor && (
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-sm mb-1">Floor</p>
            <p className="font-semibold text-gray-900 text-lg">
              {property.floor} of {property.totalFloors}
            </p>
          </div>
        )}

        {property?.facing && (
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-sm mb-1">Facing</p>
            <p className="font-semibold text-gray-900 text-lg">{property.facing}</p>
          </div>
        )}

        {property?.furnished && (
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-sm mb-1">Furnished</p>
            <p className="font-semibold text-gray-900 text-lg">{property.furnished}</p>
          </div>
        )}

        {property?.balconies && (
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-sm mb-1">Balconies</p>
            <p className="font-semibold text-gray-900 text-lg">{property.balconies}</p>
          </div>
        )}

        {property?.parkingType && (
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-sm mb-1">Parking</p>
            <p className="font-semibold text-gray-900 text-lg">{property.parkingType}</p>
          </div>
        )}

        {property?.ageOfPropertyYears && (
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-sm mb-1">Property Age</p>
            <p className="font-semibold text-gray-900 text-lg">
              {property.ageOfPropertyYears} years
            </p>
          </div>
        )}
      </div>

      {property?.description && (
        <div className="mt-6 pt-6 border-t">
          <h3 className="text-xl font-semibold mb-3 text-gray-900">Description</h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {property.description}
          </p>
        </div>
      )}
    </div>
  );
}

function LocationOverview({ property }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">Location</h2>
      <div className="space-y-2">
        <p className="text-gray-700">
          <span className="font-medium">Address:</span> {property?.location?.address}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Area:</span> {property?.location?.area}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">City:</span> {property?.location?.city}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">State:</span> {property?.location?.state}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Pincode:</span> {property?.location?.pincode}
        </p>
      </div>
    </div>
  );
}

function TopFacilities({ property }) {
  if (!property?.amenities || property.amenities.length === 0) return null;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">Amenities & Facilities</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {property.amenities.map((amenity, index) => (
          <div
            key={index}
            className="flex items-center gap-2 text-gray-700 bg-blue-50 px-4 py-3 rounded-lg border border-blue-200"
          >
            <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SidebarInfo({ property }) {
  return (
    <div className="lg:sticky lg:top-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold mb-4 text-gray-900">Contact Information</h3>
        
        <div className="space-y-4 mb-6">
          <div>
            <p className="text-gray-500 text-sm mb-1">Contact Person</p>
            <p className="text-gray-900 font-semibold text-lg">
              {property?.contact?.contactName}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm mb-1">Phone Number</p>
            <p className="text-gray-900 font-semibold text-lg">
              {property?.contact?.contactPhone}
            </p>
          </div>

          {property?.contact?.contactEmail && (
            <div>
              <p className="text-gray-500 text-sm mb-1">Email</p>
              <p className="text-gray-900 font-medium">
                {property.contact.contactEmail}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <button className="w-full bg-emerald-600 text-white font-semibold py-3 rounded-lg hover:bg-emerald-700 transition">
            View Phone Number
          </button>
          <button className="w-full border-2 border-emerald-600 text-emerald-600 font-semibold py-3 rounded-lg hover:bg-emerald-50 transition">
            Contact Owner
          </button>
        </div>

        <div className="mt-6 pt-6 border-t space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Property Status</span>
            <span className="font-semibold text-gray-900">{property?.status}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Views</span>
            <span className="font-semibold text-gray-900">
              {property?.metrics?.viewsCount || 0}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Posted</span>
            <span className="font-semibold text-gray-900">
              {new Date(property?.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {(property?.petAllowed || property?.serviceRoom || property?.parkingType) && (
          <div className="mt-6 pt-6 border-t">
            <h4 className="font-semibold text-gray-900 mb-3">Additional Features</h4>
            <ul className="space-y-2 text-sm">
              {property?.petAllowed && (
                <li className="flex items-center gap-2 text-gray-700">
                  <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Pet Friendly
                </li>
              )}
              {property?.serviceRoom && (
                <li className="flex items-center gap-2 text-gray-700">
                  <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Service Room Available
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PropertyClient() {
  const params = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/properties/${params.slug}`
        );
        const result = await response.json();
        if (result.success) {
          setProperty(result.data);
        } else {
          setError("Property not found");
        }
      } catch (err) {
        setError("Failed to load property");
        console.error("Error fetching property:", err);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchProperty();
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div className="bg-[#f9fafb] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading property...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="bg-[#f9fafb] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl">{error || "Property not found"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f9fafb] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <GallerySection media={property.media} />
            <ProjectHeader property={property} />
            <ProjectOverview property={property} />
            <LocationOverview property={property} />
            <TopFacilities property={property} />
          </div>
          <SidebarInfo property={property} />
        </div>
      </div>
    </div>
  );
}