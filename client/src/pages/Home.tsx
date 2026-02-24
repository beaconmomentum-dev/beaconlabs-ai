import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VideoExplainer from "@/components/VideoExplainer";
import TrustSignals from "@/components/TrustSignals";
import NichePathways from "@/components/NichePathways";
import Services from "@/components/Services";
import WhyBeacon from "@/components/WhyBeacon";
import Process from "@/components/Process";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <VideoExplainer />
      <TrustSignals />
      <NichePathways />
      <Services />
      <WhyBeacon />
      <Process />
      <Portfolio />
      <Pricing />
      <Contact />
      <Footer />
    </>
  );
}
