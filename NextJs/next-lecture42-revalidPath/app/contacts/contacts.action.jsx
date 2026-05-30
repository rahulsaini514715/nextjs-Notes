"use server";

import { db } from "../../lib/db.jsx";

const contactAction = async ( fullName,email,message) => {
  try {
    // const { fullName, email, message } =
    //   Object.fromEntries(formData.entries());

    if (!fullName || !email || !message) {
      return { success: false, message: "All fields are required" };
    }

    await db.execute(
      `INSERT INTO contact (full_name, email, message)
       VALUES (?, ?, ?)`,
      [fullName, email, message]
    );

    return {
      success: true,
      message: "Form submitted successfully",
    };
  } catch (error) {
    console.log("server action error:", error);
    return {
      success: false,
      message: "Error while submitting form",
    };
  }
};

export default contactAction;
