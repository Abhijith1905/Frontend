import { useState } from 'react';
import axios from 'axios';

export default function UpdateStudent() {
  const [student, setStudent] = useState({
    id: '',
    name: '',
    gender: '',
    department: '',
    program: '',
    semester: '',
    year: '',
    dob: '',
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
      const response = await axios.put('http://localhost:2025/updatestudent', student);
      if (response.status === 200) { // if successfully updated
        setMessage(response.data);
        setStudent({
          id: '',
          name: '',
          gender: '',
          department: '',
          program: '',
          semester: '',
          year: '',
          dob: '',
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
    <div >
      <nav> </nav>
        {message ? (
          <p style={{ color: "red", fontWeight: "bolder" }}>{message}</p>
        ) : (
          <p></p>
        )}
        <h2 style={{paddingTop:"120px"}} className="ul">Update Student</h2>
        <div className="design">
          <form onSubmit={handleSubmit}>
            <div>
              <input type="number" name="id" value={student.id} onChange={handleChange} placeholder="ID" required />
            </div>
            <div>
              <input type="text" name="name" value={student.name} onChange={handleChange} placeholder="Full Name" required />
            </div>
            <div>
              <select name="gender" value={student.gender} onChange={handleChange} required>
                <option value="">---Select Gender---</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHERS">Others</option>
              </select>
            </div>
            <div>
              <select name="department" value={student.department} onChange={handleChange} required>
                <option value="">---Select Department---</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="CS&I">CS&IT</option>
              </select>
            </div>
            <div>
              <input type="text" name="program" value={student.program} onChange={handleChange} placeholder="Program" required />
            </div>
            <div>
              <input type="text" name="semester" value={student.semester} onChange={handleChange} placeholder="Semester" required />
            </div>
            <div>
              <input type="text" name="year" value={student.year} onChange={handleChange} placeholder="Year" required />
            </div>
            <div>
              <input type="date" name="dob" value={student.dob} onChange={handleChange} required />
            </div>
            <div>
              <input type="email" name="email" value={student.email} onChange={handleChange} placeholder="Email" required />
            </div>
            <div>
              <input type="number" name="contact" value={student.contact} onChange={handleChange} placeholder="Contact" required />
            </div>
            <button type="submit">Update</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button type="reset">Clear</button>
          </form>
      </div>
    </div>
  );
}
