import { useEffect, useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

export default function DeleteProject() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const storedStudentData = JSON.parse(localStorage.getItem("student"));

  // Fetch projects for the logged-in student
  const fetchProjects = async (studentId) => {
    try {
      const response = await axios.get(
        `http://localhost:2025/viewallprojects?studentId=${studentId}`
      );
      console.log(response.data);
      setProjects(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  // Delete a project by ID
  const deleteProject = async (id) => {
    try {
      await axios.delete(`http://localhost:2025/deleteproject?id=${id}`);
      fetchProjects(storedStudentData.id); // Refresh project list after deletion
    } catch (error) {
      setError(error.message);
    }
  };

  // Navigate to project details page

  useEffect(() => {
    fetchProjects(storedStudentData.id);
  }, []); // Run only once when the component mounts

  return (
    <div className="content">
      <div className="view-projects-container">
        <h2 style={{ color: "#4a4a75" }} className="title">
           Delete Project
        </h2>

        {projects.length > 0 ? (
          <table
            style={{ border: "2px solid black" }}
            className="projects-table"
          >
            <thead>
              <tr>
                <th style={{ color: "#4a4a75" }}>Project ID</th>
                <th style={{ color: "#4a4a75" }}>Title</th>
                <th style={{ color: "#4a4a75" }}>Description</th>
                <th style={{ color: "#4a4a75" }}>Phase</th>
                <th style={{ color: "#4a4a75" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.projectId}>
                  <td style={{ color: "#4a4a75" }}>{project.projectId}</td>
                  <td style={{ color: "#4a4a75" }}>{project.title}</td>
                  <td style={{ color: "#4a4a75" }}>{project.description}</td>
                  <td style={{ color: "#4a4a75" }}>{project.phase}</td>
                  <td style={{ color: "#4a4a75" }}>
                   
                    <button
                      className="delete-button"
                      onClick={() => deleteProject(project.projectId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <p className="no-projects-message">No projects found</p>
        )}
      </div>
      <style>{`
        .view-projects-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9fc;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .title {
          text-align: center;
          margin-bottom: 20px;
          font-size: 1.5em;
          color: #4a4a75;
        }

        .projects-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        .projects-table th,
        .projects-table td {
          padding: 12px 15px;
          text-align: left;
          color: #4a4a75;
        }

        .projects-table th {
          background-color: #e8eaf6;
          font-weight: bold;
        }

        .projects-table tr:nth-child(even) {
          background-color: #f3f4f8;
        }

        .projects-table tr:hover {
          background-color: #e1e5f2;
        }

        .projects-table,
        .projects-table th,
        .projects-table td {
          border: 2px solid #4a4a75;
        }

        .view-button,
        .delete-button {
          padding: 8px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9em;
        }

        .view-button {
          background-color: #4a90e2;
          color: white;
          margin-right: 8px;
        }

        .view-button:hover {
          background-color: #357abf;
        }

        .delete-button {
          background-color: #e74c3c;
          color: white;
        }

        .delete-button:hover {
          background-color: #c0392b;
        }

        .error-message,
        .no-projects-message {
          color: #e74c3c;
          text-align: center;
          font-size: 1.1em;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}
