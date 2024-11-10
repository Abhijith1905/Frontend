import React, { useState, useRef } from 'react';
import axios from 'axios';

export default function CreateProject() {
  // State to manage form data, including files
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    pdf: null,
    zip: null,
    file: null
  });

  const imageInputRef = useRef(null);
  const pdfInputRef = useRef(null);
  const zipInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Handles input changes for all fields except files
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handles file input changes
  const handleFileChange = (e, fileType) => {
    setFormData({ ...formData, [fileType]: e.target.files[0] });
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create FormData for multipart upload
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('image', formData.image);
      formDataToSend.append('pdf', formData.pdf);
      formDataToSend.append('zip', formData.zip);
      formDataToSend.append('file', formData.file);

      // Send the data to the server
      const response = await axios.post(`http://localhost:2025/createproject`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data' 
        }
      });

      // Reset form on successful response
      if (response.status === 200) {
        setFormData({
          title: '',
          description: '',
          image: null,
          pdf: null,
          zip: null,
          file: null
        });
        imageInputRef.current.value = '';
        pdfInputRef.current.value = '';
        zipInputRef.current.value = '';
        fileInputRef.current.value = '';
        setMessage(response.data);
        setError('');
      }
      
    } catch (error) {
      setError(error.response?.data)
      setMessage('');
    }
  };

  return (
    <div className='content'>
      <h3 align="center"><u>Create Project</u></h3>
      {message && <h4 align="center">{message}</h4>}
      {error && <h4 align="center" style={{ color: 'red' }}>{error}</h4>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Title</label>
          <input type="text" id="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Description</label>
          <textarea id="description" value={formData.description} onChange={handleChange} required />
        </div>
      
        <div>
          <label>Image</label>
          <input type="file" ref={imageInputRef} onChange={(e) => handleFileChange(e, 'image')} required />
        </div>
        <div>
          <label>PDF</label>
          <input type="file" ref={pdfInputRef} onChange={(e) => handleFileChange(e, 'pdf')} required />
        </div>
        <div>
          <label>ZIP</label>
          <input type="file" ref={zipInputRef} onChange={(e) => handleFileChange(e, 'zip')} required  />
        </div>
        <div>
          <label>File</label>
          <input type="file" ref={fileInputRef} onChange={(e) => handleFileChange(e, 'file')} required/>
        </div>
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
}
