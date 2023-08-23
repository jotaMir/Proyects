import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import {Link, NavLink, useNavigate, Outlet} from 'react-router-dom';
import { guardarListadoDepartamentos } from '../features/departamentosSlice';
import { guardarListadoOcupaciones } from '../features/listadoOcupacionesSlice';
import { guardarCensados } from '../features/listadoCensadosSlice';
import { guardarCensadosTotales } from '../features/censadosTotalesSlice';
import { guardarListadoCiudades } from '../features/ciudadesSlice';

const baseURL = 'https://censo.develotion.com/';

const Dashboard = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate (); 

  useEffect (()=> {
    cargarDepartamentos();
    cargarCiudades()
    fetchDataOcupaciones()
    cargarTotalCensados();
    fetchData();

  }, []) 
      //Departamentos
      const cargarDepartamentos = async () => {
        let headers = {
          "Content-Type": "application/json",
          "apikey": localStorage.getItem("token"),
          "iduser": localStorage.getItem("IdUsuario")            
        };
  
        await fetch(baseURL + "departamentos.php", { headers })
          .then(response => response.json())
          .then(data => {
            dispatch(guardarListadoDepartamentos(data.departamentos))
          })
          .catch(error => console.log(error));
      };
  
      const cargarCiudades = async () => {
        let headers = {
          "Content-Type": "application/json",
          "apikey": localStorage.getItem("token"),
          "iduser": localStorage.getItem("IdUsuario")            
        };
  
        await fetch(baseURL + "ciudades.php", { headers })
          .then(response => response.json())
          .then(data => {
            dispatch(guardarListadoCiudades(data.ciudades))
          })
          .catch(error => console.log(error));
      };

      const fetchDataOcupaciones =  async () => {
        const respuesta = await fetch(baseURL + 'ocupaciones.php', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              "apikey": localStorage.getItem("token"),
              "iduser": localStorage.getItem("IdUsuario")
          },
      })
      .then(response => {
                  return response.json();
              })
              .then(data => {
                  if (data) {
                  
                     dispatch(guardarListadoOcupaciones(data.ocupaciones));                    
                  }
              })
              .catch(error => console.log(error));
            }

      //total Censados
      const cargarTotalCensados = async () => {
        let headers = {
          "Content-Type": "application/json",
          "apikey": localStorage.getItem("token"),
          "iduser": localStorage.getItem("IdUsuario")            
        };
  
        await fetch(baseURL + "totalCensados.php", { headers })
          .then(response => response.json())
          .then(data => {
            dispatch(guardarCensadosTotales(data.total));  
          })
          .catch(error => console.log(error));
      };
  
//personasCensadas
  const fetchData =  async () => {
    const respuesta = await fetch(baseURL + `personas.php?idUsuario=${localStorage.getItem("IdUsuario")}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          "apikey": localStorage.getItem("token"),
          "iduser": localStorage.getItem("IdUsuario")
      },
  })
  .then(response => {
              if (response.status === 200) {                 
              }
              return response.json();
          })
          .then(data => {
              if (data) {
                 dispatch(guardarCensados(data.personas))                         
              }
          })
          .catch(error => console.log(error));
        }

  const [showWelcomeBanner, setShowWelcomeBanner] = useState(true); 

  useEffect (() => {
    if(localStorage.length === 0)
    navigate("/");
  }, [])

  const hideWelcomeBanner = () => {
    setShowWelcomeBanner(false);
  };

  const Logout = () =>{
    localStorage.clear();
    navigate("/");
  }
  const IrADashboard = () =>{
    navigate("/Dashboard");
  }

return(
  <div className="container-fluid">
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <a className="navbar-brand p-2" href="/" onClick={IrADashboard}>
      Censo 2023!
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink
            to="/Dashboard/agregarPersonas"
            className="nav-link btn btn-link"
            onClick={hideWelcomeBanner}
            
          >
            Agregar Personas
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/Dashboard/listarPersonas"
            className="nav-link btn btn-link"
            onClick={hideWelcomeBanner}
            
          >
            Listado de Personas
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/Dashboard/informacionEstadistica"
            className="nav-link btn btn-link"
            onClick={hideWelcomeBanner}
           
          >
            Informacion Estadistica
          </NavLink>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className="nav-link btn btn-link"
            onClick={Logout}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  </nav>

  <Outlet/>

  {showWelcomeBanner && (
        <div className="welcome-banner" style={{ backgroundColor: "#f7f7f7", padding: "20px", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "10px", color: "#007BFF" }}>Bienvenido al Censo Uruguay 2023!</h1>
            <p style={{ fontSize: "1.2rem", color: "#555" }}>¡Gracias por ser parte de este importante proyecto!</p>
            </div>
            <section>
                <img src={process.env.PUBLIC_URL + "/mapa-uruguay.jpg"} className="w-100 rounded-4 shadow-4 img-fluid"
                     alt="" />
              </section>
          </div>
)}

</div>
)}

export default Dashboard;