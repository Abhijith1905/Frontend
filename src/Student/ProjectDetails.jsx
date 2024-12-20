import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import axios from 'axios';
import config from '../config';

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
      const response = await axios.put(`${config.url}/updateproject`, updatedProject);
      console.log('Project updated successfully:', response.data);
    } catch (error) {
      console.error('Failed to update project:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 w-full max-w-full">
      <h2 className="text-2xl font-bold text-indigo-900 mb-6 w-full">Project Details</h2>

      <div className="space-y-6">
        <div>
          <div className="space-y-4 w-full">
            <label className="block w-full">
              <span className="text-gray-700 font-medium">Title</span>
              <input
                type="text"
                value={projectData.title || ''}
                onChange={(e) => handleInputChange(e, 'title')}
                className="input mt-1 w-full"
              />
            </label>

            <label className="block w-full">
              <span className="text-gray-700 font-medium">Idea of Project</span>
              <textarea
                value={projectData.description || ''}
                onChange={(e) => handleInputChange(e, 'description')}
                className="input mt-1 h-32 custom-textarea w-full"
                placeholder="Enter project description..."
              ></textarea>
            </label>

            {/* Phase and Phase Description */}
            <label className="block w-full">
              <span className="text-gray-700 font-medium">Phase</span>
              <div className="flex items-center mt-1 w-full">
                <div className="input bg-gray-100 text-gray-700 cursor-not-allowed w-1/3">
                  {projectData.phase || 'N/A'}
                </div>
                {projectData.phase && (
                  <textarea
                    value={phaseDescription}
                    onChange={handlePhaseDescriptionChange}
                    className="input ml-4 h-24 w-2/3 custom-textarea w-full"
                    placeholder="Enter description for the selected phase..."
                  ></textarea>
                )}
              </div>
            </label>
          </div>
        </div>

        <div className="border-t pt-6 w-full">
          <label className="flex items-center space-x-3 w-full">
            <input
              type="checkbox"
              checked={projectData.checkStatus}
              onChange={handleCheckStatusChange}
              className="h-5 w-5 text-indigo-600 rounded"
            />
            <span className="text-gray-700">Submit for review</span>
          </label>
        </div>

        <div className="flex flex-wrap gap-4 w-full">
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
