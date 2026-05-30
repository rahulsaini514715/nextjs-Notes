import { getDoctors } from "./hospital.action";

export default async function DoctorTable() {
  const doctors = await getDoctors();

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Doctor List</h2>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Gender</th>
            <th className="border p-2">Specialization</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((d) => (
            <tr key={d.doctor_id}>
              <td className="border p-2">{d.doctor_id}</td>
              <td className="border p-2">
                {d.first_name} {d.last_name}
              </td>
              <td className="border p-2">{d.gender}</td>
              <td className="border p-2">{d.specialization}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
