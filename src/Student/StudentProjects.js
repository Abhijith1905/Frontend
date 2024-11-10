import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function StudentProject() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isStudentLoggedIn");
    localStorage.removeItem("student");
    navigate("/login");
    window.location.reload();
  };

  const projects = [
    {
      projectNumber: 1,
      description:
        "The project was delivered on time and meets expectations. Next time, try to be more proactive with stakeholder communication to avoid last-minute changes.",
      score: "8.5",
      grade: "Good",
      status: "Graded",
    },
    {
      projectNumber: 2,
      description:
        "Amazing use of technology and tools to bring your vision to life. To further enhance the project, consider integrating more performance metrics to evaluate success.",
      score: "9.5",
      grade: "Excellent",
      status: "Graded",
    },
    {
      projectNumber: 3,
      description: "", // No description for the ungraded project
      score: "", // No score for the ungraded project
      grade: "Yet to be graded",
      status: "Not Graded",
    },
  ];

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
      maxWidth: "800px", // Max width for the outer container
    },
    main: {
      backgroundColor: "#ffffff", // White background for the main container
      borderRadius: "8px", // Rounded edges
      padding: "40px", // Increased padding inside the container
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", // Slight shadow for depth
      minHeight: "400px", // Increased minimum height of the main container
    },
    projectContainer: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "30px", // Increase spacing between the project cards and title
      gap: "20px", // Add gap for better spacing between project cards
    },
    projectCard: {
      backgroundColor: "#ffffff",
      padding: "20px",
      borderRadius: "8px",
      width: "30%", // Keep it proportional and compact
      minHeight: "220px", // Increased minimum height for space for the button
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)", // Shadow for depth
      textAlign: "left",
      display: "flex",
      flexDirection: "column", // Stack elements vertically
      justifyContent: "space-between", // Space them evenly
    },
    highlighted: {
      backgroundColor: "#0073e6", // Blue background for ungraded project
      color: "white",
    },
    profileIcon: {
      fontSize: "40px",
      textAlign: "center",
      marginBottom: "10px",
    },
    description: {
      fontSize: "14px",
      color: "#666666",
      marginBottom: "10px", // Reduced margin between text and bottom
    },
    gradeSection: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: "16px",
      marginBottom: "5px", // Reduced bottom margin
    },
    score: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#003366",
    },
    grade: {
         fontSize: "16px",
        color: "#003366", // Match your project's color scheme
        backgroundColor: "#C0C0C0",
        borderRadius: "5px",
        padding: "10px 15px",
        width: "100%",
    },
    gradeHighlighted: {
        width: "100%",
         fontSize: "16px",
        color: "#003366", // Match your project's color scheme
        backgroundColor: "#C0C0C0",
    },
    status: {
      fontSize: "14px",
      color: "#333333",
      textAlign: "center",
      marginTop: "10px",
      backgroundColor: "#DCE3F2",
      padding: "5px 0",
      borderRadius: "4px",
    },
    statusLabel: {
      fontSize: "14px",
      fontWeight: "bold",
      color: "white", // Change text color to white for better contrast
      marginTop: "5px",
    },
    button: {
      backgroundColor: "#d2b48c",
      color: "black",
      border: "none",
      borderRadius: "5px",
      padding: "10px 15px",
      cursor: "pointer",
      marginTop: "10px", // Adjust margin to keep the button close to the content
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "space-between", // Space between buttons
      marginTop: "20px", // Add some space above the buttons
    },
    heading: {
      color: "black", // Black color for headings
    },
    h3: {
      color: "black", // Ensure project number stays black even on highlighted cards
    },
  };

  return (
    <div>
    

      <div style={styles.body}>
        <div style={styles.outerContainer}>
          <main style={styles.main}>
            <h2 style={styles.heading}>Project Dashboard</h2>
            <div style={styles.projectContainer}>
              {projects.map((project, index) => (
                <div
                  key={index}
                  style={
                    project.status === "Not Graded"
                      ? { ...styles.projectCard, ...styles.highlighted }
                      : styles.projectCard
                  }
                >
                  <h3 style={styles.h3}>Project {project.projectNumber}</h3>{" "}
                  {/* Ensure project number remains black */}
                  {/* Conditionally render the description only if the project is graded */}
                  {project.status === "Graded" ? (
                    <p style={styles.description}>{project.description}</p>
                  ) : (
                    <div style={styles.statusLabel}>
                      Status: Will be graded soon {/* Display status label */}
                    </div>
                  )}
                  <div style={styles.gradeSection}>
                    <button
                      style={
                        project.status === "Not Graded"
                          ? styles.gradeHighlighted
                          : styles.grade
                      }
                    >
                      {project.grade}
                    </button>
                  </div>
                  <button style={styles.button}>{project.status}</button>{" "}
                  {/* Add button for graded status */}
                </div>
              ))}
            </div>
            {/* Flex container for buttons */}
            <div style={styles.buttonContainer}>
              <button style={styles.button}>
                <Link
                  to="/milestone"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Track Milestones
                </Link>
              </button>
              <button style={styles.button}>
                <Link
                  to="/createproject"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Create New Project
                </Link>
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
