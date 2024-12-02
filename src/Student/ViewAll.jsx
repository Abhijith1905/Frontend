import React, { useEffect, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import Navigation from "./Navigation";
import EmptyState from "./EmptyState";
import Education from "./sections/Education";
import Skills from "./sections/Skills";
import Certifications from "./sections/Certifications";
import Internships from "./sections/Internships";
import Testimonials from "./sections/Testimonials";
import AnimatedBackground from "./components/AnimatedBackground";
import ContentSection from "./components/ContentSection";
import "./styles/animations.css";

export default function ViewAll() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [activeSection, setActiveSection] = useState('education');

  const storedStudentData = JSON.parse(localStorage.getItem("student"));
  const studentId = storedStudentData ? storedStudentData.id : "";

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2025/displayportfolio?studentId=${studentId}`
        );
        setPortfolioData(response.data);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
        setPortfolioData(null);
      }
    };

    if (studentId) {
      fetchPortfolioData();
    }
  }, [studentId]);

  const isPortfolioEmpty = 
    !portfolioData || 
    Object.values(portfolioData).every(section => section.length === 0);

  if (isPortfolioEmpty) {
    return <EmptyState />;
  }

  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  };

  return (
    <AnimatedBackground>
      <div className="min-h-screen w-full">
        {/* Navigation Container */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navigation 
            activeSection={activeSection} 
            setActiveSection={setActiveSection} 
            portfolioData={portfolioData}
          />
        </div>
        
        {/* Main Content */}
        <main className="pt-[90px] px-4 pb-8">
          <div className="container mx-auto max-w-7xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                {...pageTransition}
              >
                <ContentSection>
                  {activeSection === 'education' && (
                    <Education mydata={{ education: portfolioData.education, portfolios: portfolioData.portfolios }} />
                  )}
                  {activeSection === 'skills' && <Skills data={portfolioData.skills} />}
                  {activeSection === 'certifications' && <Certifications data={portfolioData.certifications} />}
                  {activeSection === 'internships' && <Internships internship={portfolioData.internships} />}
                  {activeSection === 'testimonials' && <Testimonials data={portfolioData.testimonials} />}
                </ContentSection>
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </AnimatedBackground>
  );
}