import React, { useState } from 'react';
import axios from 'axios';
import styles from "./admin.module.css"

export default function AddFaculty() {
  const [faculty, setFaculty] = useState({
    username: '',
    password: '',
    email: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFaculty({ ...faculty, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2025/addfaculty', faculty);
      if (response.status === 200) {
        setMessage(response.data);
        setFaculty({
          username: '',
          password: '',
          email: '',
        });
      }
    } catch (error) {
      console.log(error.message);
      setMessage(error.message);
    }
  };

  return (
    <div style={{paddingTop:"120px"}} className={styles.container}>
      <div className={styles.content}>
        {message && <p className={`${styles.message} ${message.includes('error') ? styles.error : styles.success}`}>{message}</p>}
  
        <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Add New Faculty</h2>
          <div className={styles.formGroup}>
            <input
              type="text"
              name="username"
              value={faculty.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <input
              type="password"
              name="password"
              value={faculty.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <input
              type="email"
              name="email"
              value={faculty.email}
              onChange={handleChange}
              placeholder="Enter Email"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.buttonGroup}>
            <button type="submit" className={`${styles.button} ${styles.submitButton}`}>Add Faculty</button>
            <button type="reset" className={`${styles.button} ${styles.resetButton}`}>Clear</button>
          </div>
        </form>
      </div>
    </div>
  );
}