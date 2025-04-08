import styles from '@/components/MainContentHomePage/MainContentHomePageStyles.module.css';

import {
    heroImg,
    // sunSVGIcon,
    // moonSVGIcon,
    twitterLightSVGIcon,
    twitterDarkSVGIcon,
    githubLightSVGIcon,
    githubDarkSVGIcon,
    linkedinLightSVGIcon,
    linkedinDarkSVGIcon,
    CVFile,
} from '@/utils/ImageUtils/index.tsx';

// import {
//   heroImageSmallAvif,
//   heroImageMediumAvif,
//   heroImageLargeAvif,
//   heroImageSmallWebp,
//   heroImageMediumWebp,
//   heroImageLargeWebp,
// } from "../../utils/ImageUtilsForAVIFWEBP";

import { useThemeContext } from '@/contexts/ThemeContext/ThemeContext.tsx';
import { motion as m } from 'motion/react';
import cn from 'classnames';

// import heroImageSmallAvif from "../../../src/assets/images/small/hero-img.avif";
// import heroImageMediumAvif from "../../../src/assets/images/medium/hero-img.avif";
// import heroImageLargeAvif from "../../../src/assets/images/large/hero-img.avif";
// import heroImageSmallWebp from "../../../src/assets/images/small/hero-img.webp";
// import heroImageMediumWebp from "../../../src/assets/images/medium/hero-img.webp";
// import heroImageLargeWebp from "../../../src/assets/images/large/hero-img.webp";

function MainContentHomePage() {
    console.log('rendering');
    const { theme, toggleTheme } = useThemeContext();
    //   const themeIcon = theme === "light" ? sunSVGIcon : moonSVGIcon;
    const twitterthemeIcon =
        theme === 'light' ? twitterLightSVGIcon : twitterDarkSVGIcon;
    const githubthemeIcon =
        theme === 'light' ? githubLightSVGIcon : githubDarkSVGIcon;
    const linkedinthemeIcon =
        theme === 'light' ? linkedinLightSVGIcon : linkedinDarkSVGIcon;

    const sunSvgPath =
        'M49 68C59.4934 68 68 59.4934 68 49C68 38.5066 59.4934 30 49 30C38.5066 30 30 38.5066 30 49C30 59.4934 38.5066 68 49 68Z';
    const moonSvgPath =
        'M49 68C59.4934 68 68 59.4934 68 49C49.3811 58.7117 40.6978 50.3979 49 30C38.5066 30 30 38.5066 30 49C30 59.4934 38.5066 68 49 68Z';

    const sunSVGPathVariants = {
        hidden: {
            d: sunSvgPath,
            fillOpacity: 0,
            strokeOpacity: 0,
            stroke: '#FC9601',
            fill: '#FC9601',
            rotate: 0,
            scale: 1,
            strokeWidth: '2',
        },
        visible: {
            fillOpacity: 0.35,
            strokeOpacity: 1,
            stroke: '#FC9601',
            fill: '#FC9601',
            rotate: 0,
            scale: 1,
            strokeWidth: '2',

            d: sunSvgPath,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
                fillOpacity: { duration: 1 },
                strokeOpacity: { duration: 0.8 },
            },
        },
    };

    const moonSVGPathVariants = {
        hidden: {
            d: moonSvgPath,
            fillOpacity: 0,
            strokeOpacity: 0,

            stroke: '#fff',
            fill: '#fff',
            rotate: 0,
            scale: 1,
            strokeWidth: '2',
        },
        visible: {
            fillOpacity: 0.5,
            strokeOpacity: 1,
            stroke: '#fff',
            fill: '#fff',
            rotate: 360,
            scale: 2,
            strokeWidth: '2',

            d: moonSvgPath,
            transition: {
                // duration: 0.5,
                // ease: "easeOut",
                // Customize timing for each property
                fillOpacity: { duration: 1 },
                strokeOpacity: { duration: 0.8 },
            },
        },
    };

    const raysVariants = {
        hidden: {
            strokeOpacity: 0,
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1,
            },
        },
        visible: {
            strokeOpacity: 1,
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    const rayVariant = {
        hidden: {
            pathLength: 0,
            opacity: 0,
            scale: 0,
        },
        visible: {
            pathLength: 1,
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
                pathLength: { duration: 0.3 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.3 },
            },
        },
    };

    const shineVariant = {
        hidden: {
            opacity: 0,
            scale: 2,
            strokeDasharray: '80, 50',
            strokeDashoffset: -80,
            filter: 'blur(0px)',
        },
        visible: {
            opacity: [0, 1, 0],
            strokeDashoffset: [-80, -100, -200],
            filter: ['blur(2px)', 'blur(2px)', 'blur(0px)'],
            transition: {
                duration: 0.75,
                ease: 'linear',
            },
        },
    };

    const jumpToContact = () => {
        const element = document.getElementById('contact');
        element?.scrollIntoView({
            behavior: 'smooth',
        });
    };

    return (
        <section id="hero" className={styles.mainContentContainer}>
            <div className={styles.mainContentDivContainer}>
                <div className={styles.profileColorModeContainer}>
                    <div className={styles.colorModeContainer}>
                        <button
                            className={styles.colorModeButton}
                            onClick={toggleTheme}
                            aria-label="Toggle mode"
                            title="Toggle mode"
                        >
                            {/* <img
                            className={styles.colorMode}
                            src={themeIcon}
                            alt="Color mode icon"
                            onClick={toggleTheme}
                        ></img> */}

                            <m.svg
                                width="98"
                                height="98"
                                viewBox="0 0 98 98"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={styles.colorModeButtonSVG}
                            >
                                {theme === 'dark' ? (
                                    <m.path
                                        className={styles.shine}
                                        variants={shineVariant}
                                        d={moonSvgPath}
                                        initial="hidden"
                                        animate={
                                            theme === 'dark'
                                                ? 'visible'
                                                : 'hidden'
                                        }
                                    />
                                ) : null}

                                {theme === 'light' ? (
                                    <m.path
                                        variants={sunSVGPathVariants}
                                        initial="hidden"
                                        animate={
                                            theme === 'light'
                                                ? 'visible'
                                                : 'hidden'
                                        }
                                    />
                                ) : null}

                                {theme === 'dark' ? (
                                    <m.path
                                        variants={moonSVGPathVariants}
                                        initial="hidden"
                                        animate={
                                            theme === 'dark'
                                                ? 'visible'
                                                : 'hidden'
                                        }
                                    />
                                ) : null}

                                {theme === 'light' ? (
                                    <m.g
                                        variants={raysVariants}
                                        className={styles.sunRays}
                                        initial="hidden"
                                        animate={
                                            theme === 'light'
                                                ? 'visible'
                                                : 'hidden'
                                        }
                                    >
                                        <m.path
                                            variants={rayVariant}
                                            d="M49 1.5V11"
                                        />
                                        <m.path
                                            variants={rayVariant}
                                            d="M82.5825 15.4175L75.885 22.115"
                                        />
                                        <m.path
                                            variants={rayVariant}
                                            d="M87 49H96.5"
                                        />

                                        <m.path
                                            variants={rayVariant}
                                            d="M75.885 75.885L82.5825 82.5825"
                                        />

                                        <m.path
                                            variants={rayVariant}
                                            d="M49 87V96.5"
                                        />

                                        <m.path
                                            variants={rayVariant}
                                            d="M22.115 75.885L15.4175 82.5825"
                                        />
                                        <m.path
                                            variants={rayVariant}
                                            d="M1.5 49H11"
                                        />

                                        <m.path
                                            variants={rayVariant}
                                            d="M15.4175 15.4175L22.115 22.115"
                                        />
                                    </m.g>
                                ) : null}
                            </m.svg>
                        </button>
                    </div>
                    <div className={styles.profileContainer}>
                        <picture>
                            {/* <source
                type="image/avif"
                srcSet={`${heroImageLargeAvif} 1600w, ${heroImageMediumAvif} 800w, ${heroImageSmallAvif} 400w`}
              ></source> */}
                            <source
                                type="image/avif"
                                srcSet={`/assets/images/large/hero-img.avif 1600w, /assets/images/medium/hero-img.avif 800w, /assets/images/small/hero-img.avif 400w`}
                            ></source>
                            <source
                                type="image/webp"
                                srcSet={`/assets/images/large/hero-img.webp 1600w, /assets/images/medium/hero-img.webp 800w, /assets/images/small/hero-img.webp 400w`}
                            ></source>
                            <img
                                fetchPriority="high"
                                className={styles.hero}
                                src={heroImg}
                                alt="Profile picture"
                            />
                        </picture>
                    </div>
                </div>

                <div className={styles.infoContainer}>
                    <h1>
                        Burto
                        <br />
                        He
                    </h1>

                    <h2>Full Stack Developer</h2>

                    <span className="iconContainer">
                        <a href="https://twitter.com" target="_blank">
                            <img
                                src={twitterthemeIcon}
                                alt="Twitter icon"
                            ></img>
                        </a>

                        <a href="https://github.com" target="_blank">
                            <img src={githubthemeIcon} alt="github icon"></img>
                        </a>

                        <a href="https://linkedin.com" target="_blank">
                            <img
                                src={linkedinthemeIcon}
                                alt="linkedin icon"
                            ></img>
                        </a>
                    </span>
                    <div className={styles.descriptionContainer}>
                        <p className={styles.description}>
                            With a passion for developing modern React web apps
                            for commercial businesses.
                        </p>
                    </div>

                    <div className={styles.MainContentButtonContainer}>
                        <div
                            className={styles.MainContentResumeButtonContainer}
                        >
                            <a href={CVFile} download>
                                <button
                                    className={cn(
                                        'hover',
                                        styles.MainContentButton
                                    )}
                                >
                                    Resume
                                    {/* <GrMail /> */}
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth="0"
                                        viewBox="0 0 24 24"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M23,20 L23,6 L12,15 L1,6 L1,20 L23,20 Z M12,12 L22,4 L2,4 L12,12 Z"
                                        ></path>
                                    </svg>
                                </button>
                            </a>
                        </div>

                        <div
                            className={styles.MainContentContactButtonContainer}
                        >
                            <a
                                href="#contact"
                                onClick={(e) => {
                                    e.preventDefault(), jumpToContact();
                                }}
                            >
                                <button
                                    className={cn(
                                        'hover',
                                        styles.MainContentButton
                                    )}
                                    onClick={jumpToContact}
                                >
                                    Contact me
                                    {/* <LuArrowBigRightDash /> */}
                                    <svg
                                        stroke="currentColor"
                                        fill="none"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M5 9v6"></path>
                                        <path d="M9 9h3V5l7 7-7 7v-4H9V9z"></path>
                                    </svg>
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MainContentHomePage;
