import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewFeedback = () => {
  const [projectData, setProjectData] = useState(null);
  const [feedbackData, setFeedbackData] = useState([]);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";
    document.body.style.height = "100vh";

    const fetchStudentFeedbacks = async () => {
      try {
        const studentData = JSON.parse(localStorage.getItem("student"));
        const studentId = studentData ? studentData.id : null;

        if (!studentId) {
          setMessage("No student data found. Please log in again.");
          return;
        }

        const feedbackResponse = await axios.get(
          `http://localhost:2025/viewmyfeedback?sid=${studentId}`
        );

        if (feedbackResponse.status === 200 && feedbackResponse.data.length > 0) {
          const feedbacks = feedbackResponse.data;
          const projectRequests = feedbacks.map((feedback) =>
            axios.get(`http://localhost:2025/displayproject?projectId=${feedback.projectid}`)
          );

          const projectResponses = await Promise.all(projectRequests);
          const projects = projectResponses.reduce((acc, res, idx) => {
            if (res.status === 200 && res.data) {
              acc[feedbacks[idx].projectid] = res.data;
            }
            return acc;
          }, {});

          setProjectData(projects);
          setFeedbackData(feedbacks);
          setMessage(""); // Clear the message if feedback is found
        } else {
          setMessage("No feedback found");
        }
      } catch (error) {
        console.error("Error fetching feedback data:", error);
        setMessage("Error retrieving feedback data. Please try again.");
      }
    };

    fetchStudentFeedbacks();

    return () => {
      document.body.style.display = "";
      document.body.style.justifyContent = "";
      document.body.style.alignItems = "";
      document.body.style.height = "";
    };
  }, []);

  const styles = {
    outerContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100vh",
   
      paddingTop: "80px",
    },
    container: {
      paddingTop: "130px",
      background: "white",
      width: "100%",
      maxWidth: "1000px",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
    searchContainer: {
      marginBottom: "20px",
      textAlign: "center",
    },
    searchInput: {
      padding: "10px 15px",
      width: "300px",
      borderRadius: "5px",
      border: "1px solid #ddd",
      fontSize: "16px",
      color: "#4a4a75",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      color: "#4a4a75",
    },
    th: {
      backgroundColor: "#e0e0e0",
      padding: "10px",
      borderBottom: "1px solid #ddd",
      textAlign: "left",
    },
    td: {
      padding: "10px",
      borderBottom: "1px solid #ddd",
      color: "#4a4a75",
      position: "relative",
    },
    message: {
      textAlign: "center",
      color: "#4a4a75",
      marginTop: "20px",
      fontSize: "18px",
    },
    projectCard: {
      background: "white",
      padding: "20px",
      marginBottom: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
    heading: {
      color: "#4a4a75",
      textAlign: "center",
      marginBottom: "20px",
    },
    noResults: {
      textAlign: "center",
      color: "#4a4a75",
      marginTop: "20px",
    },
  };

  const filteredProjects = projectData
    ? Object.keys(projectData).filter((projectId) =>
        projectData[projectId].title
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div style={styles.outerContainer}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Project Feedback</h2>

        <div style={styles.searchContainer}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by project name..."
            style={styles.searchInput}
          />
        </div>

        {message && (
          <p style={styles.message}>{message}</p>
        )}

        {projectData && feedbackData.length > 0 && filteredProjects.length > 0 ? (
          filteredProjects.map((projectId) => (
            <div key={projectId} style={styles.projectCard}>
              <h3 style={{ color: "#4a4a75", fontSize: "22px" }}>
                Project: {projectData[projectId].title}
              </h3>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Rating</th>
                    <th style={styles.th}>Comments</th>
                    <th style={styles.th}>Date Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbackData
                    .filter((feedback) => feedback.projectid === parseInt(projectId))
                    .map((feedback, index) => (
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
          ))
        ) : projectData && feedbackData.length === 0 ? (
          <p style={styles.noResults}>No feedback data available.</p>
        ) : null}
      </div>
    </div>
  );
};

export default ViewFeedback;
