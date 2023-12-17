import React, {useEffect} from 'react';
import style from './header.module.scss'
import {NavLink} from "react-router-dom";
import phone from "./../../assets/img/header/phone.svg"
import basket from "./../../assets/img/header/basket.svg"
import logo from "./../../assets/img/header/logo.svg"
import {modalBasket, getBasket} from "../../store/slices/basket";
import {Badge} from "@mui/material";
import {useAppDispatch, userAppSelector} from "../../hooks/redux-hooks";
import {IBasketState} from "../../shared/interfaces/basket/basket.interface";

const Header = () => {
    const dispatch = useAppDispatch();
    const {counter, arrayProducts} = userAppSelector((state) => state.basket as IBasketState);

    useEffect(() => {
        dispatch(getBasket())
    }, []);

    const totalAmount = arrayProducts.reduce((total, product) => total + (product.price * product.count || 0), 0);
    const openModalBasket = () => dispatch(modalBasket(true));

    return (
        <header className={style.header}>
            <div className={style.logo}>
                <NavLink to='/home' className={style.li}>
                    <img className={style.img} src={logo} alt=""/>
                </NavLink>

            </div>
            <nav className={style.nav}>
                <NavLink to='/home' className={style.li}>Головна </NavLink>
                <NavLink to='/about' className={style.li}>Про нас </NavLink>
                <NavLink to='/delivery' className={style.li}>Доставка</NavLink>
                <NavLink to='/discounts' className={style.li}>Акції</NavLink>
                <NavLink to='/admin' className={style.li}>Admin </NavLink>
            </nav>
            <div className={style.contacts}>
                <span className={style.numbers}>(068) 608 00 08</span>
                <span className={style.numbers}>
                    <img src={phone} alt=""/>
                </span>
                <span className={style.numbers}>(093) 608 00 08</span>
                <p className={style.numbers}> щодня без вихідних з 11:00 до 00:00 </p>
            </div>
            <div className={style.basket}>
                <p className={style.price}>{totalAmount} Грн</p>
                <Badge badgeContent={counter} color="secondary">
                    <img onClick={openModalBasket} className={style.img} src={basket} alt=''/>
                </Badge>
            </div>
        </header>
    );
};

export default Header;