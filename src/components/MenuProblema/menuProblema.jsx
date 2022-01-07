import React, { Fragment } from "react";
import useData from "../hooks/useData";
import { CardTable, GridMenuProblema,TitleProblem } from "./menuProblemaCommons";
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
            </GridMenuProblema>     
        </Fragment>
    );
}
 
export default MenuProblema;