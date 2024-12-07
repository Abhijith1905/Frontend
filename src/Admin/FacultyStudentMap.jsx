import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./admin.module.css"
import config from '../config';

const FacultyStudentMap = () => {
  const [facultyData, setFacultyData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    fid: "",
    sid: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.url}/fstudentmapping`);
        setFacultyData(response.data.facultydata);
        setStudentData(response.data.studentdata);
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage("Failed to load faculty and student data");
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}/fstudentmappinginsert`, formData);
      setMessage(response.data.message);
      setFormData({ fid: "", sid: "" });
    } catch (error) {
      console.error("Error submitting data:", error);
      setMessage("Failed to map faculty and student");
    }
  };

  const handleReset = () => {
    setFormData({ fid: "", sid: "" });
    setMessage("");
  };

  return (
    <div style={{paddingTop:"120px"}} className={styles.container}>
      <h2 className={styles.title}>Faculty-Student Mapping</h2>
      {message && <p className={styles.message}>{message}</p>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Select Faculty</label>
          <select
            className={styles.select}
            name="fid"
            value={formData.fid}
            onChange={handleChange}
            required
          >
            <option value="">--Select--</option>
            {facultyData.map((faculty) => (
              <option key={faculty.id} value={faculty.id}>
                {faculty.id} - {faculty.username}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Select Student</label>
          <select
            className={styles.select}
            name="sid"
            value={formData.sid}
            onChange={handleChange}
            required
          >
            <option value="">--Select--</option>
            {studentData.map((student) => (
              <option key={student.id} value={student.id}>
                {student.id} - {student.fullName}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={`${styles.button} ${styles.submitButton}`}>
            Submit
          </button>
          <button
            type="button"
            className={`${styles.button} ${styles.resetButton}`}
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default FacultyStudentMap;
