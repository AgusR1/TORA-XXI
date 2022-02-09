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
`;

export const SelectAlgoritmo = styled.select`

`;

export const BotonOpcion = styled.button`

`;

export const Option = styled.option`

`;