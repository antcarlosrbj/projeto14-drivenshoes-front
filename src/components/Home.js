import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import Header from './Header.js';

export default function Home({ URL_BACK, cartVisibility, setCartVisibility, products, setProducts, productsCart, confProducts }) {

    useEffect(() => {
        confProducts("refresh", 0);
		const promise = axios.get(URL_BACK + "/products");

		promise.then(answer => {
			setProducts(answer.data);
		});
        
        promise.catch(erro => {
            console.log("Status code: " + erro.response.status);
            console.log("Mensagem de erro: " + erro.response.data);
        });

	}, []);

    return (
        <>
            <Header confProducts={confProducts} productsCart={productsCart} products={products} cartVisibility={cartVisibility} setCartVisibility={setCartVisibility} />
            <Main>
                <main className="mainHome">
                    <div className="products">
                        {products.map((product) => {
                            return (
                                <div onClick={() => confProducts("add", product.id)} className="product" key={product._id}>
                                    <img src={product.img} alt={product.name} />
                                    <p className="name">{product.name}</p>
                                    <p className="previous-value">{
                                        ((product.price/40) < 2) ? 
                                            "De " + 
                                            Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(
                                                Math.ceil(product.price/4)*5-.1
                                            ) 
                                        : 
                                            ""
                                    }</p>
                                    <p className="value">{Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(product.price)}</p>
                                    <p className="installments">{
                                        ((product.price/40) < 2) ?
                                            "" 
                                        : 
                                            "ou " + parseInt(product.price/40) + "x de " + 
                                            Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(
                                                parseInt(
                                                    (product.price/(
                                                        parseInt(product.price/40)
                                                    )
                                                )*100)/100
                                            )
                                    }</p>
                                </div>
                            );
                        })}
                    </div>
                </main>
            </Main>
        </>
    );
}

const Main = styled.div`

    background-color: #E0E0E0;

    .mainHome {
        margin-top: 67px;
    }

    .products {
        padding-top: 7px;
        padding-left: 7px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .product {
        width: 172px;
        height: 216px;
        margin: 0 7px 7px 0;
        border: 0;
        padding: 10px;
        border-radius: 3px;
        box-shadow: 0px 2px 4px 2px #0000001A;
        background-color: white;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        text-decoration: none;
    }

    .product > img {
        width: 100px;
        height: 100px;
        object-fit: contain;
    }

    .product > .name {
        margin-top: 5px;
        width: 100%;
        overflow-y: hidden;
        margin-bottom: 8px;

        height: 45px;
        color: black;
        font-size: 14px;
    }

    .product > .previous-value {
        width: 100%;
        
        color: gray;
        font-size: 12px;
        text-decoration: line-through;
    }

    .product > .value {
        width: 100%;
        
        color: black;
        font-size: 16px;
        font-weight: 700;
    }

    .product > .installments {
        width: 100%;
        
        color: black;
        font-size: 12px;
    }
`;