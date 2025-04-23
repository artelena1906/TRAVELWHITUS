"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./css/PageAboutUs.module.css";

export default function PageAboutUs() {
    interface DescriptionItem {
        text: string;
    }

    interface AboutUsItem {
        title: string;
        description: DescriptionItem[];
    }

    const [aboutus, setAboutus] = useState<AboutUsItem[] | null>(null);

    useEffect(() => {
        fetch("/PageAboutUs.json")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setAboutus(data.bodyData); // Устанавливаем массив bodyData
            })
            .catch((error) => console.error("Ошибка загрузки данных:", error));
    }, []);

    if (!aboutus) {
        return <div className={styles.containeraboutus}>Завантаження...</div>;
    }

    return (
        // <div className={styles.containeraboutus}>
            <div className={styles.aboutus}>
                <Image
                    className={styles.img}
                    src="/img/travel.jpg"
                    alt="Про нас"
                    width={500}
                    height={300}
                />
                {/* Отображаем каждый элемент массива bodyData */}
                {aboutus.map((item, index) => (
                    <div key={index} className={styles.section}>
                        <h2>{item.title}</h2>
                        {/* Отображаем все элементы description как параграфы */}
                        {item.description.map((desc, descIndex) => (
                            <p key={descIndex} className={styles.description}>
                                {desc.text}
                            </p>
                        ))}
                    </div>
                ))}
            </div>
        // </div>
    );
}