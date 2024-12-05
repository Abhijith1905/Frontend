import { useState } from 'react';
import axios from 'axios';

export default function AddFacultyList() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    if (!file) {
      setMessage("Please select a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setMessage("Faculty added successfully!");

    try {
      const response = await axios.post('http://localhost:2025/addfacultylist', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Check if response data is an object or string and handle accordingly
      if (typeof response.data === 'object') {
        // setMessage(JSON.stringify(response.data));  // Convert object to string
      } else {
        // setMessage(response.data);  // Directly set message if it's a string
      }
    } catch (error) {
    //   setMessage(error.response?.data?.message || error.message);  // Show error message
    }
  };

  return (
    <div>
      <nav></nav>
      <div className="content">
        {message && <p>{message}</p>}
        <h2 className="ul">Add Faculty from CSV</h2>
        <div className="design">
          <form onSubmit={handleSubmit}>
            {/* File Input */}
            <div className="form-group">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="button-group">
              <button type="submit">Upload Faculty CSV</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
