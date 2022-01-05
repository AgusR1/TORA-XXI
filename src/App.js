import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import Menu2 from "./components/Menu2/Menu2";
import MenuInicio from './components/MenuInicio/MenuInicio';
import MenuProblema from "./components/MenuProblema/menuProblema";
import DataContext from "./components/context/context";

function App() {
  const dataProblema={
    nombreProblema:null,
    destinos:null,
    fuentes:null
  }
  return (
    <DataContext.Provider value={dataProblema}>
      <Router>
        <Routes>
          <Route exact path="/menuProblema" element={<MenuProblema/>} />
          <Route exact path="/menu2" element={<Menu2/>} />
          <Route exact path="/" element={<MenuInicio/>} />
        </Routes>
      </Router>
    </DataContext.Provider>
  );
}

export default App;
