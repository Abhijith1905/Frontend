import React, { useState } from "react";
import { Route, useNavigate, Routes, Link } from "react-router-dom";
import "./login.css";
import axios from "axios";

import AdminHome from "../Admin/AdminHome";
import FacultyHome from "../Faculty/FacultyHome";
import StudentHome from "../Student/StudentHome";
import config from "../config.jsx";

export default function Login({onAdminLogin,onStudentLogin,onFacultyLogin}) {

  const [containerClasses, setContainerClasses] = useState(
    "initial-panel-active"
  );

  const [showPassword1, setShowPassword1] = useState(false);

  const handleShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };

  const [showPassword2, setShowPassword2] = useState(false);

  const handleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const [showPassword3, setShowPassword3] = useState(false);

  const handleShowPassword3 = () => {
    setShowPassword3(!showPassword3);
  };



  const handleAdminClick = () => {
    setContainerClasses("right-panel-active");
  };

  const handleFacultyClick = () => {
    setContainerClasses("left-panel-active");
  };

  const handleStudentClick = () => {
    setContainerClasses("mid-panel-active");
  };
  const [adminformData, setAdminFormData] = useState({
    username: "",
    password: "",
  });
  const [message1, setMessage1] = useState("");
  const [error1, setError1] = useState("");

  const navigate1 = useNavigate();

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setAdminFormData({ ...adminformData, [name]: value });
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${config.url}/checkadminlogin`,
        adminformData
      );
      if (
        response.data !== null &&
        Object.keys(response.data).length > 0 // Ensure it has keys
    ) 
    {
        onAdminLogin();

        console.log(response.data);
        localStorage.setItem('admin', JSON.stringify(response.data));

        navigate1("/adminhome");
      } else {
        setMessage1("Login Failed");
        setError1("");
      }
    } catch (error) {
      setMessage1("");
      setError1(error.message);
    }
  };

  const [studentformData, setStudentFormData] = useState({
    email: "",
    password: "",
  });
  const [message2, setMessage2] = useState("");
  const [error2, setError2] = useState("");

  const navigate2 = useNavigate();

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setStudentFormData({ ...studentformData, [name]: value });
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${config.url}/checkstudentlogin`,
        studentformData
      );
      if (
        response.data !== null &&
        Object.keys(response.data).length > 0 // Ensure it has keys
    ) 
    {
        onStudentLogin();

        localStorage.setItem('student', JSON.stringify(response.data));
        navigate2("/studenthome");
      } else {
        setMessage2("Login Failed");
        setError2("");
      }
    } catch (error) {
      setMessage2("");
      setError2(error.message);
    }
  };

  const [facultyformData, setFacultyFormData] = useState({
    username: "",
    password: "",
  });
  const [message3, setMessage3] = useState("");
  const [error3, setError3] = useState("");

  const navigate3 = useNavigate();

  const handleChange3 = (e) => {
    const { name, value } = e.target;
    setFacultyFormData({ ...facultyformData, [name]: value });
  };

  const handleSubmit3 = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${config.url}/checkfacultylogin`,
        facultyformData
      );
      if (
        response.data !== null &&
        Object.keys(response.data).length > 0 // Ensure it has keys
    ) 
    {
    
        onFacultyLogin();

        localStorage.setItem('faculty', JSON.stringify(response.data));
        navigate3("/facultyhome");
      } else {
        setMessage3("Login Failed");
        setError3("");
      }
    } catch (error) {
      setMessage3("");
      setError3(error.message);
    }
  };

  return (
    <div>
      <div>
        <div
          className={`SuperContainer ${containerClasses}`}
          id="SuperContainer"
        >
          <div className="Formcontainer Admincontainer">
            <form className="form" onSubmit={handleSubmit1}>
              <h1>Admin</h1>
              {message1 ? (
                <h4 style={{color:"red"}} align="center">{message1}</h4>
              ) : (
                <h4  style={{color:"red"}}  align="center">{error1}</h4>
              )}
              <input
                id="inp1A"
                name="username"
                type="text"
                placeholder="Username"
                onChange={handleChange1}
                required
              />
              <input
                id="inp1B"
                name="password"
                type={showPassword1 ? "text" : "password"}
                placeholder="Password"
                onChange={handleChange1}
                required
              />
              <pre>
                <input type="checkbox" onClick={handleShowPassword1} /> Show
                Password
              </pre>
              <Link to="/adminresetpasswordstart">Reset your password</Link>
              <input type="submit" value="login" />
            </form>
          </div>
          <div className="Formcontainer Studentcontainer">
            <form  className="form"  onSubmit={handleSubmit2}>
              {message2 ? (
                <h4  style={{color:"red"}}  align="center">{message2}</h4>
              ) : (
                <h4  style={{color:"red"}}  align="center">{error2}</h4>
              )}
              <h1>Student</h1>
              <input
                id="inp2A"
                name="email"
                type="text"
                placeholder="Email"
                onChange={handleChange2}
                required
              />
              <input
                id="inp2B"
                name="password"
                type={showPassword2 ? "text" : "password"}
                placeholder="Password"
                onChange={handleChange2}
                required
              />
              <pre>
                <input type="checkbox" onClick={handleShowPassword2} /> Show
                Password
              </pre>
              <Link to="/studentresetpasswordstart">Reset your password</Link>
              <input type="submit" value="login" />
            </form>
          </div>
          <div className="Formcontainer Facultycontainer">
            <form className="form"  onSubmit={handleSubmit3}>
              {message3 ? (
                <h4  style={{color:"red"}} align="center">{message3}</h4>
              ) : (
                <h4  style={{color:"red"}} align="center">{error3}</h4>
              )}
              <h1>Faculty</h1>
              <input
                id="inp3A"
                name="username"
                type="text"
                placeholder="Username"
                onChange={handleChange3}
                required
              />
              <input
                id="inp3B"
                name="password"
                type={showPassword3 ? "text" : "password"}
                placeholder="Password"
                onChange={handleChange3}
                required
              />
              <pre>
                <input type="checkbox" onClick={handleShowPassword3} /> Show
                Password
              </pre>
              <Link to="/facultyresetpasswordstart">Reset your password</Link>
              <input type="submit" value="login" />
            </form>
          </div>

          <div className="Overlaycontainer">
            <div className="Overlay">
              <div className="Overlay2"></div>
              <div className="Overlaypanel left">
                <h1>Hello Teacher</h1>
                <img src="prof.png" alt="Professor Icon" class="image" />
                <p>Please hit the button below to find your Login page.</p>
                <button id="Faculty" onClick={handleFacultyClick}>
                  {" "}
                  Faculty{" "}
                </button>
              </div>
              <div className="Overlaypanel mid">
                <h1>Hello, Students</h1>
                <img src="student.png" alt="Student Icon" class="image" />
                <p>Please hit the button below to find your Login page.</p>
                <button id="Student" onClick={handleStudentClick}>
                  {" "}
                  Student{" "}
                </button>
              </div>
              <div className="Overlaypanel right">
                <h1>Hello, Admin</h1>
                <img src="admin.png" alt="Admin Icon" class="image" />
                <p>Please hit the button below to find your Login page.</p>
                <button id="Admin" onClick={handleAdminClick}>
                  {" "}
                  Admin{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
     <Routes>


        <Route path="/adminhome" element={<AdminHome />}></Route>
        <Route path="/facultyhome" element={<FacultyHome />}></Route>
        <Route path="/studenthome" element={<StudentHome />}></Route>
        
      
        </Routes>
    </div>
  );
}
