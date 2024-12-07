import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [studentsRes, facultyRes, projectsRes] = await Promise.all([
          axios.get(`${config.url}/studentcount`, { withCredentials: true }),
          axios.get(`${config.url}/facultycount`, { withCredentials: true }),
          axios.get(`${config.url}/projectcount`, { withCredentials: true }),
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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <>
      <p>Students: {counts.students}</p>
      <p>Faculty: {counts.faculty}</p>
      <p>Projects: {counts.projects}</p>
    </>
  );
}
