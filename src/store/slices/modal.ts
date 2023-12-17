import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IModal {
    isChangeActive: boolean;
    isEditModal: boolean;
    isDownload: boolean;
}

const initialState: IModal = {
    isChangeActive: false,
    isEditModal: false,
    isDownload: false
}

const modal = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal(state, action: PayloadAction<IModal>): IModal {
            return action.payload
        },
        closeModal(state, action: PayloadAction<void>): IModal {
            return {...state, isEditModal: false, isChangeActive: false};
        },
        eventDownloadImg(state, action: PayloadAction<boolean>) {
            return {...state, isDownload: action.payload};
        }
    }
})

export const { openModal, closeModal, eventDownloadImg } = modal.actions;

export default modal.reducer;