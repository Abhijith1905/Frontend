import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./admin.module.css"
const ViewAllFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [projects, setProjects] = useState({});
  const [facultyNames, setFacultyNames] = useState({});
  const [studentNames, setStudentNames] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchFeedbacksAndDetails = async () => {
      try {
        const feedbackResponse = await axios.get("http://localhost:2025/viewfeedback");

        if (feedbackResponse.status === 200 && feedbackResponse.data) {
          const feedbackData = feedbackResponse.data;
          setFeedbacks(feedbackData);

          const validFeedbacks = feedbackData.filter(feedback => {
            const studentId = projects[feedback.projectid]?.studentId;
            return studentId !== undefined;
          });

          if (validFeedbacks.length === 0) {
            setMessage("No valid feedback available.");
            return;
          }

          const projectRequests = validFeedbacks.map((feedback) =>
            axios.get(`http://localhost:2025/displayproject?projectId=${feedback.projectid}`)
          );
          const projectResponses = await Promise.all(projectRequests);

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

          const facultyRequests = validFeedbacks.map((feedback) =>
            axios.get(`http://localhost:2025/displayfacultybyid?id=${feedback.facultyId}`)
          );
          const facultyResponses = await Promise.all(facultyRequests);

          const facultyMap = facultyResponses.reduce((acc, res, idx) => {
            if (res.status === 200) {
              acc[validFeedbacks[idx].facultyId] = res.data.username;
            } else {
              acc[validFeedbacks[idx].facultyId] = "Deleted";
            }
            return acc;
          }, {});

          setFacultyNames(facultyMap);

          const studentRequests = projectResponses.map((projectRes) =>
            axios.get(`http://localhost:2025/displaystudentbyid?id=${projectRes.data.studentId}`)
          );
          const studentResponses = await Promise.all(studentRequests);

          const studentMap = studentResponses.reduce((acc, res) => {
            if (res.status === 200) {
              acc[res.data.id] = res.data.fullName;
            } else {
              acc[res.data.id] = "Deleted";
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
  }, []);

  const filteredFeedbacks = feedbacks.filter((feedback) => {
    const studentId = projects[feedback.projectid]?.studentId;
    const studentName = studentNames[studentId];
    return studentId !== undefined && studentName && studentName !== "Deleted";
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Project Feedback</h2>

      {filteredFeedbacks.length > 0 ? (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Faculty ID</th>
                <th className={styles.th}>Faculty Name</th>
                <th className={styles.th}>Student ID</th>
                <th className={styles.th}>Student Name</th>
                <th className={styles.th}>Project Name</th>
                <th className={styles.th}>Rating</th>
                <th className={styles.th}>Comments</th>
                <th className={styles.th}>Date Submitted</th>
              </tr>
            </thead>
            <tbody>
              {filteredFeedbacks.map((feedback) => (
                <tr key={feedback.feedbackId} className={styles.tr}>
                  <td className={styles.td}>{feedback.facultyId || "N/A"}</td>
                  <td className={styles.td}>
                    {facultyNames[feedback.facultyId] || (
                      <h4 className={styles.deleted}>Deleted</h4>
                    )}
                  </td>
                  <td className={styles.td}>
                    {projects[feedback.projectid]?.studentId || "N/A"}
                  </td>
                  <td className={styles.td}>
                    {studentNames[projects[feedback.projectid]?.studentId] || "N/A"}
                  </td>
                  <td className={styles.td}>
                    {projects[feedback.projectid]?.name || "N/A"}
                  </td>
                  <td className={styles.td}>
                    <span className={styles.rating}>{feedback.rating} / 5</span>
                  </td>
                  <td className={styles.td}>{feedback.comments}</td>
                  <td className={styles.td}>
                    {new Date(feedback.dateSubmitted).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={styles.message}>{message || "No records found."}</div>
      )}

      <div className={styles.buttonContainer}>
        <Link to="/adminhome" className={styles.backButton}>
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ViewAllFeedback;