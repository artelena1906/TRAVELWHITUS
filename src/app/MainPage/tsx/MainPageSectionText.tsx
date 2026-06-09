import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import styles from "../css/MainPageSectionText.module.css";

export default function MainPageSectionText() {
    return (
        <div className={styles.textContainer}>
            <div>
                <Image src="/img/Baner_new.png"
                    alt="Image"
                    className={styles.sectionImage}
                    width={800}
                    height={600} />
            </div>
            <div className={styles.textSection}>
                <h3 className={styles.textTitle}>Кожен маршрут - <br/>моя ідея, ваша пригода.</h3>
                <span className={styles.textContainerP2}>Все почалося з бажання втекти від шаблонних «все включено»
                    та нудних гідів. Я шукала справжність, драйв і маршрути, які не знайти в путівниках.
                    Так з’явилася «Мандроманія».</span>
                <span className={styles.textContainerP2}>
                    Це мій проект подорожей, у які я їду сама і беру з собою друзів.
                </span>
                <span className={styles.textContainerP2}>
                    Головне правило: кожен маршрут - унікальний. Ми проживаємо його один раз і більше, як правило, не повторюємо. Наступного разу будуть нові країни та нові емоції.
                </span>
                
                {/* <span className={styles.textContainerP2}>
                    Шукай свою пригоду в <Link href="/PageTours" className={styles.linkButton}>календарі турів</Link>. Погнали з нами, поки цей маршрут ще актуальний!
                </span> */}
            </div>
        </div>
    )
}