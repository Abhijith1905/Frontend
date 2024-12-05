import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UploadMedia() {
  const { id } = useParams(); // Get projectId from the URL
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaType, setMediaType] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // For error messages
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setMediaFile(e.target.files[0]);
    setErrorMessage(""); // Clear any previous error message when a new file is selected
  };

  const handleTypeChange = (e) => {
    setMediaType(e.target.value);
    setErrorMessage(""); // Clear any previous error message when a new media type is selected
  };

  const validateFileType = () => {
    if (!mediaFile) return true; // If no file selected, no validation needed

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
      return; // Stop the form submission if file validation fails
    }

    if (!mediaFile || !mediaType) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("project", id); // Append the projectId to the form data
    formData.append("type", mediaType);
    formData.append("media", mediaFile);

    try {
      await axios.post(`http://localhost:2025/addmedia`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Media uploaded successfully!", {
        position: "top-center",
        autoClose: 3000,
      });

      navigate(`/viewproject/${id}`); // Redirect back to the project view
    } catch (error) {
      console.error("Error uploading media:", error);

      toast.error("Error uploading media. Please try again later.", {
        position: "top-center",
        autoClose: 5000,
      });
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
          <button
            style={{ backgroundColor: "#4a4a75", color: "white" }}
            type="submit"
            className="submit-button"
          >
            Upload Media
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
