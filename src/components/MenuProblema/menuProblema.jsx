import React, { Fragment } from "react";
import useData from "../hooks/useData";
import { GridMenuProblema, TitleProblem } from "./menuProblemaCommons";

const MenuProblema = () => {
    const data = useData();
    return(
        <Fragment>
            <GridMenuProblema>
                <TitleProblem>{data.nombreProblema}</TitleProblem>
            </GridMenuProblema>       
        </Fragment>
    );
}
 
export default MenuProblema;