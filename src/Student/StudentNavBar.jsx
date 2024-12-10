import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import CreatePortfolio from "./CreatePortfolio";
import ViewPortfolio from "./ViewPortfolio";
import UpdatePortfolio from "./UpdatePortfolio";
import CreateProject from "./CreateProject";
import ViewAllProjects from "./ViewAllProjects";
import ViewFeedback from "./ViewFeedback";
import StudentHome from "./StudentHome";
import SidebarSection from "./SideBarSection";
import SidebarNavLink from "./SideBarNavLink";
import StudentProfile from './StudentProfile';
import STopNavbar from './STopNavBar';  // Import the combined Navbar
import ViewProject from './ViewProject';
import UploadMedia from './UploadMedia';
import DeleteProject from "./DeleteProject";


import {
  FaHome,
  FaUser,
  FaFolderOpen,
  FaProjectDiagram,
  FaBriefcase,
  FaClipboardList,
  FaUserPlus,
  FaEye,
  FaEdit,
} from "react-icons/fa";
import LogOutButton from "./LogOutButton";
import TrackProject from "./TrackProject";
import ViewPortfolioFeedback from "./PortfolioFeedback";



export default function StudentNavBar() {
  const navigate = useNavigate();
  const [sidebarHovered, setSidebarHovered] = useState(false);

  // Handle logout function
  const handleLogout = () => {
    localStorage.removeItem("isStudentLoggedIn");
    localStorage.removeItem("student");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div>
      {/* Navbar includes the logout functionality */}
      <STopNavbar onLogout={handleLogout} />
     

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

          .logout-btn {
            margin-top: 320px;
            padding: 12px;
            background: #fee2e2;
            color: #ef4444;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 12px;
            transition: all 0.2s ease;
          }

          .logout-btn:hover {
            background: #fecaca;
          }

          /* Headings visibility control */
          .section-heading {
            font-weight: bold;
            margin: 12px 0;
            color: #64748b;
            opacity: 1; /* Show by default */
            visibility: visible; /* Ensure visible */
            transition: opacity 0.3s ease, visibility 0s linear 0.3s; /* Smooth transition for opacity */
          }

          /* Hide headings when sidebar is collapsed */
          .sidebar:not(:hover) .section-heading {
            opacity: 0;
            width: 0;
          }
        `}
      </style>

      <div
        className="sidebar"
        onMouseEnter={() => setSidebarHovered(true)}  // On hover, show section headings
        onMouseLeave={() => setSidebarHovered(false)}  // On leave, hide section headings
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
              <SidebarNavLink to="/studenthome" icon={FaHome} className="sidebar-navlink">
                Dashboard
              </SidebarNavLink>
              <SidebarNavLink to="/studentprofile" icon={FaUser} className="sidebar-navlink">
                My Profile
              </SidebarNavLink>
            </SidebarSection>

            <SidebarSection>
              {sidebarHovered && <div className="section-heading">Portfolio Management</div>}
              <SidebarNavLink to="/createportfolio" icon={FaFolderOpen} className="sidebar-navlink">
                Create Portfolio
              </SidebarNavLink>
              <SidebarNavLink to="/viewportfolio" icon={FaEye} className="sidebar-navlink">
                View Portfolio
              </SidebarNavLink>
              <SidebarNavLink to="/updateportfolio" icon={FaEdit} className="sidebar-navlink">
                Update Portfolio
              </SidebarNavLink>
              <SidebarNavLink to="/viewportfoliofeedback" icon={FaUserPlus} className="sidebar-navlink">
                Portfolio Feedback
              </SidebarNavLink>
            </SidebarSection>

            <SidebarSection>
              {sidebarHovered && <div className="section-heading">Project Management</div>}
              <SidebarNavLink to="/createproject" icon={FaProjectDiagram} className="sidebar-navlink">
                Create Project
              </SidebarNavLink>
              <SidebarNavLink to="/viewallprojects" icon={FaClipboardList} className="sidebar-navlink">
                View All Projects
              </SidebarNavLink>
              <SidebarNavLink to="/viewprojectfeedback" icon={FaUserPlus} className="sidebar-navlink">
                Project Feedback
              </SidebarNavLink>
              <SidebarNavLink to="/deleteproject" icon={FaBriefcase} className="sidebar-navlink">
                Manage Projects
              </SidebarNavLink>
            </SidebarSection>
          </div>
        </div>
      </div>

      {/* Define routes for pages */}
      <Routes>
        <Route path="/studenthome" element={<StudentHome />} exact />
        <Route path="/studentprofile" element={<StudentProfile />} exact />
        <Route path="/createportfolio" element={<CreatePortfolio />} exact />
        <Route path="/viewportfolio" element={<ViewPortfolio onLogout={handleLogout} />} exact />
        <Route path="/updateportfolio" element={<UpdatePortfolio />} exact />
        <Route path="/createproject" element={<CreateProject />} exact />
        <Route path="/viewallprojects" element={<ViewAllProjects />} exact />
        <Route path="/viewproject/:id" element={<ViewProject />} exact />
        <Route path="/uploadmedia/:id" element={<UploadMedia />} exact />
        <Route path="/viewprojectfeedback" element={<ViewFeedback />} exact />
        <Route path="/viewportfoliofeedback" element={<ViewPortfolioFeedback />} exact />
        <Route path="/deleteproject" element={<DeleteProject />} exact />
        <Route path="/trackproject/:id" element= {<TrackProject/>} exact />
        <Route path="*" element={<StudentHome />} />
    
      </Routes>
    </div>
  );
}
