import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import HeroSection from "./HeroSection";
import StatsSection from "./StatsSection";
import TrustedCompanies from "./TrustedCompanies";
import ServicesAlternating from "./ServicesAlternating";
import WhyChooseUs from "./WhyChooseUs";
import FAQSection from "./FAQSection";
import ServiceEnquiry from "./ServiceEnquiry";
import MobileAppSection from "./MobileAppSection";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <TrustedCompanies />
        <ServicesAlternating />
        <WhyChooseUs />
        <FAQSection />
        <ServiceEnquiry />
        <MobileAppSection />
      </main>
      <Footer />
    </div>
  );
}
