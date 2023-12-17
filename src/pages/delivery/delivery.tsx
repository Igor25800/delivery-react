import React from 'react';
import style from './delivery.module.scss'

const Delivery = () => {
    return (
        <div className="delivery mx-4">
            <h1 className="colorText mb-2">ДОСТАВКА ТА ОПЛАТА</h1>
            <div className={style.delivery}>
                <div className={`${style.circle} mb-2`}></div>
                <p className="colorText  mb-1">
                    Ми стараємось доставити замовлення якомога швидше. Орієнтовний час доставки становить 30-60хв. Він
                    залежить від Вашого району і дорожньої обстановки по місту. Точніший час доставки Вам озвучить
                    оператор
                    під час підтвердження замовлення.
                </p>
                <p className="colorText mb-2"> Мінімальне замовлення по місту - 200грн, за містом - 500грн.</p>
                <p className="colorText mb-2 bold"> Способи оплати:</p>
                <p className="colorText mb-2"> - Оплата готівкою кур'єру</p>
                <p className="colorText mb-2"> - Оплата на карту при замовленні</p>
            </div>
        </div>
    );
};

export default Delivery;