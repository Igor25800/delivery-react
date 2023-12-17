import React, {FC} from 'react';
import style from "./basketCard.module.scss";
import cross from "../../assets/img/nav_right/deleteIcon.svg";
import {IProductBasket} from "../../shared/interfaces/basket/basket.interface";

export interface IProductBasketProps {
    product: IProductBasket;
    eventDelete?: (event: IProductBasket) => void;
}

const BasketCard: FC<IProductBasketProps> = ({product,eventDelete}) => {

    return (
        <div className={style.card}>
            <div className={style.title}>
                <p className={style.name}>{product.name}</p>
                <div className={style.count}>{product.count} X</div>
                {eventDelete ? <img onClick={() => eventDelete(product)} className={style.cross} src={cross} alt=""/>: <div>{product.category}</div>}
            </div>
            <div className={style.title}>
            <img className={style.img} src={product.img} alt=""/>
                <p className='mt-1'>{product.price} грн</p>
            </div>
        </div>
    );
};

export default BasketCard;