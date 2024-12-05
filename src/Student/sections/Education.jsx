import React from 'react';
import { motion } from 'framer-motion';

export default function Education({ mydata }) {
  const { education, portfolios } = mydata;

  // const data = [
  //   {
  //     educationInstitution: "XYZ Institute",
  //     educationDegree: "Master of Technology in Artificial Intelligence",
  //     fieldOfStudy: "Artificial Intelligence",
  //     grade: "B+",
  //     location: "London, UK",
  //     educationStartDate: "2020-08-01",
  //     educationEndDate: "2022-05-15"
  //   },
  //   {
  //     educationInstitution: "Udemy",
  //     educationDegree: "Certified Web Developer",
  //     fieldOfStudy: "Web Development",
  //     grade: "N/A",
  //     location: "Online",
  //     educationStartDate: "2023-01-10",
  //     educationEndDate: "2023-05-01"
  //   },
  //   {
  //     educationInstitution: "Stanford University",
  //     educationDegree: "PhD in Computer Science",
  //     fieldOfStudy: "Computer Science",
  //     grade: "N/A",
  //     location: "California, USA",
  //     educationStartDate: "2023-09-01",
  //     educationEndDate: "2028-06-30"
  //   }
  // ];

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
        <p >{portfolio.summary}</p>
      </div>
    ))}
  </motion.div>

  {/* Education Boxes with Two per Row */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
    {education.map((edu, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow ${index === 0 ? 'col-span-1 lg:col-span-2' : ''}`} // First item takes full width
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