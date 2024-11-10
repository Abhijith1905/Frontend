// import logo from './logo.svg';
// import './App.css';
import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import MainNavBar from "./Main/MainNavBar";
import StudentNavBar from "./Student/StudentNavBar";
import FacultyNavBar from "./Faculty/FacultyNavBar";

function App() {
  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(false);
  const [isFacultyLoggedIn, setIsFacultyLoggedIn] = useState(false);

  useEffect(() => {
    const studentLoggedIn =
      localStorage.getItem("isStudentLoggedIn") === "true";
    const facultyLoggedIn =
      localStorage.getItem("isFacultyLoggedIn") === "true";

    setIsStudentLoggedIn(studentLoggedIn);
    setIsFacultyLoggedIn(facultyLoggedIn);
  }, []);

  const onStudentLogin = () => {
    localStorage.setItem("isStudentLoggedIn", "true");
    setIsStudentLoggedIn(true);
  };

  const onFacultyLogin = () => {
    localStorage.setItem("isFacultyLoggedIn", "true");
    setIsFacultyLoggedIn(true);
  };
  return (
    <div className="App">
      <Router>
        {isStudentLoggedIn ? (
          <StudentNavBar />
        ) : isFacultyLoggedIn ? (
          <FacultyNavBar />
        ) : (
          <MainNavBar
            onStudentLogin={onStudentLogin}
            onFacultyLogin={onFacultyLogin}
          />
        )}
      </Router>
    </div>
  );
}

export default App;
