import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Table, Eye } from "lucide-react";
import config from '../config';

export default function ProjectCheck() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
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

  const facultyData = JSON.parse(localStorage.getItem("faculty"));
  const facultyId = facultyData?.id;

  const fetchProjects = async () => {
    if (!facultyId) {
      setError("Faculty ID is not available.");
      return;
    }

    try {
      const response = await axios.get(
        `${config.url}/viewallprojectsbyfaculty?facultyId=${facultyId}`
      );
      const filteredProjects = response.data.filter(
        (project) => project.checkStatus === true
      );
      setProjects(filteredProjects);
    } catch (error) {
      setError(error.message);
    }
  };

  const viewProject = (id) => {
    navigate(`/viewprojectbyfaculty/${id}`);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div style={{paddingTop:"120px"}} className="min-h-screen  bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Projects Overview</h1>
            <p className="mt-2 text-sm text-gray-700">
              A comprehensive list of all projects assigned to you for review.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle">
              <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
                {projects.length > 0 ? (
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                          Project ID
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Title
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Description
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Phase
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Progress
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {projects.map((project) => (
                        <tr key={project.projectId}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
                            {project.projectId}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                            {project.title}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-900">
                            {project.description}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                            {project.phase}
                          </td>
                         
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                            <button
                              onClick={() => viewProject(project.projectId)}
                              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Review
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center py-12">
                    {error ? (
                      <p className="text-red-600">{error}</p>
                    ) : (
                      <div>
                        <Table className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No projects found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          There are currently no projects assigned for your review.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
