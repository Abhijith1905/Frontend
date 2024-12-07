import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './admin.module.css'; // Assuming this is your external CSS file
import config from '../config';

export default function ViewStudents() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${config.url}/viewallstudents`);
      setStudents(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${config.url}/deletestudent?id=${id}`);
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

  return (
    <div style={{ paddingTop: '90px' }} className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>View Students</h2>

        {students.length > 0 ? (
          <div className={styles.tableContainer}>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.th}>ID</th>
                    <th className={styles.th}>Full Name</th>
              
                    <th className={styles.th}>Department</th>
                    <th className={styles.th}>Program</th>
                    <th className={styles.th}>Semester</th>
                    <th className={styles.th}>Year</th>
                
                    <th className={styles.th}>Email</th>
                   
                    <th className={styles.th}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className={styles.tr}>
                      <td className={styles.td}>{student.id}</td>
                      <td className={styles.td}>{student.fullName}</td>
                
                      <td className={styles.td}>{student.department}</td>
                      <td className={styles.td}>{student.program}</td>
                      <td className={styles.td}>{student.semester}</td>
                      <td className={styles.td}>{student.year}</td>
                  
                      <td className={styles.td}>{student.email}</td>
                  
                      <td className={styles.td}>
                        <div className={styles.buttonGroup}>
                          <button
                            onClick={() => displayStudent(student.id)}
                            className={`${styles.button} ${styles.viewButton}`}
                          >
                            View
                          </button>
                          <button
                            onClick={() => deleteStudent(student.id)}
                            className={`${styles.button} ${styles.deleteButton}`}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : error ? (
          <p className={`${styles.message} ${styles.error}`}>{error}</p>
        ) : (
          <p className={styles.message}>No students found</p>
        )}
      </div>
    </div>
  );
}
