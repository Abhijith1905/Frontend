import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./facultynavbar.css";

const ViewMyGivenFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]); // State to hold feedback list
  const [projects, setProjects] = useState({}); // State to hold project names
  const [message, setMessage] = useState(""); // Message for errors or empty feedback

  const facultyData = JSON.parse(localStorage.getItem("faculty"));
  const fid = facultyData ? facultyData.id : null; // Faculty ID

  useEffect(() => {
    const fetchFeedbacksAndProjects = async () => {
      try {
        // Fetch feedback details by faculty ID
        const feedbackResponse = await axios.get(
          `http://localhost:2025/viewallfeedback?fid=${fid}`
        );

        if (feedbackResponse.status === 200 && feedbackResponse.data) {
          const feedbackData = feedbackResponse.data;
          setFeedbacks(feedbackData);

          // Fetch project details for each feedback entry
          const projectRequests = feedbackData.map((feedback) =>
            axios.get(
              `http://localhost:2025/displayproject?projectId=${feedback.projectid}`
            )
          );
          const projectResponses = await Promise.all(projectRequests);

          // Map project names to project IDs
          const projectMap = projectResponses.reduce((acc, res, idx) => {
            if (res.status === 200) {
              acc[feedbackData[idx].projectid] = {
                name: res.data.title,
                studentId: res.data.studentId,
              };
            }
            return acc;
          }, {});

          setProjects(projectMap);
        } else {
          setMessage("No feedback available.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage("Error retrieving data. Please try again later.");
      }
    };

    if (fid) {
      fetchFeedbacksAndProjects();
    } else {
      setMessage("Faculty data is missing. Please log in again.");
    }
  }, [fid]);

  const styles = {
    table: {
      width: "100%",
      borderCollapse: "collapse",
      color: "#333333", // Dark color for table text
    },
    th: {
      backgroundColor: "#e0e0e0",
      color: "#003366",
      padding: "10px",
      borderBottom: "1px solid #ddd",
    },
    td: {
      padding: "10px",
      borderBottom: "1px solid #ddd",
      color: "#333333",
    },
    backButton: {
      marginTop: "15px",
      padding: "10px 15px",
      backgroundColor: "#d2b48c",
      borderRadius: "5px",
      cursor: "pointer",
      color: "black",
      textDecoration: "none",
    },
  };

  return (
    <div style={{paddingTop:"110px"}}>
      <h2>Project Feedback</h2>

      {feedbacks.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Student ID</th>
              <th style={styles.th}>Project Name</th>
              <th style={styles.th}>Rating</th>
              <th style={styles.th}>Comments</th>
              <th style={styles.th}>Date Submitted</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback.feedbackId}>
                <td style={styles.td}>
                  {projects[feedback.projectid]?.studentId || "N/A"}
                </td>
                <td style={styles.td}>
                  {projects[feedback.projectid]?.name || "N/A"}
                </td>
                <td style={styles.td}>{feedback.rating} / 5</td>
                <td style={styles.td}>{feedback.comments}</td>
                <td style={styles.td}>
                  {new Date(feedback.dateSubmitted).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>{message}</div>
      )}

      <br></br>
      <center>
        {" "}
        <Link to="/facultyhome" style={styles.backButton}>
          Back to Dashboard
        </Link>
      </center>
    </div>
  );
};

export default ViewMyGivenFeedback;
