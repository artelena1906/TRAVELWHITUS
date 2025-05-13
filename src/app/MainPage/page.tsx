import React from "react";
import MainPageVideoTur from "./tsx/MainPageVideoTur";
import MainPageSectionBlog from "./tsx/MainPageSectionBlog";
import MainPageSectionTour from "./tsx/MainPageSectionTour";
import MainPageWithUs from "./tsx/MainPageWithUs";

export default function MainPage() {
  return (
    <>
      <MainPageVideoTur />
     <MainPageSectionTour />
     <MainPageSectionBlog />
     <MainPageWithUs/>
     </>
  );
}
