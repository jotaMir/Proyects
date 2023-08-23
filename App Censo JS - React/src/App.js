import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './store/store'
import './App.css';
import Login from './Componentes/Login';
import Registro from './Componentes/Registro';
import Dashboard from './Componentes/Dashboard';
import AgregarPersonas from "./Componentes/AgregarPersonas";
import InformacionEstadistica from "./Componentes/InformacionEstadistica";
import ListarPersonas from "./Componentes/ListarPersonas";

let App = () => {

  return(
    <Provider store = {store}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/index.html" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
          <Route path="/Dashboard" element={<Dashboard />}>
        {/* Rutas Dashboard*/}
              <Route path="agregarPersonas" element={<AgregarPersonas />} />
              <Route path="listarPersonas" element={<ListarPersonas/>} />
              <Route path="informacionEstadistica" element={<InformacionEstadistica/>} />
          </Route>
      </Routes>
      </BrowserRouter>
    </Provider> 
      )
}

export default App;
