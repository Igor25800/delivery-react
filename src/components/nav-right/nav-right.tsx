import React from 'react';
import style from './nav-right.module.scss';
import { useDispatch } from "react-redux";
import { InterfaceStore } from "../../store/store";
import {modalBasket, removeProduct} from "../../store/slices/basket";
import clsx from 'clsx';
import {userAppSelector} from "../../hooks/redux-hooks";
import BasketCard from "../basketCard/basketCard";
import {IProductBasket} from "../../shared/interfaces/basket/basket.interface";
import {useNavigate} from "react-router-dom";

const NavRight = () => {
    const { isModal, arrayProducts } = userAppSelector((state: InterfaceStore) => state.basket);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const basketClosed = () => dispatch(modalBasket(false));
    const deleteProduct = (productBasket: IProductBasket) =>  {
        dispatch(removeProduct(productBasket));
    }
    const nextPage = (): void => {
        navigate('/order');
        basketClosed();
    }

    const totalAmount = arrayProducts.reduce((total, product) => total + (product.price * product.count || 0), 0);

    return (
        <div className={style.nav}>
            <div className={clsx(style.navRight, { [style.rightBig]: isModal })}>
                <div className={clsx(style.active, style.blockNav, { [style.disabled]: !isModal }) } >
                    <div className={style.titleCard}>
                        <p>КОРЗИНА</p>
                        <p>{totalAmount} грн</p>
                    </div>
                    <div>
                        {arrayProducts.map((basketProduct: IProductBasket) =>
                            <div key={basketProduct.id}>
                                <BasketCard eventDelete={deleteProduct} product={basketProduct}/>
                            </div>
                        )}
                    </div>
                    {arrayProducts.length &&
                        <div className={style.footer}>
                            <button onClick={nextPage} className={style.btn}>Оформлення замовлення</button>
                        </div>
                    }
                </div>
            </div>
            <div onClick={basketClosed} className={clsx(style.navBackground, {[style.navBackgroundHover]: isModal })}></div>
        </div>
    );
};

export default NavRight;