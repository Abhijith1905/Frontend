import React, { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import {
  Home,
  User,
  FolderOpen,
  ClipboardList,
  FilePlus,
  List,
  Edit,
  Trash2,
  LogOut,
} from "lucide-react"; // Icon set

import AdminHome from "./AdminHome";
import AddStudent from "./AddStudent";
import AddStudentList from "./AddStudentList";
import ViewStudents from "./ViewStudents";
import UpdateStudent from "./UpdateStudents";
import AddFaculty from "./AddFaculty";
import AddFacultyList from "./AddFacultyList";
import ViewFaculty from "./ViewFaculty";
import UpdateFaculty from "./UpdateFaculty";
import ATopNavbar from "./ATopNavBar";
import ViewStudentById from './ViewStudentById';
import FacultyStudentMap from './FacultyStudentMap';
import ViewMapping from './ViewMapping';

const AdminNavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    localStorage.removeItem("admin");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div>
       <ATopNavbar onLogout={handleLogout} />
      <div className="sidebar">
      <div className="logo-container">
            <i className="logo-icon">Logo</i>
            <span className="logo-text">EduSupport</span>
          </div>
        <div className="sidebar-container">
          <div className="menu-section">
            <Link style={{paddingTop:"40px"}} to="/adminhome" className="menu-item">
              <Home className="icon" />
              <span>Home</span>
            </Link>
           
          </div>

          {/* Student Management Section */}
          <div className="menu-section">
            <div className="section-heading">Student Management</div>
            <Link to="admindashboard/student/add" className="menu-item">
              <FilePlus className="icon" />
              <span>Add Student</span>
            </Link>
            <Link to="admindashboard/student/addstudentlist" className="menu-item">
              <List className="icon" />
              <span>Add Student List</span>
            </Link>
            <Link to="admindashboard/student/viewall" className="menu-item">
              <User className="icon" />
              <span>View Students</span>
            </Link>
            <Link to="admindashboard/student/update" className="menu-item">
              <Edit className="icon" />
              <span>Update Student</span>
            </Link>
            <Link to="admindashboard/student/viewall" className="menu-item">
              <Trash2 className="icon" />
              <span>Delete Student</span>
            </Link>
          </div>

          {/* Faculty Management Section */}
          <div className="menu-section">
            <div className="section-heading">Faculty Management</div>
            <Link to="admindashboard/faculty/add" className="menu-item">
              <FilePlus className="icon" />
              <span>Add Faculty</span>
            </Link>
            <Link to="admindashboard/faculty/addfacultylist" className="menu-item">
              <List className="icon" />
              <span>Add Faculty List</span>
            </Link>
            <Link to="admindashboard/faculty/viewall" className="menu-item">
              <User className="icon" />
              <span>View Faculty</span>
            </Link>
            <Link to="admindashboard/faculty/update" className="menu-item">
              <Edit className="icon" />
              <span>Update Faculty</span>
            </Link>
            <Link to="admindashboard/faculty/viewall" className="menu-item">
              <Trash2 className="icon" />
              <span>Delete Faculty</span>
            </Link>
          </div>

          <div className="menu-section">
            <div className="section-heading">Student Faculty Mapping</div>
            <Link to="/facultystudentmapper" className="menu-item">
              <FilePlus className="icon" />
              <span>Map Student-Faculty</span>
            </Link>
            <Link to="/viewfacultystudentmapping" className="menu-item">
              <List className="icon" />
              <span>View Student-Faculty Mapping</span>
            </Link>
            
          </div>



          {/* Logout Button */}
          {/* <div>
            <button className="logout-btn" onClick={handleLogout}>
              <LogOut className="icon" />
              <span>Logout</span>
            </button>
          </div> */}
        </div>
      </div>

      {/* Routes */}
      <div className="content">
        <Routes>
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="admindashboard/student/add" element={<AddStudent />} />
          <Route path="admindashboard/student/addstudentlist" element={<AddStudentList />} />
          <Route path="admindashboard/student/viewall" element={<ViewStudents />} />
          <Route path="admindashboard/student/update" element={<UpdateStudent />} />
          <Route path="admindashboard/faculty/add" element={<AddFaculty />} />
          <Route path="admindashboard/faculty/addfacultylist" element={<AddFacultyList />} />
          <Route path="admindashboard/faculty/viewall" element={<ViewFaculty />} />
          <Route path="admindashboard/faculty/update" element={<UpdateFaculty />} />

          <Route path="displaystudentbyid/:id" element={<ViewStudentById/>} />

          <Route path="/facultystudentmapper" element={<FacultyStudentMap />} />
          <Route path="/viewfacultystudentmapping" element={<ViewMapping />} />

          
        </Routes>
      </div>

      {/* Styles */}
      <style>{`
        .sidebar {
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          width: 250px;
          background: #ffffff;
          box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
          overflow-y: hidden;
          display: flex;
          flex-direction: column;
        }

        .sidebar-container {
          flex: 1;
          overflow-y: auto;
          padding: 10px;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }

        .sidebar-container::-webkit-scrollbar {
          display: none; /* Chrome, Safari, and Opera */
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          padding: 10px;
        }

        .logo {
          width: 40px;
          height: 40px;
        }

        .title {
          margin-left: 10px;
          font-size: 18px;
          font-weight: bold;
        }

        .menu-section {
          margin-top: 20px;
        }

        .menu-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 5px;
          color: #333;
          text-decoration: none;
          transition: background-color 0.2s;
        }

        .menu-item:hover {
          background: #e2e6ea;
        }

        .section-heading {
          font-weight: bold;
          margin: 10px 0;
          color: #64748b;
        }

        .logout-btn {
          margin-top: auto;
          padding: 8px;
          background: #ffeded;
          color: #d32f2f;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .logout-btn:hover {
          background: #ffcccc;
        }

        .content {
          margin-left: 250px;
          padding: 20px;
        }
      `}</style>
    </div>
  );
};

export default AdminNavBar;
