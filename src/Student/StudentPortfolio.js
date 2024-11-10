import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function StudentPortfolio() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isStudentLoggedIn");
    localStorage.removeItem("student");
    navigate("/login");
    window.location.reload();
  };
  return (
    <div>
     

      <div className="portfolio">
        <h2>Portfolio</h2>
        <img
          src="image.png"
          alt="Avatar"
          style={{
            width: "90%", // Full width of the container
            height: "100%", // Full height of the container
            objectFit: "cover", // Cover the entire area without distortion
            position: "absolute", // Ensure it is positioned absolutely
            top: 0, // Align to top
            left: 0, // Align to left
          }}
        />
      </div>
    </div>
  );
}

