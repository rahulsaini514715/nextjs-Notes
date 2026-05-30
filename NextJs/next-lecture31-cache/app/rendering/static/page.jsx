// app/static-page/page.jsx
import { db } from "../config/db.jsx";

// Next.js ISR: har 30 seconds me page dubara regenerate hoga (fresh data ke liye)
export const revalidate = 30;   //ye next lecture ki hai

const StaticPage = async () => {
  try {
    // MySQL query
    const [doctors] = await db.execute("SELECT * FROM doctors");
    console.log("static doctors");

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

export default StaticPage;




