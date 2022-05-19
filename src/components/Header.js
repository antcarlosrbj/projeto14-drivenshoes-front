import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Header({confProducts, productsCart, products, cartVisibility, setCartVisibility}) {

    const navigate = useNavigate();

    function valueCart() {
        let value = 0;
        productsCart.forEach(productCart => {
            products.forEach(product => {
                if (product.id == productCart) {
                    value += product.price 
                }
            })
        })
        return Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(value);
    }

    return (
        <>
            <HeaderDiv>
                <div className="menu">
                    <ion-icon name="menu-outline"></ion-icon>
                </div>
                <div className="logo">
                    DrivenShoes
                </div>
                <div className="cart" onClick={() => {
                    setCartVisibility(true);
                    confProducts("refresh", 0);
                }}>
                    <ion-icon name="cart-outline"></ion-icon>
                    {productsCart.length ? <div className="amount">{productsCart.length}</div> : ""}
                </div>
            </HeaderDiv>
            <Cart>
                <div className={cartVisibility ? "background-cart" : ""} onClick={() => setCartVisibility(false)}></div>
                <div className={cartVisibility ? "cart visible" : "cart hidden"}>
                    <div className="top" onClick={() => setCartVisibility(false)}>
                        <ion-icon name="remove-outline"></ion-icon>
                    </div>
                    <div className="title">Carrinho</div>
                    <div className={productsCart.length ? "products-list" : "products-list center"}>
                        {!productsCart.length ? <p>Seu carrinho está vazio</p> 
                        : 
                        productsCart.map(productCart => {
                            let productCartData = {};
                            products.forEach(product => {
                                if (product.id == productCart) {
                                    productCartData = {
                                        id: product.id,
                                        img: product.img,
                                        name: product.name,
                                        price: product.price
                                    }
                                }
                            })
                            return (
                                <div className="product" key={productCartData.id}>
                                    <img src={productCartData.img} />
                                    <div className="content">
                                        <div className="product-and-close">
                                            <p className="product-title">{productCartData.name}</p>
                                            <ion-icon name="close-outline" onClick={() => confProducts("delete", productCartData.id)}></ion-icon>
                                        </div>
                                        <div className="value-div">
                                            <p className="value">{Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(productCartData.price)}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="bottom">
                        <p className="total">Valor total:</p>
                        <div className="value-total">{valueCart()}</div>
                        <div className="next" onClick={() => {
                            setCartVisibility(false);
                            navigate("/check-out");
                        }}>Finalizar</div>
                    </div>
                </div>
            </Cart>
        </>
    );
}

const HeaderDiv = styled.div`
    height: 67px;
    background-color: #5B2E82;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    box-shadow: 0px 4px 4px 0px #0000001A;

    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
        height: 67px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
    }

    .menu, .cart {
        width: 67px;
        font-size: 30px;
    }

    .logo {
        width: calc(100vw - 134px);
        font-family: 'Dosis', sans-serif;
        font-size: 30px;
        font-weight: 800;
    }

    .cart {
        position: relative;
    }

    .amount {
        position: absolute;
        min-width: 20px;
        height: 20px;
        border-radius: 10px;
        background-color: #2C1144;
        top: 10px;
        right: 10px;
        font-size: 12px;
        font-weight: bold;
    }
`;

const Cart = styled.div`

    .hidden {
        bottom: -60vh;
    }

    .visible {
        bottom: 0;
    }

    .background-cart {
        position: fixed;
        z-index: 1;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: #0000006B;

        transition: 1s;
    }

    .cart {
        position: fixed;
        z-index: 2;
        left: 0;
        right: 0;

        height: 60vh;
        background-color: white;
        border-top-left-radius: 30px;
        border-top-right-radius: 30px;
        box-shadow: 0px -8px 4px 0px #0000001A;

        transition: 1s;
    }

    .top {
        height: 25px;
        width: 100vw;
        

        display: flex;
        align-items: center;
        justify-content: center;
    }

    ion-icon {
        font-size: 50px;
        color: gray;
    }

    .title {
        width: 100vw;
        height: 40px;

        display: flex;
        align-items: flex-start;
        justify-content: center;

        font-size: 25px;
    }

    .products-list {
        height: calc(60vh - 140px);
        padding-top: 15px;
        width: 100vw;
        overflow-y: scroll;
        background: #F0F0F0;
        box-shadow: inset 0px 0px 8px rgba(0, 0, 0, 0.25);

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .center {
        justify-content: center;
    }

    .product {
        width: 350px;
        min-height: 112px;
        background: #FFFFFF;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
        border-radius: 5px;
        margin-bottom: 15px;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .product > img {
        width: 100px;
        height: 100px;
        margin-right: 10px;
    }

    .content {
        width: 210px;
        height: 100px;
    }

    .product-and-close {
        width: 210px;
        height: 60px;

        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .product-and-close > ion-icon {
        font-size: 30px;
        color: red;
    }

    .product-title {
        width: 180px;
        font-size: 16px;
    }

    .value-div {
        width: 210px;
        height: 25px;
        
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .value-div > .value {
        font-size: 20px;
        font-weight: 700;
    }

    .bottom {
        height: 75px;
        width: 100vw;

        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .bottom p {
        width: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .value-total {
        width: 125px;
        font-size: 20px;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .next {
        width: 120px;
        height: 50px;
        border-radius: 5px;
        background-color: #5B2E82;
        margin: 0 15px;
        font-size: 20px;
        font-weight: 700;
        color: white;

        display: flex;
        align-items: center;
        justify-content: center;
    }
`;