import React from 'react';
import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';

export default function Internships({ internship }) {
  if (!internship || internship.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="space-y-6"
      >
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
          Professional Experience
        </h2>
        <div className="mt-8 p-6 bg-gray-100 rounded-lg text-center">
        

<p className="text-gray-700 font-medium">You don't have any internships listed yet. <br></br> <a href="/updateportfolio" className="text-blue-600 hover:underline">Add Professional Experience</a>. </p>



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
      <h2 style={{ paddingTop: "500px" }} className="text-3xl font-bold text-center bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
        Professional Experience
      </h2>
      <div className="space-y-6">
        {internship.map((internship, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Building2 className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-green-800">{internship.companyName}</h3>
                <p className="text-green-600 font-medium mt-1">{internship.role}</p>
                <div className="mt-4 flex items-center text-sm text-gray-600">
                  <span>{internship.startDate}</span>
                  <span className="mx-2">→</span>
                  <span>{internship.endDate}</span>
                </div>
                <p className="mt-3 text-gray-700 text-sm">{internship.about}</p>
                <div className="mt-4 text-sm">
                  <p className="font-medium text-gray-600">Technologies Used:</p>
                  <ul className="list-disc pl-6 text-gray-600">
                    {(internship.technologiesUsed?.split(",") || []).map((tech, idx) => (
                      <li key={idx}>{tech.trim()}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 text-sm">
                  <p className="font-medium text-gray-600">Achievements:</p>
                  <ul className="list-disc pl-6 text-gray-600">
                    {(internship.achievements?.split(",") || []).map((achievement, idx) => (
                      <li key={idx}>{achievement.trim()}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 text-sm">
                  <p className="font-medium text-gray-600">Skills Gained:</p>
                  <ul className="list-disc pl-6 text-gray-600">
                    {(internship.skillsGained?.split(",") || []).map((skill, idx) => (
                      <li key={idx}>{skill.trim()}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <p><span className="font-medium">Location:</span> {internship.location}</p>
                  <a href="/viewportfolio" className="text-green-600 hover:text-green-800 mt-2 inline-block">
                    Learn more about me 
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}