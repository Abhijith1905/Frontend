import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

function SProjectDetails({
  projectData,
  handleInputChange,
  handleCheckStatusChange,
  handleUpdateProject,
  handleSubmitForReview,
  handleReportGeneration,
  navigateToUploadMedia,
  projectImage,
  projectFile,
  zipUrl,
  openModal,
}) {

  const showReportCard = projectData.percentage !== "ZERO";

  // Enum for mapping percentage keys to numeric values
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

  

  

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-indigo-900 mb-6">Project Details</h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700 font-medium">Title</span>
              <input
                type="text"
                value={projectData.title || ''}
                onChange={(e) => handleInputChange(e, 'title')}
                className="input mt-1"
              />
            </label>

            <label className="block">
              <span className="text-gray-700 font-medium">Idea of Project</span>
              <textarea
                value={projectData.description || ''}
                onChange={(e) => handleInputChange(e, 'description')}
                className="input mt-1 h-32 custom-textarea"
                placeholder="Enter project description..."
              ></textarea>

              <style>{`
                .custom-textarea {
                  background-color: #f0f0f0; /* Light grey background */
                  border: 1px solid #ccc;   /* Optional: Add a border */
                  border-radius: 8px;       /* Optional: Rounded corners */
                  padding: 12px;            /* Add some padding for better spacing */
                  color: #333;              /* Default text color */
                  font-size: 16px;          /* Font size for the text */
                  width: 100%;              /* Ensure it spans the parent width */
                  resize: none;             /* Prevent resizing */
                }

                .custom-textarea::placeholder {
                  color: #333;              /* Placeholder text color */
                  font-size: 14px;          /* Optional: Adjust placeholder font size */
                }
              `}</style>
            </label>

            <label className="block">
              <span className="text-gray-700 font-medium">Phase</span>
              <select
                value={projectData.phase || ''}
                onChange={(e) => handleInputChange(e, 'phase')}
                className="input mt-1"
              >
                <option value="NOT_STARTED">Not Started</option>
                <option value="ACTIVE">Active</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </label>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700 font-medium">Percentage Complete</p>
              <p className="text-2xl font-bold text-indigo-600">
                {percentageEnum[projectData.percentage] }%
              </p>
            </div>

            <div className="space-y-4">
              {projectImage && (
                <Button
                  variant="secondary"
                  onClick={() => openModal(projectImage, 'image')}
                  className="w-full"
                >
                  View Project Icon
                </Button>
              )}

              {projectFile && (
                <Button
                  variant="secondary"
                  onClick={() => openModal(projectFile, 'text')}
                  className="w-full"
                >
                  View Description
                </Button>
              )}

              {zipUrl && (
                <Button
                  variant="secondary"
                  onClick={() => (window.location.href = zipUrl)}
                  className="w-full"
                >
                  Download ZIP
                </Button>
              )}
             
             
             {showReportCard && (
              <Button
                variant="secondary"
                onClick={handleReportGeneration}
                className="w-full"
              >
                View Report
              </Button>
             )}
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={projectData.checkStatus}
              onChange={handleCheckStatusChange}
              className="h-5 w-5 text-indigo-600 rounded"
            />
            <span className="text-gray-700">Submit for review</span>
          </label>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button onClick={handleUpdateProject}>Save Changes</Button>
          <Button onClick={handleSubmitForReview}>Submit Review Choice</Button>
          <Button onClick={navigateToUploadMedia}>Upload Media</Button>
        </div>
      </div>
    </div>
  );
}

SProjectDetails.propTypes = {
  projectData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleCheckStatusChange: PropTypes.func.isRequired,
  handleUpdateProject: PropTypes.func.isRequired,
  handleSubmitForReview: PropTypes.func.isRequired,
  handleReportGeneration: PropTypes.func.isRequired,
  navigateToUploadMedia: PropTypes.func.isRequired,
  projectImage: PropTypes.string,
  projectFile: PropTypes.string,
  zipUrl: PropTypes.string,
  openModal: PropTypes.func.isRequired,
};

export default SProjectDetails;
