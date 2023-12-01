import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Provider} from "react-redux";
import store from "./store/store";
import {router} from "./Router";
import {RouterProvider} from "react-router-dom";



const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
        <Provider store={store}>
               <RouterProvider router={router}/>
        </Provider>
);
