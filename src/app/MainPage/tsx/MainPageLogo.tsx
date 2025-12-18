"use client";
import styles from "../css/MainPage.module.css";
import Image from "next/image";
import Link from "next/link";


export default function MainPageLogo() {
  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.spacer}></div>

        <div className={styles.logoContainer}>
          <Link prefetch={true} href="/MainPage">
            <Image
              src="/img/logo5.png"
              alt="Логотип"
              width={480}
              height={100}
              className={styles.logo}
            />
          </Link>
        </div>
      </div>
    </>
  );
}
