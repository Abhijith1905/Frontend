import { useState } from "react";
import axios from "axios";

export default function AddStudentList() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    setMessage("Students added successfully!");

    try {
      const response = await axios.post(
        "http://localhost:2025/addstudentlist",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    //   setMessage(response.data);
    } catch (error) {
    //   console.log(error.message); // For debugging
    //   setMessage("Error uploading file: " + error.message);
    }
  };

  return (
    <div>
      <h2>Upload Students via CSV</h2>
      <form onSubmit={handleUpload}>
        <div className="form-group">
          <input type="file" onChange={handleFileChange} accept=".csv" required />
        </div>
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
