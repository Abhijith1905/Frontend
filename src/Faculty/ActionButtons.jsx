import React from 'react';
import { Download, FileText, ImageIcon } from 'lucide-react';

const ActionButtons = ({
  projectImage,
  projectFile,
  zipUrl,
  onImageClick,
  onFileClick,
  projectData,
  onReportClick,
  onGradeClick
}) => {

  const showReportCard = projectData.percentage !== "ZERO";
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {projectImage && (
        <button
          onClick={() => onImageClick(projectImage, "image")}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <ImageIcon className="h-5 w-5 mr-2" />
          View Project Icon
        </button>
      )}

      {projectFile && (
        <button
          onClick={() => onFileClick(projectFile, "text")}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <FileText className="h-5 w-5 mr-2" />
          View Description
        </button>
      )}

      {zipUrl && (
        <button
          onClick={() => window.location.href = zipUrl}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <Download className="h-5 w-5 mr-2" />
          Download ZIP
        </button>
      )}


   {showReportCard && (
      <button
        onClick={onReportClick}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        <FileText className="h-5 w-5 mr-2" />
        View Report
      </button>
   )}

      <button
        onClick={onGradeClick}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
      >
        Grade Project
      </button>
    </div>
  );
};

export default ActionButtons;