'use client';
import styles from "../css/MainPageFooter.module.css";
import Link from "next/link";
import Image from "next/image";

export default function MainPageFooter() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>

        {/* Левая часть — Логотип слева, Слоган справа */}
        <div className={styles.leftBlock}>
          <div className={styles.logoSide}>
            <Link prefetch={true} href="/">
              <Image
                src="/img/Logo_new.png"
                alt="Логотип"
                width={250}
                height={100}
                className={styles.logo}
              />
            </Link>
          </div>
          <div className={styles.textSide}>
            <span className={styles.footerText}>
              Подорожі для тих, <br/>хто шукає більше, ніж <br/>просто відпочинок
            </span>
          </div>
        </div>

        {/* Центральная часть — Вся навигация строго в один ряд */}
        <div className={styles.centerBlock}>
          <span className={styles.footerNavigation}>НАВІГАЦІЯ</span>
          <div className={styles.menuLinksRow}>
            <Link href="../PageTours" className={styles.menuLink}>Тури</Link>
            <Link href="../PageDreams" className={styles.menuLink}>Мрії</Link>
            <Link href="../PageBlog" className={styles.menuLink}>Блог</Link>
            <Link href="../PageContacts" className={styles.menuLink}>Фото</Link>
            <Link href="../PageLogin" className={styles.menuLink}>Відео</Link>
          </div>
        </div>

        {/* Правая часть — Соцсети в один ряд */}
        <div className={styles.rightBlock}>
          <span>СОЦМЕРЕЖІ</span>
          <div className={styles.up}>
            <Link href="https://www.instagram.com/helenas.travel" target="_blank" rel="noopener noreferrer">
              <Image src="/img/instagram.png" alt="Instagram" height={30} width={30} />
            </Link>

            <Link href="https://www.facebook.com/elena.artemieva.338591" target="_blank" rel="noopener noreferrer">
              <Image src="/img/facebook.png" alt="facebook" height={30} width={30} />
            </Link>

            <Link href="https://t.me/ArtHelena" target="_blank" rel="noopener noreferrer">
              <Image src="/img/telegram.png" alt="telegram" height={30} width={30} />
            </Link>

            <Link href="https://wa.me/380664338646" target="_blank" rel="noopener noreferrer">
              <Image src="/img/whatsapp.png" alt="whatsapp" height={30} width={30} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}