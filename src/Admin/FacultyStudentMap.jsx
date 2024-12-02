import React, { useState, useEffect } from "react";
import axios from "axios";

const FacultyStudentMap = () => {
  const [facultyData, setFacultyData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    fid: "",
    sid: "",
  });

  useEffect(() => {
    // Fetch faculty and student data
    axios.get("http://localhost:2025/fstudentmapping")
      .then((response) => {
        console.log(response.data);
        setFacultyData(response.data.facultydata);
        setStudentData(response.data.studentdata);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:2025/fstudentmappinginsert", formData)
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => console.error("Error submitting data:", error));
  };

  return (
    <div style={{ backgroundColor: "lightgrey", padding: "20px" }}>
      <h2 align="center">Faculty-Student Mapping</h2>

      <h3 style={{ color: "red", textAlign: "center" }}>{message}</h3>

      <form onSubmit={handleSubmit}>
        <table align="center">
          <tbody>
            <tr>
              <td><label>Select Faculty</label></td>
              <td>
                <select name="fid" onChange={handleChange} required>
                  <option value="">--Select--</option>
                  {facultyData.map((faculty) => (
                    <option key={faculty.id} value={faculty.id}>
                      {faculty.id} - {faculty.username}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td><label>Select Student</label></td>
              <td>
                <select name="sid" onChange={handleChange} required>
                  <option value="">--Select--</option>
                  {studentData.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.id} - {student.fullName}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button type="submit" className="button">Submit</button>
                &nbsp;
                <button type="reset" className="button" onClick={() => setFormData({ fid: "", sid: "" })}>
                  Clear
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default FacultyStudentMap;
