import React from "react";

const ActionButtons = ({
  projectImage,
  projectFile,
  zipUrl,
  onImageClick,
  onFileClick,
  onReportClick,
  onAcceptProject,
  phase,
}) => {
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
      <button className="btn-secondary" onClick={onReportClick}>
        Generate Report
      </button>
      {phase === "NOT_STARTED" ? (
        <button className="btn-success" onClick={onAcceptProject}>
          Accept Project
        </button>
      ) : (
        <button className="btn-secondary">Grade</button>
      )}
    </div>
  );
};

export default ActionButtons;
