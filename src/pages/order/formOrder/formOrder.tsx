import React, {FC} from 'react';
import style from "../../../admin/components/formAdmin/formAdmin.module.scss";
import {Button, TextField} from "@mui/material";
import {FormikProps} from "formik";
import {IOrder} from "../../../shared/interfaces/order/order";


const FormOrder: FC<FormikProps<IOrder>> = (
    {values, handleBlur, handleChange, touched, errors, handleSubmit}) => {
    return (
        <div>
            <form className='p-1' onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    margin="normal"
                    id="name"
                    name="name"
                    value={values.name}
                    label="Name"
                    autoComplete="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.name && !!errors.name}
                    helperText={touched.name && errors.name}/>
                <TextField
                    fullWidth
                    margin="normal"
                    id="city"
                    name="city"
                    value={values.city}
                    label="city"
                    autoComplete="city"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.city && !!errors.city}
                    helperText={touched.city && errors.city}/>
                <TextField
                    fullWidth
                    margin="normal"
                    id="email"
                    name="email"
                    value={values.email}
                    label="Email"
                    autoComplete="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.email && !!errors.email}
                    helperText={touched.email && errors.email}/>
                <TextField
                    fullWidth
                    margin="normal"
                    id="commit"
                    name="commit"
                    value={values.commit}
                    label="commit"
                    autoComplete="commit"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.commit && !!errors.commit}
                    helperText={touched.commit && errors.commit}/>
                <Button
                    type="submit"
                    color="error"
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                    className={style.btn}>
                    Add Order
                </Button>
            </form>
        </div>
    );
};

export default FormOrder;