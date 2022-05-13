import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";

import "./css/reset.css"

import Home from './components/Home.js'
import SignUp from './components/SignUp.js'
import Login from './components/Login.js'

function App() {

    const URL_BACK = "https://projeto14-drivenshoes.herokuapp.com";

    const [token, setToken] = useState("");

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home URL_BACK={URL_BACK} />} />
                <Route path="/sign-up" element={<SignUp URL_BACK={URL_BACK} />} />
                <Route path="/login" element={<Login URL_BACK={URL_BACK} setToken={setToken} />} />
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.render(<App />, document.querySelector(".root"));