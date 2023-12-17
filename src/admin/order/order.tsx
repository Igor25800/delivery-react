import React from 'react';
import {useDeleteOrderMutation, useGetOrderQuery} from "../../store/services/oderApi";
import style from './order.module.scss'
import Button from "@mui/material/Button";
import {IOrder} from "../../shared/interfaces/order/order";
import {changeOpenSnackBar} from "../../store/slices/snackBar";
import {useAppDispatch} from "../../hooks/redux-hooks";
import BasketCard from '../../components/basketCard/basketCard';

const Order = () => {
    const dispatch = useAppDispatch();
    const {data} = useGetOrderQuery();
    const [onDeleteOrder] = useDeleteOrderMutation();

    const deleteOrder = (order: IOrder, ind: number): void => {
        if (order.id) {
            onDeleteOrder(order.id).then(() =>
                dispatch(changeOpenSnackBar({isActionSnackBar: true, message: `Delete order ${ind}`})))
        }
    }

    return (
        <div>
            <div className={style.order}>
                {data?.map((order: IOrder, ind: number) =>
                    <div key={order.id} className={style.card}>
                        {order?.arrayOrder && order?.arrayOrder.map((product) =>
                            <BasketCard key={product.id} product={product}/>
                        )}
                        <h3 className={style.title}>Заказ {ind + 1}</h3>
                        <p>Ім*я: {order.name}</p>
                        <p>Місто: {order.city}</p>
                        <p>Email: {order.email}</p>
                        <p>Commit: {order.commit}</p>
                        <div className={style.btn}>
                            <Button variant="contained" color="error" onClick={() => deleteOrder(order, ind)}>
                                Delete
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Order;