import React from 'react';
import { useFormik} from "formik";
import {validateLogin} from "../../shared/validator/ValidateLogin";
import FormLogin, {PropsLogin} from "./formLogin/formLogin";
import {getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {app} from "../../firebase";
import {UserCredential} from '@firebase/auth/cordova';
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hooks/redux-hooks";
import {addAccessToken} from "../../store/slices/auth";

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const formik= useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: ({email, password}: PropsLogin): void => {
         signInWithEmailAndPassword(getAuth(app), email, password).then((user: UserCredential): void => {
             dispatch(addAccessToken({key: 'admin',  accessToken: user.user.refreshToken}));
             navigate('/admin');
        }).catch((error): void => {

         })
        },
        validationSchema: validateLogin,
    });
    const setValue = (event: PropsLogin): void => {
        formik.setValues(event);
    }

    return (
        <div>
            <FormLogin {...formik}  eventSetValue={setValue} />
        </div>
    );
};

export default Login;