import styles from "@/pages/HomePage/HomePageStyles.module.css";
import { Suspense } from "react";

import { ReactLazyLoadImport } from "@/lazyloadings/ReactLazyLoadImport/index";

const MainContentHomePage = ReactLazyLoadImport(() =>
  import("@/components/MainContentHomePage/index.jsx")
);
const ProjectsMainPage = ReactLazyLoadImport(() =>
  import("@/components/ProjectsMainPage/index.jsx")
);
const SkillsMainPage = ReactLazyLoadImport(() =>
  import("@/components/SkillsMainPage/index.jsx")
);
const ContactMainPage = ReactLazyLoadImport(() =>
  import("@/components/ContactMainPage/index.jsx")
);
const FooterHomePage = ReactLazyLoadImport(() =>
  import("@/components/FooterHomePage/index.jsx")
);
const JumpTopButton = ReactLazyLoadImport(() =>
  import("@/components/JumpTopButton/index.jsx")
);

function HomePage() {
  return (
    <Suspense fallback={null}>
      <div className={styles.HomeContainer}>
        <MainContentHomePage></MainContentHomePage>
        <ProjectsMainPage></ProjectsMainPage>
        <SkillsMainPage></SkillsMainPage>
        <ContactMainPage></ContactMainPage>
        <FooterHomePage></FooterHomePage>
        <JumpTopButton></JumpTopButton>
      </div>
    </Suspense>
  );
}

export default HomePage;
