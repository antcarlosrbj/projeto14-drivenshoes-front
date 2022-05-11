import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import axios from "axios";

export default function Home({ URL_BACK }) {

    const [msgBack, setMsgBack] = useState("");

    useEffect(() => {

        const promisse = axios.get(URL_BACK + "/")

        promisse.then(res => {
            setMsgBack(res.data);
        })
        promisse.catch(erro => {
            console.log(erro);
        })

    }, [])

    return (
        <HomeStyle>
            <h1>Hello World</h1>
            <h2>Sou o Front</h2>
            <h3>{msgBack}</h3>
        </HomeStyle>
    )
}

const HomeStyle = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #8C11BE;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`;