import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const LinkCard = styled(Link)`
    text-decoration: none;
    display:flex;
`;

export const Grid = styled.div`
    display:grid;
    grid-template-columns:auto;
    grid-template-rows:20vh 70vh 10vh;
`;

export const GridTittle = styled.div`
    display:grid;
    grid-template-columns:100vw;
    grid-template-rows:95% 5%;
`;

export const Tittle = styled(motion.h1)`
    font-family:'Abel';
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:5em;
    color:#8593FF;
`;

export const SubTittle = styled(motion.p)`
    font-family:'Abel';
    margin-block-end:0;
    margin-block-start:0;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:1.2em;
    color:#C9C7C8;
`;

export const GridCards = styled.div`
    display:grid;
    grid-template-columns: auto;
    grid-template-rows: auto;
`;

export const CardOpcion = styled(motion.div)`
    display: grid;
    grid-template-columns: 20% 80%;
    grid-template-rows: auto;
    margin-top:auto;
    margin-bottom:auto;
    margin-left:auto;
    margin-right: auto;
    height: 100px;
    width: 700px;
    border-radius: 5px;
    cursor:pointer;
`;

export const CardTransporte = styled(CardOpcion)`
    background:#ADB7FF;
    transition: all .2s ease-in-out;
    &:hover{
        background:#8593FF;
        transition: all .2s ease-in-out;
    }
`;
export const CardIcon = styled(motion.div)`
    background:#475DFF;
    color:white;
    display:flex;
    align-items: center;
    justify-content: center;
    font-size: 4em;
    border-top-left-radius: 5px;
    border-bottom-left-radius:5px;
    clip-path: polygon(0 0, 100% 0%, 70% 100%, 0 100%);
    box-shadow: 8px 0px 8px 0px rgba(0,0,0,0.46);
`;
export const TextCard = styled.p`
    margin-block-end: 0;
    margin-block-start:0;
    display:flex;
    color:white;
    font-family:'Abel';
    justify-content: center;
    align-items: center;
    font-weight: 800;
    font-size:3em;
`;

export const GridText = styled.div`
    display:grid;
    grid-template-columns: auto;
    grid-template-rows: 50% 50%;
`;