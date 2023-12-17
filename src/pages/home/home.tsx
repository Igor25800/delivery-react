import React from 'react';
import Discounts from "../discounts/discounts";
import Category from "./caregory/category";
import style from './home.module.scss'
import CardProduct from "./cardProduct/cardProtuct";
import {useGetCategoryQuery} from "../../store/services/CategoryApi";
import {ICategory} from "../../shared/interfaces/category/category";
import {useGetProductsQuery} from "../../store/services/ProductsApi";
import {IProducts} from "../../shared/interfaces/products/products";
import { NavLink } from 'react-router-dom';

const Home = () => {
    const {data: dataCategory} = useGetCategoryQuery();
    const {data: dataProducts} = useGetProductsQuery();

    return (
        <div className={style.home}>
            <Discounts/>
            <div className={`center mt-3 colum`}>
                <h2 className='colorText'>ДОДАВАЙ СТРАВИ В КОРЗИНУ ТА ОФОРМЛЮЙ ЗАМОВЛЕННЯ - У НАС Є З ЧОГО ОБРАТИ!</h2>
                <div className={style.category}>
                    {dataCategory?.map((item: ICategory, ind: number) =>
                        <Category key={ind}  {...item} />
                    )}
                </div>
                <h1 className={style.title}>ТОП-ПОЗИЦІЇ НАШОГО МЕНЮ:</h1>
            </div>
            {dataCategory?.map((category: ICategory) =>
                <div key={category.id} className='mt-3'>
                    <div className={style.products}>
                        <div className={style.productsTitle}>
                            <p className={style.productText}>{category.category}</p>
                            <NavLink to={`/menu/${category.category}`} className={style.btn}>Дивитисяв всі {category.category}</NavLink>
                        </div>
                    </div>
                    <div className={style.blockProduct}>
                        {dataProducts?.filter((product, ind: number) => product.category === category.category).slice(0, 4)
                            .map((product: IProducts, index) =>  <CardProduct key={product.id} product={product}/>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;