import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css"
import MainNavBar from "./Main/MainNavBar";
import StudentNavBar from "./Student/StudentNavBar";
import FacultyNavBar from "./Faculty/FacultyNavBar";
import AdminNavbar from './Admin/AdminNavbar';
import { ToastContainer } from 'react-toastify';

function App() {
  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(false);
  const [isFacultyLoggedIn, setIsFacultyLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const studentLoggedIn =
      localStorage.getItem("isStudentLoggedIn") === "true";
    const facultyLoggedIn =
      localStorage.getItem("isFacultyLoggedIn") === "true";
    const adminLoggedIn = 
      localStorage.getItem("isAdminLoggedIn") === "true";

    setIsStudentLoggedIn(studentLoggedIn);
    setIsFacultyLoggedIn(facultyLoggedIn);
    setIsAdminLoggedIn(adminLoggedIn);
  }, []);

  const onStudentLogin = () => {
    localStorage.setItem("isStudentLoggedIn", "true");
    setIsStudentLoggedIn(true);
  };

  const onFacultyLogin = () => {
    localStorage.setItem("isFacultyLoggedIn", "true");
    setIsFacultyLoggedIn(true);
  };

  const onAdminLogin = () => {
    localStorage.setItem("isAdminLoggedIn", "true");
    setIsAdminLoggedIn(true);
  };

  const handleLogout = () => {
    // Remove all login states from localStorage
    localStorage.removeItem("isStudentLoggedIn");
    localStorage.removeItem("isFacultyLoggedIn");
    localStorage.removeItem("isAdminLoggedIn");

    // Update states to reflect the logout
    setIsStudentLoggedIn(false);
    setIsFacultyLoggedIn(false);
    setIsAdminLoggedIn(false);
  };

  return (
    <div className="App">
      <Router>
        {isStudentLoggedIn ? (
          <StudentNavBar onLogout={handleLogout} />
        ) : isFacultyLoggedIn ? (
          <FacultyNavBar onLogout={handleLogout}  />
        ): isAdminLoggedIn ? (
          <AdminNavbar />
        ): (
          <MainNavBar
            onStudentLogin={onStudentLogin}
            onFacultyLogin={onFacultyLogin}
            onAdminLogin={onAdminLogin}
          />
        )}
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
