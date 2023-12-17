import React, {FC} from 'react';
import style from './cardProduct.module.scss'
import {IProductBasket} from "../../../shared/interfaces/basket/basket.interface";
import {useDispatch} from "react-redux";
import {buyProducts} from "../../../store/slices/basket";
import {IProducts} from "../../../shared/interfaces/products/products";

export interface ProductProps {
    product: IProducts
}

const CardProduct: FC<ProductProps> = ({product}) => {
    const dispatch = useDispatch();
    const buyProduct = (product: IProductBasket) => dispatch(buyProducts(product));

    return (
        <div className={style.cardProduct}>
            <img style={style.img} src={product.file} alt=""/>
            <div className={style.productDescription}>
                <h3 className={style.productName}>{product.name}</h3>
                <p>{product.weight}г: {product.description}</p>
                <div className={style.productPrice}>
                    <button onClick={() => buyProduct(
                        {id: product.id, img: product.file, name: product.name, price: product.price as number, category: product.category, count: 1})
                    } className={style.btn}>В Корзину</button>
                    <p className='colorText'>{product.price}грн</p>
                </div>
            </div>
        </div>
    );
};

export default CardProduct;