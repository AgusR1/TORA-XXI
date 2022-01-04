import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Fragment } from 'react/cjs/react.production.min';
import './App.css';
import Menu2 from "./components/Menu2/Menu2";
import MenuInicio from './components/MenuInicio/MenuInicio';
import MenuProblema from "./components/MenuProblema/menuProblema";

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route exact path="/menuProblema" element={<MenuProblema/>}/>
          <Route exact path="/menu2" element={<Menu2 />} />
          <Route exact path="/" element={<MenuInicio/>}/>
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
