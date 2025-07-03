import { Benefits } from "@/components/sections/benefits";
import { CTA } from "@/components/sections/cta";
import { FAQ } from "@/components/sections/faq";
import { FeatureHighlight } from "@/components/sections/feature-highlight";
import { FeatureScroll } from "@/components/sections/feature-scroll";
import { Features } from "@/components/sections/features";
import { FinalCTA } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Influencer } from "@/components/sections/influencer";
import { Pricing } from "@/components/sections/pricing";
import { Testimonials } from "@/components/sections/testimonials";

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <Features />
      <Influencer />
      {/* <FeatureScroll /> */}
      <FeatureHighlight />
      {/* <BentoGrid /> */}
      {/* <Benefits /> */}
      <Testimonials />
      {/* <Pricing /> */}
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
