import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export default function Testimonials({ data }) {
  // Get student and faculty data from localStorage
  const storedStudentData = JSON.parse(localStorage.getItem("student"));
  const studentId = storedStudentData ? storedStudentData.id : "";

  const storedFacultyData = JSON.parse(localStorage.getItem("faculty"));
  const facultyId = storedFacultyData ? storedFacultyData.id : "";

  if (!data || data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="space-y-6"
      >
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-rose-600 to-rose-400 bg-clip-text text-transparent">
          References
        </h2>
        <div className="mt-8 p-6 bg-gray-100 rounded-lg text-center">
          {studentId ? (
            // Show this message if a student is logged in
            <p className="text-gray-700 font-medium">
              You don't have any references listed yet. <br />
              <a href="/updateportfolio" className="text-blue-600 hover:underline">
                Add References
              </a>
            </p>
          ) : facultyId ? (
            // Show this message if a faculty is logged in
            <p className="text-gray-700 font-medium">
              The student has not added any references yet. <br />
             
            </p>
          ) : (
            // Show a generic message if neither is logged in
            <p className="text-gray-700 font-medium">
              You don't have any references listed yet. <br />
              <a href="/updateportfolio" className="text-blue-600 hover:underline">
                Add References
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
      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-rose-600 to-rose-400 bg-clip-text text-transparent mb-8">
        What People Say
      </h2>
      <div className="flex flex-col gap-6">
        {data.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow relative"
          >
            <Quote className="w-8 h-8 text-rose-200 absolute top-4 right-4" />
            <div className="space-y-4">
              <p className="text-gray-700 italic relative z-10 pt-2">
                "{testimonial.testimonialText}"
              </p>
              <div className="border-t pt-4">
                <p className="font-semibold text-rose-600">
                  {testimonial.giverName}
                </p>
                {/* Giver's Role */}
                {testimonial.giverRole && (
                  <p className="text-sm text-gray-600">
                    {testimonial.giverRole}
                  </p>
                )}
                {/* Company */}
                {testimonial.giverCompany && (
                  <p className="text-sm text-gray-600">
                    at {testimonial.giverCompany}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
