import { useState } from 'react';
import axios from 'axios';
import styles from "./admin.module.css"; // Assuming you're using the same CSS file

export default function UpdateFaculty() {
  const [faculty, setFaculty] = useState({
    id: '',
    username: '',
    password: '',
    email: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFaculty({ ...faculty, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    try {
      const response = await axios.put('http://localhost:2025/updatefaculty', faculty);
      if (response.status === 200) {
        setMessage(response.data);  // Show success message
        setFaculty({
          id: '',
          username: '',
          password: '',
          email: '',
        });  // Clear form after successful update
      }
    } catch (error) {
      console.log(error.message);  // Debugging
      setMessage(error.message);  // Show error message
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
       
        
        {message && (
          <p className={`${styles.message} ${styles.error}`}>{message}</p>
        )}

        <div style={{paddingTop:"60px"}} className={styles.formWrapper}>
          <form onSubmit={handleSubmit} className={styles.form}>
          <h2  className={styles.title}>Update Faculty</h2>
            {/* Faculty ID */}
            <div className={styles.inputGroup}>
              <input
                type="number"
                name="id"
                value={faculty.id}
                onChange={handleChange}
                placeholder="Faculty ID"
                className={styles.input}
                required
              />
            </div>

            {/* Username */}
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="username"
                value={faculty.username}
                onChange={handleChange}
                placeholder="Username"
                className={styles.input}
                required
              />
            </div>

            {/* Password */}
            <div className={styles.inputGroup}>
              <input
                type="password"
                name="password"
                value={faculty.password}
                onChange={handleChange}
                placeholder="Password"
                className={styles.input}
                required
              />
            </div>

            {/* Email */}
            <div className={styles.inputGroup}>
              <input
                type="email"
                name="email"
                value={faculty.email}
                onChange={handleChange}
                placeholder="Email"
                className={styles.input}
                required
              />
            </div>

            {/* Submit and Reset Buttons */}
            <div className={styles.buttonGroup}>
              <button type="submit" className={`${styles.button} ${styles.submitButton}`}>
                Update Faculty
              </button>
              <button type="reset" className={`${styles.button} ${styles.clearButton}`}>
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
