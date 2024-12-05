import React, { useEffect, useState } from "react";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import Navigation from "../Student/Navigation";


import EmptyPortfolio from "./EmptyPortfolio";


import Education from "../Student/sections/Education";
import Skills from "../Student/sections/Skills";
import Certifications from "../Student/sections/Certifications";
import Internships from "../Student/sections/Internships";
import Testimonials from "../Student/sections/Testimonials";
import { useParams } from 'react-router-dom';

export default function StudentPortfolio({ onLogout }) {
  const [portfolioData, setPortfolioData] = useState(null);
  const [activeSection, setActiveSection] = useState('education');

  const { id } = useParams();

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2025/displaystudentportfolio?studentId=${id}`
        );
        setPortfolioData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
        setPortfolioData(null);
      }
    };

    if (id) {
      fetchPortfolioData();
    }
  }, [id]);

  const isPortfolioEmpty = 
    !portfolioData || 
    Object.values(portfolioData).every(section => section.length === 0);

  if (isPortfolioEmpty) {
    return <EmptyPortfolio />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
     <Navigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      
        onLogout={onLogout}
      />


      <main className="pt-24 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
          {activeSection === 'education' && (<Education mydata={{ education: portfolioData.education, portfolios: portfolioData.portfolios }} />)}
            {activeSection === 'skills' && <Skills data={portfolioData.skills} />}
            {activeSection === 'certifications' && <Certifications data={portfolioData.certifications} />}
            {activeSection === 'internships' && <Internships internship={portfolioData.internships} />}
            {activeSection === 'testimonials' && <Testimonials data={portfolioData.testimonials} />}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}