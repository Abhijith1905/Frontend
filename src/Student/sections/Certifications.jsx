import React from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion
import { Award } from "lucide-react";

export default function Certifications({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent mb-8">
        Professional Certifications
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {data.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 hover:border-purple-200"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                <Award className="w-6 h-6 text-purple-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-purple-800 truncate">
                  {cert.certificationName}
                </h3>
                <p className="text-purple-600 mt-1 text-sm">
                  {cert.certificationIssuer}
                </p>
                <p className="text-gray-700 mt-2 text-sm">{cert.description}</p>
                <div className="mt-4 space-y-1">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium min-w-20">Marks Scored:</span>
                    <span className="ml-2">{cert.marksScored}</span>
                  </div>
                  {cert.honors && (
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium min-w-20">Honors:</span>
                      <span className="ml-2">{cert.honors}</span>
                    </div>
                  )}
                  {cert.verificationLink && (
                    <div className="text-sm text-blue-600 mt-2">
                      <a
                        href={cert.verificationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        Verify Certification
                      </a>
                    </div>
                  )}
                  {cert.certificationDate && (
                    <div className="flex items-center text-sm text-gray-600 mt-2">
                      <span className="font-medium min-w-20">Certification Date:</span>
                      <span className="ml-2">{new Date(cert.certificationDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  {cert.expirationDate && (
                    <div className="flex items-center text-sm text-gray-600 mt-2">
                      <span className="font-medium min-w-20">Expiration Date:</span>
                      <span className="ml-2">{new Date(cert.expirationDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}