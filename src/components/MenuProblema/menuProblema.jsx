import React, { Fragment } from "react";
import useData from "../hooks/useData";
import { BotonOpcion, CardTable, GridMenuProblema,GridSelect,Option,PanelBotones,SelectAlgoritmo,TitleProblem } from "./menuProblemaCommons";
import TableProblema from "./TableProblema";

const MenuProblema = () => {
    const data = useData();
    return(
        <Fragment>
            <GridMenuProblema>
                <TitleProblem>{data.nombreProblema}</TitleProblem>
                <CardTable>
                    <TableProblema data={data} />
                </CardTable>
                <PanelBotones>
                    <GridSelect>
                        <label>Seleccione el algoritmo</label>
                        <SelectAlgoritmo id="selectAlgoritmo">
                            <Option value="rutaMasCorta" >Ruta mas corta</Option>
                            <Option value="esquinaNoroeste">Esquina noroeste</Option>
                            <Option value="vogel">Vogel</Option>
                        </SelectAlgoritmo>
                    </GridSelect> 
                    <PanelBotones>
                        <BotonOpcion>Resolver</BotonOpcion>
                    </PanelBotones>
                </PanelBotones>
            </GridMenuProblema>     
        </Fragment>
    );
}
 
export default MenuProblema;