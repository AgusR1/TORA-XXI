import React from "react";
import { ButtonAccept, ButtonBack, CardInputs, DivInput, GridMenu2, HelpCard, HelpContent, IconHelp, LabelCard, NumberInput, TextInput, TitleCard } from "./Menu2Commons";
import {BiHelpCircle} from "react-icons/bi";
const Menu2 = () => {
    return ( 
        <GridMenu2>
            <CardInputs>
                <DivInput>
                    <LabelCard>Nombre del problema</LabelCard>
                    <TextInput placeholder="Nombre del problema" type="text"/>
                </DivInput>
                <DivInput>
                    <LabelCard>Número de fuentes</LabelCard>
                    <NumberInput placeholder="Número de fuentes" type="number" />
                </DivInput>
                <DivInput>
                    <LabelCard>Número del destinos</LabelCard>
                    <NumberInput placeholder="Número del destinos" type="number"/>
                </DivInput>
                <ButtonAccept>Aceptar</ButtonAccept>
                <ButtonBack>Volver</ButtonBack>
            </CardInputs>
            <HelpCard>
                <IconHelp><BiHelpCircle/></IconHelp>
                <HelpContent>
                    <TitleCard>Nombre del problema</TitleCard>
                </HelpContent>
            </HelpCard>
        </GridMenu2>
    );
}
 
export default Menu2;