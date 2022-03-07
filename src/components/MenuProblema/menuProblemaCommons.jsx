import styled from "styled-components";
import { motion } from "framer-motion";

export const TitleProblem = styled(motion.h1)`
    display:flex;
    margin-block-end: 0;
    margin-block-start: 0;
    margin-inline-start:0;
    margin-inline-end:0;
    align-items: center;
    justify-content: center;
    font-size: 3.5em;
    font-family: 'Abel';
    color:#8593FF;
`;

export const GridMenuProblema = styled.div`
    display:grid;
    grid-template-columns: 100vw;
    grid-template-rows: auto auto auto;
    row-gap:20px;
`;

export const CardTable = styled(motion.div)`
    margin-left: auto;
    margin-right: auto;
    padding: 0.4em;
    width: fit-content;
    height: fit-content;
    border-radius: 4px;
    background: white;
    border: 2px;
`;

export const PanelBotones = styled.div`
    margin-left:auto;
    margin-right:auto;
    display:grid;
    grid-template-columns:repeat(2,1fr);
    column-gap:10px;
`;

export const GridSelect = styled.div`
    display:grid;
    grid-template-rows:auto auto;
    height:60px;
`;

export const SelectAlgoritmo = styled.select`
    border-color:#8593FF;
    border-radius:5px;
    font-family:"Abel";
    font-size:15px;
`;

export const BotonOpcion = styled(motion.button)`
    border:none;
    color:white;
    cursor:pointer;
    background:#475DFF;
    border-radius:5px;
    font-family:"Abel";
    padding:1em;
    font-size:1em;
    &:hover{
        background:  #1a34ff;
    }
`;

export const BotonVolver = styled(motion.button)`
    border-color:black ;
    color:black;
    cursor:pointer;
    background:white;
    border-radius:5px;
    font-family:"Abel";
    padding:1em;
    font-size:1em;
    &:hover{
        color:white;
        background:  black;
    }
`;

export const Option = styled.option`
    
`;

export const GridSolucion = styled.div`
    display:grid;
    grid-template-rows:80%,20%;
    grid-template-columns:auto;
`;

export const CuadroSolucion = styled(motion.div)`
    display:grid;
    grid-template-rows:80% 20%;
    border-radius:5px;
    background:white;
    box-shadow: rgb(0 0 0 / 50%) 0px 0px 4px 0px;
    margin-left:auto;
    margin-right:auto;
    padding:1rem;
    min-width:600px;
`;
export const GridDetalle = styled.div`
    display:grid;
    grid-template-columns:auto;
    grid-template-rows:auto;
`;

export const CuadroCosto = styled(motion.div)`
    display:flex;
    background:#8593FF;
    padding:1rem;
    align-items:center;
    justify-content:center;
    border-radius:5px;
    color:white;
    font-size:2em;
    width:max-content;
    margin-left:auto;
    margin-right:auto;
`;

export const CuadroNum = styled(motion.div)`
    display:flex;
    background:#8593FF;
    padding:1rem;
    align-items:center;
    justify-content:center;
    border-radius:5px;
    color:white;
    font-size:1em;
    width:max-content;
    margin-left:auto;
    margin-right:auto;
`;

export const DivDetalle = styled.div`
    display:grid;
    grid-template-columns:10% 90%;
    grid-template-rows:auto;
    margin-top:1em;
    margin-bottom:1em;
    font-size:1.1em ;
`

export const TextSolucion = styled.p`
    font-family:'Abel';
    margin-block-end:0;
    margin-block-start:0;
    margin-top:auto;
    margin-bottom:auto;
`;