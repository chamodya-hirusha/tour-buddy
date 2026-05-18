import type { Metadata } from 'next'
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { TrustBar } from "@/components/site/TrustBar";
import { FeaturedPackages } from "@/components/site/FeaturedPackages";
import { Inclusions } from "@/components/site/Inclusions";
import { Destinations } from "@/components/site/Destinations";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Testimonials } from "@/components/site/Testimonials";
import { CtaBanner } from "@/components/site/CtaBanner";

export const metadata: Metadata = {
  title: "Tour Buddy — Luxury Bespoke Tours of Sri Lanka",
  description: "Bespoke luxury tours of Sri Lanka with private vehicles, handpicked hotels, and licensed expert guides. Book curated journeys to Sigiriya, Ella, Galle and beyond.",
  openGraph: {
    title: "Tour Buddy — Luxury Bespoke Tours of Sri Lanka",
    description: "Private vehicles, curated hotels, licensed guides. Every journey crafted, nothing forgotten.",
    type: "website",
  },
}

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <FeaturedPackages />
        <Inclusions />
        <Destinations />
        <HowItWorks />
        <Testimonials />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
