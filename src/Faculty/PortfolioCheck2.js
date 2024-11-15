import React from "react";
import { Link, useNavigate } from "react-router-dom";

const PortfolioCheck2 = () => {
  const navigate = useNavigate();

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
      maxWidth: "800px", // Max width for the outer container
    },
    heading: {
      color: "black",
    },
    main: {
      backgroundColor: "#ffffff", // White background for the main container
      borderRadius: "8px", // Rounded edges
      padding: "40px", // Increased padding inside the container
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", // Slight shadow for depth
      minHeight: "400px", // Increased minimum height of the main container
    },
    portfolioContainer: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "30px",
      gap: "20px",
    },
    portfolioCard: {
      backgroundColor: "#ffffff",
      padding: "20px",
      borderRadius: "8px",
      width: "30%", // Ensures all cards are of equal width
      minHeight: "220px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
      textAlign: "left",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    description: {
      fontSize: "14px",
      color: "#666666",
      marginBottom: "10px",
    },
    grade: {
      fontSize: "16px", // Font size for the grade
      color: "#003366", // Match your project's color scheme
      backgroundColor: "#C0C0C0", // Silver background for grades
      padding: "5px 10px",
      borderRadius: "5px",
      textAlign: "center",
      marginTop: "10px",
    },
    ungradedCard: {
      backgroundColor: "#0073e6", // Light blue for ungraded card
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "20px",
      borderRadius: "8px",
      minHeight: "220px",
      width: "30%", // Ensures all cards are of equal width
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    },
    button: {
      backgroundColor: "#d2b48c", // Light brown color for the button
      color: "black",
      border: "none",
      borderRadius: "5px",
      padding: "10px 15px",
      cursor: "pointer",
      marginTop: "10px", // Adjust margin to keep the button close to the content
      width: "100%", // Make button full width
      fontSize: "14px", // Standard font size for all buttons
      textDecoration: "none", // Remove underline from the link
      display: "inline-block", // Allow margin and padding to apply properly
      textAlign: "center", // Center text in the button
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "space-between", // Space between buttons
      marginTop: "20px", // Add some space above the buttons
    },
    portfolio: {
      display: "flex", // Use flexbox to align items side by side
      alignItems: "center", // Center items vertically
      marginTop: "20px", // Add some space above the portfolio
    },
    avatar: {
      width: "90%", // Full width of the container
      height: "100%", // Full height of the container
      objectFit: "cover", // Cover the entire area without distortion
    },
    text: {
      marginLeft: "20px", // Add some space between the image and text
      fontSize: "20px", // Font size for the text
      color: "#333333", // Text color
    },
  };

  return (
    <div>
      <nav>
      </nav>
      <div className="portfolio" style={{paddingTop:"120px"}}>
        <img src="image.png" alt="Avatar" style={styles.avatar} />
        <Link to="/review" style={styles.button}>
          Grade
        </Link>
      </div>
    </div>
  );
};

export default PortfolioCheck2;
