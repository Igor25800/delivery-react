import React, {FC} from 'react';
import style from './category.module.scss'
import {ICategory} from "../../../shared/interfaces/category/category";
import { NavLink } from 'react-router-dom';

const Category: FC<ICategory> = ({file,category}) => {
    return (
        <NavLink to={`/menu/${category}`} className={style.category}>
            <div className={style.card}>
                <p className='colorText'>{category}</p>
                <img className={style.cardImg} src={file} alt=""/>
            </div>
        </NavLink>
    );
}

export default Category;