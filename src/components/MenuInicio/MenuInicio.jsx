import React from "react";
import { CardIcon, CardTransporte, Grid, GridCards, GridText, GridTittle, LinkCard, SubTittle, TextCard, Tittle } from "./MenuInicioCommons";
import {BsTruck} from "react-icons/bs";
const MenuInicio = () => {
    return ( 
        <Grid>
            <GridTittle>
                <Tittle>Tora 21</Tittle>
                <SubTittle>Como Tora, pero de este siglo.</SubTittle>
            </GridTittle>
            <GridCards>
                <LinkCard to="/menu2">
                    <CardTransporte>
                        <CardIcon><BsTruck /></CardIcon>
                        <TextCard>
                            Problemas de transporte
                        </TextCard>
                    </CardTransporte>
                </LinkCard>
            </GridCards>
            <GridText>
                <SubTittle>Por Agustin Rosales</SubTittle>
                <SubTittle>Facultad Regional Trenque Lauquen</SubTittle>
            </GridText>
        </Grid>
    );
}
 
export default MenuInicio;