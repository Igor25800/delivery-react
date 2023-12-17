import React from 'react';
import style from './discounts.module.scss'
import {useGetDiscountsQuery} from "../../store/services/discontsApi";
import {IDiscounts} from "../../shared/interfaces/discounts/discounts";
import {useLocation} from "react-router-dom";

const Discounts = () => {
    const {data} = useGetDiscountsQuery();
    const url = useLocation();

    return (
        <div className={style.discounts}>
            {data?.map((discount: IDiscounts, index) => {
                const card = (
                    <div key={discount.id} className={style.card}>
                        <img className={style.img}
                         src={discount.file}
                         alt=""/>
                    </div>)
                    if (url.pathname.includes('home') && index < 2) {
                        return card
                    }
                    if (url.pathname.includes('discount')) {
                        return card
                    }
                }
            )}
        </div>
    );
};

export default Discounts;