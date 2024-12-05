import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Award, Briefcase, Code2, MessageSquare, FileText, ArrowLeft, LogOut, Rocket } from 'lucide-react'; // Import Rocket icon
import PortfolioPDF from './PortfolioPDF';

const sections = [
  { key: 'education', icon: <GraduationCap className="w-5 h-5" />, title: 'Education', color: 'blue' },
  { key: 'certifications', icon: <Award className="w-5 h-5" />, title: 'Certifications', color: 'purple' },
  { key: 'internships', icon: <Briefcase className="w-5 h-5" />, title: 'Internships', color: 'green' },
  { key: 'skills', icon: <Code2 className="w-5 h-5" />, title: 'Skills', color: 'orange' },
  { key: 'testimonials', icon: <MessageSquare className="w-5 h-5" />, title: 'Testimonials', color: 'rose' },
  { key: 'projects', icon: <Rocket className="w-5 h-5" />, title: 'Projects', color: 'cyan' } // New Projects section
];
export default function Navigation({ activeSection, setActiveSection, portfolioData, onLogout }) {
  const navigate = useNavigate();
  const [showPDF, setShowPDF] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const handleBackFromPDF = () => {
    setShowPDF(false);
  };

  if (showPDF && portfolioData) {
    return (
      <div className="fixed inset-0 z-50 bg-white">
        <div className="h-[70px] bg-white shadow-md flex items-center px-4">
          <div className="absolute top-4 right-4">
            <button
              onClick={handleBackFromPDF}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Portfolio</span>
            </button>
          </div>
        </div>
        <div className="w-full h-[calc(100vh-70px)]">
          <PortfolioPDF portfolioData={portfolioData} />
        </div>
      </div>
    );
  }

  return (
    <nav className="h-[70px] bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto h-full flex items-center py-0 px-4">
        <div className="flex justify-between items-center gap-2 w-full">
          {/* Center buttons (Section buttons + Download button) */}
          <div className="flex gap-4 flex-grow justify-center">
            {sections.map((section) => (
              <button
                key={section.key}
                onClick={() => setActiveSection(section.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300
                  ${activeSection === section.key
                    ? `bg-${section.color}-100 text-${section.color}-600 shadow-md scale-105`
                    : 'hover:bg-gray-200'}`} // Changed hover to gray-200 for better visibility
              >
                {section.icon}
                <span className="font-medium hidden md:inline">{section.title}</span>
              </button>
            ))}
            {/* Download Button */}
            <button
              onClick={() => setShowPDF(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition-opacity"
            >
              <FileText className="w-5 h-5" />
              <span className="font-medium hidden md:inline">Download</span>
            </button>
          </div>

          {/* Right-side: Logout */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Logout Button */}
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:bg-red-600 transition-colors" // Changed text color to white
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 inline-block mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
