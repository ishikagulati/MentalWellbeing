import React from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import AboutSection from "../../components/AboutSection/AboutSection.jsx";
import HeroSection from "../../components/HeroSection/HeroSection.jsx";
import TestSection from "../../components/TestSection/TestSection.jsx";
import ResourcesSection from "../../components/ResourcesSection/ResourcesSection.jsx";
import SubscriptionSection from "../../components/SubscriptionSection/SubscriptionSection.jsx";
import FAQSection from "../../components/FAQSection/FAQSection.jsx";

const HomePage = () => {
  return (
    <div>
      <Navbar isHomePage={true} />
      <HeroSection />
      <AboutSection />
      <TestSection />
      <ResourcesSection />
      <SubscriptionSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default HomePage;