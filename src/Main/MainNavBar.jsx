import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";


export default function NavigationBar({ onStudentLogin, onFacultyLogin, onAdminLogin }) {
  return (
    <div>
      
        <div className="navbar-container">
          <h3 className="navbar-logo">EduSupport</h3>
          <ul className="navbar-menu">
            <li className="navbar-item">
              <Link to="/">Home</Link>
            </li>
            <li className="navbar-item">
              <Link to="/about">About</Link>
            </li>
            <li className="navbar-item">
              <Link to="/contact">Contact</Link>
            </li>
            <li className="navbar-item">
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      
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
              onAdminLogin={onAdminLogin}
            />
          }
          exact
        />
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </div>
  );
}
