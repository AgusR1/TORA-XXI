import React, { useEffect, Fragment, useState, useRef } from "react";
import useData from "../hooks/useData";
import { BotonOpcion, BotonVolver, CardTable, GridSolucion, GridMenuProblema, GridSelect, GridDetalle, Option, PanelBotones, SelectAlgoritmo, TitleProblem, CuadroSolucion, TextSolucion, CuadroCosto, DivDetalle, CuadroNum } from "./menuProblemaCommons";
import TableProblema from "./TableProblema";
import { v4 as uuidv4 } from 'uuid';

const MenuProblema = () => {
    const data = useData();
    const fuentesRef = useRef([]);
    const destinosRef = useRef([]);
    const demandasRef = useRef([]);
    const ofertasRef = useRef([]);
    const camposRef = useRef([]);
    const algoritmoRef = useRef("");
    const [minCostos, setMinCostos] = useState([]);
    const [listaFuentes, setListaFuentes] = useState([]);
    const [listaOfertas, setListaOfertas] = useState([]);
    const [listaDemandas, setListaDemandas] = useState([]);
    const [listaClientes, setListaClientes] = useState([]);
    const [costoTotal, setCostoTotal] = useState(0);
    const [pantalla, setPantalla] = useState("tabla");
    const resolver = () => {
        switch (algoritmoRef.current.value) {
            case "Costo minimo":
                let sumaDemanda = 0;
                let sumaOferta = 0;
                let matrizCostes = [];
                let tablaDemandas = [];
                let tablaOfertas = [];
                let costoTotal = 0;
                let diferencia = 0;
                for (let i = 0; i < demandasRef.current.length; i++) {
                    //paso los valores del input a un array donde manipularlos
                    tablaDemandas[i] = parseFloat(demandasRef.current[i].value, 2);
                    //seteo un valor que almacena la demanda total
                    sumaDemanda = sumaDemanda + parseFloat(demandasRef.current[i].value, 2);
                }
                for (let i = 0; i < ofertasRef.current.length; i++) {
                    //paso los valores del input a un array donde manipularlos
                    tablaOfertas[i] = parseFloat(ofertasRef.current[i].value, 2);
                    //seteo un valor donde almaceno la oferta total
                    sumaOferta = sumaOferta + parseFloat(ofertasRef.current[i].value, 2);
                }
                for (let i = 0; i < camposRef.current.length; i++) {
                    //paso los valores del input a un array donde manipularlos
                    matrizCostes[i] = parseFloat(camposRef.current[i].value, 2);
                }
                //balanceo
                if (sumaOferta > sumaDemanda) {
                    diferencia = sumaOferta - sumaDemanda;//calculamos la diferencia entre oferta y demanda
                    sumaDemanda = sumaDemanda + diferencia;
                    tablaDemandas.push(diferencia);//añadimos la diferencia como la demanda del nuevo destino ficticio
                    let indices = [];
                    let count = 0;
                    for (let i = 0; i < matrizCostes.length; i++) {
                        if ((i + 1) % (tablaDemandas.length - 1) === 0) {
                            indices.push(i + count);
                            count++;
                        }
                    }
                    for (let i = 0; i < indices.length; i++) {
                        matrizCostes.splice((indices[i] + 1), 0, 0);
                    }
                }
                //el bucle se ejecutara hasta el punto en el que la demanda queda satisfecha
                do {
                    let minCosto;
                    let pos;
                    let auxPos;
                    let demanda;
                    let oferta;
                    let posOferta;
                    //encuentro el minimo costo
                    minCosto = Math.min(...matrizCostes);
                    //puedo determinar a que cliente y de que fuente corresponden
                    //determino que posicion tiene el minimo costo dentro de el array de costos
                    pos = matrizCostes.indexOf(minCosto);
                    //calculo el modulo en base a la longitud del array de demandas que es igual a la cantidad de clientes o destinos que existen 
                    auxPos = parseInt(pos + 1) % tablaDemandas.length//el +1 es para evitar realizar una operacion de modulo con un valor de 0 en caso de que el minCosto se encuentre en la primera posicion del array
                    //si devuelve 1 significa que pertenece al primer destino, si devuelve 2 significa que pertenece al segundo destino si devuelve n pertenece al destino n, si devuelve 0 significa que pertenece al ultimo destino
                    switch (auxPos) {
                        case 0:
                            demanda = tablaDemandas[tablaDemandas.length - 1];
                            posOferta = Math.ceil((pos + 1) / tablaDemandas.length);//para determinar que oferta disponible tiene este cliente con este costo asociado necesito realizar la siguiente operacion matematica que me devuelva el numero de fila al que corresponde ej pos=1 y length=3 => 1/3 redondeado hacia arriba me devuelve 1 o pos=4 7 length=3 => 4/3 round up es 2
                            oferta = tablaOfertas[posOferta - 1];
                            //ya tenemos el costo minimo, la oferta y la demanda correspondiente para dicho costo, ahora se asignan los recursos
                            if (oferta > 0 && demanda > 0) {
                                if (oferta > demanda) {
                                    //utilizamos la longitud del array de demandas como posicion porque sabemos que si el case es 0 entonces es el ultimo elemento del array de demanda
                                    tablaDemandas[tablaDemandas.length - 1] = 0;//si la oferta supera a la demanda entonces la demanda de ese cliente queda satisfecha y se setea en 0
                                    tablaOfertas[posOferta - 1] = oferta - demanda;//restamos aquello que fue utilizado para suplir la demanda anterior al inventario del deposito
                                    costoTotal = costoTotal + demanda * matrizCostes[pos];//calculamos el costo total, sabemos que se cubrio toda la demanda restante por lo que el calculo es demanda*costo 
                                    sumaDemanda = sumaDemanda - demanda;//restamos la demanda que ya se suplio
                                    sumaOferta = sumaOferta - demanda;//restamos la oferta que tenemos disponible
                                    matrizCostes[pos] = Math.max(...matrizCostes) + 1;//hacemos que el actual costo minimo tome un valor mayor al maximo coste, de este modo nos aseguramos que la funcion min no vuelva a usarlo
                                    setMinCostos(cost => [...cost, minCosto]);
                                    setListaOfertas(listaO => [...listaO, demanda]);
                                    setListaFuentes(listaF => [...listaF, fuentesRef.current[posOferta - 1].value]);
                                    setListaDemandas(listaD => [...listaD, demanda]);
                                    setListaClientes(listaC => [...listaC, destinosRef.current[tablaDemandas.length - 1].value]);
                                } else {
                                    tablaDemandas[tablaDemandas.length - 1] = demanda - oferta;//si la demanda es igual o superior a la oferta restar la oferta nos dejara con la demanda restante por satisfacer o con la demanda en 0
                                    tablaOfertas[posOferta - 1] = 0;//seteamos en 0 el valor de la oferta porque todo lo que estaba disponible fue entregado
                                    costoTotal = costoTotal + oferta * matrizCostes[pos];//el costo total se calcula en base a cuanto se entrego en lugar de cuanto se demando
                                    sumaDemanda = sumaDemanda - oferta;//se calcula la demanda total restante en base a lo que la oferta entrego
                                    sumaOferta = sumaOferta - oferta;
                                    matrizCostes[pos] = Math.max(...matrizCostes) + 1;//hacemos que el actual costo minimo tome un valor mayor al maximo coste, de este modo nos aseguramos que la funcion min no vuelva a usarlo
                                    setMinCostos(cost => [...cost, minCosto]);
                                    setListaOfertas(listaO => [...listaO, oferta]);
                                    setListaFuentes(listaF => [...listaF, fuentesRef.current[posOferta - 1].value]);
                                    setListaDemandas(listaD => [...listaD, demanda]);
                                    setListaClientes(listaC => [...listaC, destinosRef.current[tablaDemandas.length - 1].value]);
                                }
                            } else {
                                matrizCostes[pos] = Math.max(...matrizCostes) + 1;//aquellos campos que se encuentren en una fila o columna donde la demanda fue satisfecha o la oferta es 0 se les asigna un valor por sobre el maximo, de este modo garantizamos que la funcion Math.min() no vuelva a buscarlo
                            }
                            break;
                        default:
                            demanda = tablaDemandas[auxPos - 1]//auxPos siempre vale +1 la posicion correspondiente en el array de demanda
                            posOferta = Math.ceil((pos + 1) / tablaDemandas.length);//para determinar que oferta disponible tiene este cliente con este costo asociado necesito realizar la siguiente operacion matematica que me devuelva el numero de fila al que corresponde ej pos=1 y length=3 => 1/3 redondeado hacia arriba me devuelve 1 o pos=4 7 length=3 => 4/3 round up es 2
                            oferta = tablaOfertas[posOferta - 1];
                            //ya tenemos el costo minimo, la oferta y la demanda correspondiente para dicho costo, ahora se asignan los recursos
                            if (oferta > 0 && demanda > 0) {
                                if (oferta > demanda) {
                                    tablaDemandas[auxPos - 1] = 0;//si la oferta supera a la demanda entonces la demanda de ese cliente queda satisfecha y se setea en 0
                                    tablaOfertas[posOferta - 1] = oferta - demanda;//restamos aquello que fue utilizado para suplir la demanda anterior al inventario del deposito
                                    costoTotal = costoTotal + demanda * matrizCostes[pos];//calculamos el costo total, sabemos que se cubrio toda la demanda restante por lo que el calculo es demanda*costo 
                                    sumaDemanda = sumaDemanda - demanda;//restamos la demanda que ya se suplio
                                    sumaOferta = sumaOferta - demanda;//restamos la oferta que tenemos disponible
                                    matrizCostes[pos] = Math.max(...matrizCostes) + 1;//hacemos que el actual costo minimo tome un valor mayor al maximo coste, de este modo nos aseguramos que la funcion min no vuelva a usarlo
                                    setMinCostos(cost => [...cost, minCosto]);
                                    setListaOfertas(listaO => [...listaO, demanda]);
                                    setListaFuentes(listaF => [...listaF, fuentesRef.current[posOferta - 1].value]);
                                    setListaDemandas(listaD => [...listaD, demanda]);
                                    setListaClientes(listaC => [...listaC, destinosRef.current[auxPos - 1].value]);
                                } else {
                                    tablaDemandas[auxPos - 1] = demanda - oferta; //si la demanda es igual o superior a la oferta restar la oferta nos dejara con la demanda restante por satisfacer o con la demanda en 0
                                    tablaOfertas[posOferta - 1] = 0;//seteamos en 0 el valor de la oferta porque todo lo que estaba disponible fue entregado
                                    costoTotal = costoTotal + oferta * matrizCostes[pos];//el costo total se calcula en base a cuanto se entrego en lugar de cuanto se demando
                                    sumaDemanda = sumaDemanda - oferta;//se calcula la demanda total restante en base a lo que la oferta entrego
                                    sumaOferta = sumaOferta - oferta;
                                    matrizCostes[pos] = Math.max(...matrizCostes) + 1;//hacemos que el actual costo minimo tome un valor mayor al maximo coste, de este modo nos aseguramos que la funcion min no vuelva a usarlo
                                    setMinCostos(cost => [...cost, minCosto]);
                                    setListaOfertas(listaO => [...listaO, oferta]);
                                    setListaFuentes(listaF => [...listaF, fuentesRef.current[posOferta - 1].value]);
                                    setListaDemandas(listaD => [...listaD, demanda]);
                                    setListaClientes(listaC => [...listaC, destinosRef.current[auxPos - 1].value]);
                                }
                            } else {
                                matrizCostes[pos] = Math.max(...matrizCostes) + 1;////aquellos campos que se encuentren en una fila o columna donde la demanda fue satisfecha o la oferta es 0 se les asigna un valor por sobre el maximo, de este modo garantizamos que la funcion Math.min() no vuelva a buscarlo
                            }
                            break;
                    }
                } while (sumaDemanda > 0);
                setCostoTotal(costoTotal);
                setPantalla("solucion");
                break;
            case "Esquina noroeste":
                let ENsumaDemanda = 0;
                let ENsumaOferta = 0;
                let ENmatrizCostes = [];
                let ENtablaDemandas = [];
                let ENtablaOfertas = [];
                let ENdiferencia = 0;
                let ENcostoTotal = 0;
                for (let i = 0; i < demandasRef.current.length; i++) {
                    //paso los valores del input a un array donde manipularlos
                    ENtablaDemandas[i] = parseFloat(demandasRef.current[i].value, 2);
                    //seteo un valor que almacena la demanda total
                    ENsumaDemanda = ENsumaDemanda + parseFloat(demandasRef.current[i].value, 2);
                }
                for (let i = 0; i < ofertasRef.current.length; i++) {
                    //paso los valores del input a un array donde manipularlos
                    ENtablaOfertas[i] = parseFloat(ofertasRef.current[i].value, 2);
                    //seteo un valor donde almaceno la oferta total
                    ENsumaOferta = ENsumaOferta + parseFloat(ofertasRef.current[i].value, 2);
                }
                for (let i = 0; i < camposRef.current.length; i++) {
                    //paso los valores del input a un array donde manipularlos
                    ENmatrizCostes[i] = parseFloat(camposRef.current[i].value, 2);
                }
                //balanceo
                if (ENsumaOferta > ENsumaDemanda) {
                    ENdiferencia = ENsumaOferta - ENsumaDemanda;//calculamos la diferencia entre oferta y demanda
                    ENsumaDemanda = ENsumaDemanda + ENdiferencia;
                    ENtablaDemandas.push(ENdiferencia);//añadimos la diferencia como la demanda del nuevo destino ficticio
                    let indices = [];
                    let count = 0;
                    for (let i = 0; i < ENmatrizCostes.length; i++) {
                        if ((i + 1) % (ENtablaDemandas.length - 1) === 0) {
                            indices.push(i + count);
                            count++;
                        }
                    }
                    for (let i = 0; i < indices.length; i++) {
                        ENmatrizCostes.splice((indices[i] + 1), 0, 0);
                    }
                }
                do {
                    //necesito encontrar la esquina noroeste
                    for (let i = 0; i < ENmatrizCostes.length; i++) {
                        let posDestino;
                        let posDeposito;
                        let oferta;
                        let demanda;
                        posDestino = parseInt(i + 1) % ENtablaDemandas.length;
                        switch (posDestino) {
                            case 0:
                                demanda = ENtablaDemandas[ENtablaDemandas.length - 1];
                                posDeposito = Math.ceil((i + 1) / ENtablaDemandas.length);//para determinar que oferta disponible tiene este cliente con este costo asociado necesito realizar la siguiente operacion matematica que me devuelva el numero de fila al que corresponde ej pos=1 y length=3 => 1/3 redondeado hacia arriba me devuelve 1 o pos=4 7 length=3 => 4/3 round up es 2
                                oferta = ENtablaOfertas[posDeposito - 1];
                                //ya tenemos el costo minimo, la oferta y la demanda correspondiente para dicho costo, ahora se asignan los recursos
                                if (demanda === 0 || oferta === 0) {
                                    break;
                                } else {
                                    if (oferta > demanda) {
                                        //utilizamos la longitud del array de demandas como posicion porque sabemos que si el case es 0 entonces es el ultimo elemento del array de demanda
                                        ENtablaDemandas[ENtablaDemandas.length - 1] = 0;//si la oferta supera a la demanda entonces la demanda de ese cliente queda satisfecha y se setea en 0
                                        ENtablaOfertas[posDeposito - 1] = oferta - demanda;//restamos aquello que fue utilizado para suplir la demanda anterior al inventario del deposito
                                        ENcostoTotal = ENcostoTotal + demanda * ENmatrizCostes[i];//calculamos el costo total, sabemos que se cubrio toda la demanda restante por lo que el calculo es demanda*costo
                                        ENsumaDemanda = ENsumaDemanda - demanda;//restamos la demanda que ya se suplio
                                        ENsumaOferta = ENsumaOferta - demanda;//restamos la oferta que tenemos disponible
                                        setMinCostos(cost => [...cost, ENmatrizCostes[i]]);
                                        setListaOfertas(listaO => [...listaO, demanda]);
                                        setListaFuentes(listaF => [...listaF, fuentesRef.current[posDeposito - 1].value]);
                                        setListaDemandas(listaD => [...listaD, demanda]);
                                        setListaClientes(listaC => [...listaC, destinosRef.current[ENtablaDemandas.length - 1].value]);
                                    } else {
                                        ENtablaDemandas[ENtablaDemandas.length - 1] = demanda - oferta;//si la demanda es igual o superior a la oferta restar la oferta nos dejara con la demanda restante por satisfacer o con la demanda en 0
                                        ENtablaOfertas[posDeposito - 1] = 0;//seteamos en 0 el valor de la oferta porque todo lo que estaba disponible fue entregado
                                        ENcostoTotal = ENcostoTotal + oferta * ENmatrizCostes[i];//el costo total se calcula en base a cuanto se entrego en lugar de cuanto se demando
                                        ENsumaDemanda = ENsumaDemanda - oferta;//se calcula la demanda total restante en base a lo que la oferta entrego
                                        ENsumaOferta = ENsumaOferta - oferta;
                                        setMinCostos(cost => [...cost, ENmatrizCostes[i]]);
                                        setListaOfertas(listaO => [...listaO, oferta]);
                                        setListaFuentes(listaF => [...listaF, fuentesRef.current[posDeposito - 1].value]);
                                        setListaDemandas(listaD => [...listaD, demanda]);
                                        setListaClientes(listaC => [...listaC, destinosRef.current[ENtablaDemandas.length - 1].value]);
                                    }
                                }
                                break;
                            default:
                                demanda = ENtablaDemandas[posDestino - 1];
                                posDeposito = Math.ceil((i + 1) / ENtablaDemandas.length);//para determinar que oferta disponible tiene este cliente con este costo asociado necesito realizar la siguiente operacion matematica que me devuelva el numero de fila al que corresponde ej pos=1 y length=3 => 1/3 redondeado hacia arriba me devuelve 1 o pos=4 7 length=3 => 4/3 round up es 2
                                oferta = ENtablaOfertas[posDeposito - 1];
                                //ya tenemos el costo minimo, la oferta y la demanda correspondiente para dicho costo, ahora se asignan los recursos
                                if (demanda === 0 || oferta === 0) {
                                    break;
                                } else {
                                    if (oferta > demanda) {
                                        //utilizamos la longitud del array de demandas como posicion porque sabemos que si el case es 0 entonces es el ultimo elemento del array de demanda
                                        ENtablaDemandas[posDestino - 1] = 0;//si la oferta supera a la demanda entonces la demanda de ese cliente queda satisfecha y se setea en 0
                                        ENtablaOfertas[posDeposito - 1] = oferta - demanda;//restamos aquello que fue utilizado para suplir la demanda anterior al inventario del deposito
                                        ENcostoTotal = ENcostoTotal + demanda * ENmatrizCostes[i];//calculamos el costo total, sabemos que se cubrio toda la demanda restante por lo que el calculo es demanda*costo
                                        ENsumaDemanda = ENsumaDemanda - demanda;//restamos la demanda que ya se suplio
                                        ENsumaOferta = ENsumaOferta - demanda;//restamos la oferta que tenemos disponible
                                        setMinCostos(cost => [...cost, ENmatrizCostes[i]]);
                                        setListaOfertas(listaO => [...listaO, demanda]);
                                        setListaFuentes(listaF => [...listaF, fuentesRef.current[posDeposito - 1].value]);
                                        setListaDemandas(listaD => [...listaD, demanda]);
                                        setListaClientes(listaC => [...listaC, destinosRef.current[posDestino - 1].value]);
                                    } else {
                                        ENtablaDemandas[posDestino - 1] = demanda - oferta;//si la demanda es igual o superior a la oferta restar la oferta nos dejara con la demanda restante por satisfacer o con la demanda en 0
                                        ENtablaOfertas[posDeposito - 1] = 0;//seteamos en 0 el valor de la oferta porque todo lo que estaba disponible fue entregado
                                        ENcostoTotal = ENcostoTotal + oferta * ENmatrizCostes[i];//el costo total se calcula en base a cuanto se entrego en lugar de cuanto se demando
                                        ENsumaDemanda = ENsumaDemanda - oferta;//se calcula la demanda total restante en base a lo que la oferta entrego
                                        ENsumaOferta = ENsumaOferta - oferta;
                                        setMinCostos(cost => [...cost, ENmatrizCostes[i]]);
                                        setListaOfertas(listaO => [...listaO, oferta]);
                                        setListaFuentes(listaF => [...listaF, fuentesRef.current[posDeposito - 1].value]);
                                        setListaDemandas(listaD => [...listaD, demanda]);
                                        setListaClientes(listaC => [...listaC, destinosRef.current[posDestino - 1].value]);
                                    }
                                }
                                break;
                        }
                    }
                } while (ENsumaDemanda > 0);
                setCostoTotal(ENcostoTotal);
                setPantalla("solucion");
                break;
            case "Vogel":
                let VsumaDemanda = 0;
                let VsumaOferta = 0;
                let VmatrizCostes = [];
                let VtablaDemandas = [];
                let VtablaOfertas = [];
                let Vdiferencia = 0;
                let VcostoTotal = 0;
                let penalizacionDemandas = [];//en este array se guardaran las penalizaciones de las ofertas, donde el numero de indice que tengan indicara a que cliente pertenecen
                let penalizacionOfertas = [];//en este array se guardaran las penalizaciones de las demandas, donde el numero de indice que tengan indicara a que deposito pertenecen
                let maximosDemandas = [];//en este array se guardaran los valores que sean el segundo mas bajo encontrados, donde el numero de indice que ocupen indicara a que cliente corresponden
                let maximosOfertas = [];//en este array se guardaran los valores que sean el segundo mas bajo encontrados que se utilizaran para calcular las penalizaciones, donde el numero de indice que ocupen indicara a que deposito corresponden
                let minimosDemandas = [];//en este array se guardaran los valores minimos encontrados que se utilizaran para calcular las penalizaciones, donde el numero de indice que ocupen indicara a que cliente corresponden
                let minimosOfertas = [];//en este array se guardaran los valores minimos encontrados que se utilizaran para calcular las penalizaciones, donde el numero de indice que ocupen indicara a que deposito corresponden

                for (let i = 0; i < demandasRef.current.length; i++) {
                    //paso los valores del input a un array donde manipularlos
                    VtablaDemandas[i] = parseFloat(demandasRef.current[i].value, 2);
                    //seteo un valor que almacena la demanda total
                    VsumaDemanda = VsumaDemanda + parseFloat(demandasRef.current[i].value, 2);
                }
                for (let i = 0; i < ofertasRef.current.length; i++) {
                    //paso los valores del input a un array donde manipularlos
                    VtablaOfertas[i] = parseFloat(ofertasRef.current[i].value, 2);
                    //seteo un valor donde almaceno la oferta total
                    VsumaOferta = VsumaOferta + parseFloat(ofertasRef.current[i].value, 2);
                }
                for (let i = 0; i < camposRef.current.length; i++) {
                    //paso los valores del input a un array donde manipularlos
                    VmatrizCostes[i] = parseFloat(camposRef.current[i].value, 2);
                }
                //balanceo
                if (VsumaOferta > VsumaDemanda) {
                    Vdiferencia = VsumaOferta - VsumaDemanda;//calculamos la diferencia entre oferta y demanda
                    VsumaDemanda = VsumaDemanda + Vdiferencia;
                    VtablaDemandas.push(Vdiferencia);//añadimos la diferencia como la demanda del nuevo destino ficticio
                    let indices = [];
                    let count = 0;
                    for (let i = 0; i < VmatrizCostes.length; i++) {
                        if ((i + 1) % (VtablaDemandas.length - 1) === 0) {
                            indices.push(i + count);
                            count++;
                        }
                    }
                    for (let i = 0; i < indices.length; i++) {
                        VmatrizCostes.splice((indices[i] + 1), 0, 0);
                    }
                }
                for (let i = 0; i < VtablaDemandas.length; i++) {
                    maximosDemandas[i] = null;
                    minimosDemandas[i] = null;
                }
                for (let i = 0; i < VtablaOfertas.length; i++) {
                    maximosOfertas[i] = null;
                    minimosOfertas[i] = null;
                }   
                let i=0;
                do {
                    //debo determinar la penalizacion
                    for (let i = 0; i < VmatrizCostes.length; i++) {
                        let posDestino;
                        let posDeposito;
                        let oferta;
                        let demanda;
                        posDestino = parseInt(i + 1) % VtablaDemandas.length;
                        switch (posDestino) {
                            case 0:
                                demanda = VtablaDemandas[VtablaDemandas.length - 1];
                                posDeposito = Math.ceil((i + 1) / VtablaDemandas.length);//para determinar que oferta disponible tiene este cliente con este costo asociado necesito realizar la siguiente operacion matematica que me devuelva el numero de fila al que corresponde ej pos=1 y length=3 => 1/3 redondeado hacia arriba me devuelve 1 o pos=4 y length=3 => 4/3 round up es 2
                                oferta = VtablaOfertas[posDeposito - 1];
                                //ya tenemos el costo minimo, la oferta y la demanda correspondiente para dicho costo, ahora se asignan los recursos
                                //codigo que encuentra los dos costos menores y calcula las penalizaciones para cada oferta y demanda
                                if (demanda !== 0 && oferta!==0) {
                                    if (minimosDemandas[VtablaDemandas.length - 1] !== null) {
                                        if (VmatrizCostes[i] <= minimosDemandas[VtablaDemandas.length - 1]) {
                                            minimosDemandas[VtablaDemandas.length - 1] = VmatrizCostes[i];
                                        }else{
                                            if (maximosDemandas[VtablaDemandas.length - 1] !== null) {
                                                if (VmatrizCostes[i] <= maximosDemandas[VtablaDemandas.length - 1]) {
                                                    maximosDemandas[VtablaDemandas.length - 1] = VmatrizCostes[i];
                                                }
                                            } else {
                                                maximosDemandas[VtablaDemandas.length - 1] = VmatrizCostes[i];
                                            }
                                        }
                                    }else{
                                        minimosDemandas[VtablaDemandas.length - 1] = VmatrizCostes[i];
                                    }
                                    if (minimosOfertas[posDeposito - 1] !== null) {
                                        if (VmatrizCostes[i] <= minimosOfertas[posDeposito - 1]) {
                                            minimosOfertas[posDeposito - 1] = VmatrizCostes[i];
                                        } else {
                                            if (maximosOfertas[posDeposito - 1] !== null) {
                                                if (VmatrizCostes[i] <= maximosOfertas[posDeposito - 1]) {
                                                    maximosOfertas[posDeposito - 1] = VmatrizCostes[i];
                                                }
                                            } else {
                                                maximosOfertas[posDeposito - 1] = VmatrizCostes[i];
                                            }
                                        }
                                    } else {
                                        minimosOfertas[posDeposito - 1] = VmatrizCostes[i];
                                    }
                                }
                                break;
                            default:
                                demanda = VtablaDemandas[posDestino - 1];
                                posDeposito = Math.ceil((i + 1) / VtablaDemandas.length);//para determinar que oferta disponible tiene este cliente con este costo asociado necesito realizar la siguiente operacion matematica que me devuelva el numero de fila al que corresponde ej pos=1 y length=3 => 1/3 redondeado hacia arriba me devuelve 1 o pos=4 7 length=3 => 4/3 round up es 2
                                oferta = VtablaOfertas[posDeposito - 1];
                                //ya tenemos el costo minimo, la oferta y la demanda correspondiente para dicho costo, ahora se asignan los recursos

                                //codigo que encuentra los dos costos menores y calcula las penalizaciones para cada oferta y demanda
                                if (demanda !== 0 && oferta !== 0) {
                                    if (minimosDemandas[posDestino - 1] !== null) {
                                        if (VmatrizCostes[i] <= minimosDemandas[posDestino - 1]) {
                                            minimosDemandas[posDestino - 1] = VmatrizCostes[i];
                                        } else {
                                            if (maximosDemandas[posDestino - 1] !== null) {
                                                if (VmatrizCostes[i] <= maximosDemandas[posDestino - 1]) {
                                                    maximosDemandas[posDestino - 1] = VmatrizCostes[i];
                                                }
                                            } else {
                                                maximosDemandas[posDestino - 1] = VmatrizCostes[i];
                                            }
                                        }
                                    } else {
                                        minimosDemandas[posDestino - 1] = VmatrizCostes[i];
                                    }
                                    if (minimosOfertas[posDeposito - 1] !== null) {
                                        if (VmatrizCostes[i] <= minimosOfertas[posDeposito - 1]) {
                                            minimosOfertas[posDeposito - 1] = VmatrizCostes[i];
                                        } else {
                                            if (maximosOfertas[posDeposito - 1] !== null) {
                                                if (VmatrizCostes[i] <= maximosOfertas[posDeposito - 1]) {
                                                    maximosOfertas[posDeposito - 1] = VmatrizCostes[i];
                                                }
                                            } else {
                                               maximosOfertas[posDeposito - 1] = VmatrizCostes[i];
                                            }
                                        }
                                    } else {
                                        minimosOfertas[posDeposito - 1] = VmatrizCostes[i];
                                    }
                                }
                                break;
                        }
                    }
                    for (let i = 0; i < minimosDemandas.length; i++) {
                        penalizacionDemandas[i]=maximosDemandas[i]-minimosDemandas[i];
                    }
                    for (let i = 0; i < minimosOfertas.length; i++) {
                        penalizacionOfertas[i]=maximosOfertas[i]-minimosOfertas[i];
                    }
                    console.log("minimos demandas: "+minimosDemandas);
                    console.log("maximos demandas: "+maximosDemandas);
                    console.log("penalizaciones demandas: "+penalizacionDemandas);
                    console.log("**********************************************");
                    console.log("minimos ofertas: " + minimosOfertas);
                    console.log("maximos ofertas: "+maximosOfertas);
                    console.log("penalizaciones oferta: "+penalizacionOfertas);
                    //debo encontrar la mayor penalizacion y asignar los recursos
                    let maxPenDemanda;
                    let maxPenOferta;
                    let maxPen;
                    let indice;
                    let demanda;
                    let oferta;
                    let deposito;
                    let minCost=null;
                    let costIndex;
                    maxPenDemanda=Math.max(...penalizacionDemandas);//obtengo el maximo del array de penalizaciones de demandas
                    maxPenOferta=Math.max(...penalizacionOfertas);//obtengo el maximo del array de penalizaciones de ofertas
                    if(maxPenDemanda>maxPenOferta){//comparo cual de los dos es mayor, el que sea mayor sera el que se utilizara
                        maxPen=maxPenDemanda;//si la penalizacion de demanda es la mayor entonces la asigno como penalizacion mayor absoluta
                        indice = penalizacionDemandas.indexOf(maxPen);//obtengo el indice de dicha penalizacion maxima, este indice de penalizacion es igual al numero de indice que indica que numero de destino corresponde
                        demanda=VtablaDemandas[indice];//obtengo la demanda del destino con mayor penalizacion
                        for (let i = 0; i < VmatrizCostes.length; i++) {//recorro la matriz de costes
                            let posDestino;
                            posDestino = parseInt(i + 1) % VtablaDemandas.length;//variable que determina a que destino corresponde el actual valor del iterador
                            if(posDestino===0){
                                posDestino=VtablaDemandas.length;
                            }
                            if (posDestino===indice+1) {//compruebo si la posicion del destino corresponde con el numero de destino donde se encuentra la penalizacion mayor

                                //busco el menor costo dentro de los costos asignados a ese destino exlusivamente
                                if (minCost === null) {
                                    minCost = VmatrizCostes[i];//guardo el minimo costo
                                    costIndex = i;//guardo a que indice dentro de la matriz de costos corresponde el menor costo, para mas tarde determinar de que deposito es
                                } else {
                                    if (VmatrizCostes[i] <= minCost) {
                                        minCost = VmatrizCostes[i];//guardo el minimo costo
                                        costIndex = i;//guardo a que indice dentro de la matriz de costos corresponde el menor costo, para mas tarde determinar de que deposito es
                                    }
                                }
                            }
                        }
                        deposito = Math.ceil((costIndex + 1) / VmatrizCostes.length);
                        oferta=VtablaOfertas[deposito-1];
                        //realizo la asignacion de recursos una vez determinadas todas las variables
                        if (oferta>demanda) {
                            VtablaDemandas[indice]=0;
                            VtablaOfertas[deposito-1]=oferta-demanda;
                            VcostoTotal=VcostoTotal+demanda*VmatrizCostes[costIndex];
                            VsumaDemanda=VsumaDemanda-demanda;
                            VsumaOferta=VsumaOferta-demanda;
                            setMinCostos(cost => [...cost, VmatrizCostes[costIndex]]);
                            setListaOfertas(listaO => [...listaO, demanda]);
                            setListaFuentes(listaF => [...listaF, fuentesRef.current[deposito-1].value]);
                            setListaDemandas(listaD => [...listaD, demanda]);
                            setListaClientes(listaC => [...listaC, destinosRef.current[indice].value]);
                        }else{
                            VtablaOfertas[deposito-1]=0;
                            VtablaDemandas[indice]=demanda-oferta;
                            VcostoTotal=VcostoTotal+oferta*VmatrizCostes[costIndex];
                            VsumaDemanda=VsumaDemanda-oferta;
                            VsumaOferta=VsumaOferta-oferta;
                            setMinCostos(cost => [...cost, VmatrizCostes[costIndex]]);
                            setListaOfertas(listaO => [...listaO, oferta]);
                            setListaFuentes(listaF => [...listaF, fuentesRef.current[deposito - 1].value]);
                            setListaDemandas(listaD => [...listaD, demanda]);
                            setListaClientes(listaC => [...listaC, destinosRef.current[indice].value]);
                        }
                    }else{
                        maxPen=maxPenOferta;
                        indice = penalizacionOfertas.indexOf(maxPen);
                        oferta=VtablaOfertas[indice];
                        for (let i = 0; i < VmatrizCostes.length; i++) {
                            deposito = Math.ceil((i + 1) / VtablaDemandas.length);
                            if(deposito===indice+1){
                                if (minCost === null) {
                                    minCost = VmatrizCostes[i];//guardo el minimo costo
                                    costIndex = i;//guardo a que indice dentro de la matriz de costos corresponde el menor costo, para mas tarde determinar de que deposito es
                                } else {
                                    if (VmatrizCostes[i] <= minCost) {
                                        minCost = VmatrizCostes[i];//guardo el minimo costo
                                        costIndex = i;//guardo a que indice dentro de la matriz de costos corresponde el menor costo, para mas tarde determinar de que deposito es
                                    }
                                } 
                            }
                        }
                        deposito = parseInt(costIndex + 1) % VtablaDemandas.length;
                        demanda = VtablaDemandas[deposito - 1];
                        if (oferta > demanda) {
                            VtablaDemandas[indice] = 0;
                            VtablaOfertas[deposito - 1] = oferta - demanda;
                            VcostoTotal = VcostoTotal + demanda * VmatrizCostes[costIndex];
                            VsumaDemanda = VsumaDemanda - demanda;
                            VsumaOferta = VsumaOferta - demanda;
                            setMinCostos(cost => [...cost, VmatrizCostes[costIndex]]);
                            setListaOfertas(listaO => [...listaO, demanda]);
                            setListaFuentes(listaF => [...listaF, fuentesRef.current[deposito - 1].value]);
                            setListaDemandas(listaD => [...listaD, demanda]);
                            setListaClientes(listaC => [...listaC, destinosRef.current[indice].value]);
                        } else {
                            VtablaOfertas[deposito - 1] = 0;
                            VtablaDemandas[indice] = demanda - oferta;
                            VcostoTotal = VcostoTotal + oferta * VmatrizCostes[costIndex];
                            VsumaDemanda = VsumaDemanda - oferta;
                            VsumaOferta = VsumaOferta - oferta;
                            setMinCostos(cost => [...cost, VmatrizCostes[costIndex]]);
                            setListaOfertas(listaO => [...listaO, oferta]);
                            setListaFuentes(listaF => [...listaF, fuentesRef.current[deposito - 1].value]);
                            setListaDemandas(listaD => [...listaD, demanda]);
                            setListaClientes(listaC => [...listaC, destinosRef.current[indice].value]);
                        }
                    }
                    i++
                } while (i<1);
                setCostoTotal(VcostoTotal);
                setPantalla("solucion");
                break;
            default:
                break;
        }

    }
    return (
        <Fragment>
            {pantalla === "tabla" &&
                < GridMenuProblema >
                    <TitleProblem>{data.nombreProblema}</TitleProblem>
                    <CardTable>
                        <TableProblema camposRef={camposRef} ofertasRef={ofertasRef} demandasRef={demandasRef} fuentesRef={fuentesRef} destinosRef={destinosRef} data={data} />
                    </CardTable>
                    <PanelBotones>
                        <GridSelect>
                            <label style={{ fontFamily: "Abel" }} >Seleccione el algoritmo</label>
                            <SelectAlgoritmo ref={algoritmoRef} id="selectAlgoritmo">
                                <Option value="Costo minimo" >Costo minimo</Option>
                                <Option value="Esquina noroeste">Esquina noroeste</Option>
                                <Option value="Vogel">Vogel</Option>
                            </SelectAlgoritmo>
                        </GridSelect>
                        <PanelBotones>
                            <BotonOpcion onClick={resolver} whileHover={{ scale: 1.09 }}>Resolver</BotonOpcion>
                            <BotonVolver whileHover={{ scale: 1.09 }}>Volver</BotonVolver>
                        </PanelBotones>
                    </PanelBotones>
                </GridMenuProblema>
            }
            {pantalla === "solucion" &&
                <GridSolucion>
                    <TitleProblem>{algoritmoRef.current.value}</TitleProblem>
                    <CuadroSolucion initial={{ x: 2000 }} animate={{ x: 0, type: 'tween' }}>
                        <GridDetalle>
                            {
                                minCostos.map((costo, index) => {
                                    return (
                                        <DivDetalle key={uuidv4()}>
                                            <CuadroNum key={uuidv4()}><TextSolucion>#{index + 1}</TextSolucion></CuadroNum>
                                            <TextSolucion key={uuidv4()}>El deposito <b>{listaFuentes[index]}</b> debe entregar <b>{listaOfertas[index]}</b>  insumos al cliente <b>{listaClientes[index]}</b> que tiene una demanda de <b>{listaDemandas[index]}</b>  a un costo de <b>${costo}</b>
                                            </TextSolucion>
                                        </DivDetalle>
                                    );
                                })
                            }
                            <CuadroCosto>
                                <TextSolucion>
                                    El costo total: <b>${costoTotal}</b>
                                </TextSolucion>
                            </CuadroCosto>
                        </GridDetalle>
                    </CuadroSolucion>
                </GridSolucion>
            }
        </Fragment>
    );
}

export default MenuProblema;