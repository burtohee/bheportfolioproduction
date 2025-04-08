import { useState, useEffect, useRef } from 'react';

const ReactLazyLoadImageInterSectionObs = ({ threshold }) => {
    const [isVisible, setIsVisible] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target); // Stop observing after loading
                }
            },
            { threshold: threshold } // Trigger when at least 10% of the image is visible
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return { imgRef, isVisible };
};

export default ReactLazyLoadImageInterSectionObs;
