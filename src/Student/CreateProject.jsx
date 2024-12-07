import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateProject() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologiesUsed:'',
    image: null,
    file: null,
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);

  // Check if student data exists in localStorage
  const storedStudentData = JSON.parse(localStorage.getItem('student'));
  const studentId = storedStudentData?.id;

  // UseEffect to handle redirection to login if studentId is missing
  useEffect(() => {
    if (!studentId) {
      setError('Student is not logged in.');
      navigate('/login'); // Redirect to login if studentId is missing
    }
  }, [studentId, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e, fileType) => {
    setFormData({ ...formData, [fileType]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentId) {
      setError('Student ID is missing');
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('studentId', studentId);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('technologiesUsed', formData.technologiesUsed);
      formDataToSend.append('image', formData.image);
      formDataToSend.append('file', formData.file);

      const response = await axios.post(`${config.url}/createproject`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setFormData({
        title: '',
        description: '',
        technologiesUsed:'',
        image: null,
        file: null,
      });
      imageInputRef.current.value = '';
      fileInputRef.current.value = '';
      setMessage(response.data);
      setError('');
    } catch (error) {
      setError(error.response?.data || 'An error occurred');
      setMessage('');
    }
  };

  return (
    <div className="page-container" style={{paddingTop:"70px"}}>
      <div className='form-container'>
      
        <h3><u>Create Project</u></h3>
        {message && <h4 style={{ color: 'red' }}>{message}</h4>}
        {error && <h4 style={{ color: 'red' }}>{error}</h4>}
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="project-form">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Idea of Project</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Technologies you are going to use</label>
            <input 
              type="text"
              id="technologiesUsed"
              value={formData.technologiesUsed}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Project Icon</label>
            <input
              type="file"
              ref={imageInputRef}
              onChange={(e) => handleFileChange(e, 'image')}
              required
            />
          </div>
         
          <div className="form-group">
            <label>Project Description File</label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => handleFileChange(e, 'file')}
              required
            />
          </div>
          <button style={{backgroundColor:"#4a4a75"}} type="submit" className="submit-btn">Create Project</button>
        </form>
      </div>

      {/* Internal CSS */}
      <style jsx>{`
        

        .form-container {
          max-width: 600px;
          padding: 20px;
          background-color: #fff;
          border-radius: 15px;
          
          text-align: center;
          width: 100%;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          align-items: center; /* Center fields horizontally */
          width: 100%; /* Ensure full width for the input fields */
        }

        label {
          font-weight: bold;
          font-size: 16px;
          color: #333;
          margin-bottom: 8px;
        }

        input, textarea {
          padding: 12px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 8px;
          width: 100%;
          max-width: 500px; /* Control width for inputs */
          margin-bottom: 10px;
            background-color: #f5f5f5; 
        }

         input[type="file"] {
         background-color: #f5f5f5; /* Light grey background for file inputs */
            color: #333;
  }
        textarea {
          min-height: 120px;
          resize: none;
          color: #333;
        }

        button.submit-btn {
         {
    padding: "8px 16px",
    margin: "10px 5px",
 backgroundColor: "#4a90e2",
    color: white,
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  }
        }

        button.submit-btn:hover {
          background-color: #45a049;
        }

        h3 {
          margin-bottom: 20px;
          font-size: 24px;
          color: #333;
        }

        h4 {
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
}
