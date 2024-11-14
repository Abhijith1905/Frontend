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
      pdf: ["pdf","docx"],
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
    <div style={{ padding: "20px" }}>
      <h2>Upload Media for Project {id}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="mediaType">Media Type:</label>
          <select
            id="mediaType"
            value={mediaType}
            onChange={handleTypeChange}
            required
          >
            <option value="">Select a Media Type</option>
            <option value="image">Image</option>
            <option value="text">Text</option>
            <option value="pdf">PDF</option>
            <option value="zip">ZIP</option>
            <option value="video">Video</option>
          </select>
        </div>
        <div>
          <label htmlFor="mediaFile">Choose Media File:</label>
          <input
            type="file"
            id="mediaFile"
            onChange={handleFileChange}
            required
          />
        </div>
        {errorMessage && (
          <div style={{ color: "red", marginTop: "10px" }}>{errorMessage}</div>
        )}
        <button type="submit">Upload Media</button>
      </form>
    </div>
  );
}
