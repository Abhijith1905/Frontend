import React from "react";
import { Link,  Route,Routes , useNavigate } from "react-router-dom";
//import profile from './logo.svg'
import "./facultynavbar.css";
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
      <nav>
        <div className="navbar">
          <h3 style={{ fontSize: "20pt", color: "White", marginLeft: 0 }}>
            EduSupport
          </h3>
          <table className="menu">
            <td>
              <button>
                <Link to="/facultyhome">Home</Link>
              </button>
              &nbsp;&nbsp;
            </td>
            <td>
              <button>
                <Link to="/facultydashboard">Feedback</Link>
              </button>
              &nbsp;&nbsp;
            </td>
            <td>
              <button>
                {" "}
                <Link to="/facultydashboard">Students</Link>
              </button>
              &nbsp;&nbsp;
            </td>
            <td>
              <button onClick={handleLogout}>Logout</button>
            </td>
          </table>
        </div>
      </nav>

      <Routes>
      <Route path="/facultyhome" element={<FacultyHome />} exact />
        <Route path="/facultydashboard" element={<FacultyDashboard/>} exact />

      
        <Route path="/portfoliocheck" element={<PortfolioCheck/>} exact />
        <Route path="/projectscheck" element={<ProjectCheck />} exact />
        <Route path="/portfoliocheck2" element={<PortfolioCheck2 />} exact />
        <Route path="/review" element={<Review/>} exact />

       
      <Route path="facultydashboard/student/add" element={<AddStudent/>} exact />
        <Route path="facultydashboard/student/viewall" element={<ViewStudents />} exact />
        <Route path="displaystudent/:id" element={<ViewStudentProfile/>} />
        <Route path="facultydashboard/student/update" element={<UpdateStudent />} exact />
       
      </Routes>
    </div>
  );
}
