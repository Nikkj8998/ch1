import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductMarquee from "@/components/ProductMarquee";
import SolutionsExplorer from "@/components/SolutionsExplorer";
import HomeProducts from "@/components/HomeProducts";
import Industries from "@/components/Industries";
import TrustSignals from "@/components/TrustSignals";
import Contact from "@/components/Contact";
import CallCTA from "@/components/CallCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <ProductMarquee />
        <SolutionsExplorer />
        <HomeProducts />
        <Industries />
        <TrustSignals />
        <Contact />
        <CallCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
