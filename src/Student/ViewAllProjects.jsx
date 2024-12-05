import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ViewAllProjects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const storedStudentData = JSON.parse(localStorage.getItem("student"));

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

  const viewProject = (id) => {
    navigate(`/viewproject/${id}`);
  };

  useEffect(() => {
    if (storedStudentData?.id) {
      fetchProjects(storedStudentData.id);
    } else {
      setError("No student data found.");
    }
  }, []); // Run only once when the component mounts

  return (
    <div style={{ paddingTop: "100px" }} className="page-container">
      <div className="view-projects-container">
        <h2 className="title">View Projects</h2>

        {projects.length > 0 ? (
          <table className="projects-table">
            <thead>
              <tr>
                <th>Project ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Phase</th>
                <th>Percentage</th>
                <th>Actions</th>
                <th>Report Card</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => {
                const isNotGraded = project.percentage === "ZERO"; // Check if percentage is ZERO
                return (
                  <tr key={project.projectId}>
                    <td>{project.projectId}</td>
                    <td>{project.title}</td>
                    <td>{project.description}</td>
                    <td>{project.phase}</td>
                    <td>
                    {project.phasePercentage}%
                    </td>
                    <td>
                      <button
                        className="view-button"
                        onClick={() => viewProject(project.projectId)}
                      >
                        View
                      </button>
                    </td>
                    <td>
                      {isNotGraded ? (
                        "Not Graded" // Display "Not Graded" if percentage is ZERO
                      ) : (
                        <button
                          className="view-button"
                          onClick={() =>
                            window.open(
                              `http://localhost:2025/viewreport?projectId=${project.projectId}`,
                              "_blank"
                            )
                          }
                        >
                          View Report
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <p className="no-projects-message">No projects found</p>
        )}
      </div>

      {/* Internal CSS */}
      <style>{`
        .page-container {
          margin: 0;
          padding: 0;
          background-color: #f9f9fc;
          min-height: 100vh;
        }

        .view-projects-container {
          max-width: 1000px;
          margin: 20px auto;
          padding: 20px;
          background-color: #fff;
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
          border: 1px solid #ddd;
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

        .view-button {
          padding: 8px 12px;
           background-color: "#4a4a75",
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
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
