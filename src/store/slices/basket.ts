import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IBasketState, IProductBasket} from "../../shared/interfaces/basket/basket.interface";
import {addLocalStorage, deleteLocalStorage, getLocalStorage} from "../../shared/until/localStorage";


const initialState: IBasketState = {
    isModal: false,
    arrayProducts: [],
    counter: 0,
    allPriceProducts: 0,
}

const basket = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        getBasket:(state, action: PayloadAction<void>) => {
            const arrayProduct = getLocalStorage('basketArray') as Array<IProductBasket>;
            if(arrayProduct?.length) {
                state.arrayProducts = arrayProduct;
                state.counter = arrayProduct.length;
            }
        },
        modalBasket: (state,action: PayloadAction<boolean>) => {
            state.isModal = action.payload;
        },
        buyProducts: (state, action: PayloadAction<IProductBasket>) => {
            const find = state.arrayProducts.find(({ id }: IProductBasket) => id === action.payload.id);
            if (find) {
                state.arrayProducts = state.arrayProducts.map((product: IProductBasket) => {
                    if(find.id) {
                        product.count = product.count +1;
                    }
                    return product
                })
                return;
            }
            state.arrayProducts = [...state.arrayProducts, action.payload];
            state.counter = state.arrayProducts.length;
            addLocalStorage('basketArray', state.arrayProducts);
        },
        removeProduct: (state, action: PayloadAction<IProductBasket>) => {
            state.arrayProducts = state.arrayProducts.filter((product: IProductBasket) => product.id !== action.payload.id);
            state.counter = state.arrayProducts.length;
            addLocalStorage('basketArray', state.arrayProducts);
        },
        removeBasketAll: (state, action: PayloadAction<void>) => {
            state.arrayProducts = [];
            state.counter = 0;
            deleteLocalStorage('basketArray');
        }
    }
})

export const
    { modalBasket, removeProduct, buyProducts
        , getBasket, removeBasketAll } = basket.actions;

export default basket.reducer;