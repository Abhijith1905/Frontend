import React, { useEffect, useState } from 'react';
import axios from 'axios';


export default  function ViewAllProjects() {
    const [projects, setProjects] = useState([]);
    const [projectFiles, setProjectFiles] = useState({});
    const [error, setError] = useState('');

    // Function to fetch project data
    const fetchProjects = async () => {
        try {
            const response = await axios.get('http://localhost:2025/viewallprojects');
            setProjects(response.data);

            // Fetch files for each project
            response.data.forEach(async (project) => {
                try {
                    // Fetch image for each project
                    const imageResponse = await axios.get(`http://localhost:2025/displayprojectimage?projectId=${project.id}`, {
                        responseType: 'arraybuffer',
                    });
                    const imageBlob = new Blob([imageResponse.data], { type: 'image/png' });
                    const imageUrl = URL.createObjectURL(imageBlob);

                    // Fetch PDF for each project
                    const pdfResponse = await axios.get(`http://localhost:2025/displayprojectpdf?projectId=${project.id}`, {
                        responseType: 'arraybuffer',
                    });
                    const pdfBlob = new Blob([pdfResponse.data], { type: 'application/pdf' });
                    const pdfUrl = URL.createObjectURL(pdfBlob);

                    // Fetch ZIP for each project
                    const zipResponse = await axios.get(`http://localhost:2025/displayprojectzip?projectId=${project.id}`, {
                        responseType: 'arraybuffer',
                    });
                    const zipBlob = new Blob([zipResponse.data], { type: 'application/zip' });
                    const zipUrl = URL.createObjectURL(zipBlob);

                    setProjectFiles((prevFiles) => ({
                        ...prevFiles,
                        [project.id]: { imageUrl, pdfUrl, zipUrl },
                    }));
                } catch (fileError) {
                    console.error(`Error loading files for project ${project.id}:`, fileError);
                }
            });
        } catch (err) {
            setError(err.message);
        }
    };

    // Fetch projects on component mount
    useEffect(() => {
        fetchProjects();
    }, []);

    // Function to handle viewing files in new tabs
    const handleViewFile = (fileUrl) => {
        if (fileUrl) {
            window.open(fileUrl, '_blank');
        }
    };

    // Function to handle downloading files
    const handleDownloadFile = (fileUrl, fileName) => {
        if (fileUrl) {
            const link = document.createElement('a');
            link.href = fileUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div>
            
            <h2>Project List</h2>
            {error ? (
                <p>{error}</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Project ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>PDF</th>
                            <th>ZIP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project.id}>
                                <td>{project.id}</td>
                                <td>{project.title}</td>
                                <td>{project.description}</td>
                                <td>
                                    {projectFiles[project.id]?.imageUrl ? (
                                        <img
                                            src={projectFiles[project.id].imageUrl}
                                            alt="Project Image"
                                            style={{ width: "100px", height: "100px" }}
                                        />
                                    ) : (
                                        <p>Loading...</p>
                                    )}
                                </td>
                                <td>
                                    {projectFiles[project.id]?.pdfUrl ? (
                                        <button onClick={() => handleViewFile(projectFiles[project.id].pdfUrl)}>
                                            View PDF
                                        </button>
                                    ) : (
                                        <p>Loading...</p>
                                    )}
                                </td>
                                <td>
                                    {projectFiles[project.id]?.zipUrl ? (
                                        <button onClick={() => handleDownloadFile(projectFiles[project.id].zipUrl, `${project.title}.zip`)}>
                                            Download ZIP
                                        </button>
                                    ) : (
                                        <p>Loading...</p>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}


