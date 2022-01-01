import React, { useState } from "react";
import { ButtonAccept, ButtonBack, CardInputs, DivInput, ErrorText, GridMenu2, HelpCard, HelpContent, IconHelp, LabelCard, LinkOption, NumberInput, TextCard, TextInput, TitleCard } from "./Menu2Commons";
import { BiHelpCircle } from "react-icons/bi";
import { Formik } from "formik";
const Menu2 = () => {
    const [input, setInput] = useState("nombre");
    const [validStatus, setValidStatus]=useState(true);
    return (
        <GridMenu2>
            <CardInputs>
                <Formik
                    initialValues={{
                        nombreProblema:'',
                        n:'',
                        m:''
                    }}
                    validate={(valores)=>{
                        let errores={};
                        const expresionNombre = /^[a-zA-Z0-9_]{1,30}$/;
                        const expresionNumeros = /\b([1-9]|10)\b/;
                        if (!valores.nombreProblema) {
                            errores.nombreProblema = 'Este campo debe estar completo';
                        }else if (!expresionNombre.test(valores.nombreProblema)){
                            errores.nombreProblema ='Solo se permiten letras, numeros y el caracter "_"';
                            if(valores.nombreProblema.length>30){
                                errores.nombreProblema='La longitud debe ser menor a 30';
                            }
                        }
                        if(!valores.n){
                            errores.n='Este campo no puede quedar vacio';
                        }else if(!expresionNumeros.test(valores.n)){
                            errores.n='Solo se permiten enteros de 1 a 10';
                        }
                        if (!valores.m) {
                            errores.m = 'Este campo no puede quedar vacio';
                        } else if (!expresionNumeros.test(valores.m)) {
                            errores.m = 'Solo se permiten enteros de 1 a 10';
                        }
                        return errores;
                    }}
                >
                    {(props)=>(
                        <form onSubmit={props.handleSubmit}>
                            <DivInput>
                                <LabelCard htmlFor="nombreProblema">Nombre del problema</LabelCard>
                                <TextInput
                                    id="nombreProblema"
                                    name="nombreProblema"
                                    onClick={() => { setInput("nombre") }}
                                    placeholder="Nombre del problema"
                                    values={props.values.nombreProblema}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    type="text" />
                                {props.errors.nombreProblema && <ErrorText>{props.errors.nombreProblema}</ErrorText>}
                            </DivInput>
                            <DivInput>
                                <LabelCard htmlFor="numeroFuentes">Número de fuentes</LabelCard>
                                <NumberInput
                                    id="numeroFuentes"
                                    name="numeroFuentes"
                                    onClick={() => { setInput("fuentes") }}
                                    placeholder="Número de fuentes"
                                    values={props.values.n}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    type="text" />
                                {props.errors.n && <ErrorText>{props.errors.n}</ErrorText>}
                            </DivInput>
                            <DivInput>
                                <LabelCard htmlFor="numeroDestinos" >Número del destinos</LabelCard>
                                <NumberInput
                                    id="numeroDestinos"
                                    name="numeroDestinos"
                                    onClick={() => { setInput("destinos") }}
                                    placeholder="Número del destinos"
                                    values={props.values.m}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    type="text"
                                />
                                {props.errors.m && <ErrorText>{props.errors.m}</ErrorText>}
                            </DivInput>
                            <LinkOption disabled={validStatus} to="/menuProblema"><ButtonAccept  type="button" whileHover={{ scale: 1.09 }}>Aceptar</ButtonAccept></LinkOption>
                            <LinkOption to="/"><ButtonBack whileHover={{ scale: 1.09 }}>Volver</ButtonBack></LinkOption>
                        </form>
                    )}  
                </Formik>
            </CardInputs>
            {
                input === "nombre" &&
                <HelpCard initial={{ x: 1000 }} animate={{ x: 0 }}>
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