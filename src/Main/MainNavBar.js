import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";

import "./navbar.css";


export default function MainNavBar({ onStudentLogin, onFacultyLogin }) {
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
                <Link to="/">Home</Link>
              </button>
              &nbsp;&nbsp;
            </td>
            <td>
              <button>
                {" "}
                <Link to="/about">About</Link>{" "}
              </button>
              &nbsp;&nbsp;
            </td>
            <td>
              <button>
                <Link to="/contact">Contact</Link>{" "}
              </button>
              &nbsp;&nbsp;
            </td>
            <td>
              <button>
                <Link to="/login">Login</Link>
              </button>
              &nbsp;&nbsp;
            </td>
          </table>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/about" element={<About />} exact />
        <Route path="/contact" element={<Contact />} exact />
        <Route
          path="/login"
          element={
            <Login
              onStudentLogin={onStudentLogin}
              onFacultyLogin={onFacultyLogin}
            />
          }
          exact
        />
         <Route path="*" element={<h2>Page Not found</h2>}/>
 
       
      </Routes>
    </div>
  );
}
