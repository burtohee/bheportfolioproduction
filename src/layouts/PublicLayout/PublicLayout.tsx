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

                <Outlet />
            </div>
        </>
    );
}

export default PublicLayout;
