import { Formik } from "formik";
import React from "react";
import styled from "styled-components";

const Table = styled.table`
    border-collapse: collapse;
    background: white;
`;

const Td = styled.td`
    border:inset 1px;
    text-align: center;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    font-family:'Abel';
    border-color: #8593FF;
`;

const Th = styled.th`
    font-family:'Abel';
    border:inset 1px;
    padding: 1em;
    text-align:center;
    border-color: #8593FF;
`;

const ThFD = styled(Th)`
    font-family: 'Abel';
    font-weight: 600;
    background: #8593FF;
    color:white;
`;

export const Sth = styled(Th)`
    font-family: 'Abel';
    font-weight: 600;
    background: #ADB7FF;
    color:white;
    cursor:pointer;
`;

export const Tth = styled(Th)`
    font-family: 'Abel';
    font-weight: 600;
    background: #e6e8ff;
    cursor:pointer;
`;

export const Ith = styled(Td)`
    font-family: 'Abel';
    cursor:pointer;
`;
export const InputTexto = styled.input`
    width: 30px;
    border:none;
    background:#ADB7FF;
    cursor:pointer;
    color:white;
    font-family: 'Abel';
`;

export const InputTexto2 = styled.input`
    width: 30px;
    border:none;
    background:#e6e8ff;
    cursor:pointer;
    font-family: 'Abel';
`;

export const InputNumber = styled.input`
    width: 30px;
    border:none;
    background:white;
    cursor:pointer;
    font-family: 'Abel';
`;

export const InputNumber2 = styled.input`
    width: 30px;
    border:none;
    background:#ADB7FF;
    cursor:pointer;
    font-family: 'Abel';
    color:white;
`;

export const InputNumber3 = styled.input`
    width: 30px;
    border:none;
    background:#e6e8ff;
    cursor:pointer;
    font-family: 'Abel';
`;

const TableProblema = ({ data }) => {
    const min = 1;
    const max = 10000;
    return (
        <Table>
            <thead>
                <tr>
                    <ThFD>Fuentes/Destinos</ThFD>
                    {
                        [...Array(data.destinos)].map((e, index) => {
                            return (
                                <Sth key={Math.floor(Math.random() * (max - min + 1)) + min}>
                                    <InputTexto
                                        key={Math.floor(Math.random() * (max - min + 1)) + min}
                                        id={"destino" + index}
                                        name={"destino" + index}
                                        type="text"
                                    />
                                </Sth>
                            )
                        })
                    }
                    <ThFD>Oferta</ThFD>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <ThFD>Demanda</ThFD>
                    {
                        [...Array(data.destinos)].map((e, index) => {
                            return (
                                <Sth key={Math.floor(Math.random() * (max - min + 1)) + min}><InputNumber2 key={Math.floor(Math.random() * (max - min + 1)) + min} /></Sth>
                            )
                        })
                    }
                    <ThFD>-</ThFD>
                </tr>
            </tfoot>
            <tbody>
                {
                    [...Array(data.fuentes)].map((e, index) => {
                        return (
                            <tr key={Math.floor(Math.random() * (max - min + 1)) + min}>
                                <Tth key={Math.floor(Math.random() * (max - min + 1)) + min}><InputTexto2 key={Math.floor(Math.random() * (max - min + 1)) + min} /></Tth>
                                {
                                    [...Array(data.destinos)].map((e, index) => {
                                        return (
                                            <Ith key={Math.floor(Math.random() * (max - min + 1)) + min}><InputNumber /></Ith>
                                        )
                                    })
                                }
                                <Tth key={Math.floor(Math.random() * (max - min + 1)) + min}><InputNumber3 /></Tth>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    )
}

export default TableProblema;