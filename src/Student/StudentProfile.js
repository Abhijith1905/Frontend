import React, { useEffect, useState } from "react";

export default function StudentProfile() {
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const storedStudentData = localStorage.getItem("student");
    if (storedStudentData) {
      const parsedStudentData = JSON.parse(storedStudentData);
      setStudentData(parsedStudentData);
    }
  }, []);

  const handleInputChange = (e, field) => {
    setStudentData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem("student", JSON.stringify(studentData));
    alert("Profile updated successfully!");
  };

  return (
    <div>
      <div>
        <div style={{ paddingTop: "130px" }}>
          <h2 style={{ color: "white" }}>My Profile</h2>
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
                  <td style={{ border: "1px solid #ddd", padding: "10px", color: "black" }}>
                    Id
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "10px", color: "black" }}>
                    {studentData?.id}
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid #ddd", padding: "10px", color: "black" }}>
                    Name
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "10px", color: "black" }}>
                    <input
                      type="text"
                      value={studentData?.fullName || ""}
                      onChange={(e) => handleInputChange(e, "fullName")}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid #ddd", padding: "10px", color: "black" }}>
                    Gender
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "10px", color: "black" }}>
                    {studentData?.gender}
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid #ddd", padding: "10px", color: "black" }}>
                    Department
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "10px", color: "black" }}>
                    {studentData?.department}
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid #ddd", padding: "10px", color: "black" }}>
                    Program
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "10px", color: "black" }}>
                    {studentData?.program}
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid #ddd", padding: "10px", color: "black" }}>
                    Semester
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "10px", color: "black" }}>
                    {studentData?.semester}
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid #ddd", padding: "10px", color: "black" }}>
                    Year
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "10px", color: "black" }}>
                    {studentData?.year}
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid #ddd", padding: "10px", color: "black" }}>
                    Date of Birth
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "10px", color: "black" }}>
                    {new Date(studentData?.dateOfBirth).toLocaleDateString()}
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid #ddd", padding: "10px", color: "black" }}>
                    Email
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "10px", color: "black" }}>
                    <input
                      type="email"
                      value={studentData?.email || ""}
                      onChange={(e) => handleInputChange(e, "email")}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid #ddd", padding: "10px", color: "black" }}>
                    Contact
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "10px", color: "black" }}>
                    <input
                      type="tel"
                      value={studentData?.contact || ""}
                      onChange={(e) => handleInputChange(e, "contact")}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              onClick={handleSave}
              style={{ marginTop: "20px", padding: "10px 20px" }}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
