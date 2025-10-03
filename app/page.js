import Image from "next/image";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Properties from "./components/Properties";
import FeaturedProperties from "./components/FeaturedProperties";
import HowItWorks from "./components/HowItWorks";
import WhyUs from "./components/WhyUs";
import FeaturedCategories from "./components/FeaturedCategories";
import Choose from "./components/Choose";
import TestimonialSlider from "./components/TestimonialSlider";
import RecentArticle from "./components/RecentArticle";
import CTASection from "./components/CtaSection";
import SiteFooter from "./components/SiteFooter";

export default function Home() {
  return (
    <>
    <Navbar />
      <Hero />
      <Properties />
      <FeaturedProperties />
      <HowItWorks />
      <WhyUs />
      <FeaturedCategories />
      <Choose />
      <TestimonialSlider />
      <RecentArticle />
      <CTASection />
      <SiteFooter />
    </>
  );
}
