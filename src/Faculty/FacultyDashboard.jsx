import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./facultynavbar.css";

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const [showLinks, setShowLinks] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isFacultyLoggedIn");
    localStorage.removeItem("faculty");

    navigate("/login");
    window.location.reload();
  };

  const styles = {
    body: {
      fontFamily: "Arial, sans-serif",
      margin: 0,
      textAlign: "center",
      padding: "20px",
      minHeight: "100vh", // Ensures the body takes up full height
      display: "flex", // Flexbox
      justifyContent: "center", // Center horizontally
      alignItems: "center", // Center vertically
    },
    outerContainer: {
      marginTop: "40px", // Added margin to push the outer container down
      width: "100%", // Full width
      maxWidth: "900px", // Max width for the outer container
    },
    main: {
      backgroundColor: "#ffffff", // White background for the main container
      borderRadius: "8px", // Rounded edges
      padding: "40px", // Increased padding inside the container
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", // Slight shadow for depth
      minHeight: "400px", // Increased minimum height of the main container
    },
    managementOptions: {
      display: "flex",
      justifyContent: "space-between", // Use space between to add space between inner containers
      marginTop: "20px",
    },
    option: {
      backgroundColor: "#ffffff", // White
      borderRadius: "8px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
      padding: "30px", // Increased padding for inner containers
      width: "50%", // Increased width from 45% to 50%
      minHeight: "200px", // Increased minimum height for inner containers
      marginRight: "20px", // Add space between containers
    },
    highlighted: {
      backgroundColor: "#0073e6", // Light Blue for highlighted option
      color: "white",
    },
    button: {
      backgroundColor: "#d2b48c", // Light brown
      color: "black", // Change button text color to black
      border: "none",
      borderRadius: "5px",
      padding: "10px 15px",
      cursor: "pointer",
      marginTop: "10px", // Margin for spacing
    },
    heading: {
      color: "black", // Black color for headings
    },
    paragraph: {
      color: "black", // Black color for paragraph text
    },
    links: {
      display: showLinks ? "block" : "none", // Show links when hovered
      marginTop: "10px",
    },
    link: {
      display: "block",
      color: "#0073e6", // Link color
      textDecoration: "none",
      margin: "5px 0",
    },
    linkContainer: {
      position: "relative", // Make it a positioned container for absolute links
    },
  };

  return (
    <div>
      <div style={styles.body}>
        <div style={styles.outerContainer}>
          <main style={styles.main}>
            <h2 style={styles.heading}>MANAGEMENT</h2>
            <p style={styles.paragraph}>
              Challenges are what make life interesting, and overcoming them is what makes life meaningful.
            </p>
            <div style={styles.managementOptions}>
              <div style={styles.option}>
                <h3 style={styles.heading}>Student Management</h3>
                <p style={styles.paragraph}>
                  A comprehensive platform for managing flight operations, bookings,
                  and customer services within the airline industry.
                </p>
                <div 
                  style={styles.linkContainer}
                  onMouseEnter={() => setShowLinks(true)} // Show links on hover
                  onMouseLeave={() => setShowLinks(false)} // Hide links on mouse leave
                >
                  <button style={styles.button}>Enter</button>
                  {showLinks && (
                    <div style={styles.links}>
                      <Link to="student/viewall" style={styles.link}>View Students</Link>
                    </div>
                  )}
                </div>
              </div>
              <div style={{ ...styles.option, ...styles.highlighted }}>
                <h3 style={styles.heading}>Portfolios</h3>
                <p style={styles.paragraph}>
                  A dynamic solution for overseeing project planning, execution, and
                  performance across various portfolios in an organization.
                </p>
                <button style={styles.button}>
                  <Link to="/viewstudentportfolio" style={{ color: 'inherit', textDecoration: 'none' }}>
                    Provide Feedback
                  </Link>
                </button>
              </div>
              <div style={styles.option}>
                <h3 style={styles.heading}>Projects</h3>
                <p style={styles.paragraph}>
                  A centralized system that streamlines course enrollment, tracking
                  academic progress, and managing student information.
                </p>
                <button style={styles.button}>
                  <Link to="/projectscheck" style={{ color: 'inherit', textDecoration: 'none' }}>
                    Provide Feedback
                  </Link>
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
