import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  eliminarListadoCensados  } from "../features/listadoCensadosSlice";

const baseURL = 'https://censo.develotion.com/';

const ListarPersonas = () => {
  const dispatch = useDispatch();

  const todasLasPersonas = useSelector(state => state.listadoCensados.censados);
  const ocupacionesReducer = useSelector(state => state.listadoOcupaciones.ocupaciones);
  const departamentosReducer = useSelector(state => state.departamentos.departamentos);
  const ciudadesReducer = useSelector(state => state.ciudades.ciudades);
  const [filtroOcupacion, setFiltroOcupacion] = useState('');
  const [personasFiltradas, setPersonasFiltradas] = useState(todasLasPersonas);
  const [MensajeEliminar, setMensajeEliminar] = useState(false);

  useEffect(()=>{
    setMensajeEliminar(false);

  },[filtroOcupacion]);

  useEffect(() => {

    // Filtrar las personas al inicio y cuando cambie el filtro de ocupación
     const filtrarPersonas = () => {
      if (filtroOcupacion) {
        const idOcupacion = parseInt(filtroOcupacion);
        const personasFiltradas = todasLasPersonas.filter(persona => persona.ocupacion == idOcupacion);
        setPersonasFiltradas(personasFiltradas);
      } else {
        setPersonasFiltradas(todasLasPersonas);
      }
    };
    filtrarPersonas();
    
  }, [filtroOcupacion, todasLasPersonas]);

  const eliminarPersona = async (idCenso) => {
    await fetch(baseURL + `personas.php?idCenso=${idCenso}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'apikey': localStorage.getItem('token'),
        'iduser': localStorage.getItem('IdUsuario'),
      },
    })
      .then(response => {
        if (response.status === 200) {
          setMensajeEliminar(true)
          dispatch(eliminarListadoCensados(idCenso, 1))
        }
        return response.json();
      })
      .catch(error => console.log(error));
  };

  return (
    <>
      <h1 className='text-primary'>Censados hasta el momento</h1>
      <form method="post" className="my-3">
      <div className="row">
        <div className=" mb-4">
          <div className="form-outline">
            
            <br />
            <select
              id="ocupacion"
              onChange={(event) => setFiltroOcupacion(event.target.value)}
              
              value={filtroOcupacion}
              className="form-select" 
            >
              <option disabled value="">
                Seleccione la Ocupacion
              </option>
              {ocupacionesReducer.map(ocupacion => (
                <option key={ocupacion.id} value={ocupacion.id}>
                  {ocupacion.ocupacion}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      </form>
     
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Departamento</th>
            <th>Ciudad</th>
            <th>Fecha de Nacimiento</th>
            <th>Ocupacion</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {personasFiltradas.length > 0 ? (
  personasFiltradas.map((persona) => {
    const departamentoPersona = departamentosReducer.find((departamento) => departamento.id == persona.departamento);
    const ocupacionPersona = ocupacionesReducer.find((ocupacion) => ocupacion.id == persona.ocupacion);
    const ciudadedPersona = ciudadesReducer.find((ciudad) => ciudad.id == persona.ciudad);

    return (
      <tr key={persona.id}>
        <td>{persona.nombre}</td>
        <td>{departamentoPersona ? departamentoPersona.nombre : ''}</td>
        <td>{ciudadedPersona ? ciudadedPersona.nombre : ''}</td>
        <td>{persona.fechaNacimiento}</td>
        <td>{ocupacionPersona ? ocupacionPersona.ocupacion : ''}</td>
        <td>
          <input
            type="button"
            className="btn btn-primary"
            value="Eliminar"
            onClick={() => eliminarPersona(persona.id)}
          />
        </td>
      </tr>
    );
  })
) : (
  <tr>
    <td colSpan="6">No se encontraron personas con el filtro seleccionado.</td>
  </tr>
)}
        </tbody>
      </table>
      {MensajeEliminar && (
                      <p className="p-2 bg-success text-white">La Persona ha sido eliminada Correctamente</p>
                    )}
    </>
  );
};

export default ListarPersonas;
