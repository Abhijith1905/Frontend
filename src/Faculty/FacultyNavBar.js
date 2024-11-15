import React from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaFolderOpen,
  FaProjectDiagram,
  FaSignOutAlt,
  FaClipboardList,
  FaUserPlus,
  FaEye,
  FaEdit,
} from "react-icons/fa";
import FacultyDashboard from "./FacultyDashboard";
import PortfolioCheck from "./PortfolioCheck";
import ProjectCheck from "./ProjectCheck";
import PortfolioCheck2 from "./PortfolioCheck2";
import FacultyHome from "./FacultyHome";
import Review from "./Review";
import AddStudent from "./AddStudent";
import ViewStudents from "./ViewStudents";
import UpdateStudent from "./UpdateStudents";
import ViewStudentProfile from './ViewStudentProfile';
import ProjectCheck2 from "./ProjectCheck2";
import ViewMyGivenFeedback from './ViewMyGivenReviews';

export default function FacultyNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isFacultyLoggedIn");
    localStorage.removeItem("faculty");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div>
       <nav> </nav>
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

          .sidebar:not(:hover) .logout-btn span {
            opacity: 0;
            width: 0;
          }
        `}
      </style>

      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo-container">
            <i className="logo-icon">Logo</i>
            <span className="logo-text">EduSupport</span>
          </div>
        </div>
        <div className="sidebar-menu">
          <Link to="/facultyhome" className="menu-item">
            <FaHome className="icon" /> <span className="text">Home</span>
          </Link>
          <Link to="/facultydashboard" className="menu-item">
            <FaClipboardList className="icon" /> <span className="text">Feedback</span>
          </Link>
         
          <Link to="/portfoliocheck" className="menu-item">
            <FaFolderOpen className="icon" /> <span className="text">Portfolio Check</span>
          </Link>
          <Link to="/projectscheck" className="menu-item">
            <FaProjectDiagram className="icon" /> <span className="text">Project Check</span>
          </Link>
          <Link to="/viewmygivenreviews" className="menu-item">
            <FaUser className="icon" /> <span className="text">My Feedback</span>
          </Link>
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt className="icon" /> <span>Logout</span>
          </button>
        </div>
      </div>

      <Routes>
        <Route path="/facultyhome" element={<FacultyHome />} exact />
        <Route path="/facultydashboard" element={<FacultyDashboard />} exact />
        <Route path="/portfoliocheck" element={<PortfolioCheck />} exact />
        <Route path="/projectscheck" element={<ProjectCheck />} exact />
        <Route path="/portfoliocheck2" element={<PortfolioCheck2 />} exact />
        <Route path="/review/:id" element={<Review />} exact />
        <Route path="/viewmygivenreviews" element={<ViewMyGivenFeedback />} exact />
        <Route path="facultydashboard/student/add" element={<AddStudent />} exact />
        <Route path="facultydashboard/student/viewall" element={<ViewStudents />} exact />
        <Route path="displaystudent/:id" element={<ViewStudentProfile />} />
        <Route path="facultydashboard/student/update" element={<UpdateStudent />} exact />
        <Route path="viewprojectbyfaculty/:id" element={<ProjectCheck2 />} />
        <Route path="*" element={<h2>Page Not found</h2>}/>
      </Routes>
    </div>
  );
}
