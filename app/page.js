import Hero from "./components/Hero";
import Properties from "./components/Properties";
import FeaturedProperties from "./components/FeaturedProperties";
import HowItWorks from "./components/HowItWorks";
import WhyUs from "./components/WhyUs";
import FeaturedCategories from "./components/FeaturedCategories";
import Choose from "./components/Choose";
import TestimonialSlider from "./components/TestimonialSlider";
import RecentArticle from "./components/RecentArticle";
import CTASection from "./components/CtaSection";

export default function Home({searchParams}) {
  return (
    <>
      <Hero />
      <Properties />
      <FeaturedProperties searchQuery={searchParams}/>
      <HowItWorks />
      <WhyUs />
      <FeaturedCategories />
      <Choose />
      <TestimonialSlider />
      <RecentArticle />
      <CTASection />
    </>
  );
}
