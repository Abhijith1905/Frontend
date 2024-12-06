import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewMapping = () => {
  const [mappingData, setMappingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMappingData = async () => {
      try {
        const response = await axios.get("http://localhost:2025/viewfstudentmapping");
        setMappingData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching mapping data:", error);
        setError("Failed to load mapping data. Please try again later.");
        setLoading(false);
      }
    };

    fetchMappingData();
  }, []);

  const styles = {
    container: {
      padding: "2rem",
      maxWidth: "1200px",
      margin: "0 auto",
      minHeight: "100vh",
     
      
    },
    header: {
      color: "#2c3e50",
      fontSize: "2rem",
      textAlign: "center",
      marginBottom: "2rem",
      fontWeight: "600",
    },
    tableContainer: {
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      margin: "0 auto",
      width: "100%",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      textAlign: "left",
    },
    th: {
      backgroundColor: "#f8f9fa",
      color: "#2c3e50",
      padding: "1rem",
      fontWeight: "600",
      borderBottom: "2px solid #dee2e6",
    },
    td: {
      padding: "1rem",
      borderBottom: "1px solid #dee2e6",
      color: "#333",
    },
    tr: {
      transition: "background-color 0.3s ease",
    },
    trHover: {
      backgroundColor: "#f8f9fa",
    },
    message: {
      textAlign: "center",
      padding: "2rem",
      color: "#666",
      fontSize: "1.1rem",
    },
    error: {
      color: "#dc3545",
    },
    loading: {
      color: "#2c3e50",
      textAlign: "center",
      padding: "2rem",
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Loading mapping data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={{...styles.message, ...styles.error}}>{error}</div>
      </div>
    );
  }

  return (
    <div style={{paddingTop:"120px"}}>
    <div  style={styles.container}>
      <h2 style={styles.header}>Faculty-Student Mappings</h2>

      {mappingData.length > 0 ? (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Faculty ID</th>
                <th style={styles.th}>Faculty Name</th>
                <th style={styles.th}>Student ID</th>
                <th style={styles.th}>Student Name</th>
              </tr>
            </thead>
            <tbody>
              {mappingData.map((mapping) => (
                <tr
                  key={mapping.mappingid}
                  style={styles.tr}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = styles.trHover.backgroundColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "";
                  }}
                >
                  <td style={styles.td}>{mapping.faculty.id}</td>
                  <td style={styles.td}>{mapping.faculty.username}</td>
                  <td style={styles.td}>{mapping.student.id}</td>
                  <td style={styles.td}>{mapping.student.fullName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={styles.message}>No mappings found.</div>
      )}
    </div>
    </div>
  );
};

export default ViewMapping;