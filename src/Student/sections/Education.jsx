import React from 'react';
import { motion } from 'framer-motion';

export default function Education({ mydata }) {
  const { education, portfolios } = mydata;

  // Retrieve stored data for student and faculty
  const storedStudentData = JSON.parse(localStorage.getItem("student"));
  const studentId = storedStudentData ? storedStudentData.id : "";

  const storedFacultyData = JSON.parse(localStorage.getItem("faculty"));
  const facultyId = storedFacultyData ? storedFacultyData.id : "";

  // Check if student or faculty is logged in
  const isStudent = studentId !== "";
  const isFaculty = facultyId !== "";

  // Check if data is available
  if (!mydata || mydata.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="space-y-6"
      >
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
          Education Experience
        </h2>
        <div className="mt-8 p-6 bg-gray-100 rounded-lg text-center">
          <p className="text-gray-700 font-medium">
            {isStudent ? (
              <>
                You don't have your education listed yet. <br />
                <a href="/updateportfolio" className="text-blue-600 hover:underline">
                  Add Education
                </a>
              </>
            ) : isFaculty ? (
              <>
                The student has not added their education details yet.
              </>
            ) : (
              <>
                Please log in to see your education details.
              </>
            )}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <h2
        style={{ paddingTop: "20px" }}
        className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
      >
        Education Journey
      </h2>

      {/* Portfolio Summary Box with Full Width */}
      <motion.div
        key="portfolio"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: education.length * 0.1 }}
        className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow w-full mt-6" // Full width
      >
        <h3 className="text-xl font-bold text-blue-800">About Me</h3>
        {portfolios.map((portfolio) => (
          <div key={portfolio.portfolioId} className="mt-2">
            <p>{portfolio.summary}</p>
          </div>
        ))}
      </motion.div>

      {/* Education Boxes in a Row (2 per row) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
        {education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <h3 className="text-xl font-bold text-blue-800">{edu.educationInstitution}</h3>
            <p className="text-blue-600 mt-2">{edu.educationDegree}</p>
            <p className="text-sm text-gray-500">{edu.fieldOfStudy}</p>
            {edu.grade && <p className="text-sm text-gray-500">Grade: {edu.grade}</p>}
            {edu.location && <p className="text-sm text-gray-500">Location: {edu.location}</p>}
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <span>{new Date(edu.educationStartDate).toLocaleDateString()}</span>
              <span className="mx-2">→</span>
              <span>{new Date(edu.educationEndDate).toLocaleDateString()}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
