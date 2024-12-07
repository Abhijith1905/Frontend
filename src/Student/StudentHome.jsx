import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectCount from './ProjectCount';
import WelcomeSection from './WelcomeSection';
import Footer from './Footer';

function StudentHome() {

  React.useEffect(() => {
    // Disable the scrollbars globally
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto"; // Re-enable scrollbars
      document.documentElement.style.overflow = "auto";
    };
  }, []);
  
  const [count, setCount] = useState(0);
  const [error, setError] = useState('');

  const storedStudentData = JSON.parse(localStorage.getItem('student'));

  const fetchCount = async (studentId) => {
    try {
      const response = await axios.get(
       `${config.url}/sprojectcount?studentId=${studentId}`
      );
      setCount(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (storedStudentData?.id) {
      fetchCount(storedStudentData.id);
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-0">  {/* Removed padding-bottom */}
      {/* ProjectCount with no gap */}
      <div style={{ marginBottom: 0 }}>
        <ProjectCount count={count} error={error} />
      </div>
      
      {/* WelcomeSection with no gap */}
      <div style={{ marginTop: 0 }}>
        <WelcomeSection />
      </div>
      
      <Footer />
    </div>
  );
}

export default StudentHome;
