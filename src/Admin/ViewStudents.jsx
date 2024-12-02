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
    table: {
      backgroundColor: 'white',
    },
  };

  return (
    <div>
      <nav> </nav>
      <div className="content">
        <h2 className="ul">View Students</h2>

        {students.length > 0 ? (
          <table className="table" style={styles.table}>
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
                    <button onClick={() => displayStudent(student.id)}>View</button>
                    <button onClick={() => deleteStudent(student.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <p>No students found</p>
        )}
      </div>
    </div>
  );
}
