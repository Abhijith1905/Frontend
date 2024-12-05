import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ViewStudents() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:2025/viewallstudents');
      setStudents(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:2025/deletestudent?id=${id}`);
      fetchStudents();
    } catch (error) {
      setError(error.message);
    }
  };

  const displayStudent = (id) => {
    navigate(`/displaystudentbyid/${id}`);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const styles = {
    tableContainer: {
      maxHeight: '400px', // Adjust the height as per your requirement
      overflowY: 'auto',
      display: 'block', // Make the table container a block element so it can scroll
    },
    table: {
      backgroundColor: 'white',
      width: '100%',
      borderCollapse: 'collapse', // Ensures borders are collapsed for the table
    },
    th: {
      backgroundColor: '#f2f2f2', // Optional: To make the header stand out
    },
    td: {
      padding: '8px',
      border: '1px solid #ddd', // Border for better readability
    },
  };

  return (
    <div>
      <nav> </nav>
      <div className="content">
        <h2 className="ul">View Students</h2>

        {students.length > 0 ? (
          <div style={styles.tableContainer}>
            <table className="table" style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Full Name</th>
                  <th style={styles.th}>Gender</th>
                  <th style={styles.th}>Department</th>
                  <th style={styles.th}>Program</th>
                  <th style={styles.th}>Semester</th>
                  <th style={styles.th}>Year</th>
                  <th style={styles.th}>Date of Birth</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Contact</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td style={styles.td}>{student.id}</td>
                    <td style={styles.td}>{student.fullName}</td>
                    <td style={styles.td}>{student.gender}</td>
                    <td style={styles.td}>{student.department}</td>
                    <td style={styles.td}>{student.program}</td>
                    <td style={styles.td}>{student.semester}</td>
                    <td style={styles.td}>{student.year}</td>
                    <td style={styles.td}>{new Date(student.dateOfBirth).toLocaleDateString()}</td>
                    <td style={styles.td}>{student.email}</td>
                    <td style={styles.td}>{student.contact}</td>
                    <td style={styles.td}>
                      <button onClick={() => displayStudent(student.id)}>View</button>
                      <button onClick={() => deleteStudent(student.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <p>No students found</p>
        )}
      </div>
    </div>
  );
}
