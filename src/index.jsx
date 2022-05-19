import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";

import "./css/reset.css"

import Home from './components/Home.js'
import SignUp from './components/SignUp.js'
import Login from './components/Login.js'
import CheckOut from './components/CheckOut.js'

function App() {

    const URL_BACK = "https://projeto14-drivenshoes.herokuapp.com";

    const [token, setToken] = useState("");
    const [cartVisibility, setCartVisibility] = useState(false);
    const [products, setProducts] = useState([]);
    const [productsCart, setProductsCart] = useState([]);

    function confProducts(method, id) {
        if (method === "refresh") {
            if (localStorage.hasOwnProperty("products")) {
                localStorage.getItem("products") == "" ? setProductsCart([]) : setProductsCart(localStorage.getItem("products").split(","));
            } else {
                setProductsCart([]);
            }
        } else if (method === "add") {
            const productsTemp = [...productsCart];
            productsTemp.push(id);
            localStorage.setItem("products", productsTemp.toString());
            setProductsCart(productsTemp);
            setCartVisibility(true);
        } else if (method === "delete") {
            const productsTemp = [...productsCart];
            let index = -1;
            for(let i = 0; i < productsTemp.length; i++) {
                if (productsTemp[i] == id) {
                    index = i;
                }
            }
            if (index !== -1) {
                productsTemp.splice(index, 1);
                localStorage.setItem("products", productsTemp.toString());
                setProductsCart(productsTemp);
            }
        }
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home URL_BACK={URL_BACK} cartVisibility={cartVisibility} setCartVisibility={setCartVisibility} products={products} setProducts={setProducts} productsCart={productsCart} confProducts={confProducts} />} />
                <Route path="/check-out" element={<CheckOut URL_BACK={URL_BACK} cartVisibility={cartVisibility} setCartVisibility={setCartVisibility} products={products} setProducts={setProducts} productsCart={productsCart} setProductsCart={setProductsCart} confProducts={confProducts} token={token} setToken={setToken} />} />
                <Route path="/sign-up" element={<SignUp URL_BACK={URL_BACK} />} />
                <Route path="/login" element={<Login URL_BACK={URL_BACK} token={token} setToken={setToken} />} />
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.render(<App />, document.querySelector(".root"));