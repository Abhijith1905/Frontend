import React from 'react';
import { FileText } from 'lucide-react';

const ProjectDetails = ({ projectData, percentageEnum }) => {
  // Determine if the report card should be shown (when progress is not 0)
  const showReportCard = projectData.percentage !== "ZERO";

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Project Details</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Comprehensive overview of the project
        </p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Title</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {projectData.title}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Description</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {projectData.description}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Phase</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {projectData.phase}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Progress</dt>
            <dd className="mt-1 sm:mt-0 sm:col-span-2">
              <div className="flex items-center">
                <div className="flex-grow">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-blue-600 rounded-full"
                      style={{ width: `${percentageEnum[projectData.percentage] || 0}%` }}
                    ></div>
                  </div>
                </div>
                <span className="ml-3 text-sm text-gray-900">
                  {percentageEnum[projectData.percentage] || 0}%
                </span>
              </div>
            </dd>
          </div>

          {/* Conditionally render the report card */}
          {showReportCard && (
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Report Card</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <a href="/report" className="text-indigo-600 hover:text-indigo-900">
                  <FileText className="inline mr-2" />
                  View Report Card
                </a>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
};

export default ProjectDetails;
