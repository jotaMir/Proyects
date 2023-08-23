import { useRef, useState } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { agregarListadoCensados } from "../features/listadoCensadosSlice";

const baseURL = 'https://censo.develotion.com/';

const AgregarPersonas = () => {
const dispatch=useDispatch();
  
const departamentosReducer = useSelector(state => state.departamentos.departamentos);
const ocupacionesReducer = useSelector (state =>state.listadoOcupaciones.ocupaciones);

const [errorAgregarPersona, setErrorAgregarPersona] = useState(false);
const [MensajeAgregarPersona, setMensajeAgregarPersona] = useState(false);
const [menorEdad, setMenorEdad] = useState(false); 

    const nombre = useRef(null);
    const departamento = useRef(null);
    const ciudad = useRef(null);
    const fechaNacimiento = useRef(null);
    const ocupacion = useRef(null);
   
const TomarDatosPersona = () => {

    if (
      nombre.current && nombre.current.value != "" &&
      departamento.current && departamento.current.value != "" &&
      ciudad.current && departamento.current.value != "" &&
      fechaNacimiento.current && fechaNacimiento.current.value != "" && Date.parse(fechaNacimiento.current.value) < Date.now() &&
      ocupacion.current && ocupacion.current.value != ""
      ) {
        let nuevaPersona = {
          idUsuario: localStorage.getItem("IdUsuario"),
          nombre: nombre.current.value,
          departamento: departamento.current.value,
          ciudad: ciudad.current.value,
          fechaNacimiento: fechaNacimiento.current.value,
          ocupacion: ocupacion.current.value,
        };

        UseAgregarNuevaPersona(nuevaPersona);
      }else{
        setErrorAgregarPersona(true);
        setMensajeAgregarPersona(false); 

      }        
}

const verificarFechaNacimiento = () => {
  const fechaNacimientoValue = new Date(fechaNacimiento.current.value);

  if (Date.now() - fechaNacimientoValue.getTime() < 18 * 365 * 24 * 60 * 60 * 1000) {
    setMenorEdad(true);
  } else {
    setMenorEdad(false); 
  }
};

const UseAgregarNuevaPersona = (nuevaPersona) =>{ 
  setMensajeAgregarPersona(false) 
  setErrorAgregarPersona(false); 
  if(menorEdad){ nuevaPersona.ocupacion = "5";}

fetch(baseURL + 'personas.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "apikey": localStorage.getItem("token"),
                "iduser": localStorage.getItem("IdUsuario")
            },
            body: JSON.stringify(nuevaPersona)
        })
        .then(response => {
                    if (response.status === 200) {                    
                        console.log("Nueva Persona Registrada")
                        setMensajeAgregarPersona(true) 
                        setErrorAgregarPersona(false); 
        
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.mensaje) {
                      console.log(data);
                      const id = data.idCenso         
                      nuevaPersona.id = id;
                      dispatch(agregarListadoCensados(nuevaPersona))
                    }                 
                })
                .catch(error => console.log(error));           
               }
        
const [ciudades, setCiudades] = useState([]);              
const cargarCiudades = async() => {
        let headers = {
            "Content-Type":"application/json",
            "apikey": localStorage.getItem("token"),
            'iduser': localStorage.getItem("IdUsuario")            
        }       
       await fetch(baseURL+"ciudades.php?idDepartamento="+departamento.current.value, {headers})
        .then(response => response.json())
        .then(data => {           
        setCiudades(data.ciudades);                             
        })       
}

    const campo = useRef(null)
  
    return (
        <>
          <div className="container py-4">
  <div className="row g-0 align-items-center">
    <div className="col-lg-6 mb-5 mb-lg-0">
      <div className="card cascading-right">
        <div className="card-body p-5 shadow-5 text-center">
          <h2 className="fw-bold mb-5 text-primary">Agregar Nueva Persona</h2>
          <form>
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="form-floating">
                  <input
                    type="text"
                    id="nombre"
                    className="form-control"
                    ref={nombre}
                    placeholder="Nombre y Apellido"
                  />
                  <label htmlFor="nombre">Nombre y Apellido</label>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="form-floating">
                  <select
                    id="departamento"
                    className="form-select"
                    ref={departamento}
                    onChange={cargarCiudades}
                  >
                    <option value="" disabled>
                      Seleccione su Departamento
                    </option>
                    {departamentosReducer.map(departamento => (
                      <option key={departamento.id} value={departamento.id}>
                        {departamento.nombre}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="departamento">Departamento</label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="form-floating">
                  <select id="ciudad" className="form-select" ref={ciudad}>
                    <option value="" disabled>
                      Seleccioná tu Ciudad
                    </option>
                    {ciudades.length > 0 &&
                      ciudades.map(ciudad => (
                        <option key={ciudad.id} value={ciudad.id}>
                          {ciudad.nombre}
                        </option>
                      ))}
                  </select>
                  <label htmlFor="ciudad">Ciudad</label>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="form-floating">
                  <input
                    onChange={verificarFechaNacimiento}
                    type="date"
                    id="fechaNacimiento"
                    className="form-control"
                    ref={fechaNacimiento}
                    placeholder="Fecha de Nacimiento"
                  />
                  <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-6 mb-4 text-center">
                <div className="form-floating">
                  <select
                    id="ocupacion"
                    className="form-select"
                    ref={ocupacion}
                    disabled={menorEdad}
                  >
                    <option value="" disabled>
                      Seleccione la Ocupacion
                    </option>
                    {ocupacionesReducer.map(ocupacion => (
                      <option key={ocupacion.id} value={ocupacion.id}>
                        {ocupacion.ocupacion}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="ocupacion">Ocupacion</label>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-primary btn-block mb-4"
              onClick={TomarDatosPersona}
            >
              Agregar Persona
            </button>
          </form>
          {MensajeAgregarPersona && (
            <p className="p-2 bg-success text-white">
              La Persona ha sido agregada correctamente
            </p>
          )}
          {errorAgregarPersona && (
            <p className="p-2 bg-danger text-white">
              Deben completarse todos los campos y la fecha de nacimiento tiene que ser menor a hoy
            </p>
          )}
        </div>
      </div>
    </div>
    <div className="col-lg-6 mb-5 mb-lg-0">
      <section>
        <img
          src={process.env.PUBLIC_URL + "/imagenCenso.jpg"}
          className="w-100 rounded-4 shadow-4 img-fluid w-100 rounded-4 shadow-4"
          alt=""
        />
      </section>
    </div>
  </div>
</div>

        </>
      );
 }

export default AgregarPersonas;