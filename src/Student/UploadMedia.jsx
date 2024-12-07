import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../config";
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
      await axios.post(`${config.url}/addmedia`, formData, {
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

  // Inline CSS styles
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f4f4f9",
    },
    card: {
      background: "#ffffff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      maxWidth: "400px",
      width: "100%",
    },
    title: {
      textAlign: "center",
      color: "#4a4a75",
      fontSize: "24px",
      marginBottom: "20px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      marginBottom: "5px",
      fontSize: "14px",
      color: "#333",
    },
    select: {
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    input: {
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    errorMessage: {
      color: "red",
      fontSize: "14px",
      textAlign: "center",
    },
    button: {
      backgroundColor: "#4a4a75",
      color: "white",
      padding: "10px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
    },
    buttonHover: {
      backgroundColor: "#363657",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Upload Media for Project {id}</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="mediaType" style={styles.label}>
              Media Type:
            </label>
            <select
              id="mediaType"
              value={mediaType}
              onChange={handleTypeChange}
              required
              style={styles.select}
            >
              <option value="">Select a Media Type</option>
              <option value="image">Image</option>
              <option value="text">Text</option>
              <option value="pdf">PDF</option>
              <option value="zip">ZIP</option>
              <option value="video">Video</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="mediaFile" style={styles.label}>
              Choose Media File:
            </label>
            <input
              type="file"
              id="mediaFile"
              onChange={handleFileChange}
              required
              style={styles.input}
            />
          </div>
          {errorMessage && (
            <div style={styles.errorMessage}>{errorMessage}</div>
          )}
          <button type="submit" style={styles.button}>
            Upload Media
          </button>
        </form>
      </div>
    </div>
  );
}
