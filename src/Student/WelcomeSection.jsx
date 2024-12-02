import React from 'react';
import Button from './Button';

function WelcomeSection() {
  return (
    <div>
      <div className="content-container">
        <div >
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

        {/* Adjust both width and height */}
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
          alt="Students collaborating" 
          className="rounded-xl shadow-xl"
          style={{ width: '60%', height: 'auto' }} 
        />
      </div>
    </div>
  );
}

export default WelcomeSection;
