"use client";

import { easeInOut, motion } from "motion/react";
import DoctorCard from "./DoctorCard";
import "../../app/globals.css"

const doctors = [
  {
    doctor_id: 1,
    first_name: "Rahul",
    last_name: "Sharma",
    gender: "Male",
    specialization: "Cardiologist",
  },
  {
    doctor_id: 2,
    first_name: "Neha",
    last_name: "Verma",
    gender: "Female",
    specialization: "Dermatologist",
  },
  {
    doctor_id: 3,
    first_name: "Amit",
    last_name: "Patel",
    gender: "Male",
    specialization: "Orthopedic",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Doctors List</h1>

      <motion.div
        className="flex flex-wrap gap-6"
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3, ease: "easeInOut" }}
        whileTap={{ backgroundColor: "red" }}
        // variants={{
        //   visible: {
        //     transition: {
        //       staggerChildren: 0.15,
        //     },
        //   },
        // }}
      >
        {doctors.map((doc) => (
          <DoctorCard
            key={doc.doctor_id}
            firstName={doc.first_name}
            lastName={doc.last_name}
            gender={doc.gender}
            specialization={doc.specialization}
          />
        ))}
      </motion.div>


    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg w-64 flex justify-center items-center"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 2,
        ease: "linear",
        repeat: Infinity, // continuous rotation
      }}
    >
      <img
        src="https://images.pexels.com/photos/30889575/pexels-photo-30889575/free-photo-of-elegant-orange-sports-car-on-scenic-road.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Doctor"
        className=" w-24 h-24 object-contain"
      />
    </motion.div>

    <motion.div
      className="bg-white ml-100 p-6 rounded-xl shadow-lg w-64 flex justify-center items-center"
      initial={{ rotate: 0 }}
      transition={{ duration: 3, ease: "easeInOut" }}
      // animate={{ rotate: 360 }}
      // whileTap={{rotate: 360}}
      whileHover={{rotate: 360}}
    >
     <span   >Hover</span>
    </motion.div>
      
    </div>
  );
}
