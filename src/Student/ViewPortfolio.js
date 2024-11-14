import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from 'framer-motion';
import { GraduationCap, Award, Briefcase, Code2, MessageSquare } from 'lucide-react';
import { AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';

export default function ViewPortfolio() {
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
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
        setPortfolioData(null); // Set null in case of error
      }
    };

    if (studentId) {
      fetchPortfolioData();
    }
  }, [studentId]);

  const sections = [
    {
      key: 'education',
      icon: <GraduationCap className="w-5 h-5" />,
      title: 'Education',
      color: 'blue',
    },
    {
      key: 'certifications',
      icon: <Award className="w-5 h-5" />,
      title: 'Certifications',
      color: 'purple',
    },
    {
      key: 'internships',
      icon: <Briefcase className="w-5 h-5" />,
      title: 'Internships',
      color: 'green',
    },
    {
      key: 'skills',
      icon: <Code2 className="w-5 h-5" />,
      title: 'Skills',
      color: 'orange',
    },
    {
      key: 'testimonials',
      icon: <MessageSquare className="w-5 h-5" />,
      title: 'Testimonials',
      color: 'rose',
    },
  ];

  const isPortfolioEmpty = 
    !portfolioData || 
    (portfolioData.education.length === 0 &&
    portfolioData.certifications.length === 0 &&
    portfolioData.internships.length === 0 &&
    portfolioData.skills.length === 0 &&
    portfolioData.testimonials.length === 0);

  if (isPortfolioEmpty) {
    return (
      <div className="content">
        <div className="min-h-screen bg-gray-100">
          <div className="max-w-7xl mx-auto py-8 text-center">
            <h2 className="text-2xl font-bold text-gray-600 mb-4">You haven't designed your portfolio yet.</h2>
            <Link
              to="/createportfolio"
              className="text-blue-600 hover:underline font-medium"
            >
              Click here to design your portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="content">
      <div className="min-h-screen bg-gray-100">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
          <div className="max-w-7xl mx-auto py-4">
            <div className="flex justify-center items-center px-4 custom-button-spacing">
              {sections.map((section) => (
                <button
                  key={section.key}
                  onClick={() => setActiveSection(section.key)}
                  className={`relative px-6 py-2 rounded-full transition-all duration-200 ease-in-out 
                    ${activeSection === section.key
                      ? `bg-${section.color}-100 text-${section.color}-600`
                      : 'hover:bg-gray-100'
                    }`}
                >
                  <div className="flex items-center space-x-2">
                    {section.icon}
                    <span className="font-medium">{section.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Content Container */}
        <main className="pt-24 px-4 pb-8">
          <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-8">
            <AnimatePresence mode="wait">
              {/* Education Section */}
              {activeSection === 'education' && (
                <motion.div
                  key="education"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="beautiful-container"
                >
                  <div className="col-span-full text-center">
                    <h2 className="text-2xl font-bold text-blue-600 mb-4">Education</h2>
                  </div>
                  {portfolioData.education.map((edu, index) => (
                    <div
                      key={index}
                      className="bg-blue-50 rounded-xl p-6 border border-blue-100"
                    >
                      <h3 className="text-xl font-bold text-blue-800 mb-2">
                        {edu.educationInstitution}
                      </h3>
                      <p className="text-blue-600">{edu.educationDegree}</p>
                      <div className="mt-4 flex items-center text-sm">
                        <span style={{ color: '#3b82f6' }}>{new Date(edu.educationStartDate).toLocaleDateString()}</span>
                        <span className="mx-2">→</span>
                        <span style={{ color: '#3b82f6' }}>{new Date(edu.educationEndDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Certifications Section */}
              {activeSection === 'certifications' && (
                <motion.div
                  key="certifications"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="beautiful-container"
                >
                  <div className="col-span-full text-center">
                    <h2 className="text-2xl font-bold text-purple-600 mb-4">Certifications</h2>
                  </div>
                  {portfolioData.certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="bg-purple-50 rounded-xl p-6 border border-purple-100"
                    >
                      <h3 className="text-xl font-bold text-purple-800 mb-2">
                        {cert.certificationName}
                      </h3>
                      <p className="text-purple-600">{cert.certificationIssuer}</p>
                      <div className="mt-4 space-y-1 text-sm text-purple-500">
                        <p style={{ color: '#3b82f6' }}>Issued: {cert.certificationDate}</p>
                        {cert.expirationDate && <p style={{ color: '#3b82f6' }}>Expires: {cert.expirationDate}</p>}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Internships Section */}
              {activeSection === 'internships' && (
                <motion.div
                  key="internships"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="beautiful-container"
                >
                  <div className="col-span-full text-center">
                    <h2 className="text-2xl font-bold text-green-600 mb-4">Internships</h2>
                  </div>
                  {portfolioData.internships.map((internship, index) => (
                    <div
                      key={index}
                      className="bg-green-50 rounded-xl p-6 border border-green-100"
                    >
                      <h3 className="text-xl font-bold text-green-800 mb-2">
                        {internship.companyName}
                      </h3>
                      <p className="text-green-600">{internship.role}</p>
                      <div className="mt-4 flex items-center text-sm text-green-500">
                        <span style={{ color: '#3b82f6' }}>{internship.startDate}</span>
                        <span className="mx-2">→</span>
                        <span style={{ color: '#3b82f6' }}>{internship.endDate}</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Skills Section */}
              {activeSection === 'skills' && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="beautiful-container"
                >
                  <div className="col-span-full text-center">
                    <h2 className="text-2xl font-bold text-orange-600 mb-4">Skills</h2>
                  </div>
                  {portfolioData.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="bg-orange-50 rounded-xl p-6 border border-orange-100"
                    >
                      <h3 className="text-lg font-bold text-orange-800 mb-3">
                        {skill.skillName}
                      </h3>
                      <div className="mt-2">
                        <div className="w-full bg-orange-200 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: `${skill.skillProficiency}%`,
                              transition: { duration: 1 }
                            }}
                            className="bg-orange-600 h-2 rounded-full"
                          />
                        </div>
                        <span className="text-xs text-gray-500 mt-2 block text-right">{skill.skillProficiency}%</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Testimonials Section */}
              {activeSection === 'testimonials' && (
                <motion.div
                  key="testimonials"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="beautiful-container"
                >
                  <div className="col-span-full text-center">
                    <h2 className="text-2xl font-bold text-rose-600 mb-4">Testimonials</h2>
                  </div>
                  {portfolioData.testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className="bg-rose-50 rounded-xl p-6 border border-rose-100"
                    >
                      <h3 className="text-xl font-bold text-rose-800 mb-2">
                        {testimonial.recommendationProvider}
                      </h3>
                      <p className="text-rose-600">{testimonial.testimonialText}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
