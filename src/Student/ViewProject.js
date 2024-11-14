import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewProject = () => {
  const { id } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [projectImage, setProjectImage] = useState(null);
  const [projectFile, setProjectFile] = useState(null);
  const [error, setError] = useState(null);
  const [mediaUrls, setMediaUrls] = useState({});
  const [modalMedia, setModalMedia] = useState(null);
  const [modalType, setModalType] = useState("");
  const [zipUrl, setZipUrl] = useState(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await axios.get(`http://localhost:2025/displayproject?projectId=${id}`);
        setProjectData(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchProjectData();
  }, [id]);

  const handleInputChange = (e, field) => {
    setProjectData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  const handleUpdateProject = async () => {
    try {
      await axios.put(`http://localhost:2025/updateproject`, projectData); // Assuming a PUT endpoint for updating
      alert('Project updated successfully!');
    } catch (error) {
      console.error('Error updating project:', error.message);
    }
  };

  const handleCheckStatusChange = () => {
    setProjectData({
      ...projectData,
      checkStatus: !projectData.checkStatus, // Toggle the checkStatus value
    });
  };

  const handleSubmitForReview = async () => {
    try {
      await axios.put(`http://localhost:2025/updateproject`, projectData); // Assuming a PUT endpoint for updating
      alert('Project submitted for review!');
    } catch (error) {
      console.error('Error updating project:', error.message);
    }
  };

  useEffect(() => {
    if (projectData) {
      axios.get(`http://localhost:2025/displayprojectimage?projectId=${id}`, { responseType: "blob" })
        .then((response) => {
          setProjectImage(URL.createObjectURL(response.data));
        })
        .catch((error) => console.error("Error fetching project image:", error));
    }
  }, [projectData, id]);

  useEffect(() => {
    if (projectData) {
      axios.get(`http://localhost:2025/displayprojectfile?projectId=${id}`, { responseType: "blob" })
        .then((response) => {
          setProjectFile(URL.createObjectURL(response.data));
        })
        .catch((error) => console.error("Error fetching project file:", error));
    }
  }, [projectData, id]);

  useEffect(() => {
    if (projectData && projectData.mediaList) {
      const fetchMediaUrls = async () => {
        const mediaPromises = projectData.mediaList.map(async (mediaItem) => {
          try {
            const response = await axios.get(
              `http://localhost:2025/displaymedia?id=${mediaItem.mediaId}`,
              { responseType: "blob" }
            );
            const mediaUrl = URL.createObjectURL(response.data);
            return { mediaId: mediaItem.mediaId, mediaUrl, mediaType: mediaItem.mediaType };
          } catch (error) {
            console.error("Error fetching media:", error);
            return { mediaId: mediaItem.mediaId, mediaUrl: null };
          }
        });

        const mediaResults = await Promise.all(mediaPromises);
        const mediaUrls = mediaResults.reduce((acc, { mediaId, mediaUrl, mediaType }) => {
          acc[mediaId] = { mediaUrl, mediaType };
          return acc;
        }, {});

        setMediaUrls(mediaUrls);

        // Check if ZIP exists and fetch its URL
        const zipFile = projectData.mediaList.find(
          (mediaItem) => mediaItem.mediaType === "zip"
        );
        if (zipFile) {
          const zipResponse = await axios.get(
            `http://localhost:2025/displaymedia?id=${zipFile.mediaId}`,
            { responseType: "blob" }
          );
          setZipUrl(URL.createObjectURL(zipResponse.data));
        }
      };
      fetchMediaUrls();
    }
  }, [projectData]);

  const renderMedia = (mediaId, mediaType) => {
    const mediaUrl = mediaUrls[mediaId]?.mediaUrl;
    if (!mediaUrl) return <p>Loading media...</p>;

    return (
      <div
        style={{
          margin: "15px",
          cursor: "pointer",
          display: "inline-block",
          width: "250px",
          backgroundColor: "#f4f4f4",
          borderRadius: "15px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          padding: "10px",
          textAlign: "center",
          transition: "transform 0.3s ease-in-out",
        }}
        onClick={() => openModal(mediaUrl, mediaType)}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
      >
        {mediaType.includes("image") ? (
          <img
            src={mediaUrl}
            alt="Project Media"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
            }}
          />
        ) : mediaType === "pdf" || mediaType.includes("text") ? (
          <iframe
            src={mediaUrl}
            width="90%"  // Adjust this value to make the iframe larger or smaller
            height="80%" // Adjust this value to make the iframe taller or shorter
            title="PDF or Text Media"
            style={{
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          />
        ) : null}
        <p style={{ color: "#4a4a75", marginTop: "10px" }}>
          Click to view {mediaType === "pdf" ? "PDF" : mediaType.includes("text") ? "text" : "image"}
        </p>
      </div>
    );
  };

  const openModal = (mediaUrl, type) => {
    setModalMedia(mediaUrl);
    setModalType(type);
  };

  const closeModal = () => {
    setModalMedia(null);
    setModalType("");
  };

  if (error) return <p>Error: {error}</p>;
  if (!projectData) return <p>Loading...</p>;

  return (
    <div className="content">
      {/* Project Details Table - Vertical Layout */}
      <h2 style={{ color: "#4a4a75", textAlign: "center" }}>Project Details</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px",
          backgroundColor: "#e6e6e6",
          color: "#4a4a75",
        }}
      >
        <tbody>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "12px", fontWeight: "bold" }}>Title</td>
            <td style={{ border: "1px solid #ddd", padding: "12px" }}>
              <input
                type="text"
                value={projectData.title || ""}
                onChange={(e) => handleInputChange(e, "title")}
                style={{ width: "100%", padding: "8px" }}
              />
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "12px", fontWeight: "bold" }}>Idea of Project</td>
            <td style={{ border: "1px solid #ddd", padding: "12px" }}>
              <textarea
                value={projectData.description || ""}
                onChange={(e) => handleInputChange(e, "description")}
                style={{ width: "100%", padding: "8px" }}
              />
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "12px", fontWeight: "bold" }}>Phase</td>
            <td style={{ border: "1px solid #ddd", padding: "12px" }}>
              <select
                value={projectData.phase || ""}
                onChange={(e) => handleInputChange(e, "phase")}
                style={{ width: "100%", padding: "8px" }}
              >
                <option value="NOT_STARTED">Not Started</option>
                <option value="ACTIVE">Active</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "12px", fontWeight: "bold" }}>Project Icon</td>
            <td style={{ border: "1px solid #ddd", padding: "12px" }}>
              {projectImage && (
                <center>
                <button
                  onClick={() => openModal(projectImage, "image")}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                  }}
                >
                  View
                </button>
                </center>
              )}
            </td>
          </tr>
          <tr>
  <td style={{ border: "1px solid #ddd", padding: "12px", fontWeight: "bold" }}>Description</td>
  <td style={{ border: "1px solid #ddd", padding: "12px" }}>
    {projectFile && (
      <center>
      <button
        onClick={() => openModal(projectFile, "text")}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "8px",
        }} >
      
        View
      </button>
      </center>
    )}
  </td>
</tr>

        { (
      <tr>
        <td style={{ border: "1px solid #ddd", padding: "12px", fontWeight: "bold" }}>
          Download ZIP
        </td>
        <td style={{ border: "1px solid #ddd", padding: "12px", textAlign: "center" }}>
          <center>
          <button
            onClick={() => window.location.href = zipUrl}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Download
          </button>
          </center>
        </td>
      </tr>
      
    )}

<tr>
          <td style={{ border: "1px solid #ddd", padding: "12px", fontWeight: "bold" }}>
            Submit for Review
          </td>
          <td style={{ border: "1px solid #ddd", padding: "12px" }}>
            <label>
              <input
                type="checkbox"
                checked={projectData.checkStatus}
                onChange={handleCheckStatusChange}
                style={{ marginRight: "10px" }}
              />
              Check to submit for review
            </label>
          </td>
        </tr>
        <tr>
          <td colSpan="2" style={{ padding: "12px" }}>
            <button
              onClick={handleSubmitForReview}
              style={{
                padding: "10px 20px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "8px",
              }}
            >
              Submit for Review
            </button>
          </td>
        </tr>
        
      
</tbody>
</table>
<center>
<button
  onClick={handleUpdateProject}
  style={{
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  Save Changes
</button>
</center>

{/* Media Section for Images */}
<div style={{ marginBottom: "20px", textAlign: "center" }}>
  <h3>Project Images</h3>
  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
    {projectData.mediaList &&
      projectData.mediaList
        .filter((item) => item.mediaType.includes("image"))
        .map((mediaItem) => {
          const { mediaId, mediaType } = mediaItem;
          return (
            <div key={mediaId} style={{ margin: "10px" }}>
              {renderMedia(mediaId, mediaType)}
            </div>
          );
        })}
  </div>
</div>

{/* Media Section for Documents */}
<div style={{ marginBottom: "20px", textAlign: "center" }}>
  <h3>Project Documents</h3>
  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
    {projectData.mediaList &&
      projectData.mediaList
        .filter((item) => item.mediaType.includes("pdf"))
        .map((mediaItem) => {
          const { mediaId, mediaType } = mediaItem;
          return (
            <div key={mediaId} style={{ margin: "10px" }}>
              {renderMedia(mediaId, mediaType)}
            </div>
          );
        })}
  </div>
</div>

{/* Media Section for Text Files */}
<div style={{ marginBottom: "20px", textAlign: "center" }}>
  <h3>Project Text Files</h3>
  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
    {projectData.mediaList &&
      projectData.mediaList
        .filter((item) => item.mediaType.includes("text"))
        .map((mediaItem) => {
          const { mediaId, mediaType } = mediaItem;
          return (
            <div key={mediaId} style={{ margin: "10px" }}>
              {renderMedia(mediaId, mediaType)}
            </div>
          );
        })}
  </div>
</div>

{/* Modal for Viewing Media */}
{modalMedia && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    }}
    onClick={closeModal}
  >
    <div
      style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "10px",
        maxWidth: "80%",
        maxHeight: "80%",
        overflow: "auto",
      }}
      onClick={(e) => e.stopPropagation()} // Prevent closing on click inside modal
    >
      {modalType === "image" ? (
        <img
          src={modalMedia}
          alt="Media"
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "8px",
          }}
        />
      ) : modalType === "text" ? (
        <iframe
          src={modalMedia}
          width="100%"
          height="500px"
          title="Text File"
          style={{
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        />
      ) : modalType === "pdf" ? (
        <iframe
          src={modalMedia}
          width="100%" // Make it responsive within the modal container
          height="600px" // Adjust height for readability
          title="PDF"
          style={{
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        />
      ) : null}
      <button
        onClick={closeModal}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          backgroundColor: "#f44336",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Close
      </button>
    </div>
  </div>
)}
</div>
  );
};

export default ViewProject;