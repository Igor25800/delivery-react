import React, {useEffect} from 'react';
import {useGetProductsQuery} from "../../store/services/ProductsApi";
import {IProducts} from "../../shared/interfaces/products/products";
import CardProduct from '../home/cardProduct/cardProtuct';
import {useParams} from "react-router-dom";

const Menu = () => {
    const {data} = useGetProductsQuery();
    const  {category} = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='row wrap'>
            {data?.map((product: IProducts) => {
                if(product.category === category) {
                    return <CardProduct key={product.id} product={product}/>
                }
                return null;
            })}
        </div>
    );
};

export default Menu;