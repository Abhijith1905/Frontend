import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


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

  const styles = {
    table: {
      backgroundColor: 'white',
    },
  };

  return (
    <div>
      <nav> </nav>
      <div className="content">
        <h2 className="ul">View Faculty</h2>

        {Faculty.length > 0 ? (
          <table className="table" style={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>User Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {Faculty.map((faculty) => (
                <tr key={faculty.id}>
                  <td>{faculty.id}</td>
                  <td>{faculty.username}</td>
                  <td>{faculty.email}</td>
                    <td>
                        <button onClick={() => deleteFaculty(faculty.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <p>No Faculty found</p>
        )}
      </div>
    </div>
  );
}
