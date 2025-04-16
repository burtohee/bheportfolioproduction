import styles from './NavLinkStyles.module.css';

import BHETLogo from '../../assets/originals/logos/BHETLogo.png';
import { NavLinkValue } from '@/entities/NavLinkDataType';

interface NavLinkPros {
    data: NavLinkValue[];
}

const NavLink = ({ data }: NavLinkPros) => {
    return (
        <>
            <div className={styles.headerParentContainer}>
                <header className={styles.headerContainer}>
                    <div className={styles.headerBrandContainer}>
                        <img
                            className={styles.brandImage}
                            src={BHETLogo}
                            alt="Burto He"
                        ></img>
                    </div>

                    <nav className={styles.navLinkContainer}>
                        <ul className={styles.navLinks}>
                            {data.map((item) =>
                                item.isEmpty === false ? (
                                    <li key={'li' + item.name}>
                                        <a href={item.linkTo}>{item.name}</a>
                                    </li>
                                ) : (
                                    <li
                                        key={'li' + item.name}
                                        className={styles.navLinksEmpty}
                                    >
                                        <a href={item.linkTo}>{item.name}</a>
                                    </li>
                                )
                            )}
                        </ul>
                    </nav>

                    <div className={styles.headerButtonsContainer}>
                        <button>Nothing</button>
                    </div>
                </header>
            </div>
        </>
    );
};

export default NavLink;
