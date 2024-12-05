import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function TrackProject() {
  const { id } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [error, setError] = useState(null);

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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-red-500">
          <p className="text-red-600 text-lg font-semibold">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!projectData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-gray-200 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
          <p className="text-gray-600 mt-4 text-center">Loading project data...</p>
        </div>
      </div>
    );
  }

  const phaseOrder = [
    "NOT_STARTED",
    "IDEA",
    "DESIGN",
    "BUILD",
    "TESTING",
    "DEPLOYMENT",
    "COMPLETED"
  ];

  const phasesToDisplay = projectData.phase === "NOT_STARTED" 
    ? ["NOT_STARTED"]
    : phaseOrder.filter(phase => phase !== "NOT_STARTED");

  const getPhaseColor = (phase) => {
    const colors = {
      NOT_STARTED: 'border-gray-400',
      IDEA: 'border-blue-400',
      DESIGN: 'border-purple-400',
      BUILD: 'border-indigo-400',
      TESTING: 'border-yellow-400',
      DEPLOYMENT: 'border-orange-400',
      COMPLETED: 'border-green-400'
    };
    return colors[phase] || 'border-gray-400';
  };

  const formatPhaseTitle = (phase) => {
    return phase.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };

  const getRemainingPhases = () => {
    const currentPhaseIndex = phaseOrder.indexOf(projectData.phase);
    return phaseOrder.length - currentPhaseIndex - 1;
  };

  const renderPhaseContent = (phase) => {
    if (phase === "NOT_STARTED") {
      return (
        <div className="text-center py-8">
          <p className="text-2xl font-bold text-gray-700 mb-4">Start Your Journey!</p>
          <p className="text-gray-600">Your project adventure awaits. Begin now to track your progress!</p>
        </div>
      );
    }

    if (phase === "COMPLETED") {
      if (projectData.phase === "COMPLETED") {
        return (
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg mb-4">
              <p className="font-medium text-green-800">Project Successfully Completed! 🎉</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Final Description</p>
              <p className="mt-1 text-gray-900">
                {projectData.phaseDescriptions[phase] || "No description provided"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Final Grade</p>
              <p className="mt-1 text-gray-900 font-semibold">
                {projectData.phaseGrades[phase] || "Not graded yet"}
              </p>
            </div>
          </div>
        );
      } else {
        return (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium text-gray-800">Phases Remaining to Complete</p>
              <p className="text-gray-600 mt-2">{getRemainingPhases()} phases left</p>
            </div>
          </div>
        );
      }
    }

    if (phase === projectData.phase) {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500">Description</p>
              <p className="mt-1 text-gray-900">
                {projectData.phaseDescriptions[phase] || "No description provided"}
              </p>
            </div>
            <div className="w-1/3 ml-4">
              <p className="text-sm font-medium text-gray-500">Current Grade</p>
              <p className="mt-1 text-gray-900 font-semibold">
                {projectData.phaseGrades[phase] || "Not graded yet"}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Phase Progress</p>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${projectData.phasePercentages[phase]}%` }}
                />
              </div>
              <p className="mt-1 text-sm text-gray-600 text-right">
                {projectData.phasePercentages[phase]}%
              </p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500">Description</p>
            <p className="mt-1 text-gray-900">
              {projectData.phaseDescriptions[phase] || "No description provided"}
            </p>
          </div>
          <div className="w-1/3 ml-4">
            <p className="text-sm font-medium text-gray-500">Grade</p>
            <p className="mt-1 text-gray-900 font-semibold">
              {projectData.phaseGrades[phase] || "Not graded yet"}
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Completion</p>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${projectData.phasePercentages[phase]}%` }}
              />
            </div>
            <p className="mt-1 text-sm text-gray-600 text-right">
              {projectData.phasePercentages[phase]}%
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{paddingTop:"1000px"}}> {/* Increased the width here */}
      <div className="max-w-7xl mx-auto"> {/* Increased the max width here */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Project Progress Tracker
          </h1>
          <p className="text-xl text-gray-600">
            Current Phase: {projectData.phase}
          </p>
        </div>

        <div className="space-y-6">
          {phasesToDisplay.map((phase) => (
            <div
              key={phase}
              className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-101 ${
                projectData.phase === phase ? 'ring-2 ring-indigo-500' : ''
              }`}
            >
              <div className={`h-2 ${getPhaseColor(phase)} bg-gradient-to-r from-current to-current`} />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center justify-between">
                  {phase}
                  {projectData.phase === phase && (
                    <span className="text-sm bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                      Current Phase
                    </span>
                  )}
                </h3>
                {renderPhaseContent(phase)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrackProject;
