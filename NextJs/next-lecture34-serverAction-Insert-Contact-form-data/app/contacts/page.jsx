// import {contactAction} from "./contacts.action.jsx"

import contactAction from "./contacts.action";
import styles from "./contacts.module.css";

export default function ContactPage() {
  return (
    <div className={styles["contact-wrapper"]}>
      <div className={styles["contact-card"]}>
        <h2 className={styles["contact-title"]}>Get In Touch</h2>

        <form className={styles["contact-form"]} action={contactAction}>
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

          <button type="submit" className={styles["send-btn"]}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
