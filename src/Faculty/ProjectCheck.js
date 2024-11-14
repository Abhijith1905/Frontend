import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ViewProjects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch all projects with status = true
  const fetchProjects = async () => {
    try {
      const response = await axios.get(`http://localhost:2025/viewallprojectsbyadmin`);
      console.log(response.data);
      // Filter projects where status is true
      const filteredProjects = response.data.filter((project) => project.checkStatus === true);
      setProjects(filteredProjects);
    } catch (error) {
      setError(error.message);
    }
  };

  // Navigate to project details page
  const viewProject = (id) => {
    navigate(`/viewprojectbyfaculty/${id}`);
  };

  useEffect(() => {
    fetchProjects();
  }, []); // Run only once when the component mounts

  return (
    <div className="content">
      <div className="view-projects-container">
        <h2 style={{ color: "#4a4a75" }} className="title">
          View Projects
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
                      className="view-button"
                      onClick={() => viewProject(project.projectId)}
                    >
                      Review
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

        .view-button {
          padding: 8px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9em;
          background-color: #4a90e2;
          color: white;
        }

        .view-button:hover {
          background-color: #357abf;
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
