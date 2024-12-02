import { useState } from 'react';
import axios from 'axios';

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
    e.preventDefault(); // Prevent form from refreshing the page
    try {
      const response = await axios.post('http://localhost:2025/addfaculty', faculty);
      if (response.status === 200) {
        setMessage(response.data);  // Show success message
        setFaculty({
          username: '',
          password: '',
          email: '',
        }); // Clear form
      }
    } catch (error) {
      console.log(error.message); // Debugging
      setMessage(error.message);  // Show error message
    }
  };

  return (
    <div>
      <nav> </nav>
      <div className="content">
        {message && <p>{message}</p>}
        <h2 className="ul">Add New Faculty</h2>
        <div className="design">
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="form-group">
              <input
                type="text"
                name="username"
                value={faculty.username}
                onChange={handleChange}
                placeholder="Enter Username"
                required
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <input
                type="password"
                name="password"
                value={faculty.password}
                onChange={handleChange}
                placeholder="Enter Password"
                required
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={faculty.email}
                onChange={handleChange}
                placeholder="Enter Email"
                required
              />
            </div>

            {/* Submit and Reset Buttons */}
            <div className="button-group">
              <button type="submit">Add Faculty</button>
              <button type="reset">Clear</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
