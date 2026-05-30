"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import styles from "./contacts.module.css";
import contactAction from "./contacts.action";

export default function ContactPage() {
  const router = useRouter();

  // const [state, formAction, isPending] = useActionState(contactAction, null);


  const [isPending, startTransition] = useTransition()
  
  const[contactFormResponse, setContactResponse] = useState(null);

  const handleContactSubmit =(formData)=>{
     const {fullName,email,message} = Object.fromEntries(formData);
     startTransition(async ()=>{
      const res = await contactAction(fullName,email,message)
      setContactResponse(res);
     })
  }



  // ✅ CLIENT SIDE REDIRECT
  useEffect(() => {
    if (contactFormResponse?.success) {
      setTimeout(() => {
        router.push("/"); // redirect
      }, 1500);
    }
  }, [contactFormResponse, router]);

  return (
    <div className={styles["contact-wrapper"]}>
      <div className={styles["contact-card"]}>
        <h2 className={styles["contact-title"]}>Get In Touch</h2>

        <form action={handleContactSubmit} className={styles["contact-form"]}>
          <div className={styles["form-group"]}>
            <label>Full Name</label>
            <input name="fullName" />
          </div>

          <div className={styles["form-group"]}>
            <label>Email</label>
            <input name="email" />
          </div>

          <div className={styles["form-group"]}>
            <label>Message</label>
            <textarea name="message" />
          </div>

          <Submit />
        </form>

        {contactFormResponse && (
          <p
            className={`p-4 mt-4 text-center ${
              contactFormResponse.success ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {contactFormResponse.message}
          </p>
        )}
      </div>
    </div>
  );
}

/* ---------- Submit Button ---------- */
function Submit() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className={styles["send-btn"]}
      type="submit"
    >
      {pending ? "Loading..." : "Send Message"}
    </button>
  );
}





















// "use client" ;
// import "../../app/globals.css"

// import { useActionState } from "react";
// import styles from "./contacts.module.css";
// import contactAction from "./contacts.action";
// import { useFormStatus } from "react-dom";

// // const contactAction =  (formData)=>{

// //     const {fullName,email,message} = Object.fromEntries(formData.entries());
// //     console.log(fullName,email,message) ;

// //     // await db.execute(
// //     //     `insert into contact(full_name,email,message) values(?, ? , ?)`,
// //     //     [fullName, email, message]
// //     // )
// // }


// export default function ContactPage() {
//   // const[state,formAction,isPending] = useActionState(fn, initialState, permalink?);

//   const[state,formAction,isPending] = useActionState(contactAction, null);
//   return (
//     <div className={styles["contact-wrapper"]}>
//       <div className={styles["contact-card"]}>
//         <h2 className={styles["contact-title"]}>Get In Touch</h2>

//         <form className={styles["contact-form"]} action={formAction}>
//           <div className={styles["form-group"]}>
//             <label>Full Name</label>
//             <input id="fullName" name="fullName" type="text" placeholder="Enter your full name" />
//           </div>

//           <div className={styles["form-group"]}>
//             <label>Email Address</label>
//             <input id="email" name="email" type="email" placeholder="Enter your email address" />
//           </div>

//           <div className={styles["form-group"]}>
//             <label>Message</label>
//             <textarea id="message" name="message" placeholder="Enter your message..."></textarea>
//           </div>

//           <Submit/>
//         </form>
//       </div>
//       <section>
//          {
//           state &&(
//             <p className={`p-4 mt-5 text-center ${state.success ? "bg-green-500" : "bg-red-500"}`}>
//                   {
//                     state.message
//                   }
//             </p>
//           )
//          }
//       </section>
//     </div>
//   );
// }



// const Submit = () =>{
//   const {pending, data, method, action} = useFormStatus();
//   return (
//     <>
//       <button type="submit" 
//             disabled={pending}
//             className={styles["send-btn"]}>
//               {
//                 pending ? (<span>Loading...</span>): (<span>Send Message</span>)
//               }
//               {/* Send Message */}
//           </button>
//     </>
//   )
// }