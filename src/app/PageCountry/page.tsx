import styles from '../PageCountry/css/PageCountry.module.css';
import Image from 'next/image';
import { db } from '../api/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import { DocumentData } from "firebase/firestore";
// import { useState } from 'react';
import CountryPicture from './tsx/CountryPicture';

const advantagesData = [
  {
    icon: 'img/WithUs/Globus.png', 
    title: '20',
    description: 'країн'
  },
  {
    icon: 'img/WithUs/GPS.png', 
      title: '1000+',
    description: 'локацій'
  },
  {
    icon: 'img/WithUs/photography_794302.png', 
      title: '100 000+',
    description: 'фотографій'
  },
  {
    icon: 'img/WithUs/Marshrut.png', 
    title: '20+',
    description: 'маршрутів'
  }
];

interface Country {
  id: string;
  name: string;
}


export default function PageCountry() {

// const [country, setCountry] = useState<Country | null>(null);

  return (
    <div className={styles.pagecountrycontainer}>
      <h1>Країни, які закохали мене у світ</h1>
      <span className={styles.pagecountrytext}>
        Кожна країна - це нова історія, нові люди, смаки та враження.
        <br /> Тут зібрані всі напрямки, де я вже побувала, <br /> прожила їх серцем і готова поділитися з вами.
      </span>

      <div>
        <section className={styles.advantagesSection}>
          <div className={styles.container}>
            {advantagesData.map((item, index) => (
              <div key={index} className={styles.advantageCard}>
                <div className={styles.iconWrapper}>
                  <img src={item.icon} alt={item.description} className={styles.icon} />
                </div>
                <div className={styles.content}>
                  <p className={styles.title}>{item.title}</p>
                  <p className={styles.description}>{item.description}</p>
                </div>
              </div>
            ))}

          </div>
        </section>
        <CountryPicture />
      </div>
    </div>
  );
}