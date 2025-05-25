import styles from './NavLinkStyles.module.css';

import BHETLogo from '@/assets/originals/logos/BHETLogo.png';
import { NavLinkValue } from '@/entities/Layout/NavLinkDataType';

import { rocketIconPNG } from '@/utils/ImageUtils';

interface NavLinkPros {
    data: NavLinkValue[];
}

const NavLink = ({ data }: NavLinkPros) => {
    return (
        <>
            <div className={styles.NavLinkheaderParentContainer}>
                <header className={styles.headerContainer}>
                    <div className={styles.headerBrandContainer}>
                        <a href="/" className={styles.brandImageAtag}>
                            <img
                                className={styles.brandImage}
                                src={BHETLogo}
                                alt="Burto He"
                            ></img>
                        </a>
                    </div>

                    <nav className={styles.navLinkContainer}>
                        <ul className={styles.navLinks}>
                            {data.map((item) =>
                                item.isEmpty === false ? (
                                    <li
                                        key={'li' + item.name}
                                        className={styles.navLinksLi}
                                    >
                                        <a
                                            href={item.linkTo}
                                            className={styles.navLinksA}
                                        >
                                            {item.name}
                                        </a>
                                    </li>
                                ) : (
                                    <li
                                        key={'li' + item.name}
                                        className={styles.navLinksEmpty}
                                    >
                                        <a
                                            href={item.linkTo}
                                            className={`${styles.navLinksDisabled} ${styles.navLinksEmptyAtag} ${styles.navLinksA}`}
                                        >
                                            {item.name}
                                        </a>
                                    </li>
                                )
                            )}
                        </ul>
                    </nav>

                    <div className={styles.headerButtonsContainer}>
                        <button className={styles.headerButtons}>
                            <a
                                className={styles.headerButtonsAtag}
                                href="https://backend.burtohe.ip-ddns.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    className={styles.headerButtonsRocketImage}
                                    src={rocketIconPNG}
                                    alt="Try SSR"
                                ></img>
                                TRY SSR
                            </a>
                        </button>
                    </div>
                </header>
            </div>
        </>
    );
};

export default NavLink;
