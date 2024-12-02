import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UploadMedia() {
  const { id } = useParams();  // Get projectId from the URL
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaType, setMediaType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");  // For error messages
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setMediaFile(e.target.files[0]);
    setErrorMessage("");  // Clear any previous error message when a new file is selected
  };

  const handleTypeChange = (e) => {
    setMediaType(e.target.value);
    setErrorMessage("");  // Clear any previous error message when a new media type is selected
  };

  const validateFileType = () => {
    if (!mediaFile) return true;  // If no file selected, no validation needed

    const fileExtension = mediaFile.name.split(".").pop().toLowerCase();
    const validExtensions = {
      image: ["jpg", "jpeg", "png", "webp"],
      text: ["txt"],
      pdf: ["pdf", "docx"],
      zip: ["zip"],
      video: ["mp4", "avi", "mkv"],
    };

    if (validExtensions[mediaType] && !validExtensions[mediaType].includes(fileExtension)) {
      setErrorMessage(`Invalid file format. Please select a ${mediaType} file.`);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // First, validate the file type
    if (!validateFileType()) {
      return;  // Stop the form submission if file validation fails
    }

    if (!mediaFile || !mediaType) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("project", id);  // Append the projectId to the form data
    formData.append("type", mediaType);
    formData.append("media", mediaFile);

    try {
      await axios.post(`http://localhost:2025/addmedia`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Media uploaded successfully!");
      navigate(`/viewproject/${id}`);  // Redirect back to the project view
    } catch (error) {
      console.error("Error uploading media:", error);
      alert("Error uploading media");
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h2 className="title">Upload Media for Project {id}</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="mediaType" className="form-label">Media Type:</label>
            <select
              id="mediaType"
              value={mediaType}
              onChange={handleTypeChange}
              required
              className="form-select"
            >
              <option value="">Select a Media Type</option>
              <option value="image">Image</option>
              <option value="text">Text</option>
              <option value="pdf">PDF</option>
              <option value="zip">ZIP</option>
              <option value="video">Video</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="mediaFile" className="form-label">Choose Media File:</label>
            <input
              type="file"
              id="mediaFile"
              onChange={handleFileChange}
              required
              className="form-input"
            />
          </div>
          {errorMessage && (
            <div className="error-message">{errorMessage}</div>
          )}
          <button style={{  backgroundColor: "#4a4a75", color: "white"}} type="submit" className="submit-button">Upload Media</button>
        </form>
      </div>
      <style>{`
  
  .upload-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f6f9;
    padding: 20px;
  }

  .upload-card {
    background-color: #ffffff;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;
  }

  .title {
    text-align: center;
    font-size: 1.8em;
    color: #4a4a75;
    margin-bottom: 20px;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .form-label {
    font-size: 1.1em;
    color: #4a4a75;
  }

  /* Ensuring the dropdown and file input take same width */
  .form-select, .form-input {
    padding: 12px;
    font-size: 1em;
    border-radius: 6px;
    border: 1px solid #ddd;
    background-color: #f9f9fc;
    color: #4a4a75;
    width: 100%;  /* Ensure both input and select take full width */
    box-sizing: border-box;
  }

  /* Remove default file input styling (this is where the width issue comes from) */
  .form-input[type="file"] {
    width: 100%;  /* Ensure file input is the same width */
    padding: 10px;
    cursor: pointer;
    font-size: 1em;
  }

  .form-select:focus, .form-input:focus {
    border-color: #4a90e2;
    outline: none;
  }

  .submit-button {
    padding: 12px;
    font-size: 1.1em;
     backgroundColor: "#4a90e2",
    color: "white",
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s;
    width: 100%;  /* Ensure button matches the inputs width */
  }

  .submit-button:hover {
    background-color: #357abf;
  }

  .error-message {
    color: #e74c3c;
    text-align: center;
    font-size: 1.1em;
  }
`}</style>


    </div>
  );
}

