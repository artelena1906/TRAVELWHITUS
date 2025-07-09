// import { Suspense } from "react";
// import PageSearchIndividual from "../PageTours/components/PageSearchIndividual"; // Укажите правильный путь к компоненту
// import {Typography } from "@mui/material";

// export default function PageTours() {
//     return (
//         <Suspense
//             fallback={
//                 <div style={{ textAlign: "center", marginTop: "20px" }}>
//                     <Typography
//                         sx={{
//                             fontSize: "20px",
//                             color: "#556B2F",
//                             fontFamily: "Playwrite India",
//                             fontStyle: "italic",
//                         }}
//                     >
//                         Завантаження...
//                     </Typography>
//                 </div>
//             }
//         >
//             <PageSearchIndividual />
//         </Suspense>
//     );
// }

import React from "react";
import styles from "./css/PageTours.module.css"; // Убедитесь, что этот файл существует
import Search from "../MainPage/tsx/MainPageSearch";
import Tours from "../MainPage/tsx/MainPageSectionTour";

export default function PageTours() {
  return (
    <div className={styles.container}>
  <div className={styles.leftcolumn}>
    <Search/>
  </div>
  <div className={styles.rightcolumn}>
    <Tours/>
  </div>
</div>

  );
}