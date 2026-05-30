"use client";

import { useTransition } from "react";
import { addDoctorAction } from "./hospital.action";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

export default function DoctorForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (formData) => {
    const data = Object.fromEntries(formData);

    startTransition(async () => {
      const res = await addDoctorAction(
        data.firstName,
        data.lastName,
        data.gender,
        data.specialization
      );

      if (res.success) {
        router.refresh(); // ✅ WORKS NOW //refresh
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded shadow mb-6">
      <form action={handleSubmit} className="space-y-3">
        <input name="firstName" placeholder="First Name" className="border p-2 w-full" />
        <input name="lastName" placeholder="Last Name" className="border p-2 w-full" />

        <select name="gender" className="border p-2 w-full">
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <input name="specialization" placeholder="Specialization" className="border p-2 w-full" />

        <Submit />
      </form>
    </div>
  );
}

function Submit() {
  const { pending } = useFormStatus();

  return (
    <button className="bg-blue-600 text-white px-4 py-2 rounded">
      {pending ? "Saving..." : "Add Doctor"}
    </button>
  );
}
