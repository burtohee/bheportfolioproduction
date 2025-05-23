import { Outlet } from 'react-router';
import styles from './PublicLayoutStyles.module.css';
import NavLink from '@/commons/NavLink/index.tsx';
import { NavLinkValue } from '@/entities/Layout/NavLinkDataType';

type NavLinksValue = NavLinkValue[];

function PublicLayout() {
    const navLinks: NavLinksValue = [
        { name: 'Home', isEmpty: false, linkTo: '/home', isDisabled: false },
        { name: '|', isEmpty: true, linkTo: '/', isDisabled: true },
        { name: 'Login', isEmpty: false, linkTo: '/login', isDisabled: false },
    ];

    return (
        <>
            <div className={styles.publicLayoutContainer}>
                <NavLink data={navLinks} />

                <svg width="100" height="100">
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="black"
                        strokeWidth="3"
                        fill="red"
                    />
                </svg>

                <Outlet />
            </div>
        </>
    );
}

export default PublicLayout;
