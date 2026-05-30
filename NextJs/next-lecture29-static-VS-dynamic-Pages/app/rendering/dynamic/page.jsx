// app/static-page/page.jsx
import { db } from "../config/db.jsx";

export const dynamic = "force-dynamic"

const DynamicPage = async () => {
  try {
    // MySQL query
    const [doctors] = await db.execute("SELECT * FROM doctors");
    console.log("Dynamic doctor");

    return (
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.doctor_id}>{doctor.first_name}</li>
        ))}
      </ul>
    );
  } catch (err) {
    console.error("Error fetching doctors:", err.message);
    return <p>Failed to load doctors.</p>;
  }
};

export default DynamicPage;
