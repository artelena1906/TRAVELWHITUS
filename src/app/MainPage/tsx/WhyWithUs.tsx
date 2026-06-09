import React from "react";
import Image from "next/image";
import styles from "../css/WhyWithUs.module.css";

const advantagesData = [
  {
    icon: 'img/WithUs/landscape_10610054.png', 
    title: 'Унікальні маршрути',
    description: 'Досліджуємо не туристичні місця, щоб ви відчули країну по-справжньому.'
  },
  {
    icon: 'img/WithUs/women_2585333.png', 
    title: 'Невеликі групи',
    description: 'Подорожуємо невеликими компаніями, щоб кожен відчував себе комфортно.'
  },
  {
    icon: 'img/WithUs/nature_1561127.png', 
    title: 'Природа і культура',
    description: 'Поєднуємо красу природи, місцеву культуру та активний відпочинок.'
  },
  {
    icon: 'img/WithUs/photography_794302.png', 
    title: 'Яскраві спогади',
    description: 'Фотографії, емоції та історії, які залишаться з вами на все життя.'
  }
];

export default function Advantages() {
  return (
    <section className={styles.advantagesSection}>
      <div className={styles.container}>
        {advantagesData.map((item, index) => (
          <div key={index} className={styles.advantageCard}>
            <div className={styles.iconWrapper}>
              <img src={item.icon} alt={item.title} className={styles.icon} />
            </div>
            <div className={styles.content}>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
            </div>
          </div>
        ))}
       
      </div>
       <hr className={styles.line}></hr>
    </section>
  );
}