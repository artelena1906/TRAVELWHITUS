
import MainPageVideoTur from "./tsx/MainPageVideoTur";
import MainPageSectionTour from "./tsx/MainPageSectionTour";
import MainPageBlogAndDreems from "./tsx/MainPageBlogAndDreems";
import MainPageSectionText from "./tsx/MainPageSectionText";
import WhyWithUs from "./tsx/WhyWithUs";


export default function MainPage() {
  return (
    <>
      <MainPageVideoTur />
      <WhyWithUs />
     <MainPageSectionTour />
     <MainPageSectionText/>   
     <MainPageBlogAndDreems />
     </>
  );
}
