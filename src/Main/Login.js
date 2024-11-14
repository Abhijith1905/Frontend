import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";

const styles = {
  content: {
    paddingTop: "150px",
  },
};

const Login = ({ onFacultyLogin, onStudentLogin }) => {
  const [rightPanelActive, setRightPanelActive] = useState(false);
  const [studentFormData, setStudentFormData] = useState({
    email: "",
    password: "",
  });
  const [facultyFormData, setFacultyFormData] = useState({
    username: "",
    password: "",
  });

  // Separate message and error states for student and faculty
  const [studentMessage, setStudentMessage] = useState("");
  const [studentError, setStudentError] = useState("");
  const [facultyMessage, setFacultyMessage] = useState("");
  const [facultyError, setFacultyError] = useState("");

  const navigate = useNavigate();

  const handleFacultySignInClick = () => {
    setRightPanelActive(true);
  };

  const handleStudentSignInClick = () => {
    setRightPanelActive(false);
  };

  const handleChange = (e, formType) => {
    if (formType === "student") {
      setStudentFormData((student) => ({
        ...student,
        [e.target.name]: e.target.value,
      }));
    } else {
      setFacultyFormData((faculty) => ({
        ...faculty,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleStudentLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(studentFormData);
      const response = await axios.post(
        `http://localhost:2025/checkstudentlogin?email=${studentFormData.email}&password=${studentFormData.password}`
      );
      console.log(response.data);
      if (response.data != null && Object.keys(response.data).length > 0) {
        onStudentLogin();

        localStorage.setItem("student", JSON.stringify(response.data));

        navigate("/studenthome");
      } else {
        setStudentMessage("Login Failed");
        setStudentError("");
      }
    } catch (error) {
      setStudentMessage("");
      setStudentError(error.message);
    }
  };

  const handleFacultyLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:2025/checkfacultylogin?username=${facultyFormData.username}&password=${facultyFormData.password}`
      );
      console.log(response.data);
      if (response.data != null && Object.keys(response.data).length > 0) {
        onFacultyLogin();

        localStorage.setItem("faculty", JSON.stringify(response.data));

        navigate("/facultyhome");
      } else {
        setFacultyMessage("Login Failed");
        setFacultyError("");
      }
    } catch (error) {
      setFacultyMessage("");
      setFacultyError(error.message);
    }
  };

  return (
    <div style={styles.content}>
      <center>
        <h1 style={{ color: "#4a4a75" }}>Login</h1>
      </center>
      <br />
      <br />
      <div
        className={`container ${rightPanelActive ? "right-panel-active" : ""}`}
        id="container"
      >
        <div className="form-container sign-up-container">
          <form className="form" onSubmit={handleFacultyLoginSubmit}>
            <h2 style={{ color: "rgb(35, 74, 121)" }}>Faculty Login</h2>
            {facultyMessage ? (
              <h4 style={{ color: "red" }} align="center">
                {facultyMessage}
              </h4>
            ) : (
              <h4 align="center" style={{ color: "red" }}>
                {facultyError}
              </h4>
            )}
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={facultyFormData.username}
              onChange={(e) => handleChange(e, "faculty")}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={facultyFormData.password}
              onChange={(e) => handleChange(e, "faculty")}
              required
            />
            <span>Forgot your password?</span>
            <button type="submit">Login</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form className="form" onSubmit={handleStudentLoginSubmit}>
            <h2 style={{ color: "rgb(35, 74, 121)" }}>Student Login</h2>
            {studentMessage ? (
              <h4 style={{ color: "red" }} align="center">
                {studentMessage}
              </h4>
            ) : (
              <h4 align="center" style={{ color: "red" }}>
                {studentError}
              </h4>
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={studentFormData.email}
              onChange={(e) => handleChange(e, "student")}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={studentFormData.password}
              onChange={(e) => handleChange(e, "student")}
              required
            />
            <span>Forgot your password?</span>
            <button type="submit">Login</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Hey, Are you a Student!</h1>
              <p>Click here if you are</p>
              <button
                className="ghost"
                onClick={handleStudentSignInClick}
                id="signIn"
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Are you Faculty!</h1>
              <p>Click here if you are</p>
              <button
                className="ghost"
                onClick={handleFacultySignInClick}
                id="signUp"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
