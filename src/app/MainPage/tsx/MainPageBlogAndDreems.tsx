import React from 'react';
import styles from "../css/MainPageBlogAndDreems.module.css";
import MainPageSectionBlog from "./MainPageSectionBlog";
import MainPageSectionDreems from "./MainPageSectionDreems";
import Link from "next/link";
import Image from "next/image";

export default function MainPageBlogAndDreems() {
  return (
    <>
      <div className={styles.container}>

        <div className={styles.sectionBlog}>
          <MainPageSectionBlog />
        </div>

        <div className={styles.sectionDreams}>
          <MainPageSectionDreems />
        </div>

      </div>

<div className={styles.sectionBlack}>
  <div className={styles.contentWrapper}>
    
    {/* ЛЕВАЯ ЧАСТЬ: Самолётик + Текст */}
    <div className={styles.leftPart}>
      <Image
        src='/img/paper-plane.png'
        alt='fly'
        width={90} /* Уменьшил базовый размер, чтобы он соответствовал пропорциям строки */
        height={100}
        className={styles.postImage}
      />
      <div className={styles.textBlock}>
        <p className={styles.mainText}>Мрії стають маршрутами.</p>
        <p className={styles.subText}>Готові до наступної пригоди?</p>
      </div>
    </div>

    {/* ПРАВАЯ ЧАСТЬ: Кнопка-ссылка со стрелкой */}
    <Link href="/PageTours" className={styles.ctaButton}>
      Обрати тур <span>&rarr;</span>
    </Link>

  </div>
</div>

    </>
  );
}