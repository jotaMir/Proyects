import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useRef, useState } from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux"

const baseURL = 'https://censo.develotion.com/';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const Mapa = () => {

    const dispatch = useDispatch();

    const departamentosReducer = useSelector(state => state.departamentos.departamentos);
    const personas = useSelector(state => state.listadoCensados.censados)

    const incrementar=()=>{
        dispatch(incrementar())
    }
    const resetear=()=>{
        dispatch(resetear())
    }

    return (
        <>
            <MapContainer center={[-33, -56]} zoom={6} scrollWheelZoom={false} style={{ width: "100%", height: "500px" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {departamentosReducer.map(departamento => {
          const censadosEnDepartamento = personas.filter(persona => persona.departamento == departamento.id);
         
          return (
            <Marker key={departamento.id} position={[departamento.latitud, departamento.longitud]}>
              <Popup>
                {departamento.nombre} - censados: {censadosEnDepartamento.length} <br />
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
        </>
    )

}

export default Mapa
