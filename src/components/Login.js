import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";


export default function Login({ URL_BACK, token, setToken }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [erro, setErro] = useState(<p></p>); //Usuário e/ou senha incorretos;
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    function loginForm(event) {
        event.preventDefault();

        setLoading(true);

        const promisse = axios.post(URL_BACK + "/login", {
            email: email,
            password: password
        })

        promisse.then(res => {
            setLoading(false);
            setToken(res.data);
            localStorage.setItem("token", res.data);
            navigate("/");
        });

        promisse.catch(error => {
            setLoading(false);
            if (error.response.status === 401) {
                setErro(<p>Usuário e/ou senha incorretos</p>);
            } else {
                alert("Infelizmente, não foi possível realizar o cadastro. Tente novamente mais tarde.");
            }
            console.log(error);
        });

    }

    useEffect(() => {
        
        const promiseToken = axios.get(URL_BACK + "/login", {
            headers: {
                "authorization": `Bearer ${token}`
            }
        })

        promiseToken.then(res => {
            navigate("/");
        });

        promiseToken.catch(error => {
            console.log(error);
        });
       
    }, []);

    return (
        <LoginStyle>
            <h1>DrivenShoes</h1>
            <form onSubmit={loginForm}>
                <input type="email" value={email} placeholder="E-mail" onChange={e => setEmail(e.target.value)} required />
                <input type="password" value={password} placeholder="Senha" onChange={e => setPassword(e.target.value)} required />
                <button type="submit">{loading ? <ThreeDots {...{ color: "white" }} /> : "Entrar"}</button>
            </form>
            {erro}
            <Link to="/sign-up">Primeira vez? Cadastre-se!</Link>
        </LoginStyle>
    )
}

const LoginStyle = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #5B2E82;

    font-family: 'Roboto', sans-serif;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
        font-family: 'Dosis', sans-serif;
        font-size: 32px;
        color: white;
        margin-bottom: 24px;
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

    p {
        margin-top: 4px;
        height: 16px;
        font-size: 15px;
        font-weight: 700;
        color: red;
    }

    a {
        font-size: 15px;
        font-weight: 700;
        color: white;
        text-decoration: none;
        margin-top: 16px;
    }
`;
