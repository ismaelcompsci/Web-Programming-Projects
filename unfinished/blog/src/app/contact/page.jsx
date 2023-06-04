import Image from "next/image";
import styles from "./page.module.css";
import Button from "../../components/button/Button";

const Contact = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Let's Keep in Touch</h1>
      <div className={styles.content}>
        <div className={styles.imgContainer}>
          <Image src="/contact.png" alt="" fill className={styles.image} />
        </div>
        <from className={styles.form}>
          <input type="text" placeholder="name" className={styles.input} />
          <input type="text" placeholder="email" className={styles.input} />
          <textarea
            placeholder="message"
            cols="30"
            rows="10"
            className={styles.textArea}
          />
          <Button url="#" text="Send" />
        </from>
      </div>
    </div>
  );
};

export default Contact;
