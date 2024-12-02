import * as React from "react";
import "./../App.css"; // Ensure the correct path to your CSS file

export default function About() {
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
    <div className="content">
      <h2 style={{ color: "#4a4a75" , fontWeight: "500" }}>About Us</h2>

      <center>
        <span style={{ color: "#4d4d4d",  fontSize: "15px" }}>
          Plans are only good intentions unless they immediately degenerate into
          hard work
        </span>
      </center>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div className="content-container">
        <div className="text-content">
          <h2 style={{ color: "#4a4a75" }}>A GOAL</h2>
          <h2 style={{ color: "#4a4a75" }}>WITHOUT A PLAN</h2>
          <h2 style={{ color: "#4a4a75" }}>IS JUST A WISH</h2>
          <p  style={{ color: "#4d4d4d" }}>
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
        <img src="A.png" alt="Illustration" className="illustration2" />
        <img src="A.png" alt="Illustration" className="illustration2" />
      </div>
    </div>
  );
}
