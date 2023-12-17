import React, {ChangeEvent, FC, ReactElement} from 'react';
import {Button, LinearProgress, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {FormikProps} from "formik";
import style from './formAdmin.module.scss'
import {ICategory} from "../../../shared/interfaces/category/category";


export interface CategoryProps extends FormikProps<ICategory> {
    percentage: number;
    eventFile: (event: File) => void;
    eventDeleteImg: () => void;
    eventCloseModal: () => void;
    isEdit: boolean;
    children: ReactElement;
    fileName: string;
    isDownload: boolean;
}

const FormAdmin: FC<CategoryProps> =
    ({
         values, handleBlur, handleChange, touched, errors, percentage, handleSubmit,
         eventFile, setFieldValue, eventDeleteImg, isEdit, eventCloseModal, isValid, children, fileName, isDownload
     }) => {
        const fileUpdate = (event: File | null | undefined): void => {
            if (event) {
                setFieldValue("file", event);
                eventFile(event);
            }
        }

        return (
            <div>
                <form className='p-1' onSubmit={handleSubmit}>
                    {children}
                    {values.file ? (
                        <div className={style.upload}>
                            <img className={style.img} src={values.file} alt=''/>
                            <Button
                                disabled={isDownload}
                                onClick={eventDeleteImg}
                                type="button"
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                color="error">
                                Delete Img
                            </Button>
                        </div>
                    ) : <TextField
                        fullWidth
                        type='file'
                        margin="normal"
                        id="file"
                        name="file"
                        autoComplete="file"
                        disabled={!!values.file}
                        onBlur={handleBlur}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            fileUpdate((event.currentTarget).files?.item(0));
                        }}
                        error={touched.file && !!errors.file}
                        helperText={touched.file && errors.file}/>}
                    <Box className='mt-1' sx={{width: '100%'}}>
                        <LinearProgress variant="determinate" value={percentage}/>
                    </Box>
                    <div className={style.upload}>
                        <Button
                            disabled={!isValid || isDownload}
                            type="submit"
                            variant="contained"
                            color="success"
                            sx={{mt: 3, mb: 2}}
                            className={style.btn}>
                            {isEdit ? `Add ${fileName}` : `Save ${fileName}`}
                        </Button>
                        <Button
                            disabled={!isValid || isDownload}
                            type="button"
                            color="error"
                            onClick={eventCloseModal}
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            className={style.btn}>
                            Close
                        </Button>
                    </div>
                </form>
            </div>
        );
    };

export default FormAdmin;