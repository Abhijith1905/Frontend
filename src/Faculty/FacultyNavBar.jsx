


import React , {useState} from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

import FacultyDashboard from "./FacultyDashboard";
import PortfolioCheck from "./PortfolioCheck";
import ProjectCheck from "./ProjectCheck";
import PortfolioCheck2 from "./PortfolioCheck2";
import FacultyHome from "./FacultyHome";
import Review from "./Review";
import ViewStudentProfile from './ViewStudentProfile';
import ProjectCheck2 from "./ProjectCheck2";
import ViewMyGivenFeedback from './ViewMyGivenReviews';
import ViewStudentsByFaculty from "./ViewStudentsByFaculty";
import StudentPortfolio from "./StudentPortfolio";
import ViewStudentPortfolio from "./ViewStudentPortfolio";
import FTopNavbar from "./FTopNavbar"; // Import the combined Navbar
import SidebarSection from "../Student/SideBarSection";
import SidebarNavLink from "../Student/SideBarNavLink";

import {
  FaHome,
  FaUser,
  FaFolderOpen,
  FaProjectDiagram,
  FaClipboardList,
  FaChalkboardTeacher,
  FaSignOutAlt,
} from "react-icons/fa";

export default function FacultyNavBar() {
  const navigate = useNavigate();
  const [sidebarHovered, setSidebarHovered] = useState(false);

  // Handle logout function
  const handleLogout = () => {
    localStorage.removeItem("isFacultyLoggedIn");
    localStorage.removeItem("faculty");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div>
      {/* Navbar includes the logout functionality */}
      <FTopNavbar onLogout={handleLogout} />

      <style>
        {`
          .sidebar {
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
            width: 260px;
            background: #f8fafc;
            box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            z-index: 1000;
            display: flex;
            flex-direction: column;
          }

          .sidebar:hover {
            width: 260px;
          }

          .sidebar:not(:hover) {
            width: 80px;
          }

          .sidebar-header {
            padding: 20px;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #e2e8f0;
          }

          .logo-container {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .logo-text {
            font-size: 1.25rem;
            font-weight: 600;
            color: #334155;
            opacity: 1;
            transition: opacity 0.3s ease;
          }

          .sidebar:not(:hover) .logo-text {
            opacity: 0;
            width: 0;
          }

          .sidebar-menu {
            padding: 20px 10px;
            flex: 1;
            overflow-y: auto;
          }

          .menu-item {
            display: flex;
            align-items: center;
            padding: 12px 16px;
            color: #64748b;
            text-decoration: none;
            border-radius: 12px;
            margin-bottom: 8px;
            transition: all 0.2s ease;
            gap: 12px;
            position: relative;
          }

          .menu-item:hover {
            background: #e2e8f0;
            color: #6A8EAE;
          }

          .menu-item .icon {
            min-width: 24px;
            color: #6A8EAE;
          }

          .menu-item .text {
            white-space: nowrap;
            opacity: 1;
            transition: opacity 0.3s ease;
          }

          .sidebar:not(:hover) .menu-item .text {
            opacity: 0;
            width: 0;
          }

          .section-heading {
            font-weight: bold;
            margin: 12px 0;
            color: #64748b;
            opacity: 1;
            visibility: visible;
            transition: opacity 0.3s ease, visibility 0s linear 0.3s;
          }

          .sidebar:not(:hover) .section-heading {
            opacity: 0;
            width: 0;
          }
        `}
      </style>

      <div
        className="sidebar"
        onMouseEnter={() => setSidebarHovered(true)}
        onMouseLeave={() => setSidebarHovered(false)}
      >
        <div className="sidebar-header">
          <div className="logo-container">
            <i className="logo-icon">Logo</i>
            <span className="logo-text">EduSupport</span>
          </div>
        </div>
        <div className="sidebar-container">
          <div className="flex-1 px-4 py-6 space-y-8 overflow-y-auto">
            <SidebarSection>
              <SidebarNavLink to="/facultyhome" icon={FaHome}>
                Home
              </SidebarNavLink>
              <SidebarNavLink to="/facultydashboard" icon={FaClipboardList}>
                Management Dashboard
              </SidebarNavLink>
            </SidebarSection>

            <SidebarSection>
              {sidebarHovered && (
                <div className="section-heading">Portfolio Management</div>
              )}
              <SidebarNavLink to="/viewstudentportfolio" icon={FaFolderOpen}>
                View Portfolios
              </SidebarNavLink>
            </SidebarSection>

            <SidebarSection>
              {sidebarHovered && (
                <div className="section-heading">Project Management</div>
              )}
              <SidebarNavLink to="/projectscheck" icon={FaProjectDiagram}>
                Project Check
              </SidebarNavLink>
            </SidebarSection>

            <SidebarSection>
              {sidebarHovered && (
                <div className="section-heading">Student Reviews</div>
              )}
              <SidebarNavLink to="/viewmygivenreviews" icon={FaChalkboardTeacher}>
                My Feedback
              </SidebarNavLink>
            </SidebarSection>

            
          </div>
        </div>
      </div>

      {/* Define routes */}
      <Routes>
        <Route path="/facultyhome" element={<FacultyHome />} exact />
        <Route path="/facultydashboard" element={<FacultyDashboard />} exact />
        <Route path="/portfoliocheck" element={<PortfolioCheck />} exact />
        <Route path="/projectscheck" element={<ProjectCheck />} exact />
        <Route path="/portfoliocheck2" element={<PortfolioCheck2 />} exact />
        <Route path="/review/:id" element={<Review />} exact />
        <Route path="/viewmygivenreviews" element={<ViewMyGivenFeedback />} exact />
        {/* <Route path="facultydashboard/student/add" element={<AddStudent />} exact /> */}
        <Route path="facultydashboard/student/viewall" element={<ViewStudentsByFaculty />} exact /> 
        <Route path="displaystudent/:id" element={<ViewStudentProfile />} />
        {/* <Route path="facultydashboard/student/update" element={<UpdateStudent />} exact /> */}
        <Route path="viewprojectbyfaculty/:id" element={<ProjectCheck2 />} />
        <Route path="viewstudentportfolio" element={<ViewStudentPortfolio />} />
        <Route path="displayportfolio/:id" element={<StudentPortfolio />} />
      </Routes>
    </div>
  );
}
