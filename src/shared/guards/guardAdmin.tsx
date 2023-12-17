import React, {useEffect, useState} from 'react';
import {Navigate, redirect} from "react-router-dom";
import Admin from "../../admin/admin";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {app} from "../../firebase";
import {getLocalStorage} from "../until/localStorage";

const GuardAuth = () => {
    const [isAuth, setUser] = useState<any>(getAuth(app));

    useEffect(() => {
        onAuthStateChanged(getAuth(app), (user: any ): any => {
            setUser(user)
        })
    }, [])

    return  isAuth
        ? <Admin />
        : <Navigate to="/login" />;
}

export default GuardAuth;

export const guardAdmin = () => {
    const accessToken =  getLocalStorage('admin');
    if (accessToken) {
        return true
    }
    return redirect('/login');
}
