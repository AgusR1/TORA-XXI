import React, { useState } from "react";
import { ButtonAccept, ButtonBack, CardInputs, DivInput, GridMenu2, HelpCard, HelpContent, IconHelp, LabelCard, LinkOption, NumberInput, TextCard, TextInput, TitleCard } from "./Menu2Commons";
import {BiHelpCircle} from "react-icons/bi";
const Menu2 = () => {
    const [input,setInput]=useState("nombre");
    return ( 
        <GridMenu2>
            <CardInputs>
                <DivInput>
                    <LabelCard>Nombre del problema</LabelCard>
                    <TextInput onClick={()=>{setInput("nombre")}} placeholder="Nombre del problema" type="text"/>
                </DivInput>
                <DivInput>
                    <LabelCard>Número de fuentes</LabelCard>
                    <NumberInput onClick={() => { setInput("fuentes") }} placeholder="Número de fuentes" type="text" />
                </DivInput>
                <DivInput>
                    <LabelCard>Número del destinos</LabelCard>
                    <NumberInput onkeyup="if(this.value<0){this.value= this.value * -1}" min="0" step="1" onClick={() => { setInput("destinos") }} placeholder="Número del destinos" type="text"/>
                </DivInput>
                <LinkOption to="/menuProblema"><ButtonAccept whileHover={{ scale: 1.09 }}>Aceptar</ButtonAccept></LinkOption>
                <LinkOption to="/"><ButtonBack whileHover={{ scale: 1.09 }}>Volver</ButtonBack></LinkOption>
            </CardInputs>
            {
                input==="nombre" &&
                <HelpCard initial={{x:1000}} animate={{x:0}}>
                    <IconHelp><BiHelpCircle /></IconHelp>
                    <HelpContent>
                        <TitleCard>Nombre del problema</TitleCard>
                        <TextCard>Este es el nombre con el cual identificaras este fichero.</TextCard>
                    </HelpContent>
                </HelpCard>
            }
            {
                input === "fuentes" &&
                <HelpCard initial={{ x: 1000 }} animate={{ x: 0 }}>
                    <IconHelp><BiHelpCircle /></IconHelp>
                    <HelpContent>
                        <TitleCard>Fuentes</TitleCard>
                        <TextCard>Punto de partida de los recursos.</TextCard>
                    </HelpContent>
                </HelpCard>
            }
            {
                input === "destinos" &&
                <HelpCard initial={{ x: 1000 }} animate={{ x: 0 }}>
                    <IconHelp><BiHelpCircle /></IconHelp>
                    <HelpContent>
                        <TitleCard>Destinos</TitleCard>
                        <TextCard>Estos son los puntos a los que los recursos deeben llegar desde las fuentes.</TextCard>
                    </HelpContent>
                </HelpCard>
            }
        </GridMenu2>
    );
}
 
export default Menu2;