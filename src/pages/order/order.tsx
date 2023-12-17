import React from 'react';
import styleOrder from './order.module.scss'
import {userAppSelector} from "../../hooks/redux-hooks";
import {InterfaceStore} from "../../store/store";
import {IProductBasket} from "../../shared/interfaces/basket/basket.interface";
import BasketCard from "../../components/basketCard/basketCard";
import {removeBasketAll, removeProduct} from "../../store/slices/basket";
import {useDispatch} from "react-redux";
import FormOrder from "./formOrder/formOrder";
import {useFormik} from "formik";
import {IOrder} from "../../shared/interfaces/order/order";
import {orderValidate} from "../../shared/validator/orderValidate";
import {useAddOrderMutation} from "../../store/services/oderApi";
import {closeModal} from "../../store/slices/modal";
import {changeOpenSnackBar} from "../../store/slices/snackBar";
import {useNavigate} from "react-router-dom";

const Order = () => {
    const { arrayProducts} = userAppSelector((state: InterfaceStore) => state.basket);
    const dispatch = useDispatch();
    const [createOrder] = useAddOrderMutation();
    const navigate = useNavigate();

    const orderForm = useFormik({
        initialValues: {
            name: '',
            city: '',
            email: '',
            commit: '',
        },
        onSubmit: (values: IOrder): void => {
            createOrder({...values, arrayOrder: arrayProducts}).then(() => resetModal('Add Order'));
        },
        validationSchema: orderValidate
    });



    const resetModal = (message: string): void => {
        dispatch(closeModal());
        dispatch(changeOpenSnackBar({isActionSnackBar: true, message: `${message} ${orderForm.values.name}`}));
        orderForm.resetForm();
        navigate('/home');
        dispatch(removeBasketAll())
    }

    const deleteProduct = (productBasket: IProductBasket) => {
        dispatch(removeProduct(productBasket));
    }

    return (
        <div>
            <div>
                <h1 className='colorText'>ОФОРМЛЕННЯ ЗАМОВЛЕННЯ</h1>
            </div>
            <div className={styleOrder.order}>
                <div className={`${styleOrder.orderCard} colorText`}>
                    {arrayProducts.map((product: IProductBasket) =>
                        <div key={product.id} className={styleOrder.card}>
                            <BasketCard product={product} eventDelete={deleteProduct}/>
                        </div>
                    )}
                </div>
                <div className={styleOrder.orderCard}>
                    <FormOrder {...orderForm}/>
                </div>
            </div>

        </div>
    );
};

export default Order;