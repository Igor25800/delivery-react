import {IProductBasket} from "../basket/basket.interface";

export interface IOrder {
    id?: string;
    name: string;
    city: string;
    commit: string;
    email: string;
    arrayOrder?: Array<IProductBasket>
}