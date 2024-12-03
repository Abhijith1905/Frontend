import React from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

export default function Projects({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-8">
        Student Projects
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {data.map((project, index) => (
          <motion.div
            key={project.projectId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 hover:border-blue-200"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                <Briefcase className="w-6 h-6 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-blue-800 truncate">
                  {project.title}
                </h3>
                <p className="text-blue-600 mt-1 text-sm">{project.description}</p>
                <div className="mt-4 space-y-1">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium min-w-20">Phase:</span>
                    <span className="ml-2">{project.phase}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium min-w-20">Progress:</span>
                    <span className="ml-2">{project.percentage}</span>
                  </div>
                 
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
