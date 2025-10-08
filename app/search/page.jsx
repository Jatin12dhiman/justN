import Image from "next/image";
import { getProperties } from "../services/propertyService";
import Link from "next/link";

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

export function getPostedAgo(createdAt) {
  if (!createdAt) return "Recently";

  const now = new Date();
  const posted = new Date(createdAt);
  const diff = Math.floor((now - posted) / 1000);

  const mins = Math.floor(diff / 60);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (weeks >= 1) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  if (days >= 1) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours >= 1) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (mins >= 1) return `${mins} min${mins > 1 ? "s" : ""} ago`;

  return "Recently";
}

function buildQueryString(params) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value && value !== "" && value !== "All Status" && value !== "All Type") {
      query.append(key, value);
    }
  });
  return query.toString();
}

export default async function Page({ searchParams }) {
  const search = searchParams?.query || "";
  const keyword = searchParams?.keyword || "";
  const type = searchParams?.type || "";
  const isVerified = searchParams?.isVerified || "";
  const minPrice = searchParams?.minPrice || "";
  const maxPrice = searchParams?.maxPrice || "";
  const propertyType = searchParams?.propertyType || "";
  const transactionType = searchParams?.transactionType || "";

  let apiQuery = `?search=${search}`;

  // isVerified ko status=Approved mein convert karo
  if (isVerified === "true") apiQuery += `&status=Approved`;
  if (minPrice) apiQuery += `&minPrice=${minPrice}`;
  if (maxPrice) apiQuery += `&maxPrice=${maxPrice}`;
  if (propertyType) apiQuery += `&propertyType=${propertyType}`;
  if (transactionType) apiQuery += `&transactionType=${transactionType}`;

  const { data } = await getProperties(apiQuery);

  const currentParams = {
    query: search,
    keyword,
    type,
    isVerified,
    minPrice,
    maxPrice,
    propertyType,
    transactionType,
  };

  const toggleFilter = (key, value) => {
    const newParams = { ...currentParams };
    if (newParams[key] === value) {
      delete newParams[key];
    } else {
      newParams[key] = value;
    }
    return `?${buildQueryString(newParams)}`;
  };

  console.log(data);

  const clearAllFilters = () => {
    const baseParams = {};
    if (search) baseParams.query = search;
    if (keyword) baseParams.keyword = keyword;
    return `?${buildQueryString(baseParams)}`;
  };

  return (
    <div className="bg-[#f9fafb] min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold mb-2">
          {data.properties.length} results | Property in {keyword || "Results"}
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Showing results for: <span className="font-medium">{keyword || "All"}</span>
          {type && `, ${type}`}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          <aside className="bg-white rounded-xl p-4 shadow-sm h-fit hidden lg:block sticky top-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg">Filters</h2>
              <Link
                href={clearAllFilters()}
                className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Clear All
              </Link>
            </div>

            {/* Verified Properties */}
            <div className="mb-4 pb-4 border-b">
              <Link
                href={toggleFilter("isVerified", "true")}
                className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded -m-2"
              >
                <span className="text-sm text-gray-700">Verified Properties</span>
                <input
                  type="checkbox"
                  checked={isVerified === "true"}
                  readOnly
                  className="accent-emerald-500 pointer-events-none"
                />
              </Link>
            </div>

            {/* Budget */}
            <div className="mb-4 pb-4 border-b">
              <label className="block text-sm font-medium mb-2">Budget</label>
              <form action="" method="get">
                {/* Sirf populated parameters pass karo */}
                {search && <input type="hidden" name="query" value={search} />}
                {keyword && <input type="hidden" name="keyword" value={keyword} />}
                {type && <input type="hidden" name="type" value={type} />}
                {isVerified && <input type="hidden" name="isVerified" value={isVerified} />}
                {propertyType && <input type="hidden" name="propertyType" value={propertyType} />}
                {transactionType && <input type="hidden" name="transactionType" value={transactionType} />}
                
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="number"
                    name="minPrice"
                    placeholder="Min"
                    defaultValue={minPrice}
                    className="w-1/2 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max"
                    defaultValue={maxPrice}
                    className="w-1/2 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-emerald-700"
                >
                  Apply Budget
                </button>
              </form>
            </div>

            {/* Property Category */}
            <div className="mb-4 pb-4 border-b">
              <label className="block text-sm font-medium mb-2">Property Category</label>
              <div className="flex flex-col gap-2">
                <Link
                  href={toggleFilter("propertyType", "Residential")}
                  className="text-sm flex items-center gap-2 hover:bg-gray-50 p-2 rounded -m-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={propertyType === "Residential"}
                    readOnly
                    className="accent-emerald-500 pointer-events-none"
                  />
                  <span>Residential</span>
                </Link>
                <Link
                  href={toggleFilter("propertyType", "Commercial")}
                  className="text-sm flex items-center gap-2 hover:bg-gray-50 p-2 rounded -m-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={propertyType === "Commercial"}
                    readOnly
                    className="accent-emerald-500 pointer-events-none"
                  />
                  <span>Commercial</span>
                </Link>
              </div>
            </div>

            {/* Transaction Type */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Transaction Type</label>
              <div className="flex flex-col gap-2">
                {["Lease", "Project", "Rent", "Buy", "PG"].map((txType) => (
                  <Link
                    key={txType}
                    href={toggleFilter("transactionType", txType)}
                    className="text-sm flex items-center gap-2 hover:bg-gray-50 p-2 rounded -m-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={transactionType === txType}
                      readOnly
                      className="accent-emerald-500 pointer-events-none"
                    />
                    <span>{txType}</span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          <main>
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

            {data.properties.length === 0 ? (
              <p className="text-gray-500">No properties found.</p>
            ) : (
              <div className="space-y-4">
                {data.properties.map((property) => (
                  <div
                    key={property?._id}
                    className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col md:flex-row gap-4"
                  >
                    <div className="relative md:w-64 h-48 md:h-auto rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={property?.media?.find((media) => media?.type === "image")?.url}
                        alt={property.title}
                        fill
                        className="object-cover"
                      />
                      {property?.transactionType && (
                        <span className="absolute top-2 left-2 text-[10px] tracking-wider bg-white/90 text-gray-700 px-2 py-0.5 rounded border border-gray-200">
                          {property?.transactionType}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {property?.title}
                          </h3>
                        </div>
                        <p className="text-gray-600 text-sm mt-0.5">
                          {property?.transactionType} in {property?.fullAddressSearch}
                        </p>

                        <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:divide-x sm:divide-gray-300 sm:text-sm">
                          <div className="flex justify-between sm:block sm:px-3 py-2 sm:py-0">
                            <p className="text-gray-600 sm:inline">Price: </p>
                            <p className="font-semibold text-gray-900 sm:ml-1 inline">₹{getPropertyPrice(property)}</p>
                          </div>

                          <div className="flex justify-between sm:block sm:px-3 py-2 sm:py-0">
                            <p className="text-gray-600 sm:inline">Plot Area: </p>
                            <p className="font-medium text-gray-800 sm:ml-1 inline">{property?.carpetArea} - {property.sizeUnit}</p>
                          </div>

                          <div className="flex justify-between sm:block sm:px-3 py-2 sm:py-0">
                            <p className="text-gray-600 sm:inline">Property Type: </p>
                            <p className="font-medium text-gray-800 sm:ml-1 inline">{property?.propertyType}</p>
                          </div>

                          <div className="flex justify-between sm:block sm:px-3 py-2 sm:py-0">
                            <p className="text-gray-600 sm:inline">Furnished status: </p>
                            <p className="font-medium text-gray-800 sm:ml-1 inline">{property?.furnished}</p>
                          </div>
                        </div>

                        {Array.isArray(property.amenities) && property.amenities.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {property.amenities.slice(0, 3).map((amenitie, index) => (
                              <span
                                key={index}
                                className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-1 rounded"
                              >
                                {amenitie}
                              </span>
                            ))}
                            {property.amenities.length > 3 && (
                              <span className="text-xs bg-gray-50 text-gray-700 border border-gray-200 px-2 py-1 rounded">
                                +{property.amenities.length - 3}
                              </span>
                            )}
                          </div>
                        )}

                        {property.description && (
                          <p className="mt-2 text-sm line-clamp-2">
                            {property.description}
                          </p>
                        )}
                      </div>

                      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium text-gray-800">{property?.createdBy?.name}</span>
                          {property?.createdAt && <span className="mx-2">•</span>}
                          <span>{getPostedAgo(property?.createdAt)}</span>
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