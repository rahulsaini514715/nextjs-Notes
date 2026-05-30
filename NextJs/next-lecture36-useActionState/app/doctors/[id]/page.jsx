import { db } from "../../../lib/db.jsx";
// import { notFound } from "next/navigation";

/* ---------- STATIC PARAMS ---------- */
export async function generateStaticParams() {
  const [doctors] = await db.execute(
    "SELECT doctor_id FROM doctors"
  );

  return doctors.map((doctor) => ({
    id: doctor.doctor_id.toString(),
  }));
}

/* ---------- SINGLE DOCTOR PAGE ---------- */
const SingleDoctor = async ({ params }) => {
  const resolvedParams = await params; // ✅ IMPORTANT

  console.log("params:", resolvedParams);

  const [[doctor]] = await db.execute(
    "SELECT * FROM doctors WHERE doctor_id = ?",
    [resolvedParams.id] // ✅ never undefined
  );

  console.log("~ SingleDoctor ~ doctor:", doctor);

  if (!doctor) {
    notFound();
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>
        Dr. {doctor.first_name} {doctor.last_name}
      </h1>

      <p><b>Gender:</b> {doctor.gender}</p>
      <p><b>Specialization:</b> {doctor.specialization}</p>

      {doctor.created_at && (
        <p>
          <b>Joined:</b> {formatDate(doctor.created_at)}
        </p>
      )}
    </div>
  );
};

export default SingleDoctor;
