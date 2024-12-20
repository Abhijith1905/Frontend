import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../config";

import ProjectMedia from './ProjectMedia';
import MediaModal from './MediaModal';
import SProjectDetails from './ProjectDetails';

const Button = ({ label, onClick }) => {
  // Only render button if it's not "Generate Report" or "Grade"
  if (label === "Generate Report" || label === "Grade") {
    return null; // Do not render the button
  }

  return (
    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={onClick}>
      {label}
    </button>
  );
};

function ViewProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState(null);
  const [projectImage, setProjectImage] = useState(null);
  const [projectFile, setProjectFile] = useState(null);
  const [error, setError] = useState(null);
  const [mediaUrls, setMediaUrls] = useState({});
  const [modalMedia, setModalMedia] = useState(null);
  const [modalType, setModalType] = useState('');
  const [zipUrl, setZipUrl] = useState(null);

  useEffect(() => {
    document.body.style.display = 'flex';
    document.body.style.flexDirection = 'column';
    document.body.style.justifyContent = 'flex-start';
    document.body.style.minHeight = '100vh';

    const fetchProjectData = async () => {
      try {
        const response = await axios.get(`${config.url}/displayproject?projectId=${id}`);
        setProjectData(response.data);
      } catch (error) {
        setError(error.message);
        toast.error(`Error fetching project: ${error.message}`, {
          position: "top-center",
          autoClose: 5000,
        });
      }
    };
    fetchProjectData();

    return () => {
      document.body.style = '';
    };
  }, [id]);

  useEffect(() => {
    if (projectData) {
      axios.get(`${config.url}/displayprojectimage?projectId=${id}`, { responseType: 'blob' })
        .then((response) => setProjectImage(URL.createObjectURL(response.data)))
        .catch((error) => console.error('Error fetching project image:', error));

      axios.get(`${config.url}/displayprojectfile?projectId=${id}`, { responseType: 'blob' })
        .then((response) => setProjectFile(URL.createObjectURL(response.data)))
        .catch((error) => console.error('Error fetching project file:', error));

      if (projectData.mediaList) {
        const fetchMediaUrls = async () => {
          const mediaPromises = projectData.mediaList.map(async (mediaItem) => {
            try {
              const response = await axios.get(
                `${config.url}/displaymedia?id=${mediaItem.mediaId}`,
                { responseType: 'blob' }
              );
              const mediaUrl = URL.createObjectURL(response.data);
              return { mediaId: mediaItem.mediaId, mediaUrl, mediaType: mediaItem.mediaType };
            } catch (error) {
              console.error('Error fetching media:', error);
              return { mediaId: mediaItem.mediaId, mediaUrl: null };
            }
          });

          const mediaResults = await Promise.all(mediaPromises);
          const mediaUrls = mediaResults.reduce((acc, { mediaId, mediaUrl, mediaType }) => {
            acc[mediaId] = { mediaUrl, mediaType };
            return acc;
          }, {});

          setMediaUrls(mediaUrls);

          const zipFile = projectData.mediaList.find(
            (mediaItem) => mediaItem.mediaType === 'zip'
          );
          if (zipFile) {
            const zipResponse = await axios.get(
              `${config.url}/displaymedia?id=${zipFile.mediaId}`,
              { responseType: 'blob' }
            );
            setZipUrl(URL.createObjectURL(zipResponse.data));
          }
        };
        fetchMediaUrls();
      }
    }
  }, [projectData, id]);

  const handleUpdateProject = async () => {
    try {
      await axios.put(`${config.url}/updateproject`, projectData);
      toast.success("Project updated successfully!", { position: "top-center", autoClose: 3000 });
    } catch (error) {
      toast.error(`Error updating project: ${error.message}`, {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };

  const handleSubmitForReview = async () => {
    try {
      await axios.put(`${config.url}/updateproject`, projectData);
      toast.success("Project submitted for review!", { position: "top-center", autoClose: 3000 });
    } catch (error) {
      toast.error(`Error submitting project: ${error.message}`, {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };

  const handleReportGeneration = () => {
    window.open(`${config.url}/viewreport?projectId=${id}`, '_blank');
  };

  const openModal = (mediaUrl, type) => {
    setModalMedia(mediaUrl);
    setModalType(type);
  };

  if (error) return <div className="text-red-600 p-4">Error: {error}</div>;
  if (!projectData) return <div className="text-gray-600 p-4">Loading...</div>;

  return (
    <div style={{ paddingTop: "100px" }} className="max-w-7xl mx-auto px-4 py-8 flex flex-col">
      <SProjectDetails
        projectData={projectData}
        handleInputChange={(e, field) =>
          setProjectData((prev) => ({ ...prev, [field]: e.target.value })) }
        handleCheckStatusChange={() =>
          setProjectData((prev) => ({ ...prev, checkStatus: !prev.checkStatus })) }
        handleUpdateProject={handleUpdateProject}
        handleSubmitForReview={handleSubmitForReview}
        handleReportGeneration={handleReportGeneration}
        navigateToUploadMedia={() => navigate(`/uploadmedia/${id}`)}
        projectImage={projectImage}
        projectFile={projectFile}
        zipUrl={zipUrl}
        openModal={openModal}
      />

      <Button label="Generate Report" onClick={handleReportGeneration} />
      <Button label="Track" onClick={() => navigate(`/trackproject/${id}`)} />
      <Button label="Grade" onClick={() => console.log("Grading project")} />
    </div>
  );
}

export default ViewProject;
