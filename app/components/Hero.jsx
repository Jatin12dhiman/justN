import React from 'react';
import Image from 'next/image';

const Hero = () => {
  return (
    <div className="relative bg-[#FFF8F6] py-10 md:py-16">
      <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center px-4 ">

        {/* Left Side: Text and Search Form */}
        <div className="order-2 md:order-1 ">
          <p className="text-sm text-gray-500">
            From as low as $10 per day with limited time offer discounts.
          </p>
          <h1 className="text-4xl md:text-5xl font-medium mt-2 leading-tight text-[#1F4B43]">
            Your <span className="text-[#E7C873]">Property</span>, Our Priority.
          </h1>

          {/* Search Box */}
          <div className="relative mt-12 rounded-2xl bg-white shadow-lg px-4 w-full py-4 sm:w-[95%] md:w-[650px] lg:w-[750px] xl:w-[850px] mx-auto z-10">
            <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_auto] gap-4 md:items-center ">
              {/* Keyword */}
              <div className="relative">
                <label className="block text-xs font-medium text-neutral-400 mb-1">Keyword</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter Keyword"
                    className="w-full rounded-xl border border-neutral-200 pl-10 pr-3 py-2.5 text-sm outline-none focus:border-emerald-400"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Status */}
              <div className="md:border-l md:border-neutral-200 md:pl-6">
                <label className="block text-xs font-medium text-neutral-400 mb-1">Status</label>
                <select className="w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-400">
                  <option>All Status</option>
                  <option>For Rent</option>
                  <option>For Sale</option>
                </select>
              </div>

              {/* Type */}
              <div className="md:border-l md:border-neutral-200 md:pl-6">
                <label className="block text-xs font-medium text-neutral-400 mb-1">Type</label>
                <select className="w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-400">
                  <option>All Type</option>
                  <option>Apartment</option>
                  <option>Villa</option>
                  <option>Studio</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex items-end justify-end gap-2">
                <button className="rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
                  Filter
                </button>
                <button className="rounded-xl bg-[#E7C873] px-5 py-2.5 text-sm font-semibold text-neutral-900 hover:bg-amber-500">
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Popular Searches */}
          <div className="mt-12 flex items-center flex-wrap gap-2 text-sm">
            <span className="text-gray-600 font-semibold text-lg ">Popular Search </span>
            <button className="bg-white text-[#1F4B43] px-3 py-1 rounded-full hover:bg-gray-300 transition-colors border border-gray-200">
              Modern Villa
            </button>
            <button className="bg-white text-[#1F4B43] px-3 py-1 rounded-full hover:bg-gray-300 transition-colors border border-gray-200">
              Studio Apartment
            </button>
            <button className="bg-white text-[#1F4B43] px-3 py-1 rounded-full hover:bg-gray-300 transition-colors border border-gray-200">
              Town House
            </button>
          </div>
        </div>

        {/* Right Side: Single Image */}
        <div className="relative order-1 md:order-2 w-full">
          {/* Outer card */}
          <div className="relative w-full h-auto md:h-[500px] lg:h-[600px] xl:h-[651px] mx-auto max-w-[700px] lg:max-w-[800px] xl:max-w-[900px]">
            {/* Inner clip */}
            <div className="relative h-full w-full overflow-hidden rounded-[22px] p-1 sm:p-1.5">
              <div className="grid grid-cols-2 gap-1 sm:gap-1 md:gap-1 h-full">
                {/* LEFT COLUMN */}
                <div className="col-span-1 h-full flex flex-col gap-1">
                  {/* LEFT TOP IMAGE (≈70%) */}
                  <div className="relative w-full overflow-hidden rounded-tl-[190px] rounded-bl-[40px] aspect-[3/4] md:aspect-auto md:basis-[70%] md:grow-0 md:shrink-0 md:h-0">
                    <Image
                      src="/images/frm3.jpg"
                      alt="Luxury home exterior"
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* LEFT BOTTOM IMAGE (≈30%) */}
                  <div className="relative w-full overflow-hidden rounded-l-[40px] aspect-[4/3] md:aspect-auto md:basis-[30%] md:grow-0 md:shrink-0 md:h-0">
                    <Image
                      src="/images/frm2.jpg"
                      alt="Garden"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                {/* RIGHT COLUMN */}
                <div className='col-span-1 h-full flex flex-col gap-1'>
                  {/* RIGHT TOP IMAGE (≈35%) */}
                  <div className="relative w-full overflow-hidden rounded-r-[40px] aspect-[4/3] sm:aspect-[16/9] md:aspect-auto md:basis-[35%] md:grow-0 md:shrink-0 md:h-0">
                    <Image
                      src="/images/frm1.jpg"
                      alt="Living room"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* RIGHT BOTTOM IMAGE (≈65%)) */}
                  <div className="relative w-full overflow-hidden rounded-br-[190px] rounded-r-[40px] aspect-[3/4] md:aspect-auto md:basis-[65%] md:grow-0 md:shrink-0 md:h-0">
                    <Image
                      src="/images/frm5.jpg"
                      alt="Kitchen"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

              </div>

            </div>
            <div className="absolute bottom-[-30px] right-4 sm:bottom-[-40px] sm:right-6 md:bottom-[-60px] md:right-[-30px] z-10 w-[150px] sm:w-[220px] md:w-[250px] lg:w-[300px] rounded-2xl overflow-hidden">
              <Image
                src="/images/stry.png"
                alt="Overlay"
                width={300}
                height={200}
                className="w-full h-auto block"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
