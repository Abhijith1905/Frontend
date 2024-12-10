import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { AlertCircle } from "lucide-react";
import config from "../config";

export default function StudentProfile() {
  const [studentData, setStudentData] = useState({
    id: "",
    fullName: "",
    gender: "",
    department: "",
    program: "",
    semester: "",
    year: "",
    dateOfBirth: "",
    email: "",
    contact: "",
    photo: null, // Default photo field
  });

  useEffect(() => {
    const storedStudentData = localStorage.getItem("student");
    if (storedStudentData) {
      setStudentData(JSON.parse(storedStudentData));
    }
  }, []);

  return (
    <div>
      <div style={{ paddingTop: "100px" }}>
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h2 style={{ color: "#4a4a75" }}>My Profile</h2>
          </div>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "1px solid #ddd",
            }}
          >
            <thead>
              <tr>
                <th style={{ padding: "10px", color: "black" }}>Field</th>
                <th style={{ padding: "10px", color: "black" }}>Details</th>
              </tr>
            </thead>
            <tbody>
              {[ 
                { label: "Id", value: studentData.id },
                { label: "Name", value: studentData.fullName },
                { label: "Gender", value: studentData.gender },
                { label: "Department", value: studentData.department },
                { label: "Program", value: studentData.program },
                { label: "Semester", value: studentData.semester },
                { label: "Year", value: studentData.year },
                { label: "Date of Birth", value: new Date(studentData.dateOfBirth).toLocaleDateString() },
                { label: "Email", value: studentData.email },
                { label: "Contact", value: studentData.contact },
              ].map(({ label, value }) => (
                <tr key={label}>
                  <td style={{ padding: "10px", color: "black" }}>{label}</td>
                  <td style={{ padding: "10px", color: "black" }}>
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
