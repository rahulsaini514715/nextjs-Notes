"use client" ;
import "../../app/globals.css"

import { useActionState } from "react";
import styles from "./contacts.module.css";
import contactAction from "./contacts.action";

// const contactAction =  (formData)=>{

//     const {fullName,email,message} = Object.fromEntries(formData.entries());
//     console.log(fullName,email,message) ;

//     // await db.execute(
//     //     `insert into contact(full_name,email,message) values(?, ? , ?)`,
//     //     [fullName, email, message]
//     // )
// }


export default function ContactPage() {
  // const[state,formAction,isPending] = useActionState(fn, initialState, permalink?);

  const[state,formAction,isPending] = useActionState(contactAction, null);
  return (
    <div className={styles["contact-wrapper"]}>
      <div className={styles["contact-card"]}>
        <h2 className={styles["contact-title"]}>Get In Touch</h2>

        <form className={styles["contact-form"]} action={formAction}>
          <div className={styles["form-group"]}>
            <label>Full Name</label>
            <input id="fullName" name="fullName" type="text" placeholder="Enter your full name" />
          </div>

          <div className={styles["form-group"]}>
            <label>Email Address</label>
            <input id="email" name="email" type="email" placeholder="Enter your email address" />
          </div>

          <div className={styles["form-group"]}>
            <label>Message</label>
            <textarea id="message" name="message" placeholder="Enter your message..."></textarea>
          </div>

          <button type="submit" 
            disabled={isPending}
            className={styles["send-btn"]}>
              {
                isPending ? (<span>Loading...</span>): (<span>Send Message</span>)
              }
              {/* Send Message */}
          </button>
        </form>
      </div>
      <section>
         {
          state &&(
            <p className={`p-4 mt-5 text-center ${state.success ? "bg-green-500" : "bg-red-500"}`}>
                  {
                    state.message
                  }
            </p>
          )
         }
      </section>
    </div>
  );
}
