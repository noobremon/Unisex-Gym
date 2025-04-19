import Hero from "@/components/Hero";
import MembershipPlans from "@/components/MembershipPlans";
import ClassSection from "@/components/ClassSection";
import TrainerSection from "@/components/TrainerSection";
import FacilitySection from "@/components/FacilitySection";
import TestimonialSection from "@/components/TestimonialSection";
import ContactSection from "@/components/ContactSection";
import { useEffect } from "react";

const Home = () => {
  // Scroll to the top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        
        const id = target.getAttribute('href')?.substring(1);
        const element = document.getElementById(id || '');
        
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <main>
      <Hero />
      <MembershipPlans />
      <ClassSection />
      <TrainerSection />
      <FacilitySection />
      <TestimonialSection />
      <ContactSection />
    </main>
  );
};

export default Home;
