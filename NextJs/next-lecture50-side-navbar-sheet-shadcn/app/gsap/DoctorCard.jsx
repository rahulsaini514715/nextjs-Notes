"use client";

import { easeInOut, motion } from "motion/react";


// const cardVariants = {
//   hidden: {
//     opacity: 1,
//     y: 30,
//   },
//   visible: {
//     opacity: 1,
//     y: 0,
//   },
// };

export default function DoctorCard({
  firstName,
  lastName,
  gender,
  specialization,
}) {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-5 w-64 cursor-pointer"
      // variants={cardVariants}
      whileHover={{ scale: 1.30 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <motion.h2
      initial={{opacity:0,y:40}}
      animate={{opacity:1,y:0}}
      transition={{ease:easeInOut,delay:0.6}}
      className="text-lg font-bold text-gray-800">
        Dr. {firstName} {lastName}
      </motion.h2>

      <p className="text-sm text-gray-600 mt-1">
        Gender: <span className="font-medium">{gender}</span>
      </p>

      <p className="text-sm text-gray-600">
        Specialization:{" "}
        <span className="font-medium">{specialization}</span>
      </p>
    </motion.div>
  );
}
