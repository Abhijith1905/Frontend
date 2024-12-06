import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./../Student/studentnavbar.css";

const Review = () => {
  const { studentId } = useParams();
  const [formData, setFormData] = useState({
    rating: "",
    comments: "",
    percentage: "",
  });
  const [message, setMessage] = useState("");

  // Get facultyId from localStorage (session)
  const facultyData = JSON.parse(localStorage.getItem("faculty"));
  const facultyId = facultyData?.id;

  // Get current date (in YYYY-MM-DD format)
  const currentDate = new Date().toISOString().split('T')[0]; // Format to YYYY-MM-DD


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Add facultyId and dateSubmitted to the projectFeedback
    const projectFeedback = {
      rating: parseInt(formData.rating),
      comments: formData.comments,
      dateSubmitted: currentDate,
      facultyId: facultyId,
      studentId: studentId,
    };
  
    try {
      const response = await axios.post(
        "http://localhost:2025/reviewportfolio",
        projectFeedback
      );
      if (response.status === 200) {
        setMessage("Feedback submitted successfully!");
        // Reset form
        setFormData({
          rating: "",
          comments: "",
          percentage: "",
        });
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setMessage("Error submitting feedback. Please try again.");
    }
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
  };

  return (
    <div>

      <h2 style={{ paddingTop: "110px" }}>Project Feedback</h2>
      <div style={styles.card}>
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
            <option value="" disabled>
              Select a rating
            </option>
            {[1, 2, 3, 4, 5].map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
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
              (e.currentTarget.style.backgroundColor =
                styles.submitButtonHover.backgroundColor)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor =
                styles.submitButton.backgroundColor)
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
