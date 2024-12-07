import React, { useEffect, useState } from "react";
import "./../App.css"; // Ensure the correct path to your CSS file
import axios from "axios";
import config from "../config";

export default function Home() {
  const [counts, setCounts] = useState({
    students: 0,
    faculty: 0,
    projects: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const styles = {
    root: {
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "2rem",
    },
    dashboardContainer: {
      padding: "2rem",
      background: "#f8f9fa",
      borderRadius: "15px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    dashboardTitle: {
      color: "#2c3e50",
      textAlign: "center",
      marginBottom: "2rem",
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "2rem",
    },
    statCard: {
      background: "white",
      padding: "1.5rem",
      borderRadius: "12px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
      transition: "transform 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      cursor: "pointer",
    },
    statCardHover: {
      transform: "translateY(-5px)",
    },
    statIcon: (color) => ({
      fontSize: "2rem",
      padding: "1rem",
      background: color,
      borderRadius: "50%",
      width: "60px",
      height: "60px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }),
    statContent: {
      flexGrow: 1,
    },
    statTitle: {
      color: "#6c757d",
      fontSize: "0.9rem",
      margin: 0,
      marginBottom: "0.5rem",
    },
    statValue: {
      fontSize: "2rem",
      fontWeight: 700,
      color: "#2c3e50",
    },
    dashboardFooter: {
      textAlign: "center",
      color: "#6c757d",
      fontSize: "0.9rem",
      marginTop: "2rem",
      paddingTop: "1rem",
      borderTop: "1px solid #dee2e6",
    },
    loadingContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      color: "#6c757d",
    },
    loadingSpinner: {
      width: "50px",
      height: "50px",
      border: "5px solid #f3f3f3",
      borderTop: "5px solid #3498db",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
      marginBottom: "1rem",
    },
    errorContainer: {
      textAlign: "center",
      color: "#dc3545",
      padding: "2rem",
    },
  };

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [studentsRes, facultyRes, projectsRes] = await Promise.all([
          axios.get(`${config.url}/studentcount`),
          axios.get(`${config.url}/facultycount`),
          axios.get(`${config.url}/projectcount`),
        ]);

        setCounts({
          students: studentsRes.data,
          faculty: facultyRes.data,
          projects: projectsRes.data,
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner} />
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={styles.root}>
      <div style={styles.dashboardContainer}>
        <br></br>
        <h1 style={styles.dashboardTitle}>Admin Dashboard</h1>
        <div style={styles.statsGrid}>
          {[
            {
              title: "Total Students",
              value: counts.students,
              color: "#e3f2fd",
              icon: "👥",
            },
            {
              title: "Total Faculty",
              value: counts.faculty,
              color: "#f3e5f5",
              icon: "👨‍🏫",
            },
            {
              title: "Total Projects",
              value: counts.projects,
              color: "#e8f5e9",
              icon: "📚",
            },
          ].map((stat, index) => (
            <div
              key={index}
              style={styles.statCard}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-5px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <div style={styles.statIcon(stat.color)}>{stat.icon}</div>
              <div style={styles.statContent}>
                <h3 style={styles.statTitle}>{stat.title}</h3>
                <div style={styles.statValue}>{stat.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.dashboardFooter}>
          <p>Last updated: {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
