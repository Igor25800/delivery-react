import React from 'react';
import style from './navLeft.module.scss'
import {useGetCategoryQuery} from "../../store/services/CategoryApi";
import {ICategory} from "../../shared/interfaces/category/category";
import { NavLink } from 'react-router-dom';

const NavLeft = () => {
    const {data} = useGetCategoryQuery();

    return (
        <div className={style.nav}>
            <div className={style.navLeft}>
                {data?.map((item: ICategory, ind: number) =>
                    <div key={ind} className={style.card}>
                        <div className={style.item}>
                            <img className={style.img}
                                 src={item.file}
                                 alt=''/>
                            <NavLink to={`/menu/${item.category}`} className={style.visible}>{item.category}</NavLink>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavLeft;