import React, { useEffect, useState } from "react";
import axios from "axios";
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

  const handleInputChange = (e, field) => {
    setStudentData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:2025/updatestudent`, studentData); // Assuming a PUT endpoint for updating
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setStudentData((prevData) => ({
          ...prevData,
          photo: reader.result, // Set the photo to the base64 string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div style={{ paddingTop: "200px" }}>
        
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
          {/* Profile Picture Section */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              
            }}
          >
            <h2 style={{color: "#4a4a75" }}>My Profile</h2>
            {/* <div>
              <img
                src={
                  studentData.photo ||
                  "https://via.placeholder.com/150?text=Upload+Photo"
                }
                alt="Profile"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  objectFit: "cover",
                }}
                onClick={() => document.getElementById("photo-upload").click()}
              />
            </div>
            <input
              type="file"
              id="photo-upload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handlePhotoUpload}
            /> */}
          </div>

          {/* Profile Info Table */}
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
                { label: "Id", value: studentData.id, field: "id", editable: false },
                { label: "Name", value: studentData.fullName, field: "fullName", editable: true },
                { label: "Gender", value: studentData.gender, field: "gender", editable: false },
                { label: "Department", value: studentData.department, field: "department", editable: false },
                { label: "Program", value: studentData.program, field: "program", editable: false },
                { label: "Semester", value: studentData.semester, field: "semester", editable: false },
                { label: "Year", value: studentData.year, field: "year", editable: false },
                { label: "Date of Birth", value: new Date(studentData.dateOfBirth).toLocaleDateString(), field: "dateOfBirth", editable: false },
                { label: "Email", value: studentData.email, field: "email", editable: true },
                { label: "Contact", value: studentData.contact, field: "contact", editable: true },
              ].map(({ label, value, field, editable }) => (
                <tr key={field}>
                  <td style={{ padding: "10px", color: "black" }}>{label}</td>
                  <td style={{ padding: "10px", color: "black" }}>
                    {editable ? (
                      <input
                        type={field === "email" ? "email" : "text"}
                        value={value || ""}
                        onChange={(e) => handleInputChange(e, field)}
                      />
                    ) : (
                      value
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
              <center><button
            onClick={handleSave}
            style={{ marginTop: "20px", padding: "10px 20px" }}
          >
            Update
          </button></center>
          
        </div>
      </div>
    </div>
  );
}
