import React, { useRef } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';

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
    width:fit-content;
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

export const Input = styled.input`
    width: 100px;
    height:30px;
    font-size:1em;
    border:none;
    background:transparent;
    cursor:pointer;
    font-family: 'Abel';
    text-align:center;
    &:focus-visible{
        outline:0;
    }
`;

export const InputTexto = styled(Input)`
    color:white;
`;

export const InputTexto2 = styled(Input)`
    color:black;
`;

export const InputNumber2 = styled(Input)`
    color:white;
`;

const TableProblema = ({ data, fuentesRef,destinosRef,demandasRef,ofertasRef,camposRef }) => {
    const addCampos=obj=>{
        if (obj && !camposRef.current.includes(obj)) {
            camposRef.current.push(obj);
        }
    }

    const addOfertas=obj=>{
        if (obj && !ofertasRef.current.includes(obj)) {
            ofertasRef.current.push(obj);
        }
    }

    const addDemandas=obj=>{
        if (obj && !demandasRef.current.includes(obj)) {
            demandasRef.current.push(obj);
        }
    }

    const addDestinos = obj => {
        if (obj && !destinosRef.current.includes(obj)) {
            destinosRef.current.push(obj);
        }
    }

    const addFuentes = obj => {
        if (obj && !fuentesRef.current.includes(obj)) {
            fuentesRef.current.push(obj);
        }
    }
    return (
        <Table>
            <thead>
                <tr>
                    <ThFD>Fuentes/Destinos</ThFD>
                    {
                        [...Array(data.destinos)].map((e, index) => {
                            return (
                                <Sth key={uuidv4()}>
                                    <InputTexto
                                        key={uuidv4()}
                                        id={"destino" + index}
                                        name={"destino" + index}
                                        type="text"
                                        defaultValue={"Destino " + parseInt(index + 1)}
                                        ref={addDestinos}
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
                                <Sth key={uuidv4()}><InputNumber2
                                    key={uuidv4()}
                                    id={"Demanda" + index}
                                    name={"Demanda" + index}
                                    type="text"
                                    defaultValue="0"
                                    ref={addDemandas}
                                /></Sth>
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
                            <tr key={uuidv4()}>
                                <Tth key={uuidv4()}><InputTexto2
                                    key={uuidv4()}
                                    id={"Fuente" + index}
                                    name={"Fuente" + index}
                                    type="text"
                                    defaultValue={"Deposito " + parseInt(index + 1)}
                                    ref={addFuentes}
                                /></Tth>
                                {
                                    [...Array(data.destinos)].map(() => {
                                        return (
                                            <Ith key={uuidv4()}><Input
                                                key={uuidv4()}
                                                id={"Campo" + uuidv4()}
                                                name={"Campo" + uuidv4()}
                                                defaultValue="0"
                                                ref={addCampos}
                                            /></Ith>
                                        )
                                    })
                                }
                                <Tth key={uuidv4()}><Input
                                    key={uuidv4()}
                                    id={"Oferta" + index}
                                    name={"Oferta" + index}
                                    defaultValue={"0"}
                                    ref={addOfertas}
                                /></Tth>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    )
}

export default TableProblema;