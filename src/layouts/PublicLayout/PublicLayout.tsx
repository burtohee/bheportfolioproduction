import { Outlet } from 'react-router';
import styles from './PublicLayoutStyles.module.css';
import NavLink from '@/commons/NavLink/index.tsx';
import { NavLinkValue } from "@/entities/NavLinkDataType"; 


type NavLinksValue  = NavLinkValue[]


function PublicLayout() {
    const navLinks: NavLinksValue = [
        { name: 'Home', isEmpty: false, linkTo: '/home' },
        { name: '|', isEmpty: true, linkTo: '/' },
        { name: 'Login', isEmpty: false, linkTo: '/login' },
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
