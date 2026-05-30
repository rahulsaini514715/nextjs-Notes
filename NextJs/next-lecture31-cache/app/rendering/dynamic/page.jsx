// app/static-page/page.jsx
import { db } from "../config/db.jsx";

import { cache } from "react";

export const dynamic = "force-dynamic";

const DynamicPage = async () => {
  try {
    // MySQL query
    // const [doctors] = await db.execute("SELECT * FROM doctors");
    // console.log("fetching Dynamic doctor");

    const doctors= await getAllDoctors();

    return (
       <>
         <p>Total Docters : {docters.length}</p>
         <DoctorLists docters={doctors}></DoctorLists>
       </>
    );
  } catch (err) {
    console.error("Error fetching doctors:", err.message);
    return <p>Failed to load doctors.</p>;
  }
};

export default DynamicPage;


const DocterLists = async()=>{
  const doctors= await getAllDoctors();
  return(
    <>
       <ul>
        {doctors.map((doctor) => (
          <li key={doctor.doctor_id}>{doctor.first_name}</li>
        ))}
      </ul>
    </>
  )
}


const getAllDoctors = cache(async() =>{
  const [doctors] = await db.execute("SELECT * FROM doctors");
    console.log("fetching Dynamic doctor");
    return doctors;
});