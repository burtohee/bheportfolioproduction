import React, { useRef, useState, useEffect } from "react";
import styles from "./ReactLazyLoadingImageStyles.module.css";
import ReactLazyLoadImageInterSectionObs from "../ReactLazyLoadImageInterSectionObs/index";
import cn from "classnames";

import { ReactLazyLoadImport } from "../../lazyloadings/ReactLazyLoadImport/index";

// const ReactLazyLoadImageInterSectionObs = ReactLazyLoadImport(
//   "../../lazyloadings/ReactLazyLoadingImage/index.js"
// );

const ReactLazyLoadingImage = ({ id, src, placeholder, alt }) => {
  const [loaded, setLoaded] = useState(false);
  const { imgRef, isVisible } = ReactLazyLoadImageInterSectionObs({
    threshold: 0.1,
  });
  const [imageSrc, setImageSrc] = useState(src); // Initially show placeholder image

  const divRef = useRef();

  // Handle image load
  const handleImageLoad = () => {
    setLoaded(true);
  };

  // Handle image error
  const handleImageError = () => {
    // src = "../../assets/images/hero-img.png";
    setImageSrc("../../../src/assets/images/fresh-burger.png");
    setLoaded(true);
  };

  // Use effect to replace image source after loading or if there's a delay you need
  useEffect(() => {
    if (!loaded) {
      const timeoutId = setTimeout(() => {
        console.log("Page loaded, setting new image...");
        setImageSrc("../../../src/assets/images/fresh-burger.png"); // Replace the image with the final source
      }, 5000); // You can adjust this timeout as needed

      // Clean up timeout if component is unmounted or if state changes
      return () => clearTimeout(timeoutId);
    }
  }, [loaded, imageSrc]); // This effect runs when the loading state changes

  return (
    <>
      <div className={styles.lazyLoadImageContainer}>
        <div
          className={
            loaded
              ? cn(
                  styles.blurLoadContainer,
                  styles.lazyLoadImageContainerLoaded
                )
              : cn(styles.blurLoadContainer)
          }
          ref={divRef}
          style={{
            // backgroundImage: `url(${placeholder})`,
            ...(loaded
              ? { backgroundImage: `var(--background-color)` }
              : { backgroundImage: `url(${placeholder})` }),
            ...(isVisible ? { display: "block" } : {}),
            ...(loaded ? { filter: "blur(0px)" } : { filter: "blur(4px)" }),
          }}
        >
          <img
            className={styles.lazyImageImg}
            style={loaded ? { opacity: "1" } : { opacity: "0" }}
            src={imageSrc}
            onLoad={handleImageLoad}
            onError={handleImageError}
            id={id}
            ref={imgRef}
            alt={alt}
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
};

export default ReactLazyLoadingImage;
