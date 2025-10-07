"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Image from "next/image";

function SearchContent() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const status = searchParams.get("status") || "All Status";
  const type = searchParams.get("type") || "All Type";

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Dummy property data
    const dummyData = [
      {
        id: 1,
        title: "Luxury Apartment in Delhi",
        location: "Connaught Place, Delhi",
        type: "Apartment",
        status: "Ready to Move",
        price: "1.2 Cr",
        area: "1,500 sqft",
        image: "/images/prt3.png",
        saleType: "RESALE",
        highlights: ["East Facing", "Corner Property", "Park Facing", "Gated"],
        description:
          "Premium 3BHK with modular kitchen, clubhouse access and 2 covered parkings.",
        dealer: "Urban Homes Realty",
        postedAgo: "3d ago",
      },
      {
        id: 2,
        title: "Modern Villa in Noida",
        location: "Sector 150, Noida",
        type: "Villa",
        status: "Under Construction",
        price: "2.8 Cr",
        area: "3,200 sqft",
        image: "/images/prt2.png",
        saleType: "NEW LAUNCH",
        highlights: ["North-East", "Private Lawn", "Club Membership"],
        description:
          "Spacious villa in a low-density community with premium amenities and security.",
        dealer: "Apex Estates",
        postedAgo: "1w ago",
      },
      {
        id: 3,
        title: "Affordable Flat in Panipat",
        location: "Model Town, Panipat",
        type: "Apartment",
        status: "Ready to Move",
        price: "75 Lakh",
        area: "1,100 sqft",
        image: "/images/slider.png",
        saleType: "RESALE",
        highlights: ["South Facing", "Near Market"],
        description:
          "Well-lit 2BHK near schools and hospitals. Ideal for small families.",
        dealer: "Cityline Realtors",
        postedAgo: "5d ago",
      },
      {
        id: 4,
        title: "Flat in Panipat",
        location: "Model Town, Panipat",
        type: "Apartment",
        status: "Under Construction",
        price: "45 Lakh",
        area: "1,100 sqft",
        image: "/images/prt1.png",
        saleType: "RESALE",
        highlights: ["Corner", "Near Park", "24x7 Security"],
        description:
          "Neat 2BHK with balcony and ample daylight. Close to daily conveniences.",
        dealer: "BNR Infra Developments",
        postedAgo: "1mo ago",
      },
    ];

    // Simple keyword-based filtering
    const filtered = dummyData.filter(
      (item) =>
        item.location.toLowerCase().includes(keyword.toLowerCase()) ||
        item.title.toLowerCase().includes(keyword.toLowerCase())
    );

    setProperties(filtered);
  }, [keyword, status, type]);

  return (
    <div className="bg-[#f9fafb] min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Top Heading */}
        <h1 className="text-2xl font-semibold mb-2">
          {properties.length} results | Property in {keyword || "India"}
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Showing results for: <span className="font-medium">{keyword || "All"}</span> — {status}, {type}
        </p>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          {/* LEFT FILTERS */}
          <aside className="bg-white rounded-xl p-4 shadow-sm h-fit hidden lg:block">
            <h2 className="font-semibold text-lg mb-4">Filters</h2>

            {/* Verified */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-700">Verified Properties</span>
              <input type="checkbox" className="accent-emerald-500" />
            </div>

            {/* Budget */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Budget</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-1/2 border rounded-lg px-2 py-1 text-sm"
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-1/2 border rounded-lg px-2 py-1 text-sm"
                />
              </div>
            </div>

            {/* Type */}
                    
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Type of Property</label>
            <div className="flex flex-col gap-2">
              <label className="text-sm flex items-center gap-2">
                <input type="checkbox" className="accent-emerald-500" /> Apartment
              </label>
              <label className="text-sm flex items-center gap-2">
                <input type="checkbox" className="accent-emerald-500" /> Villa
              </label>
              <label className="text-sm flex items-center gap-2">
                <input type="checkbox" className="accent-emerald-500" /> Studio
              </label>
            </div>
          </div>
          </aside>

          {/* RIGHT RESULTS */}
          <main>
            {/* Mobile Filters */}
            <div className="lg:hidden flex gap-2 overflow-x-auto pb-3 mb-4 scroll-smooth">
              {["Verified", "Under Construction", "Ready To Move", "With Photos"].map((filter) => (
                <button
                  key={filter}
                  className="border border-gray-300 bg-white text-sm rounded-full px-4 py-2 whitespace-nowrap"
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Property Cards */}
          {properties.length === 0 ? (
            <p className="text-gray-500">No properties found.</p>
          ) : (
            <div className="space-y-4">
              {properties.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col md:flex-row gap-4"
                >
                  {/* Image */}
                  <div className="relative w-full md:w-64 h-48 rounded-lg overflow-hidden">
                    <Image
                      src={p.image || "/images/sample-property.jpg"}
                      alt={p.title}
                      fill
                      className="object-cover"
                    />
                    {p.saleType && (
                      <span className="absolute top-2 left-2 text-[10px] tracking-wider bg-white/90 text-gray-700 px-2 py-0.5 rounded border border-gray-200">
                        {p.saleType}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    {/* Header */}
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {p.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 text-sm mt-0.5">
                        {p.type} in {p.location}
                      </p>

                      {/* Key Stats */}
                      <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:divide-x sm:divide-gray-300 sm:text-sm">
  <div className="flex justify-between sm:block sm:px-3 py-2 sm:py-0">
    <p className="text-gray-600 sm:inline">Price: </p>
    <p className="font-semibold text-gray-900 sm:ml-1 inline">₹{p.price}</p>
  </div>

  <div className="flex justify-between sm:block sm:px-3 py-2 sm:py-0">
    <p className="text-gray-600 sm:inline">Plot Area: </p>
    <p className="font-medium text-gray-800 sm:ml-1 inline">{p.area || "—"}</p>
  </div>

  <div className="flex justify-between sm:block sm:px-3 py-2 sm:py-0">
    <p className="text-gray-600 sm:inline">Property Type: </p>
    <p className="font-medium text-gray-800 sm:ml-1 inline">{p.type}</p>
  </div>

  <div className="flex justify-between sm:block sm:px-3 py-2 sm:py-0">
    <p className="text-gray-600 sm:inline">Status: </p>
    <p className="font-medium text-gray-800 sm:ml-1 inline">{p.status}</p>
  </div>
</div>

                      {/* Highlights */}
                      {Array.isArray(p.highlights) && p.highlights.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {p.highlights.slice(0, 3).map((h) => (
                            <span
                              key={h}
                              className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-1 rounded"
                            >
                              {h}
                            </span>
                          ))}
                          {p.highlights.length > 3 && (
                            <span className="text-xs bg-gray-50 text-gray-700 border border-gray-200 px-2 py-1 rounded">
                              +{p.highlights.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Description */}
                      {p.description && (
                        <p className="mt-2 text-sm text-gray-700 truncate">
                          {p.description}
                        </p>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium text-gray-800">{p.dealer || "Dealer"}</span>
                        {p.postedAgo && <span className="mx-2">•</span>}
                        <span>{p.postedAgo || "Recently"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="border border-emerald-600 text-emerald-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-emerald-50">
                          View Number
                        </button>
                        <button className="bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-emerald-700">
                          Contact
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function Search() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-6">
          <p className="text-gray-600">Loading results…</p>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
