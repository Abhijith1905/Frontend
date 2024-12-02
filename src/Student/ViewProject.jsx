import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import ProjectMedia from './ProjectMedia';
import MediaModal from './MediaModal';
import SProjectDetails from './ProjectDetails';

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
    // Adjust the body's layout on component mount
    document.body.style.display = 'flex';
    document.body.style.flexDirection = 'column';
    document.body.style.justifyContent = 'flex-start'; // Adjust the alignment here
    document.body.style.minHeight = '100vh'; // Ensure the body takes the full viewport height

    // Fetch the project data
    const fetchProjectData = async () => {
      try {
        const response = await axios.get(`http://localhost:2025/displayproject?projectId=${id}`);
        setProjectData(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchProjectData();

    return () => {
      // Clean up by resetting the body's style when the component unmounts
      document.body.style = '';
    };
  }, [id]);

  useEffect(() => {
    if (projectData) {
      // Fetch project image
      axios.get(`http://localhost:2025/displayprojectimage?projectId=${id}`, { responseType: 'blob' })
        .then((response) => {
          setProjectImage(URL.createObjectURL(response.data));
        })
        .catch((error) => console.error('Error fetching project image:', error));

      // Fetch project file
      axios.get(`http://localhost:2025/displayprojectfile?projectId=${id}`, { responseType: 'blob' })
        .then((response) => {
          setProjectFile(URL.createObjectURL(response.data));
        })
        .catch((error) => console.error('Error fetching project file:', error));

      // Fetch media URLs
      if (projectData.mediaList) {
        const fetchMediaUrls = async () => {
          const mediaPromises = projectData.mediaList.map(async (mediaItem) => {
            try {
              const response = await axios.get(
                `http://localhost:2025/displaymedia?id=${mediaItem.mediaId}`,
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

          // Check if ZIP exists and fetch its URL
          const zipFile = projectData.mediaList.find(
            (mediaItem) => mediaItem.mediaType === 'zip'
          );
          if (zipFile) {
            const zipResponse = await axios.get(
              `http://localhost:2025/displaymedia?id=${zipFile.mediaId}`,
              { responseType: 'blob' }
            );
            setZipUrl(URL.createObjectURL(zipResponse.data));
          }
        };
        fetchMediaUrls();
      }
    }
  }, [projectData, id]);

  const handleInputChange = (e, field) => {
    setProjectData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  const handleUpdateProject = async () => {
    try {
      await axios.put(`http://localhost:2025/updateproject`, projectData);
      alert('Project updated successfully!');
    } catch (error) {
      console.error('Error updating project:', error.message);
    }
  };

  const handleCheckStatusChange = () => {
    setProjectData({
      ...projectData,
      checkStatus: !projectData.checkStatus,
    });
  };

  const handleSubmitForReview = async () => {
    try {
      await axios.put(`http://localhost:2025/updateproject`, projectData);
      alert('Project submitted for review!');
    } catch (error) {
      console.error('Error updating project:', error.message);
    }
  };

  const handleReportGeneration = () => {
    window.open(`http://localhost:2025/viewreport?projectId=${id}`, '_blank');
  };

  const openModal = (mediaUrl, type) => {
    setModalMedia(mediaUrl);
    setModalType(type);
  };

  if (error) return <div className="text-red-600 p-4">Error: {error}</div>;
  if (!projectData) return <div className="text-gray-600 p-4">Loading...</div>;

  return (
    <div style={{paddingTop:"100px"}} className="max-w-7xl mx-auto px-4 py-8 flex flex-col">
      {/* Project Details Section */}
      <SProjectDetails
        projectData={projectData}
        handleInputChange={handleInputChange}
        handleCheckStatusChange={handleCheckStatusChange}
        handleUpdateProject={handleUpdateProject}
        handleSubmitForReview={handleSubmitForReview}
        handleReportGeneration={handleReportGeneration}
        navigateToUploadMedia={() => navigate(`/uploadmedia/${id}`)}
        projectImage={projectImage}
        projectFile={projectFile}
        zipUrl={zipUrl}
        openModal={openModal}
      />

      {/* Media Sections */}
      <div className="space-y-8 mt-6">
        {['image', 'pdf', 'text'].map((mediaType) => {
          const mediaItems = projectData.mediaList?.filter((item) =>
            item.mediaType.includes(mediaType)
          );

          if (!mediaItems?.length) return null;

          return (
            <div key={mediaType} className="mb-8">
              <h3 className="text-xl font-semibold text-indigo-900 mb-4">
                Project {mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}s
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mediaItems.map((mediaItem) => {
                  const media = mediaUrls[mediaItem.mediaId];
                  if (!media?.mediaUrl) return null;

                  return (
                    <ProjectMedia
                      key={mediaItem.mediaId}
                      mediaUrl={media.mediaUrl}
                      mediaType={media.mediaType}
                      onClick={() => openModal(media.mediaUrl, media.mediaType)}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ViewProject;
