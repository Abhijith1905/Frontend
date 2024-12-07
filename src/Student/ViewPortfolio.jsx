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
import Projects from "./sections/Projects"; // Import the new Projects section
import AnimatedBackground from "./AnimatedBackground";
import ContentSection from "./ContentSection";
import "./animations.css";
import config from "../config";

export default function ViewAll({ onLogout }) {
  const [portfolioData, setPortfolioData] = useState(null);
  const [activeSection, setActiveSection] = useState("education");

  const storedStudentData = JSON.parse(localStorage.getItem("student"));
  const studentId = storedStudentData ? storedStudentData.id : "";

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await axios.get(
        `${config.url}/displayportfolio?studentId=${studentId}`
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
    Object.values(portfolioData).every((section) => section.length === 0);

  if (isPortfolioEmpty) {
    return <EmptyState />;
  }

  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  };

  return (
    <div>
      <Navigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        portfolioData={portfolioData}
        onLogout={onLogout}
      />

      <AnimatedBackground>
        <div className="flex flex-col min-h-screen w-full">
          {/* Main Content with proper spacing from fixed navigation */}
          <main className="flex-grow mt-32 px-4 pb-8">
            <div className="container mx-auto max-w-7xl">
              <AnimatePresence mode="wait">
                <motion.div key={activeSection} {...pageTransition}>
                  <ContentSection>
                    {activeSection === "education" && (
                      <Education
                        mydata={{
                          education: portfolioData.education,
                          portfolios: portfolioData.portfolios,
                        }}
                      />
                    )}
                    {activeSection === "skills" && (
                      <Skills data={portfolioData.skills} />
                    )}
                    {activeSection === "certifications" && (
                      <Certifications data={portfolioData.certifications} />
                    )}
                    {activeSection === "internships" && (
                      <Internships internship={portfolioData.internships} />
                    )}
                    {activeSection === "testimonials" && (
                      <Testimonials data={portfolioData.testimonials} />
                    )}
                    {activeSection === "projects" && (
                      <Projects data={portfolioData.projects} />
                    )}
                  </ContentSection>
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </div>
      </AnimatedBackground>
    </div>
  );
}
