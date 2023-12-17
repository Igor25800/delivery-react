import {configureStore} from "@reduxjs/toolkit"
import basket from "./slices/basket";
import auth from "./slices/auth";
import {IBasketState} from "../shared/interfaces/basket/basket.interface";
import {categoryApi} from "./services/CategoryApi";
import snackBar from "./slices/snackBar";
import modal from "./slices/modal";
import {productsApi} from "./services/ProductsApi";
import {discountsApi} from "./services/discontsApi";
import {orderApi} from "./services/oderApi";

export interface InterfaceStore {
    basket: IBasketState,
}

export const store = configureStore({
    reducer: {
        basket,
        auth,
        snackBar,
        modal,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [discountsApi.reducerPath]: discountsApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        categoryApi.middleware, productsApi.middleware, discountsApi.middleware, orderApi.middleware
    )
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
