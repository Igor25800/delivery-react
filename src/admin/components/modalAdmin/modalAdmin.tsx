import React, {FC} from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import {ref, uploadBytesResumable, deleteObject, getDownloadURL} from "firebase/storage";
import {FormikProps} from "formik";
import {v4} from "uuid";
import {closeModal, eventDownloadImg} from "../../../store/slices/modal";
import FormAdmin from '../formAdmin/formAdmin';
import {storage} from "../../../firebase";


interface ICategoryAdmin {
    form: FormikProps<any>;
    setPercentage: (event: number) => void;
    percentage: number;
    isEdit: boolean;
    children: any,
    open: boolean,
    dispatch: any
    fileName: string;
    isDownload: boolean;
}

export const ModalAdmin: FC<ICategoryAdmin> = (
    {open, dispatch, form, setPercentage, percentage, isEdit, children, fileName, isDownload}
) => {
    const handleClose = (): void => {
        dispatch(closeModal());
        form.resetForm();
        if (isEdit) {
            setPercentage(0);
            deleteImg();
            return;
        }
    };

    const resetImgUpload = (): void => {
        setPercentage(0);
        form.setFieldValue('file', '');
    }

    const deleteImg = (): void => {
        if (form.values.file) {
            const storageRef = ref(storage, form.values.file);
            deleteObject(storageRef).then(() => {
                console.log('File deleted successfully');
                resetImgUpload();
            }).catch(() => {
                form.setFieldValue('file', '');
                setPercentage(0);
            })
        }
    }

    const fileUpdate = (file: File): void => {
        if (file) {
            dispatch(eventDownloadImg(true));
            const imageRef = ref(storage, `${fileName}/${v4()}${file.name}`);
            const upload = uploadBytesResumable(imageRef, file);
            upload.on('state_changed', (snapshot): void => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes * 100);
                setPercentage(progress);
                console.log(form.values)
            }, a => {
            }, () => {
                getDownloadURL(upload.snapshot.ref).then((urlImg: string): void => {
                    form.setFieldValue('file', urlImg);
                    dispatch(eventDownloadImg(false));
                })
            });
        }
    }

    return (
        <Dialog fullWidth
                maxWidth="sm" open={open}>
            <DialogTitle>Add {fileName}</DialogTitle>
            <List sx={{pt: 0}}>
                <FormAdmin {...form} percentage={percentage} eventFile={fileUpdate} isEdit={isEdit} children={children}
                           eventDeleteImg={deleteImg} eventCloseModal={handleClose} fileName={fileName} isDownload={isDownload}/>
            </List>
        </Dialog>
    );
}