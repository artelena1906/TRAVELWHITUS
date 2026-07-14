// "use client";

// import styles from "../css/MainPage.module.css";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useState, useEffect, useRef } from "react";

// interface MenuItem {
//   href: string;
//   text: string;
//   subItems?: { href: string; text: string; img?: string }[];
// }

// interface Country {
//   id: number;
//   name: string;
//   img: string;
// }

// export default function MainPageHeader() {
//   const [menuItems, setMenuItems] = useState<MenuItem[]>([
//     { href: "#", text: "Країни" },
//     { href: "/PageTours", text: "Тури" },
//     { href: "/PageDreams", text: "Мрії" },
//     { href: "/PageBlog", text: "Блог" },
//     { href: "/PageContacts", text: "Фото" },
//     { href: "/PageLogin", text: "Відео" },
//   ]);

//   const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
//   const [hoveredItem, setHoveredItem] = useState<string | null>(null);
//   const menuRef = useRef<HTMLDivElement>(null);

//   // Загрузка данных меню из JSON
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
//           img: country.img,
//         }));
//         console.log("Сформированные страны:", countries);
//         setMenuItems((prevItems) =>
//           prevItems.map((item) =>
//             // ИСПРАВЛЕНО: приведен к одному регистру "Країни"
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
//     setIsDropdownOpen(null);
//   };

//   const handleClick = (text: string, e: React.MouseEvent) => {
//     e.preventDefault();
//     console.log("Клик по:", text);
//     setIsDropdownOpen((prev) => (prev === text ? null : text));
//   };

//   // Всё рендерится внутри единого return одного компонента
//   return (
//     <>
//       <div className={styles.headerContainer}>
//         {/* Логотип */}
//         <div className={styles.logoContainer}>
//           <Link prefetch={true} href="/">
//             <Image
//               src="/img/Logo_new.png"
//               alt="Логотип"
//               width={250}
//               height={100}
//               className={styles.logo}
//             /> 
//           </Link>
         
//         </div>

//         {/* Меню навигации */}
//         <div className={styles.headerContainerMenu}>
//           <div
//             className={styles.menuContainer}
//             ref={menuRef}
//             onMouseLeave={handleMouseLeave}
//           >
//             <nav className={styles.menu}>
//               {menuItems.map((item, index) => (
//                 <div
//                   key={index}
//                   className={styles.menuItem}
//                   onMouseEnter={() => handleMouseEnter(item.text)}
//                 >
//                   <Link
//                     href={item.href}
//                     className={styles.menubtn}
//                     onClick={(e) =>
//                       item.subItems ? handleClick(item.text, e) : null
//                     }
//                   >
//                     {item.text}
//                     {item.subItems && (
//                       <span
//                         className={`${styles.triangle} ${
//                           hoveredItem === item.text ? styles.triangleHover : ""
//                         }`}
//                       ></span>
//                     )}
//                   </Link>
//                   {hoveredItem === item.text && (
//                     <span className={styles.thinGoldLine}></span>
//                   )}
//                 </div>
//               ))}
//             </nav>

//             {/* Выпадающее меню */}
//             {menuItems.map((item, index) =>
//               item.subItems && isDropdownOpen === item.text ? (
//                 <div key={index} className={`${styles.dropdown} ${styles.open}`}>
//                   <div className={styles.thickGoldLine}></div>
//                   <ul className={styles.subMenu}>
//                     {item.subItems.map((subItem, subIndex) => (
//                       <li key={subIndex} className={styles.subMenuItem}>
//                         <Link
//                           href={subItem.href}
//                           className={styles.subMenuLink}
//                           onClick={() => setIsDropdownOpen(null)}
//                         >
//                           {subItem.img && (
//                             <Image
//                               src={subItem.img}
//                               alt={subItem.text}
//                               width={70}
//                               height={70}
//                               className={styles.countryImage}
//                             />
//                           )}
//                           <span>{subItem.text}</span>
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ) : null
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }



"use client";

import styles from "../css/MainPage.module.css";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

interface MenuItem {
  href: string;
  text: string;
  subItems?: { href: string; text: string; img?: string }[];
}

export default function MainPageHeader() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { href: "#", text: "Країни" },
    { href: "/PageTours", text: "Тури" },
    { href: "/PageDreams", text: "Мрії" },
    { href: "/PageBlog", text: "Блог" },
    { href: "/PageContacts", text: "Фото" },
    { href: "/PageLogin", text: "Відео" },
  ]);

  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/MainPageHeader.json")
      .then((res) => res.json())
      .then((data) => {
        const countries = data.bodyData.country.map((country: any) => ({
          href: `/PageCountryIndividual/${country.id}`,
          text: country.name,
          img: country.img,
        }));
        setMenuItems((prev) =>
          prev.map((item) => (item.text === "Країни" ? { ...item, subItems: countries } : item))
        );
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(null);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={styles.fixedHeader}>
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer}>
          <Link href="/"><Image src="/img/Logo_new.png" alt="Logo" width={200} height={70} /></Link>
        </div>

        {/* Бургер */}
        <button className={styles.burger} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <span className={isMobileMenuOpen ? styles.active : ""}></span>
          <span className={isMobileMenuOpen ? styles.active : ""}></span>
          <span className={isMobileMenuOpen ? styles.active : ""}></span>
        </button>

        <div className={`${styles.headerContainerMenu} ${isMobileMenuOpen ? styles.mobileOpen : ""}`}>
          <nav className={styles.menu} ref={menuRef}>
            {menuItems.map((item, index) => (
              <div key={index} className={styles.menuItem}>
                <Link href={item.href} className={styles.menubtn} onClick={(e) => item.subItems ? (e.preventDefault(), setIsDropdownOpen(prev => prev === item.text ? null : item.text)) : null}>
                  {item.text}
                </Link>
                {item.subItems && isDropdownOpen === item.text && (
                  <div className={styles.dropdown}>
                    {item.subItems.map((sub, i) => (
                      <Link key={i} href={sub.href} className={styles.subMenuLink} onClick={() => {setIsDropdownOpen(null); setIsMobileMenuOpen(false);}}>
                        {sub.text}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}