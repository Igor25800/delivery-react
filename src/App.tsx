import React from 'react';
import './App.scss';
import Header from "./components/header/header";
import {Outlet} from "react-router-dom";
import NavLeft from "./components/navLeft/navLeft";
import NavRight from "./components/navRight/navRight";
import {theme} from "./shared/material/thema";
import {ThemeProvider} from "@mui/material";
import SnackbarModal from "./components/SnackbarModal/SnackbarModal";
import {userAppSelector} from "./hooks/redux-hooks";
import Footer from "./components/footer/footer";

function App() {
    const {isActionSnackBar, message} = userAppSelector(state => state.snackBar);


    return (
        <div className="App">
            <SnackbarModal open={isActionSnackBar} message={message}/>
            <Header/>
            <NavLeft/>
            <NavRight/>
            <ThemeProvider theme={theme}>
                <main className='main'>
                    <Outlet/>
                </main>
            </ThemeProvider>
            <Footer/>
        </div>
    );
}

export default App;
