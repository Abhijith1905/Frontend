import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ViewStudentProfile() {
  const [studentData, setStudentData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`http://localhost:2025/displaystudentbyid?id=${id}`);
        console.log(response.data.dateOfBirth);
        setStudentData(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    if (id) {
      fetchStudentData();
    }
  }, [id]);

  if (!id) {
    return null;
  }

  return (
    <div>
      <div style={{ paddingTop: "130px" }}>
        <h2 style={{ color: "white" }}>Student Profile</h2>
        <div
          className="profile-card"
          style={{
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "8px",
            margin: "20px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "1px solid #ddd",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: "10px", color: "black" }}>
                  Field
                </th>
                <th style={{ border: "1px solid #ddd", padding: "10px", color: "black" }}>
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: "1px solid #ddd", color: "black", padding: "10px" }}>
                  <strong>Id:</strong>
                </td>
                <td style={{ border: "1px solid #ddd", color: "black", padding: "10px" }}>
                  {studentData?.id}
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #ddd", color: "black", padding: "10px" }}>
                  <strong>Name:</strong>
                </td>
                <td style={{ border: "1px solid #ddd", color: "black", padding: "10px" }}>
                  {studentData?.fullName}
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #ddd", color: "black", padding: "10px" }}>
                  <strong>Gender:</strong>
                </td>
                <td style={{ border: "1px solid #ddd", color: "black", padding: "10px" }}>
                  {studentData?.gender}
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #ddd", color: "black", padding: "10px" }}>
                  <strong>Department:</strong>
                </td>
                <td style={{ border: "1px solid #ddd", color: "black", padding: "10px" }}>
                  {studentData?.department}
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #ddd", color: "black", padding: "10px" }}>
                  <strong>Program:</strong>
                </td>
                <td style={{ border: "1px solid #ddd", color: "black", padding: "10px" }}>
                  {studentData?.program}
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #ddd", color: "black", padding: "10px" }}>
                  <strong>Semester:</strong>
                </td>
                <td style={{ border: "1px solid #ddd", color: "black", padding: "10px" }}>
                  {studentData?.semester}
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #ddd", color: "black", padding: "10px" }}>
                  <strong>Year:</strong>
                </td>
                <td style={{ border: "1px solid #ddd", color: "black", padding: "10px" }}>
                  {studentData?.year}
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #ddd", color: "black", padding: "10px" }}>
                  <strong>Date of Birth:</strong>
                </td>
                <td style={{ border: "1px solid #ddd", color: "black", padding: "10px" }}>
                <td>{new Date(studentData?.dateOfBirth).toLocaleDateString()}</td>
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #ddd", color: "black", padding: "10px" }}>
                  <strong>Email:</strong>
                </td>
                <td style={{ border: "1px solid #ddd", color: "black", padding: "10px" }}>
                  {studentData?.email}
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #ddd", color: "black", padding: "10px" }}>
                  <strong>Contact:</strong>
                </td>
                <td style={{ border: "1px solid #ddd", color: "black", padding: "10px" }}>
                  {studentData?.contact}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
