import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

import Header from './Header.js';
import { useNavigate } from "react-router-dom";

export default function CheckOut({ URL_BACK, cartVisibility, setCartVisibility, products, setProducts, productsCart, setProductsCart, confProducts, token, setToken }) {

    const [address, setAddress] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [cardValid, setCardValid] = useState("");
    const [cardCVC, setCardCVC] = useState("");

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    
    let tokenTemp;

    useEffect(async() => {

        /* CARREGANDO PRODUTOS */

        confProducts("refresh", 0);
		const promise = axios.get(URL_BACK + "/products");

		promise.then(answer => {
			setProducts(answer.data);
		});
        
        promise.catch(erro => {
            console.log("Status code: " + erro.response.status);
            console.log("Mensagem de erro: " + erro.response.data);
        });

        /* VERIFICANDO TOKEN */

        if (localStorage.hasOwnProperty("token")) {
            setToken(localStorage.getItem("token"));
            tokenTemp = localStorage.getItem("token");
        } else {
            navigate("/login");
        }
        setLoading(true);

        
        const promiseToken = axios.get(URL_BACK + "/login", {
            headers: {
                "authorization": `Bearer ${tokenTemp}`
            }
        })

        promiseToken.then(res => {
            setLoading(false);
        });

        promiseToken.catch(error => {
            setLoading(false);
            navigate("/login");
        });
	}, []);

    function paymentForm(event) {
        event.preventDefault();
        
        setLoading(true);

        const promissePayment = axios.post(URL_BACK + "/buy", {
            productsCart: productsCart,
            address: address,
            cardNumber: cardNumber,
            cardName: cardName,
            cardValid: cardValid,
            cardCVC: cardCVC,
        }, {
            headers: {
                "authorization": `Bearer ${token}`
            }
        })

        promissePayment.then(res => {
            setLoading(false);
            setProductsCart([]);
            localStorage.removeItem("products");
            alert("Compra realizada com sucesso")
            navigate("/");
        });

        promissePayment.catch(error => {
            setLoading(false);
            alert("Não foi possível realizar seu pedido. Tente novamente mais tarde.")
            console.log(error);
        });
    }

    return (
        <>
            <Header confProducts={confProducts} productsCart={productsCart} products={products} cartVisibility={cartVisibility} setCartVisibility={setCartVisibility} />
            <Main>
                {loading ? <div className="loading"><ThreeDots {...{ color: "white" }} /></div> 
                : 
                    <form onSubmit={paymentForm}>
                        <input type="text" value={address} placeholder="Endereço" onChange={e => setAddress(e.target.value)} required />
                        <input type="number" value={cardNumber} placeholder="Número do cartão" onChange={e => setCardNumber(e.target.value)} required />
                        <input type="text" value={cardName} placeholder="Nome impresso no cartão" onChange={e => setCardName(e.target.value)} required />
                        <input type="month" value={cardValid} placeholder="Validade" onChange={e => setCardValid(e.target.value)} required />
                        <input type="number" value={cardCVC} placeholder="Código de segurança" onChange={e => setCardCVC(e.target.value)} required />
                        <button type="submit">Comprar</button>
                    </form>
                }
            </Main>
        </>
    );
}

const Main = styled.div`
    background-color: #E0E0E0;
    margin-top: 67px;
    padding-top: 50px;
    height: calc(100vh - 67px);

    .loading {
        display: flex;
        justify-content: center;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    form > input {
        height: 58px;
        width: 326px;
        border-radius: 5px;
        border: 0;  
        padding: 15px;
        box-sizing: border-box;
        margin-bottom: 13px;
        font-size: 20px;
    }

    form > button {
        height: 46px;
        width: 326px;
        border-radius: 5px;
        border: 0;
        font-size: 20px;
        font-weight: 700;
        background-color: #A328D6;
        color: white;

        display: flex;
        align-items: center;
        justify-content: center;
    }
`;