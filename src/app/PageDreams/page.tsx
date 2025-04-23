"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./css/PageDreams.module.css";
// import WithUs from "../MainPage/MainPageBodyWithUs";
import BookingForm from "../../components/PageBookingForm";
import Link from "next/link";

export default function PageDreams() {
  interface CountryItem {
    id: number;
    namecountry: string;
    descriptioncountry: string;
    urlphoto: string;
    month: string;
    days: string;
    count: string;
    city: string;
  }

  interface DreamsItem {
    title: string;
    description: string;
    country: CountryItem[];
  }

  const [dreams, setDreams] = useState<DreamsItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  useEffect(() => {
    fetch("/PageDreams.json")
      .then((res) => {
        if (!res.ok) throw new Error("Не удалось загрузить JSON");
        return res.json();
      })
      .then((data) => {
        console.log("Загруженные данные:", data);
        setDreams(data.bodyData);
      })
      .catch((error) => console.error("Ошибка загрузки данных:", error));
  }, []);

  // const handleJoinClick = (countryName: string) => {
  //   setSelectedCountry(countryName);
  //   setShowForm(true);
  // };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedCountry(null);
  };

  if (!dreams) {
    return <div>Завантаження...</div>;
  }

  return (
    <div className={styles.containerDreams}>
      <h3>{dreams.title}</h3>
      <p className={styles.containerDreamsP}>{dreams.description}</p>
      <div className={styles.container}>
        {dreams.country && dreams.country.length > 0 ? (
          dreams.country.map((country, index) => (
            <div key={index} className={styles.cardContainer}>
              <div className={styles.card}>
                {/* Лицевая сторона */}
                <div className={styles.cardFront}>
                  <Image
                    src={country.urlphoto}
                    alt={country.namecountry}
                    width={300}
                    height={450}
                    style={{ objectFit: 'cover' }}
                  />
                  <div className={styles.cardFrontContent}>
                    <h4>{country.namecountry}</h4>
                  </div>
                </div>
                {/* Обратная сторона */}
                <div className={styles.cardBack}>
                  <h4>{country.namecountry}</h4>
                  <p className={styles.cardBackMonth}>{country.month}</p>
                  <p className={styles.cardBackP}><strong>Тривалість:</strong> {country.days}</p>
                  <p className={styles.cardBackP}><strong>Кількість:</strong> {country.count}</p>
                    <p className={styles.descriptioncountry}>{country.descriptioncountry}</p>
                  <p className={styles.cardBackCity}><strong>Міста:</strong> {country.city}</p>
                  <Link href={`/tours/${country.namecountry.toLowerCase()}`} className={styles.detailsButton}>
                    Детальніше про тур
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Країни відсутні</p>
        )}
      </div>
      {/* <div>
        <WithUs />
      </div> */}
      {showForm && selectedCountry && (
        <BookingForm tourTitle={selectedCountry} onClose={handleCloseForm} />
      )}
    </div>
);
}