import React from 'react';
import blur from "./../../assets/img/img_about/blur-bg.jpg"
import style from './about.module.scss';

const About = () => {
    return (
        <div className={style.about}>
            <img src={blur} alt='' className={style.aboutImg}/>
                <div className={style.aboutCard}>
                    <h1 className={`colorText ${style.aboutTitle}`}>ПРИВІТ!</h1>
                    <p className={`colorText ${style.aboutText}`}>Суші Штат - команда професіоналів у ресторанній сфері . Головна наша мета -
                        індивідуальний підхід до
                        кожного клієнта , якісний сервіс обслуговування та мінімальний час доставки. Продукція
                        виготовлена тільки
                        з натуральних інгредієнтів , a також звертаємо особливу увагу на смак, та приготування усіх
                        наших страв .
                        Майстерність у поєднанні з кращими рецептами дає відмінний результат - смачні та якісні страви
                        японської
                        кухні .
                    </p>
                </div>
        </div>
    );
};

export default About;