import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export default function Testimonials({data}) {

  // Static Data
// const data = [
//   {
//     testimonialText: "This service has truly transformed my business operations. The level of efficiency we've gained is incredible.",
//     giverName: "Alice Johnson",
//     giverRole: "CEO",
//     giverCompany: "Tech Innovations",
//   },
//   {
//     testimonialText: "I can't imagine working without this tool anymore. It has streamlined our workflows and increased productivity significantly.",
//     giverName: "Mark Smith",
//     giverRole: "Lead Developer",
//     giverCompany: "Dev Masters",
//   },
//   {
//     testimonialText: "A must-have for any business looking to optimize their processes. The results speak for themselves!",
//     giverName: "Emily Davis",
//     giverRole: "Operations Manager",
//     giverCompany: "Solutions Corp",
//   },
// ];


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-rose-600 to-rose-400 bg-clip-text text-transparent">
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

