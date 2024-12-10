import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";

const ViewPortfolioFeedback = () => {
  const [portfolioFeedbackData, setPortfolioFeedbackData] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";
    document.body.style.height = "100vh";

    const fetchPortfolioFeedbacks = async () => {
      try {
        const studentData = JSON.parse(localStorage.getItem("student"));
        const studentId = studentData ? studentData.id : null;

        if (!studentId) {
          setMessage("No student data found. Please log in again.");
          return;
        }

        const response = await axios.get(
          `${config.url}/viewmyportfoliofeedback?sid=${studentId}`
        );

        if (response.status === 200 && response.data.length > 0) {
          setPortfolioFeedbackData(response.data);
          setMessage(""); // Clear the message if feedback is found
        } else {
          setMessage("No portfolio feedback found");
        }
      } catch (error) {
        console.error("Error fetching portfolio feedback data:", error);
        setMessage("Error retrieving portfolio feedback data. Please try again.");
      }
    };

    fetchPortfolioFeedbacks();

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

  return (
    <div style={styles.outerContainer}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Portfolio Feedback</h2>

        {message && <p style={styles.message}>{message}</p>}

        {portfolioFeedbackData.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Student ID</th>
                <th style={styles.th}>Rating</th>
                <th style={styles.th}>Comments</th>
                <th style={styles.th}>Date Submitted</th>
              </tr>
            </thead>
            <tbody>
              {portfolioFeedbackData.map((feedback, index) => (
                <tr key={index}>
                  <td style={styles.td}>{feedback.studentId}</td>
                  <td style={styles.td}>{feedback.rating}</td>
                  <td style={styles.td}>{feedback.comments}</td>
                  <td style={styles.td}>
                    {new Date(feedback.dateSubmitted).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={styles.noResults}>No portfolio feedback data available.</p>
        )}
      </div>
    </div>
  );
};

export default ViewPortfolioFeedback;
