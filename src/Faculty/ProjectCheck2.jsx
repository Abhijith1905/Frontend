import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ProjectDetails from './ProjectDetails';
import MediaGallery from './MediaGallery';
import MediaModal from './MediaModal';
import ActionButtons from './ActionButtons';

const ProjectCheck2 = () => {
  const { id } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [projectImage, setProjectImage] = useState(null);
  const [projectFile, setProjectFile] = useState(null);
  const [error, setError] = useState(null);
  const [mediaUrls, setMediaUrls] = useState({});
  const [modalMedia, setModalMedia] = useState(null);
  const [modalType, setModalType] = useState("");
  const [zipUrl, setZipUrl] = useState(null);
  const navigate = useNavigate();

  const percentageEnum = {
    ZERO: 0,
    TWENTY_FIVE: 25,
    TWENTY_FIVE_TO_FIFTY: 37,
    FIFTY: 50,
    FIFTY_TO_SEVENTY_FIVE: 62,
    SEVENTY_FIVE: 75,
    SEVENTY_FIVE_TO_ONE_HUNDRED: 87,
    ONE_HUNDRED: 100,
  };

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
      Promise.all([
        axios.get(`http://localhost:2025/displayprojectimage?projectId=${id}`, { responseType: "blob" })
          .then(response => setProjectImage(URL.createObjectURL(response.data)))
          .catch(error => console.error("Error fetching project image:", error)),
        
        axios.get(`http://localhost:2025/displayprojectfile?projectId=${id}`, { responseType: "blob" })
          .then(response => setProjectFile(URL.createObjectURL(response.data)))
          .catch(error => console.error("Error fetching project file:", error))
      ]);
    }
  }, [projectData, id]);

  useEffect(() => {
    if (projectData?.mediaList) {
      const fetchMediaUrls = async () => {
        const mediaResults = await Promise.all(
          projectData.mediaList.map(async (mediaItem) => {
            try {
              const response = await axios.get(
                `http://localhost:2025/displaymedia?id=${mediaItem.mediaId}`,
                { responseType: "blob" }
              );
              return {
                mediaId: mediaItem.mediaId,
                mediaUrl: URL.createObjectURL(response.data),
                mediaType: mediaItem.mediaType
              };
            } catch (error) {
              console.error("Error fetching media:", error);
              return { mediaId: mediaItem.mediaId, mediaUrl: null };
            }
          })
        );

        const mediaUrls = mediaResults.reduce((acc, { mediaId, mediaUrl, mediaType }) => {
          acc[mediaId] = { mediaUrl, mediaType };
          return acc;
        }, {});

        setMediaUrls(mediaUrls);

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

  const handleReportGeneration = () => {
    window.open(`http://localhost:2025/viewreport?projectId=${id}`, "_blank");
  };

  const openModal = (mediaUrl, type) => {
    setModalMedia(mediaUrl);
    setModalType(type);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="max-w-max mx-auto">
          <main className="sm:flex">
            <p className="text-4xl font-bold text-indigo-600 sm:text-5xl">Error</p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl">
                  Something went wrong
                </h1>
                <p className="mt-1 text-base text-gray-500">{error}</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!projectData) {
    return (
      <div className="min-h-screen  bg-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }



  return (
    <div style={{paddingTop:"50px"}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          <ProjectDetails projectData={projectData} percentageEnum={percentageEnum} />
          
          <ActionButtons
            projectImage={projectImage}
            projectFile={projectFile}
            zipUrl={zipUrl}
            onImageClick={openModal}
            onFileClick={openModal}
            projectData={projectData}
            onReportClick={handleReportGeneration}
            onGradeClick={() => navigate(`/review/${id}`)}
            
          />

          {projectData.mediaList && (
            <MediaGallery
              mediaList={projectData.mediaList}
              mediaUrls={mediaUrls}
              onMediaClick={openModal}
            />
          )}

          <MediaModal
            media={modalMedia}
            type={modalType}
            onClose={() => {
              setModalMedia(null);
              setModalType("");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectCheck2;