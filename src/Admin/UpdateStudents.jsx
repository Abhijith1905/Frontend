import { useState } from 'react';
import axios from 'axios';

export default function UpdateStudent() {
  const [student, setStudent] = useState({
    id: '',
    name: '',
    gender: '',
    department: '',
    program: '',
    semester: '',
    year: '',
    dob: '',
    email: '',
    contact: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // to avoid page reloading
    try {
      const response = await axios.put('http://localhost:2025/updatestudent', student);
      if (response.status === 200) { // if successfully updated
        setMessage(response.data);
        setStudent({
          id: '',
          name: '',
          gender: '',
          department: '',
          program: '',
          semester: '',
          year: '',
          dob: '',
          email: '',
          contact: ''
        });
      }
    } catch (error) {
      console.log(error.message); // for debugging purpose
      setMessage(error.message);
    }
  };

  const styles = {
    container: {
      padding: "2rem",
      maxWidth: "600px",
      margin: "0 auto",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    },
    title: {
      color: "#2c3e50",
      textAlign: "center",
      marginBottom: "1.5rem",
      fontSize: "1.8rem",
      fontWeight: "600",
    },
    message: {
      textAlign: "center",
      padding: "1rem",
      color: "#666",
      fontSize: "1.1rem",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    inputField: {
      padding: "0.8rem",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "1rem",
    },
    selectField: {
      padding: "0.8rem",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "1rem",
    },
    button: {
      padding: "0.8rem 1.5rem",
      backgroundColor: "#333333",
      color: "white",
      border: "none",
      borderRadius: "4px",
      fontSize: "1rem",
      cursor: "pointer",
      textAlign: "center",
      transition: "background-color 0.3s ease",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "space-between",
      gap: "1rem",  // Add space between buttons
    },
    buttonHover: {
      backgroundColor: "#2980b9",
    },
  };

  return (
    <div
      style={{
        paddingTop: "120px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div style={styles.container}>
        {message && <p style={styles.message}>{message}</p>}
        <h2 style={styles.title}>Update Student</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div>
            <input
              type="number"
              name="id"
              value={student.id}
              onChange={handleChange}
              placeholder="ID"
              style={styles.inputField}
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="name"
              value={student.name}
              onChange={handleChange}
              placeholder="Full Name"
              style={styles.inputField}
              required
            />
          </div>
          <div>
            <select
              name="gender"
              value={student.gender}
              onChange={handleChange}
              style={styles.selectField}
              required
            >
              <option value="">---Select Gender---</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHERS">Others</option>
            </select>
          </div>
          <div>
            <select
              name="department"
              value={student.department}
              onChange={handleChange}
              style={styles.selectField}
              required
            >
              <option value="">---Select Department---</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="CS&I">CS&IT</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              name="program"
              value={student.program}
              onChange={handleChange}
              placeholder="Program"
              style={styles.inputField}
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="semester"
              value={student.semester}
              onChange={handleChange}
              placeholder="Semester"
              style={styles.inputField}
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="year"
              value={student.year}
              onChange={handleChange}
              placeholder="Year"
              style={styles.inputField}
              required
            />
          </div>
          <div>
            <input
              type="date"
              name="dob"
              value={student.dob}
              onChange={handleChange}
              style={styles.inputField}
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={student.email}
              onChange={handleChange}
              placeholder="Email"
              style={styles.inputField}
              required
            />
          </div>
          <div>
            <input
              type="number"
              name="contact"
              value={student.contact}
              onChange={handleChange}
              placeholder="Contact"
              style={styles.inputField}
              required
            />
          </div>
          
          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.button}>
              Update
            </button>
            <button type="reset" style={styles.button}>
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
