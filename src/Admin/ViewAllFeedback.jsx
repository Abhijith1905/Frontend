import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ViewAllFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]); // State to hold feedback list
  const [projects, setProjects] = useState({}); // State to hold project names and student IDs
  const [facultyNames, setFacultyNames] = useState({}); // State to hold faculty names
  const [studentNames, setStudentNames] = useState({}); // State to hold student names
  const [message, setMessage] = useState(""); // Message for errors or empty feedback

  useEffect(() => {
    const fetchFeedbacksAndDetails = async () => {
      try {
        // Fetch all feedback details
        const feedbackResponse = await axios.get(
          `http://localhost:2025/viewfeedback`
        );

        if (feedbackResponse.status === 200 && feedbackResponse.data) {
          const feedbackData = feedbackResponse.data;
          setFeedbacks(feedbackData);

          console.log(feedbackData)

          // Filter out feedbacks with undefined studentId
          const validFeedbacks = feedbackData.filter(feedback => {
            const studentId = projects[feedback.projectid]?.studentId;
            return studentId !== undefined;
          });

          if (validFeedbacks.length === 0) {
            setMessage("No valid feedback available.");
            return;
          }

          // Fetch project details for each valid feedback entry
          const projectRequests = validFeedbacks.map((feedback) =>
            axios.get(
              `http://localhost:2025/displayproject?projectId=${feedback.projectid}`
            )
          );
          const projectResponses = await Promise.all(projectRequests);

          // Map project names to project IDs and student IDs
          const projectMap = projectResponses.reduce((acc, res, idx) => {
            if (res.status === 200) {
              acc[validFeedbacks[idx].projectid] = {
                name: res.data.title,
                studentId: res.data.studentId,
              };
            }
            return acc;
          }, {});

          setProjects(projectMap);

          // Fetch faculty names based on faculty ID from feedback
          const facultyRequests = validFeedbacks.map((feedback) =>
            axios.get(`http://localhost:2025/displayfacultybyid?id=${feedback.facultyId}`)
          );
          const facultyResponses = await Promise.all(facultyRequests);

          // Map faculty names to faculty IDs, fallback if not found (deleted or invalid)
          const facultyMap = facultyResponses.reduce((acc, res, idx) => {
            if (res.status === 200) {
              acc[validFeedbacks[idx].facultyId] = res.data.username;
            } else {
              acc[validFeedbacks[idx].facultyId] = "Deleted"; // Fallback to "Deleted" if not found
            }
            return acc;
          }, {});

          setFacultyNames(facultyMap);

          // Fetch student names based on student ID from project details
          const studentRequests = projectResponses.map((projectRes) =>
            axios.get(
              `http://localhost:2025/displaystudentbyid?id=${projectRes.data.studentId}`
            )
          );
          const studentResponses = await Promise.all(studentRequests);

          // Map student names to their respective student IDs, fallback if not found (deleted or invalid)
          const studentMap = studentResponses.reduce((acc, res) => {
            if (res.status === 200) {
              acc[res.data.id] = res.data.fullName;
            } else {
              acc[res.data.id] = "Deleted"; // Fallback to "Deleted" if not found
            }
            return acc;
          }, {});

          setStudentNames(studentMap);
        } else {
          setMessage("No feedback available.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage("Error retrieving data. Please try again later.");
      }
    };

    fetchFeedbacksAndDetails();
  }, []); // No dependency, so it runs only once when component mounts

  // Filter feedbacks where student data is not found
  const filteredFeedbacks = feedbacks.filter((feedback) => {
    const studentId = projects[feedback.projectid]?.studentId;
    const studentName = studentNames[studentId];
    return studentId !== undefined && studentName && studentName !== "Deleted"; // Only keep records with valid studentId
  });

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
    <div style={{ paddingTop: "110px" }}>
      <h2>Project Feedback</h2>

      {filteredFeedbacks.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Faculty ID</th>
              <th style={styles.th}>Faculty Name</th>
              <th style={styles.th}>Student ID</th>
              <th style={styles.th}>Student Name</th>
              <th style={styles.th}>Project Name</th>
              <th style={styles.th}>Rating</th>
              <th style={styles.th}>Comments</th>
              <th style={styles.th}>Date Submitted</th>
            </tr>
          </thead>
          <tbody>
            {filteredFeedbacks.map((feedback) => (
              <tr key={feedback.feedbackId}>
                <td style={styles.td}>{feedback.facultyId || "N/A"}</td>
                <td style={styles.td}>
                  {facultyNames[feedback.facultyId] || <h4 style={{color:"red"}}>Deleted</h4>}
                </td>
                <td style={styles.td}>
                  {projects[feedback.projectid]?.studentId || "N/A"}
                </td>
                <td style={styles.td}>
                  {studentNames[projects[feedback.projectid]?.studentId] || "N/A"}
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
        <div>{message || "No records found."}</div>
      )}

      <br />
      <center>
        <Link to="/adminhome" style={styles.backButton}>
          Back to Dashboard
        </Link>
      </center>
    </div>
  );
};

export default ViewAllFeedback;
