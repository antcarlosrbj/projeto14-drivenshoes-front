import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import "./css/reset.css"

import Home from './components/Home.js'

function App() {

    const URL_BACK = "https://projeto14-drivenshoes.herokuapp.com";

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home URL_BACK={URL_BACK} />} />
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.render(<App />, document.querySelector(".root"));