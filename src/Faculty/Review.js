import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./../Student/studentnavbar.css"

const Review = () => {
  const { id } = useParams(); // Retrieve project ID from URL
  const navigate = useNavigate();

  
  const facultyData = JSON.parse(localStorage.getItem("faculty"));
   
  // console.log(facultyData.id);
  const fid = facultyData ? facultyData.id : null; // Ensure fid is available

  const [formData, setFormData] = useState({
    rating: "",
    comments: "",
  });
  const [message, setMessage] = useState(""); // For displaying messages

  // Handle change for rating and comments
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

     console.log(id);
    const projectFeedback = {
      facultyId: fid,                // Faculty ID
     projectid : Number(id),// Convert id to a number using unary plus
// Project ID
      rating: parseInt(formData.rating), // Rating (converted to int)
      comments: formData.comments,     // Comments
      dateSubmitted: new Date(),      // Current date
    };
    console.log(projectFeedback.projectid);
    try {
      const response = await axios.post("http://localhost:2025/gradeproject", projectFeedback);
      if (response.status === 200) {
        setMessage("Feedback submitted successfully!");
        // Reset the form data after successful submission
        setFormData({
          rating: "",
          comments: "",
        });
        
      }
    } catch (error) {
      console.log(error.message); // For debugging purpose
      setMessage("Error submitting feedback. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isFacultyLoggedIn");
    localStorage.removeItem("faculty");
    navigate("/login");
    window.location.reload();
  };

  const styles = {
    
    card: {
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      padding: "40px",
      width: "500px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
    },
    label: {
      display: "block",
      marginBottom: "10px",
      color: "black",
      fontWeight: "bold",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      backgroundColor: "#003366",
      color: "white",
    },
    textarea: {
      width: "100%",
      padding: "10px",
      height: "120px",
      marginBottom: "15px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      resize: "none",
      backgroundColor: "#003366",
      color: "white",
    },
    submitButton: {
      backgroundColor: "#d2b48c",
      color: "black",
      border: "none",
      padding: "10px 20px",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      marginTop: "10px",
    },
    submitButtonHover: {
      backgroundColor: "#c19a6b",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
      color: "white",
    },
  };

  return (
    <div className="content">
      
      <div style={styles.card} >
        <h2>Project Feedback</h2>
        {message && <div style={{color:"red"}}>{message}</div>} {/* Display message */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="rating" style={styles.label}>
            Rating (out of 5)
          </label>
          <select
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="" disabled>Select a rating</option>
            {[1, 2, 3, 4, 5].map((val) => (
              <option key={val} value={val}>{val}</option>
            ))}
          </select>

          <label htmlFor="comments" style={styles.label}>
            Comments
          </label>
          <textarea
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            placeholder="Enter your comments here"
            style={styles.textarea}
          ></textarea>

          <button
            type="submit"
            style={styles.submitButton}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = styles.submitButtonHover.backgroundColor)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = styles.submitButton.backgroundColor)
            }
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default Review;
