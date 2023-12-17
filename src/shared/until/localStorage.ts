import {IProductBasket} from "../interfaces/basket/basket.interface";

export const addLocalStorage = (keyStorage: string, value: string | Array<IProductBasket>): void => {
    localStorage.setItem(keyStorage, JSON.stringify(value));
}

export const deleteLocalStorage = (key: string): void => {
    localStorage.removeItem(key);
}

export const getLocalStorage = (key: string): string | Array<IProductBasket> | null => {
    const storedValue = localStorage.getItem(key);

    if (storedValue !== null) {
        return JSON.parse(storedValue);
    }
    return null
}