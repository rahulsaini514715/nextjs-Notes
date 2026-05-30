import DoctorForm from "./DoctorForm";
import DoctorTable from "./DoctorTable";
import "../../app/globals.css";

export default function HospitalPage() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen space-y-6">
      <DoctorForm />
      <DoctorTable />
    </div>
  );
}























// "use client";

// import { useEffect, useState, useTransition } from "react";
// import { addDoctorAction, getDoctors } from "./hospital.action";
// import { useFormStatus } from "react-dom";
// import { useRouter } from "next/navigation";
// import "../../app/globals.css";

// export default function HospitalPage() {
//   const [isPending, startTransition] = useTransition();
//   const [response, setResponse] = useState(null);
//   const [doctors, setDoctors] = useState([]);
//   const router = useRouter();

//   const loadDoctors = async () => {
//     const data = await getDoctors();
//     setDoctors(data);
//   };

//   useEffect(() => {
//     loadDoctors();
//   }, []);

//   const handleSubmit = (formData) => {
//     const data = Object.fromEntries(formData);

//     startTransition(async () => {
//       const res = await addDoctorAction(
//         data.firstName,
//         data.lastName,
//         data.gender,
//         data.specialization
//       );

//       setResponse(res);

//       if (res.success) {
//         router.refresh(); // 🔥 DATA REFRESH (NO FULL PAGE)
//       }
//     });
//   };

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       {/* FORM */}
//       <div className="bg-white p-6 rounded shadow mb-6">
//         <h2 className="text-xl font-bold mb-4">Add Doctor</h2>

//         <form action={handleSubmit} className="space-y-3">
//           <input name="firstName" placeholder="First Name" className="border p-2 w-full" />
//           <input name="lastName" placeholder="Last Name" className="border p-2 w-full" />

//           <select name="gender" className="border p-2 w-full">
//             <option value="">Select Gender</option>
//             <option>Male</option>
//             <option>Female</option>
//           </select>

//           <input
//             name="specialization"
//             placeholder="Specialization"
//             className="border p-2 w-full"
//           />

//           <Submit />
//         </form>

//         {response && (
//           <p className={`mt-3 p-2 ${response.success ? "bg-green-200" : "bg-red-200"}`}>
//             {response.message}
//           </p>
//         )}
//       </div>

//       {/* TABLE */}
//       <div className="bg-white p-6 rounded shadow">
//         <h2 className="text-xl font-bold mb-4">Doctor List</h2>

//         <table className="w-full border">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="border p-2">ID</th>
//               <th className="border p-2">Name</th>
//               <th className="border p-2">Gender</th>
//               <th className="border p-2">Specialization</th>
//             </tr>
//           </thead>
//           <tbody>
//             {doctors.map((d) => (
//               <tr key={d.doctor_id}>
//                 <td className="border p-2">{d.doctor_id}</td>
//                 <td className="border p-2">
//                   {d.first_name} {d.last_name}
//                 </td>
//                 <td className="border p-2">{d.gender}</td>
//                 <td className="border p-2">{d.specialization}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }





// /* SUBMIT BUTTON */
// function Submit() {
//   const { pending } = useFormStatus();

//   return (
//     <button
//       disabled={pending}
//       className="bg-blue-600 text-white px-4 py-2 rounded"
//     >
//       {pending ? "Saving..." : "Add Doctor"}
//     </button>
//   );
// }
