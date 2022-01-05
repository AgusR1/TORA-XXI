import { createContext } from "react";

const DataContext=createContext({
    nombreProblema:null,
    destinos:null,
    fuentes:null
});

export default DataContext;