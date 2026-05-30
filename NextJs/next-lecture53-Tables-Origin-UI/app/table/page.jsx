import { db } from "../../lib/db.jsx";
import "../../app/globals.css"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/* ---------- PAGE ---------- */
const DoctorsTable = async () => {
  // ✅ FETCH ALL DOCTORS
  const [doctors] = await db.execute(
    "SELECT * FROM doctors"
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Doctors List</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Specialization</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {doctors.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No doctors found
              </TableCell>
            </TableRow>
          ) : (
            doctors.map((doctor) => (
              <TableRow key={doctor.doctor_id}>
                <TableCell>{doctor.doctor_id}</TableCell>
                <TableCell>{doctor.first_name}</TableCell>
                <TableCell>{doctor.last_name}</TableCell>
                <TableCell>{doctor.gender}</TableCell>
                <TableCell>{doctor.specialization}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DoctorsTable;
