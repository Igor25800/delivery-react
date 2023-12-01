import React from 'react';
import './App.scss';
import Header from "./components/header/header";
import {Outlet} from "react-router-dom";

function App() {
    return (
    <div className="App">
        <Header/>
     <main>
         <Outlet />
     </main>
    </div>
  );
}

export default App;
