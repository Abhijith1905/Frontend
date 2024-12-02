import { useState } from 'react';
import axios from 'axios';

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
    <div>
      <nav> </nav>
      {message && (
        <p style={{ color: 'red', fontWeight: 'bolder' }}>{message}</p>
      )}
      <h2 style={{ paddingTop: '120px' }} className="ul">Update Faculty</h2>
      <div className="design">
        <form onSubmit={handleSubmit}>
          {/* Faculty ID */}
          <div>
            <input
              type="number"
              name="id"
              value={faculty.id}
              onChange={handleChange}
              placeholder="Faculty ID"
              required
            />
          </div>

          {/* Username */}
          <div>
            <input
              type="text"
              name="username"
              value={faculty.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              value={faculty.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              value={faculty.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>

          {/* Submit and Reset Buttons */}
          <div className="button-group">
            <button type="submit">Update Faculty</button>
            <button type="reset">Clear</button>
          </div>
        </form>
      </div>
    </div>
  );
}
