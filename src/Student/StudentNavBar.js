import React from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaFolderOpen,
  FaProjectDiagram,
  FaSignOutAlt,
} from "react-icons/fa";
import StudentProfile from "./StudentProfile";
import StudentPortfolio from "./StudentPortfolio";
import StudentProject from "./StudentProjects";
import MileStones from "./MilesStones";
import CreateProject from "./CreateProject";
import StudentHome from "./StudentHome";
import ViewAllProjects from "./ViewAllProjects";
import ViewProject from "./ViewProject";
import CreatePortfolio from "./CreatePortfolio";
import ViewPortfolio from "./ViewPortfolio";
import UploadMedia from "./UploadMedia";

export default function StudentNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isStudentLoggedIn");
    localStorage.removeItem("student");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div>
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

          /* Submenu */
          .submenu {
            display: none;
            flex-direction: column;
            padding-left: 20px;
          }

          .menu-item:hover .submenu {
            display: flex;
          }

          .submenu-item {
            color: #64748b;
            text-decoration: none;
            font-size: 0.8rem;
            padding: 4px 0;
          }

          .submenu-item:hover {
            background: #e2e8f0;
            color: #6A8EAE;
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

          .sidebar:not(:hover) .logout-btn span {
            opacity: 0;
            width: 0;
          }
        `}
      </style>

      <nav></nav>
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo-container">
            <i className="logo-icon">Logo</i>
            <span className="logo-text">EduSupport</span>
          </div>
        </div>
        <div className="sidebar-menu">
          <Link to="/studenthome" className="menu-item">
            <FaHome className="icon" /> <span className="text">Home</span>
          </Link>
          <Link to="/studentprofile" className="menu-item">
            <FaUser className="icon" /> <span className="text">Profile</span>
          </Link>

          {/* Portfolio Menu */}
          <div className="menu-item">
            <FaFolderOpen className="icon" />{" "}
            <span className="text">Portfolio</span>
            <div className="submenu">
              <Link to="/createportfolio" className="submenu-item">
                Create Portfolio
              </Link>
              <Link to="/viewportfolio" className="submenu-item">
                View Portfolio
              </Link>
              <Link to="/updateportfolio" className="submenu-item">
                Update Portfolio
              </Link>
              <Link to="/deleteportfolio" className="submenu-item">
                Delete Portfolio
              </Link>
            </div>
          </div>

          {/* Projects Menu */}
          <div className="menu-item">
            <FaProjectDiagram className="icon" />{" "}
            <span className="text">Projects</span>
            <div className="submenu">
              <Link to="/createproject" className="submenu-item">
                Create Project
              </Link>
              <Link to="/viewallprojects" className="submenu-item">
                View All Projects
              </Link>
              <Link to="/updateproject" className="submenu-item">
                Update Project
              </Link>
              <Link to="/deleteproject" className="submenu-item">
                Delete Project
              </Link>
            </div>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt className="icon" /> <span>Logout</span>
          </button>
        </div>
      </div>

      <Routes>
        <Route path="/studenthome" element={<StudentHome />} exact />
        <Route path="/studentprofile" element={<StudentProfile />} exact />
        <Route path="/portfolio" element={<StudentPortfolio />} exact />
        <Route path="/projects" element={<StudentProject />} exact />
        <Route path="/milestone" element={<MileStones />} exact />
        <Route path="/createproject" element={<CreateProject />} exact />
        <Route path="/viewallprojects" element={<ViewAllProjects />} exact />
        <Route path="/viewproject/:id" element={<ViewProject />} /> {/* Dynamic route */}
        <Route path="/uploadmedia/:id" element={<UploadMedia/>} />
        <Route path="/createportfolio" element={<CreatePortfolio />} exact />
        <Route path="/viewportfolio" element={<ViewPortfolio />} exact />
      </Routes>
    </div>
  );
}
