// components/PropertyPage/GallerySection.jsx
import Image from "next/image";

const GallerySection = () => (
  <div className="flex flex-col lg:flex-row gap-1 px-2">
    <div className="relative h-[300px] lg:w-2/3 rounded-lg overflow-hidden ">
      <Image
        src="/images/bld1.jpg"
        alt="Bricks Marvella apartment building"
        fill
        style={{ objectFit: "cover" }}
        className="rounded-lg"
        priority
      />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="absolute bottom-4 left-4 text-white px-3 py-1 rounded-full text-sm bg-black/40">
        All Photos & Videos
      </div>
    </div>

    <div className="flex flex-col lg:w-1/3 gap-1">
      <div className="relative h-[150px] rounded-lg overflow-hidden">
        <Image
          src="/images/bld3.jpg"
          alt="Video of Bricks Marvella"
          fill
          style={{ objectFit: "cover" }}
          className="rounded-lg"
        />
        <div className="absolute bottom-4 left-4 text-white px-3 py-1 rounded-full text-sm bg-black/40">
          Videos
        </div>
      </div>

      <div className="relative h-[145px] rounded-lg overflow-hidden">
        <Image
          src="/images/bld2.jpg"
          alt="Outdoor view of Bricks Marvella"
          fill
          style={{ objectFit: "cover" }}
          className="rounded-lg"
        />
        <div className="absolute bottom-4 left-4 text-white px-3 py-1 rounded-full text-sm bg-black/40">
          Outdoors
        </div>
      </div>
    </div>
  </div>
);

export default GallerySection;
