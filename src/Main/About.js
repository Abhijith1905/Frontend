import * as React from "react";
import "./../App.css"; // Ensure the correct path to your CSS file

export default function Home() {
  return (
    <div className="content">
      <h2 style={{ fontWeight: "500" }}>About Us</h2>

      <center>
        <span style={{ fontSize: "15px" }}>
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
          <h2>A GOAL</h2>
          <h2>WITHOUT A PLAN</h2>
          <h2>IS JUST A WISH</h2>
          <p>
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
        <img src="B.png" alt="Illustration" className="illustration2" />
      </div>
    </div>
  );
}
