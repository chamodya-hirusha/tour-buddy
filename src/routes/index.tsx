import { createFileRoute } from "@tanstack/react-router";
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tour Buddy — Luxury Bespoke Tours of Sri Lanka" },
      {
        name: "description",
        content:
          "Bespoke luxury tours of Sri Lanka with private vehicles, handpicked hotels, and licensed expert guides. Book curated journeys to Sigiriya, Ella, Galle and beyond.",
      },
      { property: "og:title", content: "Tour Buddy — Luxury Bespoke Tours of Sri Lanka" },
      {
        property: "og:description",
        content:
          "Private vehicles, curated hotels, licensed guides. Every journey crafted, nothing forgotten.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
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
