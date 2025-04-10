import React from "react";
import styles from "../css/MainPage.module.css";
import Image from "next/image";
import Link from "next/link";

export default function MainPageLogo() {
    return (
        <div className={styles.logoContainer}>
            <Link prefetch={true} href="/">
                <Image
                    src="/img/logo.png"
                    alt="Logo"
                    width={500}
                    height={70}
                    className={styles.logo}
                />
            </Link>
        </div>
    );
}