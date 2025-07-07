import React from "react";
import styles from "../css/MainPageFooter.module.css";
import Image from "next/image";
import Link from "next/link";
import Mainpagewithus from './MainPageWithUs';

export default function MainPageFooter() {
  return (
    <div className={styles.container}>
      <Mainpagewithus />
    <div className={styles.containerFooter}>
      {/* Логотип слева */}
      <div className={styles.leftBlock}>
        <Link href="/MainPage" className={styles.logo}>
          <Image
            src="/img/Logosova1.png"
            alt="Логотип"
            width={200}
            height={200}
            className={styles.logoImage}
          />
        </Link>
      </div>

     <div className={styles.centerBlock}>
          <Link href="../PageAboutUs"><p>Тури</p></Link>
          <Link href="../PageAboutUs"><p>Про нас</p></Link>
          <Link href="../PageAboutUs" ><p>Політика конфіденційності</p></Link>
        </div>


      {/* Соцсети справа */}
     <div className={styles.rightBlock}>
        <div className={styles.up}>
          <Link href="https://www.instagram.com/helenas.travel/" className={styles.card1} target="_blank"
            rel="noopener noreferrer">
            <svg
              className={styles.instagram}
              fillRule="nonzero"
              height="30px"
              width="30px"
              viewBox="0,0,256,256"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g style={{ mixBlendMode: "normal" }} fillRule="nonzero">
                <g transform="scale(8,8)">
                  <path d="M11.46875,5c-3.55078,0 -6.46875,2.91406 -6.46875,6.46875v9.0625c0,3.55078 2.91406,6.46875 6.46875,6.46875h9.0625c3.55078,0 6.46875,-2.91406 6.46875,-6.46875v-9.0625c0,-3.55078 -2.91406,-6.46875 -6.46875,-6.46875zM11.46875,7h9.0625c2.47266,0 4.46875,1.99609 4.46875,4.46875v9.0625c0,2.47266 -1.99609,4.46875 -4.46875,4.46875h-9.0625c-2.47266,0 -4.46875,-1.99609 -4.46875,-4.46875v-9.0625c0,-2.47266 1.99609,-4.46875 4.46875,-4.46875zM21.90625,9.1875c-0.50391,0 -0.90625,0.40234 -0.90625,0.90625c0,0.50391 0.40234,0.90625 0.90625,0.90625c0.50391,0 0.90625,-0.40234 0.90625,-0.90625c0,-0.50391 -0.40234,-0.90625 -0.90625,-0.90625zM16,10c-3.30078,0 -6,2.69922 -6,6c0,3.30078 2.69922,6 6,6c3.30078,0 6,-2.69922 6,-6c0,-3.30078 -2.69922,-6 -6,-6zM16,12c2.22266,0 4,1.77734 4,4c0,2.22266 -1.77734,4 -4,4c-2.22266,0 -4,-1.77734 -4,-4c0,-2.22266 1.77734,-4 4,-4z"></path>
                </g>
              </g>
            </svg>
          </Link>
          <Link href="https://www.facebook.com/profile.php?id=61575461644457&locale=ru_RU" className={styles.card2} target="_blank"
            rel="noopener noreferrer">
            <svg
              className={styles.facebook}
              fill="none"
              viewBox="0 0 24 24"
              height="24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z"></path>
            </svg>
          </Link>
        </div>
        <div className={styles.down}>
          <Link href="https://www.whatsapp.com" className={styles.card3} target="_blank"
            rel="noopener noreferrer">
            <svg
              className={styles.whatsapp}
              width="30"
              height="30"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19.001 4.908A9.817 9.817 0 0 0 11.992 2C6.534 2 2.085 6.448 2.08 11.908c0 1.748.458 3.45 1.321 4.956L2 22l5.255-1.377a9.916 9.916 0 0 0 4.737 1.206h.005c5.46 0 9.908-4.448 9.913-9.913A9.872 9.872 0 0 0 19 4.908h.001ZM11.992 20.15A8.216 8.216 0 0 1 7.797 19l-.3-.18-3.117.818.833-3.041-.196-.314a8.2 8.2 0 0 1-1.258-4.381c0-4.533 3.696-8.23 8.239-8.23a8.2 8.2 0 0 1 5.825 2.413 8.196 8.196 0 0 1 2.41 5.825c-.006 4.55-3.702 8.24-8.24 8.24Zm4.52-6.167c-.247-.124-1.463-.723-1.692-.808-.228-.08-.394-.123-.556.124-.166.246-.641.808-.784.969-.143.166-.29.185-.537.062-.247-.125-1.045-.385-1.99-1.23-.738-.657-1.232-1.47-1.38-1.716-.142-.247-.013-.38.11-.504.11-.11.247-.29.37-.432.126-.143.167-.248.248-.413.082-.167.043-.31-.018-.433-.063-.124-.557-1.345-.765-1.838-.2-.486-.404-.419-.557-.425-.142-.009-.309-.009-.475-.009a.911.911 0 0 0-.661.31c-.228.247-.864.845-.864 2.067 0 1.22.888 2.395 1.013 2.56.122.167 1.742 2.666 4.229 3.74.587.257 1.05.408 1.41.523.595.19 1.13.162 1.558.1.475-.072 1.464-.6 1.673-1.178.205-.58.205-1.075.142-1.18-.061-.104-.227-.165-.475-.29Z"></path>
            </svg>
          </Link>
          <Link href="https://t.me/your_telegram" className={styles.card4} target="_blank"
            rel="noopener noreferrer">
            <svg
              className={styles.telegram}
              width="30"
              height="30"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                // fill="none"
                // stroke="#0088cc"
                // strokeWidth="2"
                d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
}
