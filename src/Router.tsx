import {createBrowserRouter, Navigate} from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/error/errorPage";
import Home from "./pages/home/home";
import React from 'react';

const LazyAbout = React.lazy(() => import('./pages/about/about'));

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: 'home',
                element: <Home/>,
            },
            {
                path: 'about',
                element: <React.Suspense><LazyAbout/></React.Suspense>
            },
            {
                element: <Navigate to='home' replace/>,
                index: true,
            }
        ]
    },
    {
        path: '*',
        element: <ErrorPage/>
    }

])