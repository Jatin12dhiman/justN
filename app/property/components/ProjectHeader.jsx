// components/PropertyPage/ProjectHeader.jsx
import Image from "next/image";

const ProjectHeader = () => (
  <div className="p-4 mt-2 border-t border-gray-100">
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded border border-gray-200 overflow-hidden bg-white flex items-center justify-center">
          <Image
            src="/images/pg1.webp"
            alt="Bricks Marvella logo"
            width={56}
            height={56}
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">Bricks Marvella</h2>
          <p className="text-sm text-gray-500 mt-0.5">Tellapur, Hyderabad</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-md bg-green-50 text-green-700 text-xs px-2.5 py-1 border border-green-100">
              Residential
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-gray-100 text-gray-700 text-xs px-2.5 py-1 border border-gray-200">
              Rent
            </span>
          </div>
        </div>
      </div>

      <button className="inline-flex items-center justify-center h-10 px-4 rounded-md bg-blue-600 text-white text-sm font-semibold shadow hover:bg-blue-700">
        View Number
      </button>
    </div>
  </div>
);

export default ProjectHeader;
