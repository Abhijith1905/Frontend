import { useState } from 'react';
import axios from 'axios';



export default function AddStudent() {
  const [student, setStudent] = useState({
    fullName: '',
    gender: '',
    department: '',
    program: '',
    semester: '',
    year: '',
    dateOfBirth: '',
    password: '',
    email: '',
    contact: ''
  });
  
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // to avoid page reloading
    try {
      const response = await axios.post('http://localhost:2025/addstudent', student);
      if (response.status === 200) {
        setMessage(response.data);
        setStudent({
          fullName: '',
          gender: '',
          department: '',
          program: '',
          semester: '',
          year: '',
          dateOfBirth: '',
          password: '',
          email: '',
          contact: ''
        });
      }
    } catch (error) {
      console.log(error.message); // for debugging purpose
      setMessage(error.message);
    }
  };

  return (
    <div>
      <nav> </nav>
      <div className="content">
        {message && <p>{message}</p>}
        <h2 className='ul'>Add New Student</h2>
        <div className = 'design' >
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="form-group">
              <input
                type="text"
                name="fullName"
                value={student.fullName}
                onChange={handleChange}
                placeholder="Enter Full Name"
                required
              />
            </div>
            
            {/* Gender */}
            <div className="form-group">
              <select
                name="gender"
                value={student.gender}
                onChange={handleChange}
                required
              >
                <option value="">---Select Gender---</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHERS">Others</option>
              </select>
            </div>

            {/* Department */}
            <div className="form-group">
              <select
                name="department"
                value={student.department}
                onChange={handleChange}
                required
              >
                <option value="">---Select Department---</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="CSIT">CS&IT</option>
              </select>
            </div>

            {/* Program */}
            <div className="form-group">
              <input
                type="text"
                name="program"
                value={student.program}
                onChange={handleChange}
                placeholder="Enter Program"
                required
              />
            </div>

            {/* Semester */}
            <div className="form-group">
              <input
                type="text"
                name="semester"
                value={student.semester}
                onChange={handleChange}
                placeholder="Enter Semester"
                required
              />
            </div>

            {/* Year */}
            <div className="form-group">
              <input
                type="number"
                name="year"
                value={student.year}
                onChange={handleChange}
                placeholder="Enter Year"
                required
              />
            </div>

            {/* Date of Birth */}
            <div className="form-group">
              <input
                type="date"
                name="dateOfBirth"
                value={student.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <input
                type="password"
                name="password"
                value={student.password}
                onChange={handleChange}
                placeholder="Enter Password"
                required
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={student.email}
                onChange={handleChange}
                placeholder="Enter Email"
                required
              />
            </div>

            {/* Contact */}
            <div className="form-group">
              <input
                type="text"
                name="contact"
                value={student.contact}
                onChange={handleChange}
                placeholder="Enter Contact Number"
                required
              />
            </div>

            {/* Submit and Reset Buttons */}
            <div className="button-group">
              <button type="submit">Add Student</button>
              <button type="reset">Clear</button>
            </div>
          </form>
        </div>
      </div>

     
    </div>
  );
}
