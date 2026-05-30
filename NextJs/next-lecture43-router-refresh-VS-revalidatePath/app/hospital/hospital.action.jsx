"use server";

import { db } from "../../lib/db.jsx";

export const addDoctorAction = async (
  firstName,
  lastName,
  gender,
  specialization
) => {
  try {
    if (!firstName || !lastName || !gender || !specialization) {
      return { success: false, message: "All fields are required" };
    }

    await db.execute(
      `INSERT INTO doctors (first_name, last_name, gender, specialization)
       VALUES (?, ?, ?, ?)`,
      [firstName, lastName, gender, specialization]
    );

    return { success: true, message: "Doctor added successfully" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error while adding doctor" };
  }
};

export const getDoctors = async () => {
  const [rows] = await db.execute(
    `SELECT * FROM doctors ORDER BY doctor_id DESC`
  );
  return rows;
};
