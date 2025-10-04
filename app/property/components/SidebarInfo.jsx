// components/PropertyPage/SidebarInfo.jsx
import Image from "next/image";

const SidebarInfo = () => (
  <aside className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 h-fit sticky self-start">
    <h3 className="text-lg font-semibold text-slate-800">
      Why you should consider <br /> Bricks Marvella?
    </h3>

    <ul className="mt-3 space-y-2 text-sm text-slate-700 list-disc pl-5">
      <li>Good connectivity to all educational institutions and hospitals</li>
      <li>The project is loaded with many indoor and outdoor amenities</li>
      <li>360-degree well-ventilated apartment homes</li>
    </ul>

    <button className="mt-2 text-blue-600 text-sm font-medium hover:underline inline-flex items-center gap-1">
      View 2 more
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <hr className="my-4 border-gray-200" />

    <div className="text-xs uppercase tracking-wide text-gray-500">Developed by</div>
    <div className="mt-2 flex items-center gap-3">
      <div className="w-10 h-10 rounded border border-gray-200 overflow-hidden bg-white flex items-center justify-center">
        <Image
          src="/images/pg1.webp"
          alt="Developer logo"
          width={40}
          height={40}
          className="object-cover"
        />
      </div>
      <div className="text-sm text-slate-800 font-medium">
        Bricks Ramabhupal Projects LLP
      </div>
    </div>

    <button className="mt-4 w-full h-10 rounded-md border border-blue-600 text-blue-600 font-semibold text-sm hover:bg-blue-50">
      Contact Builder
    </button>
  </aside>
);

export default SidebarInfo;
