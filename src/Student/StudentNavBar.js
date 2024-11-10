import React from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "./studentnavbar.css";
import StudentProfile from "./StudentProfile";
import StudentPortfolio from "./StudentPortfolio";
import StudentProject from "./StudentProjects";
import MileStones from "./MilesStones";
import UploadProjectFurther from "./UploadProjectFurther";
import CreateProject from "./CreateProject";
import StudentHome from "./StudentHome";
import ViewAllProjects from "./ViewAllProjects";

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
      {/* Navbar */}
      <nav>
        <div className="navbar">
          <h3 style={{ fontSize: "20pt", color: "White", marginLeft: 0 }}>
            EduSupport
          </h3>
          <table className="menu">
            <td>
              <button>
                <Link to="/studenthome">Home</Link>
              </button>
              &nbsp;&nbsp;
            </td>
            <td>
              <button>
                <Link to="/studentprofile">Profile</Link>
              </button>
              &nbsp;&nbsp;
            </td>
            <td>
              <button>
                <Link to="/portfolio">Portfolio</Link>
              </button>
              &nbsp;&nbsp;
            </td>
            <td>
              <button>
                {" "}
                <Link to="/projects">Projects</Link>
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
        <Route path="/studenthome" element={<StudentHome />} exact />
        <Route path="/studentprofile" element={<StudentProfile />} exact />
        <Route path="/portfolio" element={<StudentPortfolio />} exact />
        <Route path="/projects" element={<StudentProject />} exact />
        <Route path="/milestone" element={<MileStones />} exact />
        <Route path="/createproject" element={<CreateProject />} exact />
        <Route path="/viewallprojects" element={<ViewAllProjects />} exact />
        <Route
          path="/uploadprojectfurther"
          element={<UploadProjectFurther />}
          exact
        />
      </Routes>
    </div>
  );
}
