// src/components/SkillsMainPage/SkillsMainPage.tsx
import styles from "@/components/SkillsMainPage/SkillsMainPageStyles.module.css";
import { Suspense, useState, useEffect } from "react";
import { useThemeContext } from "@/contexts/ThemeContext/ThemeContext";
import { ReactLazyLoadImport } from "@/lazyloadings/ReactLazyLoadImport/index";
import { ThemeType } from "@/entities/themeTypes.tsx"; // Adjust the import path

// Lazy load the component and ensure the correct typing for props
const SkillListHomePage = ReactLazyLoadImport(() =>
  import("@/commons/SkillListHomePage/index.tsx")
) as React.FC<{ src: string | HTMLImageElement | null; skill: string }>;

interface ImageCache {
  [key: string]: string | HTMLImageElement;
}

const imageCache: ImageCache = {};

const loadImage = async (theme: ThemeType) => {
  if (imageCache[theme]) {
    return Promise.resolve(imageCache[theme]); // Ensure a Promise return
  }
  try {
    const module = await import("@/utils/ImageUtils");
    const image =
      theme === "light"
        ? module.checkmarkLightSVGIcon
        : module.checkmarkDarkSVGIcon;

    imageCache[theme] = image; // Store in cache
    return Promise.resolve(image);
  } catch (error) {
    console.error("Error loading image:", error);
    return null; // Return a fallback value if import fails
  }
};

function SkillsMainPage() {
  const { theme } = useThemeContext();
  const [checkMarkIcon, setCheckMarkIcon] = useState<string | HTMLImageElement | null>(null);

  useEffect(() => {
    loadImage(theme).then(setCheckMarkIcon);
  }, [theme]);

  return (
    <Suspense fallback={null}>
      <section id="skills" className={styles.skillsMainPageContainer}>
        <h1 className="sectionTitle">Skills</h1>
        <div className={styles.skillList}>
          <SkillListHomePage src={checkMarkIcon} skill="HTML" />
          <SkillListHomePage src={checkMarkIcon} skill="CSS" />
          <SkillListHomePage src={checkMarkIcon} skill="JavaScript" />
          <SkillListHomePage src={checkMarkIcon} skill="TypeScript" />
        </div>
        <hr />
        <div className={styles.skillList}>
          <SkillListHomePage src={checkMarkIcon} skill="React" />
          <SkillListHomePage src={checkMarkIcon} skill="Angular" />
          <SkillListHomePage src={checkMarkIcon} skill="Tailwind CSS" />
        </div>
        <hr />
        <div className={styles.skillList}>
          <SkillListHomePage src={checkMarkIcon} skill="MongoDB" />
          <SkillListHomePage src={checkMarkIcon} skill="Git" />
        </div>
      </section>
    </Suspense>
  );
}

export default SkillsMainPage;
