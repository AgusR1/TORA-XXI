import React, { Fragment,useEffect,useRef } from "react";
import useData from "../hooks/useData";
import { BotonOpcion, CardTable, GridMenuProblema,GridSelect,Option,PanelBotones,SelectAlgoritmo,TitleProblem } from "./menuProblemaCommons";
import TableProblema from "./TableProblema";

const MenuProblema = () => {
    const data = useData();
    const fuentesRef = useRef([]);
    const destinosRef = useRef([]);
    const demandasRef = useRef([]);
    const ofertasRef = useRef([]);
    const camposRef = useRef([]);
    const algoritmoRef=useRef("");
    const resolver=()=>{
        console.log(fuentesRef.current[0]);
    }
    return(
        <Fragment>
            <GridMenuProblema>
                <TitleProblem>{data.nombreProblema}</TitleProblem>
                <CardTable>
                    <TableProblema camposRef={camposRef} ofertasRef={ofertasRef} demandasRef={demandasRef} fuentesRef={fuentesRef} destinosRef={destinosRef} data={data} />
                </CardTable>
                <PanelBotones>
                    <GridSelect>
                        <label style={{fontFamily:"Abel"}} >Seleccione el algoritmo</label>
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