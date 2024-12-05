import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import axios from 'axios';

function SProjectDetails({
  projectData,
  handleInputChange,
  handleCheckStatusChange,
  handleSubmitForReview,
  handleReportGeneration,
  navigateToUploadMedia,
  projectImage,
  projectFile,
  zipUrl,
  openModal,
}) {
  const [phaseDescription, setPhaseDescription] = useState('');

  // Update phase description whenever the phase or projectData changes
  useEffect(() => {
    const selectedPhase = projectData.phase;
    if (selectedPhase && projectData.phaseDescriptions) {
      setPhaseDescription(projectData.phaseDescriptions[selectedPhase] || ''); // Set description based on phase
    }
  }, [projectData.phase, projectData.phaseDescriptions]); // Trigger when phase or descriptions change

  const handlePhaseDescriptionChange = (e) => {
    const description = e.target.value;
    setPhaseDescription(description);
    // Ensure the project data's phaseDescriptions are updated
    projectData.phaseDescriptions[projectData.phase] = description; // Update the project data in memory
  };

  const handleUpdateProject = async () => {
    // Update the projectData with the latest phaseDescriptions
    const updatedProject = {
      projectId: projectData.projectId,
      title: projectData.title,
      description: projectData.description,
      phase: projectData.phase,
      checkStatus: projectData.checkStatus,
      phaseDescriptions: projectData.phaseDescriptions, // Use updated phase descriptions
    };

    try {
      const response = await axios.put('http://localhost:2025/updateproject', updatedProject);
      console.log('Project updated successfully:', response.data);
    } catch (error) {
      console.error('Failed to update project:', error);
    }
  };

  const showReportCard = projectData.percentage !== 'ZERO';

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
            </label>

            <label className="block">
              <span className="text-gray-700 font-medium">Phase</span>
              <select
                value={projectData.phase || ''}
                onChange={(e) => handleInputChange(e, 'phase')}
                className="input mt-1"
              >
                <option value="NOT_STARTED">Not Started</option>
                <option value="IDEA">Idea Phase</option>
                <option value="DESIGN">Design Phase</option>
                <option value="BUILD">Build Phase</option>
                <option value="TESTING">Testing Phase</option>
                <option value="DEPLOYMENT">Deployment Phase</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </label>

            {/* Description input for the selected phase */}
            {projectData.phase && (
              <label className="block">
                <span className="text-gray-700 font-medium">Phase Description</span>
                <textarea
                  value={phaseDescription}
                  onChange={handlePhaseDescriptionChange}
                  className="input mt-1 h-32 custom-textarea"
                  placeholder="Enter description for the selected phase..."
                ></textarea>
              </label>
            )}
          </div>

          <div className="space-y-4">
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
          <Button onClick={handleSubmitForReview}>
            {projectData.phase === 'NOT_STARTED'
              ? 'Ask Permission to Start Project'
              : 'Submit for Review'}
          </Button>
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
  handleSubmitForReview: PropTypes.func.isRequired,
  handleReportGeneration: PropTypes.func.isRequired,
  navigateToUploadMedia: PropTypes.func.isRequired,
  projectImage: PropTypes.string,
  projectFile: PropTypes.string,
  zipUrl: PropTypes.string,
  openModal: PropTypes.func.isRequired,
};

export default SProjectDetails;
