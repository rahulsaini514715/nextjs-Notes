"use client";

import { useTransition, useState } from "react";
import { addDoctorAction } from "./hospital.action";
import { useFormStatus } from "react-dom";

export default function DoctorForm() {
  const [isPending, startTransition] = useTransition();
  const [response, setResponse] = useState(null);

  const handleSubmit = (formData) => {
    const data = Object.fromEntries(formData);

    startTransition(async () => {
      const res = await addDoctorAction(
        data.firstName,
        data.lastName,
        data.gender,
        data.specialization
      );
      setResponse(res);
    });
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Doctor</h2>

      <form action={handleSubmit} className="space-y-3">
        <input name="firstName" placeholder="First Name" className="border p-2 w-full" />
        <input name="lastName" placeholder="Last Name" className="border p-2 w-full" />

        <select name="gender" className="border p-2 w-full">
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <input
          name="specialization"
          placeholder="Specialization"
          className="border p-2 w-full"
        />

        <Submit />
      </form>

      {response && (
        <p className={`mt-3 p-2 ${response.success ? "bg-green-200" : "bg-red-200"}`}>
          {response.message}
        </p>
      )}
    </div>
  );
}

/* SUBMIT BUTTON */
function Submit() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      {pending ? "Saving..." : "Add Doctor"}
    </button>
  );
}
