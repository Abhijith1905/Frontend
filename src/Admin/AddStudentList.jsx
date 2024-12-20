import { useState, useEffect } from "react";
import axios from "axios";
import config from '../config';

export default function AddStudentList() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  const styles = {
    container: {
      padding: "2rem",
      maxWidth: "600px",
      margin: "0 auto",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    },
    title: {
      color: "#2c3e50",
      textAlign: "center",
      marginBottom: "1.5rem",
      fontSize: "1.8rem",
      fontWeight: "600",
    },
    message: {
      textAlign: "center",
      padding: "1rem",
      color: "#666",
      fontSize: "1.1rem",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    fileInput: {
      padding: "0.8rem",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "1rem",
    },
    button: {
      padding: "0.8rem 1.5rem",
      backgroundColor: "#333333",
      color: "white",
      border: "none",
      borderRadius: "4px",
      fontSize: "1rem",
      cursor: "pointer",
      textAlign: "center",
      transition: "background-color 0.3s ease",
    },
    tableWrapper: {
      padding: "2rem",
      maxWidth: "600px",
      margin: "0 auto",
      textAlign: "center", // Ensures the entire table is centered
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      border: "1px solid #ddd",
      padding: "0.8rem",
      backgroundColor: "#f8f9fa",
      textAlign: "center", // Aligns headers to the center
      fontWeight: "bold",
    },
    td: {
      border: "1px solid #ddd",
      padding: "0.8rem",
      textAlign: "center", // Aligns data to the center
    },
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        `${config.url}/addstudentlist`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMessage("Students added successfully!");
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
    }
  };

  return (
    <div
      style={{
        paddingTop: "120px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        flexDirection: "column", // Stacks table and form vertically
      }}
    >
    

      {/* Upload Form Container */}
      <div style={styles.container}>
        {message && <p style={styles.message}>{message}</p>}
        <h2 style={styles.title}>Add Student List</h2>
        <form onSubmit={handleUpload} style={styles.form}>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            style={styles.fileInput}
            required
          />
          <button type="submit" style={styles.button}>
            Upload Student CSV
          </button>
        </form>
      </div>
    </div>
  );
}
