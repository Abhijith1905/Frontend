import React from "react";
import { useNavigate } from "react-router-dom";

const ActionButtons = ({
  projectData,
  projectImage,
  projectFile,
  zipUrl,
  onImageClick,
  onFileClick,
  onReportClick,
  onAcceptProject,
  phase,
 
}) => {
  const navigate = useNavigate();

  const handleGradeNavigation = () => {
    navigate(`/grade/${projectData.projectId}`);
  };

  return (
    <div className="flex flex-wrap space-x-4">
      {projectImage && (
        <button
          className="btn-primary"
          onClick={() => onImageClick(projectImage, "image")}
        >
          View Image
        </button>
      )}
      {projectFile && (
        <button
          className="btn-primary"
          onClick={() => onFileClick(projectFile, "file")}
        >
          View File
        </button>
      )}
      {zipUrl && (
        <a href={zipUrl} download className="btn-primary">
          Download ZIP
        </a>
      )}
     
      {phase === "NOT_STARTED" ? (
        <button className="btn-success" onClick={onAcceptProject}>
          Accept Project
        </button>
      ) : (
        <button className="btn-secondary" onClick={handleGradeNavigation}>
          Grade
        </button>
      )}
    </div>
  );
};

export default ActionButtons;