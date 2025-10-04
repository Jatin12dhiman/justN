import React from 'react';
import Image from 'next/image';

// Array of facility data with PNG image paths
const facilitiesData = [
    { name: "Gymnasium", img: "/images/gymnasium.png" },
    { name: "Club House", img: "/images/club.png" },
    { name: "Children's Play Area", img: "/images/kids_play_area.png" },
    { name: "Amphitheatre", img: "/images/amphitheatre.png" },
    { name: "Jogging Track", img: "/images/jogging_track.png" },
    { name: "Badminton Court", img: "/images/badminton_court.png" },
    { name: "Squash Court", img: "/images/squash_court.png" },
    { name: "Basketball Court", img: "/images/basketball_court.png" },
    { name: "Skating Rink", img: "/images/skating_rink.png" },
];

// Component for a single facility card
const FacilityCard = ({ name, img }) => (
    <div className="p-2 flex flex-col items-center text-center">
        <div className="flex items-center justify-center h-16 w-full mb-2">
            <Image
                src={img}
                alt={name}
                width={48}
                height={48}
                className="object-contain"
            />
        </div>
        <span className="text-sm font-medium text-gray-700 mt-2 leading-tight">
            {name}
        </span>
    </div>
);

const TopFacilities = () => {
    return (
        <div className="bg-white p-6 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Top Facilities</h2>
                    {/* <a href="#" className="text-blue-600 font-semibold hover:underline text-sm">
                        View All (32)
                    </a> */}
                </div>
                <p className="text-base text-gray-500 mb-6">
                    Bricks Marvella Hyderabad presents an exclusive opportunity to own a stunning home...
                </p>

                {/* Facilities Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    {facilitiesData.map((facility, index) => (
                        <FacilityCard key={index} name={facility.name} img={facility.img} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopFacilities;
