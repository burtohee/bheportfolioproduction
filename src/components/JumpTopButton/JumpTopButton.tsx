import styles from '@/components/JumpTopButton/JumpTopButtonStyles.module.css';
import { useEffect, useState } from 'react';
// import { MdUpgrade } from "react-icons/md";

function JumpTopButton() {
    const [showJumpToTopButton, setshowJumpToTopButton] = useState(false);

    // Effect to update scrollPos state when the user scrolls
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 500) {
                setshowJumpToTopButton(true);
            } else {
                setshowJumpToTopButton(false);
            }
            // setScrollPos(window.scrollY);
        };
        // Adding scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Cleanup function to remove the event listener
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const jumpToTop = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        window.scroll({
            top: 0,
            behavior: 'smooth',
        });
        // setScrollPos(0);
    };

    return (
        showJumpToTopButton && (
            <section
                id="jumpTopButtonSec"
                className={styles.jumpTopButtonSectionContainer}
            >
                <div
                    className={styles.jumpTopButtonContainer}
                    onClick={(event) => jumpToTop(event)}
                >
                    <button className={styles.jumpTopButton}>
                        {/* <MdUpgrade /> */}
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 24 24"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M16 18v2H8v-2h8zM11 7.99V16h2V7.99h3L12 4 8 7.99h3z"></path>
                        </svg>
                    </button>
                </div>
            </section>
        )
    );
}

export default JumpTopButton;
