// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function ViewAllProjects() {
//     const [projects, setProjects] = useState([]);
//     const [projectImages, setProjectImages] = useState({});
//     const [error, setError] = useState('');

//     // Function to fetch Project data
//     const fetchProjects = async () => {
//         try {
//             const response = await axios.get('http://localhost:2025/viewallprojects');
//             setProjects(response.data);

//             // Fetch images for each project
//             response.data.forEach(async (project) => {
//                 try {
//                     const imageResponse = await axios.get(
//                         `http://localhost:2025/displayprojectimage?projectId=${project.projectId}`,
//                         { responseType: 'arraybuffer' }
//                     );
//                     const imageBlob = new Blob([imageResponse.data], { type: 'image/png' });
//                     const imageUrl = URL.createObjectURL(imageBlob);

//                     setProjectImages((prevImages) => ({
//                         ...prevImages,
//                         [project.projectId]: imageUrl,
//                     }));
//                 } catch (error) {
//                     console.error(`Error loading image for Project ${project.projectId}:`, error);
//                 }
//             });
//         } catch (err) {
//             // Extract the error message if available, otherwise show a default message
//             const errorMessage = err.response?.data?.message || "An error occurred while fetching projects.";
//             setError(errorMessage);
//         }
//     };

//     // Fetch Projects on component mount
//     useEffect(() => {
//         fetchProjects();
//     }, []);

//     return (
//         <div>
//             <h2>Project List</h2>
//             {error ? (
//                 <p style={{ color: 'red' }}>{error}</p> // Display error message in red if there's an error
//             ) : (
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Project ID</th>
//                             <th>Name</th>
//                             <th>Description</th>
//                             <th>Image</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {projects.map((project) => (
//                             <tr key={project.projectId}>
//                                 <td>{project.projectId}</td>
//                                 <td>{project.name}</td>
//                                 <td>{project.description}</td>
//                                 <td>
//                                     {projectImages[project.projectId] ? (
//                                         <img
//                                             src={projectImages[project.projectId]}
//                                             alt={project.name}
//                                             style={{ width: "100px", height: "100px" }}
//                                         />
//                                     ) : (
//                                         <p>Loading...</p>
//                                     )}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// }

// export default ViewAllProjects;
