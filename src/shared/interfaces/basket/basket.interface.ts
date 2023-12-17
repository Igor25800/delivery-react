

export interface IBasketState {
    isModal: boolean;
    arrayProducts: Array<IProductBasket>;
    counter: number;
    allPriceProducts: number;
}

export interface IProductBasket {
    id: string | undefined;
    img: string;
    name: string;
    category: string;
    price: number;
    count: number;
}