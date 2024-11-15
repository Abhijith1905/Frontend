import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ViewFeedback = () => {
  const [projectData, setProjectData] = useState(null); // Store project data
  const [feedbackData, setFeedbackData] = useState(null); // Store feedback data
  const [message, setMessage] = useState(""); // For messages

  // Fetch feedback data based on studentId from localStorage
  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        // Get studentId from localStorage
        const studentData = JSON.parse(localStorage.getItem("student"));
        const studentId = studentData ? studentData.id : null;

        console.log("studentId", studentId);
        if (!studentId) {
          setMessage("No student data found in localStorage.");
          return;
        }

        // Fetch feedback data for the student
        const feedbackResponse = await axios.get(`http://localhost:2025/viewmyfeedback?sid=${studentId}`);

        if (feedbackResponse.status === 200 && feedbackResponse.data) {
          setFeedbackData(feedbackResponse.data); // Store feedback data
        } else {
          setMessage("No feedback found for this student.");
        }
      } catch (error) {
        console.error("Error fetching feedback data:", error);
        setMessage("Error retrieving feedback data. Please try again.");
      }
    };

    fetchFeedbackData();
  }, []);

  // Fetch project data based on projectId from feedback data
  useEffect(() => {
    if (feedbackData && feedbackData.length > 0) {
      const projectId = feedbackData[0].projectid; // Assuming all feedbacks have the same projectId

      const fetchProjectData = async () => {
        try {
          // Fetch project data by projectId
          const projectResponse = await axios.get(`http://localhost:2025/displayproject?projectId=${projectId}`);

          if (projectResponse.status === 200 && projectResponse.data) {
            setProjectData(projectResponse.data); // Store project data
          } else {
            setMessage("Unable to retrieve project data.");
          }
        } catch (error) {
          console.error("Error fetching project data:", error);
          setMessage("Error retrieving project data. Please try again.");
        }
      };

      fetchProjectData();
    }
  }, [feedbackData]); // Trigger this effect when feedbackData changes

  const styles = {
   
    table: {
      width: "100%",
      borderCollapse: "collapse",
      color: "#333333" // Dark color for table text
    },
    th: {
      backgroundColor: "#e0e0e0",
      color: "#003366",
      padding: "10px",
      borderBottom: "1px solid #ddd"
    },
    td: {
      padding: "10px",
      borderBottom: "1px solid #ddd",
      color: "#333333"
    },
    backButton: {
      marginTop: "15px",
      padding: "10px 15px",
      backgroundColor: "#d2b48c",
      borderRadius: "5px",
      cursor: "pointer",
      color: "black",
      textDecoration: "none"
    }
  };

  return (
    <div style={{paddingTop:"120px"}}>
      <h2>Project Feedback</h2>

      {message && <p>{message}</p>}

      {projectData && feedbackData && (
        <div>
          <h3 style={{ color: "#4a4a75" }}>Project: {projectData.title}</h3>

          {/* Feedback table */}
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Rating</th>
                <th style={styles.th}>Comments</th>
                <th style={styles.th}>Date Submitted</th>
              </tr>
            </thead>
            <tbody>
              {feedbackData.map((feedback, index) => (
                <tr key={index}>
                  <td style={styles.td}>{feedback.rating}</td>
                  <td style={styles.td}>{feedback.comments}</td>
                  <td style={styles.td}>
                    {new Date(feedback.dateSubmitted).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <br />
      <center>
        <Link to="/studenthome" style={styles.backButton}>
          Back to Dashboard
        </Link>
      </center>
    </div>
  );
};

export default ViewFeedback;
