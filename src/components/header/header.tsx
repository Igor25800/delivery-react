import React from 'react';
import style from './header.module.scss'
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <header className={style.header}>
            <nav className={style.nav}>
                <NavLink to='/home' className={style.li}>Головна </NavLink>
                <NavLink to='/about' className={style.li}>Про нас </NavLink>
            </nav>
        </header>
    );
};

export default Header;