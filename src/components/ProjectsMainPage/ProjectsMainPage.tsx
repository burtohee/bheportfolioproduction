import styles from "@/components/ProjectsMainPage//ProjectsMainPageStyles.module.css";
import { lazy, Suspense } from "react";

import { freshburgerPNG, viberrPNG } from "@/utils/ImageUtils";

const ProjectCardHomePage = lazy(() => import("@/commons/ProjectCardHomePage/index.tsx"));

function ProjectsMainPage() {
  return (
    <Suspense fallback={null}>
      <section id="projects" className={styles.projectsMainPageContainer}>
        <h1 className="sectionTitle">Projects</h1>
        <div className={styles.projectsContainer}>
          <div className={styles.projectCardContainer}>
            <ProjectCardHomePage
              src={viberrPNG}
              // link=""
              link={null}
              h3="Viberr"
              p="Chat App"
            />
          </div>
          <div className={styles.projectCardContainer}>
            <ProjectCardHomePage
              src={freshburgerPNG}
              // link=""
              link={null}
              h3="Snaker"
              p="Shoes E-Store"
            />
          </div>
        </div>
      </section>
    </Suspense>
  );
}

export default ProjectsMainPage;
