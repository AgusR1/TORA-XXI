import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Fragment } from 'react/cjs/react.production.min';
import './App.css';
import MenuInicio from './components/MenuInicio/MenuInicio';

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route exact path="/" element={<MenuInicio/>}/>
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
