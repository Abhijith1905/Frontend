import * as React from "react";
import "./../App.css"; // Ensure the correct path to your CSS file

export default function Home() {
  const styles = {
    content: {
      paddingTop: "100px",
      margin: 0, // Ensure no margin is applied to the body or content
      paddingBottom: 0, // Ensure no bottom padding is applied
      height: "100vh", // Ensure content stretches the full height of the viewport
    },
  };

  React.useEffect(() => {
    // Disable the scrollbars globally
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto"; // Re-enable scrollbars
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  return (
    <div style={styles.content}>
      <div className="content-container" style={{ marginBottom: 0 }}>
        <div className="text-content">
          <h2 style={{ color: "#4a4a75" }}>A GOAL</h2>
          <h2 style={{ color: "#4a4a75" }}>WITHOUT A PLAN</h2>
          <h2 style={{ color: "#4a4a75" }}>IS JUST A WISH</h2>
          <p style={{ color: "#4d4d4d" }}>
            EduSupport is a Portfolio and Project Management System which will
            enhance the academic experience of students by enabling them to
            showcase their projects and portfolios. The platform allows students
            to upload projects, including detailed descriptions and media. This
            makes it easier for students to present their work and achievements
            in an organized manner.
          </p>
          <center>
            <button className="get-started">Get Started</button>
          </center>
        </div>
        <img src="now.png" alt="Illustration" className="illustration1" style={{ marginBottom: "0" }} />
      </div>

      <footer className="footer" style={{ marginTop: 0, paddingTop: 0 }}>
        <div className="footer-content">
          <span>© 2024 EduSupport. All rights reserved.</span>
          <div className="footer-links">
            <span className="footer-link">Privacy Policy</span>
            <span className="footer-link">Terms of Service</span>
            <span className="footer-link">Contact Us</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
