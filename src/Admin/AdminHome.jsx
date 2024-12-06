import React from "react";


export default function AdminHome() {

  const styles = {
    content: {
      paddingTop: "100px",
    }
  }


  return (
    <div>
     

      <div style={styles.content}>
      <div className="content-container">
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
        <img src="now.png" alt="Illustration" className="illustration1" />
      </div>
      </div>
      <footer className="footer">
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
