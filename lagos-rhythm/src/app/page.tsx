import BestOfLagos from "@/components/BestOfLagos";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import NewsLetter from "@/components/NewsLetter";
import PopularThings from "@/components/PopulaThings";
import Testimonials from "@/components/Testimonials";
import WhyLagos from "@/components/WhyLagos";


export default function Home() {
  return (
    <div>
      <HeroSection />
      <BestOfLagos />
      <PopularThings />
      <WhyLagos />
      <Testimonials />
      <NewsLetter />
      <Footer />
    </div>
  );
}
