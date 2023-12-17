import {createBrowserRouter, Navigate} from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/error/errorPage";
import Home from "./pages/home/home";
import React from 'react';

import Admin from "./admin/admin";
import {guardAdmin} from "./shared/guards/guardAdmin";
import CategoryAdmin from "./admin/category/categoryAdmin";
import ProductsAdmin from "./admin/products/productsAdmin";
import DiscountsAdmin from "./admin/discounts/discountsAdmin";
import {loader} from "./shared/guards/guardMenu";
import Order from "./admin/order/order";

const LazyAbout = React.lazy(() => import('./pages/about/about'));
const LazyDiscounts = React.lazy(() => import('./pages/discounts/discounts'));
const LazyDelivery = React.lazy(() => import('./pages/delivery/delivery'));
const LazyLoginDelivery = React.lazy(() => import('./pages/login/login'));
const LazyMenuCategory = React.lazy(() => import('./pages/menu/menu'));
const LazyOrder = React.lazy(() => import('./pages/order/order'));


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
                path: 'discounts',
                element: <React.Suspense><LazyDiscounts/></React.Suspense>
            },
            {
                path: 'delivery',
                element: <React.Suspense><LazyDelivery/></React.Suspense>
            },
            {
                path: 'login',
                element: <React.Suspense><LazyLoginDelivery/></React.Suspense>
            },
            {
                path: 'order',
                element: <React.Suspense><LazyOrder/></React.Suspense>
            },
            {
                path: 'menu/:category',
                element: <React.Suspense> <LazyMenuCategory/>  </React.Suspense>,
                loader: loader
            },
            {
                path: 'admin',
                element: <Admin/>,
                loader: guardAdmin,
                children: [
                    {
                        path: 'category',
                        element: <CategoryAdmin/>
                    },
                    {
                        path: 'products',
                        element: <ProductsAdmin/>
                    },
                    {
                        path: 'discounts',
                        element: <DiscountsAdmin/>
                    },
                    {
                        path: 'Order',
                        element: <Order/>
                    },
                    {
                        element: <Navigate to='category' replace/>,
                        index: true,
                    },
                ]
            },
            {
                element: <Navigate to='home' replace/>,
                index: true,
            },
        ]
    },
    {
        path: '*',
        element: <ErrorPage/>
    }

])