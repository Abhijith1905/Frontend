import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from "./admin.module.css"; // Use the same CSS file for styling

export default function ViewFaculty() {
  const [Faculty, setFaculty] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchFaculty = async () => {
    try {
      const response = await axios.get('http://localhost:2025/viewallfaculty');
      setFaculty(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteFaculty = async (id) => {
    try {
      await axios.delete(`http://localhost:2025/deletefaculty?id=${id}`);
      fetchFaculty();
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 style={{paddingTop:"70px"}} className={styles.title}>Faculty</h2>

        {Faculty.length > 0 ? (
          <div className={styles.tableContainer}>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.th}>ID</th>
                    <th className={styles.th}>User Name</th>
                    <th className={styles.th}>Email</th>
                    <th className={styles.th}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Faculty.map((faculty) => (
                    <tr key={faculty.id} className={styles.tr}>
                      <td className={styles.td}>{faculty.id}</td>
                      <td className={styles.td}>{faculty.username}</td>
                      <td className={styles.td}>{faculty.email}</td>
                      <td className={styles.td}>
                        <div className={styles.buttonGroup}>
                          <button
                            onClick={() => deleteFaculty(faculty.id)}
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
          <p className={styles.message}>No Faculty found</p>
        )}
      </div>
    </div>
  );
}
