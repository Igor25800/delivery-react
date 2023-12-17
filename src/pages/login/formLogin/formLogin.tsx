import React, {FC} from 'react';
import {Avatar, Box, Button, Container, CssBaseline, TextField, Typography} from "@mui/material";
import {FormikProps} from "formik";

export interface PropsLogin {
    email: string;
    password: string;
}

export interface FormProps extends FormikProps<PropsLogin> {
    eventSetValue: (event: PropsLogin) => void;
}

const FormLogin: FC<FormProps> = (
    {handleSubmit, values , handleBlur, handleChange, touched, errors, eventSetValue}
) => {
    const setForm = (event: PropsLogin): void => {
        eventSetValue(event)
    }

    return (
        <div >
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    </Avatar>
                    <Typography onClick={() => setForm({email: 'amdin12345@gmail.com', password: 'admin12345'})} component="h1" variant="h5">Admin Sign in</Typography>
                    <form  className='igor' onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            margin="normal"
                            id="email"
                            name="email"
                            value={values.email}
                            label="Email Address"
                            autoComplete="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={touched.email && !!errors.email}
                            helperText={touched.email && errors.email}/>
                        <TextField
                            fullWidth
                            margin="normal"
                            type='password'
                            id="password"
                            name="password"
                            value={values.password}
                            label="Password"
                            autoComplete="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={touched.password && Boolean(errors.password)}
                            helperText={touched.password && errors.password}/>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}>
                            Sign In
                        </Button>
                    </form>
                </Box>
            </Container>
        </div>
    );
};

export default FormLogin;