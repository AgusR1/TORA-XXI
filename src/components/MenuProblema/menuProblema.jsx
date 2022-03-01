import React, { Fragment, useEffect, useRef } from "react";
import useData from "../hooks/useData";
import { BotonOpcion, CardTable, GridMenuProblema, GridSelect, Option, PanelBotones, SelectAlgoritmo, TitleProblem } from "./menuProblemaCommons";
import TableProblema from "./TableProblema";

const MenuProblema = () => {
    const data = useData();
    const fuentesRef = useRef([]);
    const destinosRef = useRef([]);
    const demandasRef = useRef([]);
    const ofertasRef = useRef([]);
    const camposRef = useRef([]);
    const algoritmoRef = useRef("");
    const resolver = () => {
        switch (algoritmoRef.current.value) {
            case "costoMinimo":
                let matrizCostes=[];
                let tablaDemandas=[];
                let tablaOfertas=[];
                for (let i = 0; i < demandasRef.current.length; i++) {
                    tablaDemandas[i]=demandasRef.current[i].value;
                }
                for (let i = 0; i < ofertasRef.current.length; i++) {
                    tablaOfertas[i]=ofertasRef.current[i];  
                }
                for (let i = 0; i < camposRef.current.length; i++) {
                    matrizCostes[i]=camposRef.current[i].value;
                }
                break;
            case "esquinaNoroeste":

                break;
            case "vogel":

                break;
            default:

                break;
        }

    }
    return (
        <Fragment>
            <GridMenuProblema>
                <TitleProblem>{data.nombreProblema}</TitleProblem>
                <CardTable>
                    <TableProblema camposRef={camposRef} ofertasRef={ofertasRef} demandasRef={demandasRef} fuentesRef={fuentesRef} destinosRef={destinosRef} data={data} />
                </CardTable>
                <PanelBotones>
                    <GridSelect>
                        <label style={{ fontFamily: "Abel" }} >Seleccione el algoritmo</label>
                        <SelectAlgoritmo ref={algoritmoRef} id="selectAlgoritmo">
                            <Option value="costoMinimo" >Costo minimo</Option>
                            <Option value="esquinaNoroeste">Esquina noroeste</Option>
                            <Option value="vogel">Vogel</Option>
                        </SelectAlgoritmo>
                    </GridSelect>
                    <PanelBotones>
                        <BotonOpcion onClick={resolver} whileHover={{ scale: 1.09 }}>Resolver</BotonOpcion>
                    </PanelBotones>
                </PanelBotones>
            </GridMenuProblema>
        </Fragment>
    );
}

export default MenuProblema;