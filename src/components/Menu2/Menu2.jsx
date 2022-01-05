import React, { useState } from "react";
import { ButtonAccept, ButtonBack, CardInputs, DivInput, ErrorText, GridMenu2, HelpCard, HelpContent, IconHelp, LabelCard, LinkOption, NumberInput, TextCard, TextInput, TitleCard } from "./Menu2Commons";
import { BiHelpCircle } from "react-icons/bi";
import { Formik } from "formik";
import { useNavigate } from "react-router";
import useData from "../hooks/useData";
const Menu2 = () => {
    const [input, setInput] = useState("nombre");
    const navigate=useNavigate();
    const data=useData();
    return (
        <GridMenu2>
            <CardInputs>
                <Formik
                    initialValues={{
                        nombreProblema:'',
                        numeroDestinos:'',
                        numeroFuentes:''
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
                        if(!valores.numeroFuentes){
                            errores.numeroFuentes='Este campo no puede quedar vacio';
                        }else if(!expresionNumeros.test(valores.numeroFuentes)){
                            errores.numeroFuentes='Solo se permiten enteros de 1 a 10';
                        }
                        if (!valores.numeroDestinos) {
                            errores.numeroDestinos = 'Este campo no puede quedar vacio';
                        } else if (!expresionNumeros.test(valores.numeroDestinos)) {
                            errores.numeroDestinos = 'Solo se permiten enteros de 1 a 10';
                        }
                        return errores;
                    }}
                    onSubmit={values => {
                        data.nombreProblema=values.nombreProblema;
                        data.destinos=parseInt(values.numeroDestinos);
                        data.fuentes=parseInt(values.numeroFuentes);
                        navigate('/menuProblema');
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
                                {props.touched.nombreProblema && props.errors.nombreProblema && <ErrorText>{props.errors.nombreProblema}</ErrorText>}
                            </DivInput>
                            <DivInput>
                                <LabelCard htmlFor="numeroFuentes">Número de fuentes</LabelCard>
                                <NumberInput
                                    id="numeroFuentes"
                                    name="numeroFuentes"
                                    onClick={() => { setInput("fuentes") }}
                                    placeholder="Número de fuentes"
                                    values={props.values.numeroFuentes}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    type="text" />
                                {props.touched.numeroFuentes && props.errors.numeroFuentes && <ErrorText>{props.errors.numeroFuentes}</ErrorText>}
                            </DivInput>
                            <DivInput>
                                <LabelCard htmlFor="numeroDestinos" >Número del destinos</LabelCard>
                                <NumberInput
                                    id="numeroDestinos"
                                    name="numeroDestinos"
                                    onClick={() => { setInput("destinos") }}
                                    placeholder="Número del destinos"
                                    values={props.values.numeroDestinos}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    type="text"
                                />
                                {props.touched.numeroDestinos && props.errors.numeroDestinos && <ErrorText>{props.errors.numeroDestinos}</ErrorText>}
                            </DivInput>
                            <ButtonAccept type="submit" whileHover={{ scale: 1.09 }}>Aceptar</ButtonAccept>
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