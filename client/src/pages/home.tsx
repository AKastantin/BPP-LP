import Header from "@/components/layout/header";
import Hero from "@/components/sections/hero";
import ProblemStatement from "@/components/sections/problem-statement";
import SolutionOverview from "@/components/sections/solution-overview";
import ProductShowcase from "@/components/sections/product-showcase";
import InteractiveTools from "@/components/sections/interactive-tools";
import CaseStudies from "@/components/sections/case-studies";
import Pricing from "@/components/sections/pricing";
import ContactCTA from "@/components/sections/contact-cta";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ProblemStatement />
        <SolutionOverview />
        <ProductShowcase />
        <InteractiveTools />
        <CaseStudies />
        <Pricing />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
