import React from 'react';
import styles from './footer.module.scss';
import logo from "./../../assets/img/header/logo.svg"

const Footer = () => {
    return (
        <div className={`colorText ${styles.footerParent}`}>
            <div className={`container-fluid ${styles.footer}`}>
                <div className={`${styles.footerTop} mt-4`}>
                    <div className={`${styles.col1} ${styles.blockCard}`}>
                        <div>
                            <a href="/" className={styles.footerHref}>ГОЛОВНА</a>
                            <a href="/discounts" className={styles.footerHref}>АКЦІЇ</a>
                        </div>
                        <div>
                            <a href="/about" className={styles.footerHref}>ПРО НАС</a>
                            <a href="/" className={styles.footerHref}> КОНТАКТИ</a>
                            <a href="/delivery" className={styles.footerHref}>ДОСТАВКА</a>
                        </div>
                    </div>
                    <div className={styles.centr}>
                        <img src={logo} alt="Logo" className="mx-auto" width="120px"/>
                    </div>
                    <div className={`${styles.col2} ${styles.blockCard}`}>
                        <div>
                            <a href="/menu/rolls" className={styles.footerHref + ' tright'}>РОЛИ</a>
                            <a href="/menu/sushi" className={styles.footerHref + ' tright'}>СУШІ</a>
                            <a href="/menu/wok" className={styles.footerHref + ' tright'}>WOK</a>
                            <a href="/menu/salads" className={styles.footerHref + ' tright'}>САЛАТИ</a>
                        </div>
                        <div>
                            <a href="/menu/sets" className={styles.footerHref + ' tright'}>СЕТИ</a>
                            <a href="/menu/pizza" className={styles.footerHref + ' tright'}> ПІЦА</a>
                            <a href="/menu/soups" className={styles.footerHref + ' tright'}>СУПИ</a>
                            <a href="/menu/drink" className={styles.footerHref + ' tright'}>НАПОЇ</a>
                        </div>
                    </div>
                </div>
                <div className={`${styles.footerBootom}`}>
                    <p className={`${styles.footerHref} ${styles.root} mx-5`}>© 2021 СушіШтат</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;