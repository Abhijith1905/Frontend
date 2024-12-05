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
import AdminHome from "./AdminHome";
import FacultyStudentMap from "./FacultyStudentMap";
import ViewMapping from "./ViewMapping";
import AdminDashboard from "./AdminDashboard";
import AddStudent from "./AddStudent";
import ViewStudents from "./ViewStudents";
import UpdateStudent from "./UpdateStudents";
import ViewStudentById from "./ViewStudentById";
import ViewFaculty from "./ViewFaculty";

import AddFaculty from "./AddFaculty";
import UpdateFaculty from "./UpdateFaculty";
import ViewAllFeedback from './ViewAllFeedback';
import AddStudentList from "./AddStudentList";
import AddFacultyList from "./AddFacultyList";

export default function AdminNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    localStorage.removeItem("admin");
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
          <Link to="/adminhome" className="menu-item">
            <FaHome className="icon" /> <span className="text">Home</span>
          </Link>
          <Link to="/admindashboard" className="menu-item">
            <FaClipboardList className="icon" />{" "}
            <span className="text">Dashboard</span>
          </Link>

          <Link to="/facultystudentmapper" className="menu-item">
            <FaFolderOpen className="icon" />{" "}
            <span className="text">Map Faculty-Student</span>
          </Link>
          <Link to="/viewfacultystudentmapping" className="menu-item">
            <FaProjectDiagram className="icon" />{" "}
            <span className="text">View Faculty-Student</span>
          </Link>
          <Link to="/viewreviews" className="menu-item">
            <FaUser className="icon" />{" "}
            <span className="text">My Feedback</span>
          </Link>
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt className="icon" /> <span>Logout</span>
          </button>
        </div>
      </div>

      <Routes>
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/facultystudentmapper" element={<FacultyStudentMap />} />
        <Route path="/viewfacultystudentmapping" element={<ViewMapping />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route
          path="admindashboard/student/add"
          element={<AddStudent />}
          exact
        />
         <Route
          path="admindashboard/student/addstudentlist"
          element={<AddStudentList />}
          exact
        />
         <Route
          path="admindashboard/faculty/addfacultylist"
          element={<AddFacultyList />}
          exact
        />
        <Route
          path="admindashboard/student/viewall"
          element={<ViewStudents />}
          exact
        />
        <Route
          path="admindashboard/student/update"
          element={<UpdateStudent />}
          exact
        />
         <Route path="displaystudentbyid/:id" element={<ViewStudentById/>} />

         <Route
          path="admindashboard/faculty/add"
          element={<AddFaculty />}
          exact
        />
        <Route
          path="admindashboard/faculty/viewall"
          element={<ViewFaculty />}
          exact
        />
        <Route
          path="admindashboard/faculty/update"
          element={<UpdateFaculty />}
          exact
        />

        <Route path="/viewreviews" element={<ViewAllFeedback />} />
      </Routes>
    </div>
  );
}
