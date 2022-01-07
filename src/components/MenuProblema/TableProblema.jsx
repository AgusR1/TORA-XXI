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

const TableProblema = ({ data }) => {
    return (
        <Table>
            <thead>
                <tr>
                    <ThFD>Fuentes/Destinos</ThFD>
                    {
                        [...Array(data.destinos)].map((e,index) => {
                            return (
                                <Sth>Destino {index + 1}</Sth>
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
                        [...Array(data.destinos)].map((e,index) => {
                            return (
                                <Sth>-</Sth>
                            )
                        })
                    }
                    <ThFD>-</ThFD>
                </tr>
            </tfoot>
            <tbody>
                {
                    [...Array(data.fuentes)].map((e,index) => {
                        return (
                            <tr>
                                <Tth>Fuente {index+1}</Tth>
                                {
                                    [...Array(data.destinos)].map((e,index) => {
                                        return (
                                            <Ith>-</Ith>
                                        )
                                    })
                                }
                                <Tth>-</Tth>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    )
}

export default TableProblema;