import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [showStudentLinks, setShowStudentLinks] = useState(false);
  const [showFacultyLinks, setShowFacultyLinks] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    localStorage.removeItem("admin");

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
      maxWidth: "1000px", // Max width for the outer container
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
      justifyContent: "space-between", // Increased spacing between the options
      marginTop: "20px",
      flexWrap: "wrap", // Allow elements to wrap on smaller screens
      gap: "20px", // Add gap between the options
    },
    option: {
      backgroundColor: "#ffffff", // White
      borderRadius: "8px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
      padding: "30px", // Increased padding for inner containers
      width: "48%", // Increased width for each option
      minHeight: "250px", // Increased minimum height for inner containers
      boxSizing: "border-box",
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
      display: "block", // Show links always when hovering over respective option
      marginTop: "10px",
    },
    link: {
      display: "block",
      color: "#0073e6", // Link color
      textDecoration: "none",
      margin: "5px 0",
    },
  };

  return (
    <div>
      <nav> </nav>
      <div style={styles.body}>
        <div style={styles.outerContainer}>
          <main style={styles.main}>
            <h2 style={styles.heading}>MANAGEMENT</h2>
            <p style={styles.paragraph}>
              Challenges are what make life interesting, and overcoming them is
              what makes life meaningful.
            </p>

            <div style={styles.managementOptions}>
              {/* Student Management */}
              <div
                style={styles.option}
                onMouseEnter={() => setShowStudentLinks(true)} // Show links on hover
                onMouseLeave={() => setShowStudentLinks(false)} // Hide links on mouse leave
              >
                <h3 style={styles.heading}>Student Management</h3>
                <p style={styles.paragraph}>
                  A comprehensive platform for managing student operations.
                </p>
                <button style={styles.button}>Enter</button>
                {showStudentLinks && (
                  <div style={styles.links}>
                    <Link to="student/add" style={styles.link}>
                      Add Student
                    </Link>
                    <Link to="student/viewall" style={styles.link}>
                      View Students
                    </Link>
                    <Link to="student/update" style={styles.link}>
                      Update Student
                    </Link>
                    <Link to="student/viewall" style={styles.link}>
                      Delete Students
                    </Link>
                  </div>
                )}
              </div>

              {/* Faculty Management */}
              <div
                style={styles.option}
                onMouseEnter={() => setShowFacultyLinks(true)} // Show links on hover
                onMouseLeave={() => setShowFacultyLinks(false)} // Hide links on mouse leave
              >
                <h3 style={styles.heading}>Faculty Management</h3>
                <p style={styles.paragraph}>
                  A comprehensive platform for managing faculty operations.
                </p>
                <button style={styles.button}>Enter</button>
                {showFacultyLinks && (
                  <div style={styles.links}>
                    <Link to="faculty/add" style={styles.link}>
                      Add Faculty
                    </Link>
                    <Link to="faculty/viewall" style={styles.link}>
                      View Faculty
                    </Link>
                    <Link to="faculty/update" style={styles.link}>
                      Update Faculty
                    </Link>
                    <Link to="faculty/viewall" style={styles.link}>
                      Delete Faculty
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
