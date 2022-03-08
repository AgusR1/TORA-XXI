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
                        posDestino = parseInt(i + 1) % ENtablaDemandas.length
                        switch (posDestino) {
                            case 0:
                                demanda=ENtablaDemandas[ENtablaDemandas.length-1];
                                posDeposito = Math.ceil((i + 1) / tablaDemandas.length);//para determinar que oferta disponible tiene este cliente con este costo asociado necesito realizar la siguiente operacion matematica que me devuelva el numero de fila al que corresponde ej pos=1 y length=3 => 1/3 redondeado hacia arriba me devuelve 1 o pos=4 7 length=3 => 4/3 round up es 2
                                oferta = tablaOfertas[posDeposito - 1];
                                //ya tenemos el costo minimo, la oferta y la demanda correspondiente para dicho costo, ahora se asignan los recursos
                                if (demanda === 0 || oferta===0) {
                                    break;
                                } else {
                                    if (oferta>demanda) {
                                        //utilizamos la longitud del array de demandas como posicion porque sabemos que si el case es 0 entonces es el ultimo elemento del array de demanda
                                        tablaDemandas[tablaDemandas.length - 1] = 0;//si la oferta supera a la demanda entonces la demanda de ese cliente queda satisfecha y se setea en 0
                                        tablaOfertas[posDeposito - 1] = oferta - demanda;//restamos aquello que fue utilizado para suplir la demanda anterior al inventario del deposito
                                        ENcostoTotal = ENcostoTotal + demanda * ENmatrizCostes[i];//calculamos el costo total, sabemos que se cubrio toda la demanda restante por lo que el calculo es demanda*costo 
                                        ENsumaDemanda = ENsumaDemanda - demanda;//restamos la demanda que ya se suplio
                                        ENsumaOferta = ENsumaOferta - demanda;//restamos la oferta que tenemos disponible
                                        setMinCostos(cost => [...cost, ENmatrizCostes[i]]);
                                        setListaOfertas(listaO => [...listaO, demanda]);
                                        setListaFuentes(listaF => [...listaF, fuentesRef.current[posDeposito - 1].value]);
                                        setListaDemandas(listaD => [...listaD, demanda]);
                                        setListaClientes(listaC => [...listaC, destinosRef.current[ENtablaDemandas.length - 1].value]);
                                    }
                                }
                                break;
                            default:
                                demanda = ENtablaDemandas[posDestino - 1];
                                posDeposito = Math.ceil((i + 1) / tablaDemandas.length);//para determinar que oferta disponible tiene este cliente con este costo asociado necesito realizar la siguiente operacion matematica que me devuelva el numero de fila al que corresponde ej pos=1 y length=3 => 1/3 redondeado hacia arriba me devuelve 1 o pos=4 7 length=3 => 4/3 round up es 2
                                oferta = tablaOfertas[posDeposito - 1];
                                //ya tenemos el costo minimo, la oferta y la demanda correspondiente para dicho costo, ahora se asignan los recursos
                                if (demanda === 0 || oferta===0) {
                                    break;
                                } else {

                                }
                                break;
                        }
                    }
                } while (ENsumaDemanda > 0);
                break;
            case "Vogel":

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
                                        <DivDetalle>
                                            <CuadroNum><TextSolucion>#{index + 1}</TextSolucion></CuadroNum>
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