export default function Loading() {
  return (
    <div className="bg-[#f9fafb] min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Top Heading Skeleton */}
        <div className="mb-2 h-8 w-80 bg-gray-200 rounded animate-pulse"></div>
        <div className="mb-6 h-4 w-96 bg-gray-200 rounded animate-pulse"></div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          {/* LEFT FILTERS Skeleton */}
          <aside className="bg-white rounded-xl p-4 shadow-sm h-fit hidden lg:block">
            <div className="h-6 w-20 bg-gray-200 rounded animate-pulse mb-4"></div>

            {/* Verified */}
            <div className="flex items-center justify-between mb-3">
              <div className="h-4 w-36 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Budget */}
            <div className="mb-4">
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mb-1"></div>
              <div className="flex items-center gap-2">
                <div className="w-1/2 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="w-1/2 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>

            {/* Type */}
            <div className="mb-4">
              <div className="h-4 w-28 bg-gray-200 rounded animate-pulse mb-1"></div>
              <div className="flex flex-col gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* RIGHT RESULTS Skeleton */}
          <main>
            {/* Mobile Filters Skeleton */}
            <div className="lg:hidden flex gap-2 overflow-x-auto pb-3 mb-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-9 w-32 bg-gray-200 rounded-full animate-pulse"
                ></div>
              ))}
            </div>

            {/* Property Cards Skeleton */}
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col md:flex-row gap-4"
                >
                  {/* Image Skeleton */}
                  <div className="relative w-full md:w-64 h-48 rounded-lg bg-gray-200 animate-pulse"></div>

                  {/* Info Skeleton */}
                  <div className="flex-1 flex flex-col justify-between">
                    {/* Header */}
                    <div>
                      <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>

                      {/* Key Stats Skeleton */}
                      <div className="mt-3 flex flex-col sm:flex-row sm:divide-x sm:divide-gray-300">
                        {[1, 2, 3, 4].map((j) => (
                          <div
                            key={j}
                            className="flex justify-between sm:block sm:px-3 py-2 sm:py-0"
                          >
                            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                          </div>
                        ))}
                      </div>

                      {/* Highlights Skeleton */}
                      <div className="mt-3 flex flex-wrap gap-2">
                        {[1, 2, 3].map((k) => (
                          <div
                            key={k}
                            className="h-6 w-24 bg-gray-200 rounded animate-pulse"
                          ></div>
                        ))}
                      </div>

                      {/* Description Skeleton */}
                      <div className="mt-2 h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                    </div>

                    {/* Footer Skeleton */}
                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
                        <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}