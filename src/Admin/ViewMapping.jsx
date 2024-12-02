import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewMapping = () => {
  const [mappingData, setMappingData] = useState([]);

  useEffect(() => {
    // Fetch mapping data
    axios
      .get("http://localhost:2025/viewfstudentmapping")
      .then((response) => {
        setMappingData(response.data);
      })
      .catch((error) => console.error("Error fetching mapping data:", error));
  }, []);

  return (
    <div style={{ backgroundColor: "lightgrey", padding: "20px" }}>
      <h2 align="center">Faculty-Student Mappings</h2>

      <table
        align="center"
        border="2"
        style={{ textAlign: "center", width: "80%" }}
      >
        <thead>
          <tr style={{ fontWeight: "bold" }}>
            <td>Faculty ID</td>
            <td>Faculty Name</td>
            <td>Student ID</td>
            <td>Student Name</td>
          </tr>
        </thead>
        <tbody>
          {mappingData.map((mapping) => (
            <tr key={mapping.mappingid}>
              <td>{mapping.faculty.id}</td>
              <td>{mapping.faculty.username}</td>
              <td>{mapping.student.id}</td>
              <td>{mapping.student.fullName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewMapping;
