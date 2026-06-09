
import MainPageVideoTur from "./tsx/MainPageVideoTur";
import MainPageSectionBlog from "./tsx/MainPageSectionBlog";
import MainPageSectionTour from "./tsx/MainPageSectionTour";
import MainPageSectionDreems from "./tsx/MainPageSectionDreems";
import MainPageSectionText from "./tsx/MainPageSectionText";
import WhyWithUs from "./tsx/WhyWithUs";


export default function MainPage() {
  return (
    <>
      <MainPageVideoTur />
      <WhyWithUs />
     <MainPageSectionTour />
     <MainPageSectionText/>
     <MainPageSectionBlog />
     <MainPageSectionDreems />
     </>
  );
}
