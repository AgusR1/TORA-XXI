import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const GridMenu2 = styled.div`
    display:grid;
    grid-template-columns: repeat(2,1fr);
    grid-template-rows:100%;
    height: 100vh;
    justify-items: center;
    align-items: center;
    @media screen and (max-width:1024px){
        grid-template-rows:100%;
    }
`;

export const CardInputs = styled(motion.div)`
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows:repeat(5,1fr);
    background: #8593FF;
    padding: 2em;
    width: 500px;
    height: 550px;
    border-radius:5px;
    @media screen and (max-width:1024px){
        width: 400px;
        height: 450px;
    }
`;

export const DivInput = styled.div`
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: repeat(2,1fr);
    padding:1em;
    @media screen and (max-width:1024px){
        padding: 0.1em;
    }
`;

export const LabelCard = styled.label`
    color:white;
    font-family: 'Abel';
    font-weight: 500;
    text-align: center;
    font-size:1.3em;
`;

export const InputCard = styled.input`
    border:none;
    border-radius: 3px;
    padding:5px;
    font-family: 'Abel';
    font-size: 1.3em;
    text-align: center;
`;

export const TextInput = styled(InputCard)`

`;

export const NumberInput = styled(InputCard)`
    width: 50%;
    margin-left: auto;
    margin-right: auto;
`;

export const ButtonCard = styled(motion.button)`
    margin:1em;
    cursor:pointer;
    border-radius:5px;
    border:none;
`;

export const LinkOption = styled(Link)`
    text-decoration: none;
    display:flex;
    margin-left:auto;
    margin-right:auto;
    width: 100%;
    margin-top: auto;
    margin-bottom: auto;
`;

export const ButtonAccept = styled(ButtonCard)`
    background: #475DFF;
    color:white;
    font-family: 'Abel';
    font-size:2em;
    width: 87%;
    display: flex;
    margin-left: auto;
    margin-right:auto;
    margin-top:0;
    margin-bottom:0;
    justify-content: center;
    &:hover{
        background:  #1a34ff;
    }
`;

export const ButtonBack = styled(ButtonCard)`
    background: white;
    color:black;
    font-family: 'Abel';
    font-size:2em;
    width: 100%;
    &:hover{
        background:  black;
        color:white;
    }
`;

export const HelpCard =styled(motion.div)`
    display: grid;
    grid-template-columns: 30% 70%;
    grid-template-rows:100%;
    background: #8593FF;
    width: 500px;
    height: 200px;
    border-radius:5px;
    @media screen and (max-width:1024px){
        width: 400px;
        height: 250px;
    }
`;

export const IconHelp = styled.div`
    background:#475DFF;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 5em;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    clip-path: polygon(0 0, 100% 0%, 70% 100%, 0 100%);
    box-shadow: 8px 0px 8px 0px rgba(0, 0, 0, 0.46);
`;

export const HelpContent = styled.div`
    display:grid;
    grid-template-columns: auto;
    grid-template-rows:30% 70%;
`;

export const TitleCard = styled.h5`
    color:white;
    font-family:'Abel';
    font-size:2em;
    margin-block-start: 0px;
    margin-block-end:0px;
    display: flex;
    align-items:center;
    margin-left:auto;
    margin-right: auto;
`;

export const TextCard = styled.p`
    color:white;
    font-family:'Abel';
    font-size:1.4em;
    padding:2em;
    margin-block-start: 0px;
    margin-block-end:0px;
    display: flex;
    text-align: center;
`;

export const ErrorText = styled.p`
    color:#1a34ff;
    font-family:'Abel';
    font-size: 1.1em;
    font-weight: bold;
    margin-block-start: 0px;
    margin-block-end:0px;
    display: flex;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
`;
