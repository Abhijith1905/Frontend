import React from 'react';
import { motion } from 'framer-motion';

export default function Skills({ data }) {
  // Get student and faculty data from localStorage
  const storedStudentData = JSON.parse(localStorage.getItem("student"));
  const studentId = storedStudentData ? storedStudentData.id : "";

  const storedFacultyData = JSON.parse(localStorage.getItem("faculty"));
  const facultyId = storedFacultyData ? storedFacultyData.id : "";

  // Function to determine the progress bar width based on skill level
  const getProgressBarWidth = (skillLevel) => {
    if (skillLevel === 'Expert') return 100;
    if (skillLevel === 'Intermediate') return 60;
    return 30;  // Beginner level
  };

  if (!data || data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="space-y-6"
      >
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
          Skills
        </h2>
        <div className="mt-8 p-6 bg-gray-100 rounded-lg text-center">
          {studentId ? (
            // Show this message if a student is logged in
            <p className="text-gray-700 font-medium">
              You don't have any skills listed yet. <br />
              <a href="/updateportfolio" className="text-blue-600 hover:underline">
                Add Skills
              </a>
            </p>
          ) : facultyId ? (
            // Show this message if a faculty is logged in
            <p className="text-gray-700 font-medium">
              The student has not added any skills yet. <br />
              <a href="/updateportfolio" className="text-blue-600 hover:underline">
                Request Student to Add Skills
              </a>
            </p>
          ) : (
            // Show a generic message if neither is logged in
            <p className="text-gray-700 font-medium">
              You don't have any skills listed yet. <br />
              <a href="/updateportfolio" className="text-blue-600 hover:underline">
                Add Skills
              </a>
            </p>
          )}
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
      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
        Technical Skills
      </h2>

      <div className="flex flex-wrap justify-center gap-6">
        {data.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow w-72"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-3">{skill.skillName}</h3>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${skill.skillLevel === 'Expert' ? 'bg-green-300 text-green-600' : skill.skillLevel === 'Intermediate' ? 'bg-yellow-300 text-yellow-600' : 'bg-red-300 text-red-600'}`}>
                  {skill.skillLevel}
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-orange-200">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${getProgressBarWidth(skill.skillLevel)}%` }}  // Dynamically adjust width based on skill level
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500"
                />
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>{skill.yearsOfExperience} years</span>
              <span>{skill.skillCategory} category</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
