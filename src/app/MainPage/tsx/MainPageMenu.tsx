// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import styles from "../css/MainPage.module.css";
// import Link from "next/link";

// export default function MainPageMenu() {
//   interface MenuItem {
//     href: string;
//     text: string;
//     subItems?: { href: string; text: string }[];
//   }

//   interface Country {
//     id: number;
//     name: string;
//   }

//   const [menuItems, setMenuItems] = useState<MenuItem[]>([
//     { href: "/", text: "Головна" },
//     { href: "#", text: "Країни" },
//     { href: "/PageTours", text: "Тури" },
//     { href: "/PageDreams", text: "Мрії" },
//     { href: "/PageBlog", text: "Блог" },
//     { href: "/PageContacts", text: "Фотогалерея" },
//     { href: "/PageLogin", text: "Відеогалерея" },
//     { href: "/PageAboutUs", text: "Про нас" },
//   ]);

//   const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
//   const [hoveredItem, setHoveredItem] = useState<string | null>(null);
//   const menuRef = useRef<HTMLDivElement>(null); // Реф для .menuContainer

//   useEffect(() => {
//     fetch("/MainPageHeader.json")
//       .then((res) => {
//         if (!res.ok) throw new Error("Не удалось загрузить JSON");
//         return res.json();
//       })
//       .then((data) => {
//         console.log("Данные из JSON:", data);
//         const countries = data.bodyData.country.map((country: Country) => ({
//           href: `/PageCountryIndividual/${country.id}`,
//           text: country.name,
//         }));
//         console.log("Сформированные страны:", countries);
//         setMenuItems((prevItems) =>
//           prevItems.map((item) =>
//             item.text === "Країни" ? { ...item, subItems: countries } : item
//           )
//         );
//       })
//       .catch((error) => console.error("Ошибка загрузки данных:", error));
//   }, []);

//   // Обработчик клика вне меню
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//         setIsDropdownOpen(null);
//         setHoveredItem(null);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleMouseEnter = (text: string) => {
//     setHoveredItem(text);
//   };

//   const handleMouseLeave = () => {
//     setHoveredItem(null);
//     setIsDropdownOpen(null); // Закрываем меню при уходе из всей области
//   };

//   const handleClick = (text: string, e: React.MouseEvent) => {
//     e.preventDefault();
//     console.log("Клик по:", text);
//     setIsDropdownOpen((prev) => (prev === text ? null : text));
//   };

//   return (
//     <div
//       className={styles.menuContainer}
//       ref={menuRef}
//       onMouseLeave={handleMouseLeave} // Переносим обработчик на .menuContainer
//     >
//       <nav className={styles.menu}>
//         {menuItems.map((item, index) => (
//           <div
//             key={index}
//             className={styles.menuItem}
//             onMouseEnter={() => handleMouseEnter(item.text)}
//           >
//             <Link
//               href={item.href}
//               className={styles.menubtn}
//               onClick={(e) => (item.subItems ? handleClick(item.text, e) : null)}
//             >
//               {item.text}
//               {item.subItems && (
//                 <span
//                   className={`${styles.triangle} ${
//                     hoveredItem === item.text ? styles.triangleHover : ""
//                   }`}
//                 ></span>
//               )}
//             </Link>
//             {hoveredItem === item.text && (
//               <span className={styles.thinGoldLine}></span>
//             )}
//           </div>
//         ))}
//       </nav>
//       {menuItems.map((item, index) =>
//         item.subItems && isDropdownOpen === item.text ? (
//           <div key={index} className={styles.dropdown}>
//             <div className={styles.thickGoldLine}></div>
//             <ul>
//               {item.subItems.map((subItem, subIndex) => (
//                 <li key={subIndex}>
//                   <Link href={subItem.href}>{subItem.text}</Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ) : null
//       )}
//     </div>
//   );
// }

"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "../css/MainPage.module.css";
import Link from "next/link";
// import { useRouter } from "next/navigation"; // Добавляем useRouter для перенаправления

export default function MainPageMenu() {
  interface MenuItem {
    href: string;
    text: string;
    subItems?: { href: string; text: string }[];
  }

  interface Country {
    id: number;
    name: string;
  }

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { href: "/", text: "ГОЛОВНА" },
    { href: "#", text: "КРАЇНИ" },
    { href: "/PageTours", text: "ТУРИ" },
    { href: "/PageDreams", text: "МРІЇ" },
    { href: "/PageBlog", text: "БЛОГ" },
    { href: "/PageContacts", text: "ФОТОГАЛЕРЕЯ" },
    { href: "/PageLogin", text: "ВІДЕОГАЛЕРЕЯ" },
    { href: "/PageAboutUs", text: "ПРО НАС" },
  ]);

  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  // const [userName, setUserName] = useState<string | null>(null); // Имя из localStorage
  const menuRef = useRef<HTMLDivElement>(null);
  // const router = useRouter(); // Для перенаправления при выходе

  // Загружаем имя из localStorage при монтировании компонента
  // useEffect(() => {
  //   const storedName = localStorage.getItem("name");
  //   setUserName(storedName || "Гість"); // Если имени нет, используем "Гість"
  // }, []);

  // Загрузка данных меню из JSON
  useEffect(() => {
    fetch("/MainPageHeader.json")
      .then((res) => {
        if (!res.ok) throw new Error("Не удалось загрузить JSON");
        return res.json();
      })
      .then((data) => {
        console.log("Данные из JSON:", data);
        const countries = data.bodyData.country.map((country: Country) => ({
          href: `/PageCountryIndividual/${country.id}`,
          text: country.name,
        }));
        console.log("Сформированные страны:", countries);
        setMenuItems((prevItems) =>
          prevItems.map((item) =>
            item.text === "КРАЇНИ" ? { ...item, subItems: countries } : item
          )
        );
      })
      .catch((error) => console.error("Ошибка загрузки данных:", error));
  }, []);

  // Обработчик клика вне меню
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(null);
        setHoveredItem(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMouseEnter = (text: string) => {
    setHoveredItem(text);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
    setIsDropdownOpen(null);
  };

  const handleClick = (text: string, e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Клик по:", text);
    setIsDropdownOpen((prev) => (prev === text ? null : text));
  };

  // Обработчик выхода
  // const handleLogout = () => {
  //   localStorage.removeItem("token"); 
  //   localStorage.removeItem("name"); 
  //   router.push("/"); 
  // };

  return (
    <div className={styles.headerContainer}>
      <div
        className={styles.menuContainer}
        ref={menuRef}
        onMouseLeave={handleMouseLeave}
      >
        <nav className={styles.menu}>
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={styles.menuItem}
              onMouseEnter={() => handleMouseEnter(item.text)}
            >
              <Link
                href={item.href}
                className={styles.menubtn}
                onClick={(e) =>
                  item.subItems ? handleClick(item.text, e) : null
                }
              >
                {item.text}
                {item.subItems && (
                  <span
                    className={`${styles.triangle} ${
                      hoveredItem === item.text ? styles.triangleHover : ""
                    }`}
                  ></span>
                )}
              </Link>
              {hoveredItem === item.text && (
                <span className={styles.thinGoldLine}></span>
              )}
            </div>
          ))}
        </nav>
        {menuItems.map((item, index) =>
          item.subItems && isDropdownOpen === item.text ? (
            <div key={index} className={styles.dropdown}>
              <div className={styles.thickGoldLine}></div>
              <ul>
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <Link href={subItem.href}>{subItem.text}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null
        )}
      </div>
      {/* <div className={styles.userSection}>
        <span>Привіт, {userName}</span>
        <button className={styles.logoutLink} onClick={handleLogout}>
          <span className={styles.logoutIcon}>☞</span>
        </button>
      </div> */}
    </div>
  );
}