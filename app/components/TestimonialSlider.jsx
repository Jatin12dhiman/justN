// components/TestimonialSlider.jsx

const testimonials = [
  {
    id: 1,
    name: "Cameron Williamson",
    title: "Designer",
    quote:
      "Searches for multiplexes, property comparisons, and the loan estimator. Works great. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dores.",
    imageUrl: "/images/t1.png", // ✅ put in /public/images/
  },
];

export default function TestimonialSlider() {
  return (
    <section className="bg-[#FFF8F8] py-20 md:py-32 font-sans min-h-screen">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Loop over all testimonials */}
        <div className="space-y-20">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-10 md:gap-20"
            >
              {/* LEFT IMAGE */}
              <div className="relative w-full max-w-[300px] h-[350px] md:w-[350px] md:h-[450px] flex-shrink-0">
                <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={t.imageUrl}
                    alt={`Testimonial from ${t.name}`}
                    className="w-full h-full object-cover object-center rounded-3xl"
                  />
                </div>

                {/* Fake Play Button */}
                <div className="absolute inset-0 m-auto w-16 h-16 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-gray-800 ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 19L18 12L6 5V19Z" />
                  </svg>
                </div>
              </div>

              {/* RIGHT CONTENT */}
              <div className="lg:w-1/2 mt-10 lg:mt-0">
                {/* Reviewer */}
                <div className="flex items-start mb-6">
                  <div className="p-4 bg-yellow-500 rounded-xl flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-gray-900"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 17H9V14H6V17ZM6 7V12H9V7H6ZM11 17H14V14H11V17ZM11 7V12H14V7H11ZM16 17H19V14H16V17ZM16 7V12H19V7H16Z" />
                    </svg>
                  </div>
                  <div className="ml-5">
                    <p className="text-xl font-bold text-gray-900">{t.name}</p>
                    <p className="text-gray-500 text-base">{t.title}</p>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-lg text-gray-700 leading-relaxed mb-10 md:pr-10">
                  {t.quote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
