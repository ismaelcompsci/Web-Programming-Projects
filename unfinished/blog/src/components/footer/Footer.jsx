"use client";
import Image from "next/image";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div>©2023 v3mn. All rights reserved.</div>
      <div className={styles.social}>
        <Image
          src="/1.png"
          alt="logoSocial"
          className={styles.icon}
          width={15}
          height={15}
        />
        <Image
          src="/2.png"
          alt="logoSocial"
          className={styles.icon}
          width={15}
          height={15}
        />
        <Image
          src="/3.png"
          alt="logoSocial"
          className={styles.icon}
          width={15}
          height={15}
        />
        <Image
          src="/4.png"
          alt="logoSocial"
          className={styles.icon}
          width={15}
          height={15}
        />
      </div>
    </div>
  );
};

export default Footer;
