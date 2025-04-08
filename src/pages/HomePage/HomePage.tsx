import { Suspense } from 'react';
import styles from '@/pages/HomePage/HomePageStyles.module.css';

import { ReactLazyLoadImport } from '@/lazyloadings/ReactLazyLoadImport/index';
const MainContentHomePage = ReactLazyLoadImport(
    () => import('@/components/MainContentHomePage/index.tsx')
);
const ProjectsMainPage = ReactLazyLoadImport(
    () => import('@/components/ProjectsMainPage/index.tsx')
);
const SkillsMainPage = ReactLazyLoadImport(
    () => import('@/components/SkillsMainPage/index.tsx')
);
const ContactMainPage = ReactLazyLoadImport(
    () => import('@/components/ContactMainPage/index.tsx')
);
const FooterHomePage = ReactLazyLoadImport(
    () => import('@/components/FooterHomePage/index.tsx')
);
const JumpTopButton = ReactLazyLoadImport(
    () => import('@/components/JumpTopButton/index.tsx')
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
