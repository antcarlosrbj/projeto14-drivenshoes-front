import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";


export default function SignUp({ URL_BACK }) {

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [erro, setErro] = React.useState(<p></p>); //Usuário e/ou senha incorretos
    const [loading, setLoading] = React.useState(false);

    const navigate = useNavigate();

    function signUpForm(event) {
        event.preventDefault();

        if (password !== confirmPassword) {
            setErro(<p>As duas senhas devem ser iguais</p>);
            return;
        }

        setLoading(true);

        const promisse = axios.post(URL_BACK + "/sign-up", {
            name: name,
            email: email,
            password: password
        })

        promisse.then(res => {
            setLoading(false);
            navigate("/login");
        });

        promisse.catch(error => {
            setLoading(false);
            if (error.response.status === 400) {
                setErro(<p>A senha deve conter no mínimo 8 dígitos</p>);
            } else if (error.response.status === 409) {
                setErro(<p>Esse e-mail já foi cadastrado</p>);
            } else {
                alert("Infelizmente, não foi possível realizar o cadastro. Tente novamente mais tarde.");
            }
            console.log(error);
        });

    }

    return (
        <SignUpStyle>
            <h1>DrivenShoes</h1>
            <form onSubmit={signUpForm}>
                <input type="text" value={name} placeholder="Nome" onChange={e => setName(e.target.value)} required />
                <input type="email" value={email} placeholder="E-mail" onChange={e => setEmail(e.target.value)} required />
                <input type="password" value={password} placeholder="Senha" onChange={e => setPassword(e.target.value)} required />
                <input type="password" value={confirmPassword} placeholder="Confirme a Senha" onChange={e => setConfirmPassword(e.target.value)} required />
                <button type="submit">{loading ? <ThreeDots {...{ color: "white" }} /> : "Cadastrar"}</button>
            </form>
            {erro}
            <Link to="/login">Já tem uma conta? Entre agora!</Link>
        </SignUpStyle>
    )
}

const SignUpStyle = styled.div`
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