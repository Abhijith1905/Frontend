import { useState } from 'react';
import axios from 'axios';
import styles from "./admin.module.css";

export default function AddStudent() {
  const [student, setStudent] = useState({
    fullName: '',
    gender: '',
    department: '',
    program: '',
    semester: '',
    year: '',
    dateOfBirth: '',
    password: '',
    email: '',
    contact: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2025/addstudent', student);
      if (response.status === 200) {
        setMessage(response.data);
        setStudent({
          fullName: '',
          gender: '',
          department: '',
          program: '',
          semester: '',
          year: '',
          dateOfBirth: '',
          password: '',
          email: '',
          contact: '',
        });
      }
    } catch (error) {
      console.log(error.message);
      setMessage(error.message);
    }
  };

  return (
    <div style={{ paddingTop: "120px" }} className={styles.container}>
      <div className={styles.content}>
        {message && <p className={`${styles.message} ${message.includes('error') ? styles.error : styles.success}`}>{message}</p>}
       
        <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Add New Student</h2>
          {/* Full Name */}
          <div className={styles.formGroup}>
            <input
              type="text"
              name="fullName"
              value={student.fullName}
              onChange={handleChange}
              placeholder="Enter Full Name"
              className={styles.input}
              required
            />
          </div>

          {/* Gender */}
          <div className={styles.formGroup}>
            <select
              name="gender"
              value={student.gender}
              onChange={handleChange}
              className={styles.select}
              required
            >
              <option value="">---Select Gender---</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHERS">Others</option>
            </select>
          </div>

          {/* Department */}
          <div className={styles.formGroup}>
            <select
              name="department"
              value={student.department}
              onChange={handleChange}
              className={styles.select}
              required
            >
              <option value="">---Select Department---</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="CSIT">CS&IT</option>
            </select>
          </div>

          {/* Program */}
          <div className={styles.formGroup}>
            <input
              type="text"
              name="program"
              value={student.program}
              onChange={handleChange}
              placeholder="Enter Program"
              className={styles.input}
              required
            />
          </div>

          {/* Semester */}
          <div className={styles.formGroup}>
            <input
              type="text"
              name="semester"
              value={student.semester}
              onChange={handleChange}
              placeholder="Enter Semester"
              className={styles.input}
              required
            />
          </div>

          {/* Year */}
          <div className={styles.formGroup}>
            <input
              type="number"
              name="year"
              value={student.year}
              onChange={handleChange}
              placeholder="Enter Year"
              className={styles.input}
              required
            />
          </div>

          {/* Date of Birth */}
          <div className={styles.formGroup}>
            <input
              type="date"
              name="dateOfBirth"
              value={student.dateOfBirth}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          {/* Password */}
          <div className={styles.formGroup}>
            <input
              type="password"
              name="password"
              value={student.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className={styles.input}
              required
            />
          </div>

          {/* Email */}
          <div className={styles.formGroup}>
            <input
              type="email"
              name="email"
              value={student.email}
              onChange={handleChange}
              placeholder="Enter Email"
              className={styles.input}
              required
            />
          </div>

          {/* Contact */}
          <div className={styles.formGroup}>
  <input
    type="text"
    name="contact"
    value={student.contact}
    onChange={handleChange}
    placeholder="Enter Contact Number"
    className={styles.input}
    pattern="^[6-9]\d{9}$"
    title="Please enter a valid 10-digit phone number starting with 6-9."
    required
  />
  </div>

          {/* Submit and Reset Buttons */}
          <center> >
            <button type="submit" className={`${styles.button} ${styles.submitButton}`}>Add Student</button>
           
         </center>
         
        </form>
      </div>
    </div>
  );
}
