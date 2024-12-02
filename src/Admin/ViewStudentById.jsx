import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ViewStudentById() {
  const [studentData, setStudentData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`http://localhost:2025/displaystudentbyid?id=${id}`);
        setStudentData(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    if (id) {
      fetchStudentData();
    }
  }, [id]);

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

  return (
    <div>
      <nav> </nav>
      <div style={{ paddingTop: "130px" }}>
        <h2 style={{ color: "black" }}>Student Profile</h2>
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
                  <input
                      type="text"
                      value={studentData?.fullName || ''}
                      onChange={(e) => handleInputChange(e, 'fullName')}
                    />
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
                <input
                      type="text"
                      value={studentData?.department || ''}
                      onChange={(e) => handleInputChange(e, 'department')}
                    />
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #ddd", color: "black", padding: "10px" }}>
                  <strong>Program:</strong>
                </td>
                <td style={{ border: "1px solid #ddd", color: "black", padding: "10px" }}>
                <input
                      type="text"
                      value={studentData?.program || ''}
                      onChange={(e) => handleInputChange(e, 'program')}
                    />
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #ddd", color: "black", padding: "10px" }}>
                  <strong>Semester:</strong>
                </td>
                <td style={{ border: "1px solid #ddd", color: "black", padding: "10px" }}>
                <input
                      type="text"
                      value={studentData?.semester || ''}
                      onChange={(e) => handleInputChange(e, 'semester')}
                    />
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #ddd", color: "black", padding: "10px" }}>
                  <strong>Year:</strong>
                </td>
                <td style={{ border: "1px solid #ddd", color: "black", padding: "10px" }}>
                <input
                      type="text"
                      value={studentData?.year || ''}
                      onChange={(e) => handleInputChange(e, 'year')}
                    />
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #ddd", color: "black", padding: "10px" }}>
                  <strong>Date of Birth:</strong>
                </td>
                <td style={{ border: "1px solid #ddd", color: "black", padding: "10px" }}>
                  {studentData?.dateOfBirth && new Date(studentData.dateOfBirth).toLocaleDateString()}
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
          <button onClick={handleSave} style={{ marginTop: "20px", padding: "10px 20px" }}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
