import React from "react";
import MainPageVideoTur from "./tsx/MainPageVideoTur";
import MainPageSectionBlog from "./tsx/MainPageSectionBlog";
import MainPageSectionTour from "./tsx/MainPageSectionTour";
import MainPageSectionDreems from "./tsx/MainPageSectionDreems";
import MainPageSectionText from "./tsx/MainPageSectionText";


export default function MainPage() {
  return (
    <>
      <MainPageVideoTur />
     <MainPageSectionTour />
     <MainPageSectionText/>
     <MainPageSectionBlog />
     <MainPageSectionDreems />
     </>
  );
}
