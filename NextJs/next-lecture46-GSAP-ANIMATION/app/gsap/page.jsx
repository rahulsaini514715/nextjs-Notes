"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import DoctorCard from "./DoctorCard";
import "../../app/globals.css";

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
  const cardsRef = useRef([]);
  const rotateImgRef = useRef(null);
  const hoverBoxRef = useRef(null);

  // 🔹 Doctors cards animation (stagger)
  useEffect(() => {
    gsap.from(cardsRef.current, {
      opacity: 0,
      y: 40,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out",
    });
  }, []);

  // 🔹 Infinite rotation animation
  useEffect(() => {
    gsap.to(rotateImgRef.current, {
      rotate: 360,
      duration: 2,
      repeat: -1,
      ease: "linear",
    });
  }, []);

  // 🔹 Hover animation
  useEffect(() => {
    const el = hoverBoxRef.current;

    const onEnter = () => {
      gsap.to(el, { rotate: 360, duration: 1, ease: "power2.inOut" });
    };

    const onLeave = () => {
      gsap.to(el, { rotate: 0, duration: 0.5 });
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Doctors List</h1>

      {/* Doctors Cards */}
      <div className="flex flex-wrap gap-6">
        {doctors.map((doc, index) => (
          <div
            key={doc.doctor_id}
            ref={(el) => (cardsRef.current[index] = el)}
          >
            <DoctorCard
              firstName={doc.first_name}
              lastName={doc.last_name}
              gender={doc.gender}
              specialization={doc.specialization}
            />
          </div>
        ))}
      </div>

      {/* Infinite rotating image */}
      <div
        ref={rotateImgRef}
        className="bg-white mt-10 p-6 rounded-xl shadow-lg w-64 flex justify-center items-center"
      >
        <img
          src="https://images.pexels.com/photos/30889575/pexels-photo-30889575/free-photo-of-elegant-orange-sports-car-on-scenic-road.jpeg"
          alt="Doctor"
          className="w-24 h-24 object-contain"
        />
      </div>

      {/* Hover rotate */}
      <div
        ref={hoverBoxRef}
        className="bg-white mt-10 ml-100 p-6 rounded-xl shadow-lg w-64 flex justify-center items-center cursor-pointer"
      >
        <span>Hover</span>
      </div>
    </div>
  );
}
