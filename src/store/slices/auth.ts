import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAuthState} from "../../shared/interfaces/auth/auth";
import {addLocalStorage, deleteLocalStorage} from "../../shared/until/localStorage";


const initialState: IAuthState = {
    accessToken: ''
}

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addAccessToken: (state, action: PayloadAction<{key: string, accessToken: string}>): void => {
            addLocalStorage(action.payload.key, action.payload.accessToken);
            state.accessToken = action.payload.accessToken;
        },
        removeToken: (state, action: PayloadAction<string>): void => {
            deleteLocalStorage(action.payload);
            state.accessToken = '';
        }
    }
})

export const { addAccessToken, removeToken } = auth.actions;

export default auth.reducer;