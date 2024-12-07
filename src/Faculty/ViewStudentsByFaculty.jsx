import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from '../config';
export default function ViewStudents() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const facultyData = JSON.parse(localStorage.getItem("faculty"));
  const fid = facultyData?.id;

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${config.url}/viewstudentsbyfaculty?fid=${fid}`);
      setStudents(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const displayStudent = (id) => {
    navigate(`/displaystudent/${id}`);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div style={{ paddingTop: "100px" }} className="page-container">
      <div className="view-students-container">
        <h2 className="title">View Students</h2>

        {students.length > 0 ? (
          <table className="students-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Gender</th>
                <th>Department</th>
                <th>Program</th>
                <th>Semester</th>
                <th>Year</th>
                <th>Date of Birth</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.fullName}</td>
                  <td>{student.gender}</td>
                  <td>{student.department}</td>
                  <td>{student.program}</td>
                  <td>{student.semester}</td>
                  <td>{student.year}</td>
                  <td>{new Date(student.dateOfBirth).toLocaleDateString()}</td>
                  <td>{student.email}</td>
                  <td>{student.contact}</td>
                  <td>
                    <button
                      className="view-button"
                      onClick={() => displayStudent(student.id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <p className="no-students-message">No students found</p>
        )}
      </div>

      {/* Internal CSS */}
      <style>{`
        .page-container {
          margin: 0;
          padding: 0;
          min-height: 100vh;
        }

        .view-students-container {
        
          margin: 20px auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .title {
          text-align: center;
          margin-bottom: 20px;
          font-size: 1.5em;
          color: #4a4a75;
        }

        .students-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        .students-table th,
        .students-table td {
          padding: 12px 15px;
          text-align: left;
          border: 1px solid #ddd;
          color: #4a4a75;
        }

        .students-table th {
          background-color: #e8eaf6;
          font-weight: bold;
        }

        .students-table tr:nth-child(even) {
          background-color: #f3f4f8;
        }

        .students-table tr:hover {
          background-color: #e1e5f2;
        }

        .view-button {
          padding: 8px 12px;
          background-color: #4a4a75;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .view-button:hover {
          background-color: #357abf;
        }

        .error-message,
        .no-students-message {
          color: #e74c3c;
          text-align: center;
          font-size: 1.1em;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}
