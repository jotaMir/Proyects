import React from "react";
import CensadosTotales from "./CensadosTotales";
import PersonasDepartamento from "./PersonasDepartamento";
import PersonasOcupacion from "./PersonasOcupacion";
import TiempoFaltante from "./TiempoFaltante";
import Mapa from "../Componentes/Mapa";
import PorcentajePersonas from "../Componentes/PorcentajePersonas";


const InformacionEstadistica = () => {
  return (
    <div className="container-fluid bg-dark text-white">
    
      <header className="bg-primary text-white text-center py-3">
        <h1>Censo Uruguay 2023</h1>
      </header>
   
      <main className="px-3 py-5">
    <div className="row mb-5">
      <div className="col-lg-6 mb-4">
        <div className="card bg-light text-dark mb-3 d-flex align-items-center justify-content-center h-100">
          <div className="card-body">
            <h5 className="card-title text-primary">Totales Censados</h5>
            <CensadosTotales />
          </div>
        </div>
      </div>
      <div className="col-lg-6 mb-4">
  <div className="card bg-light text-dark mb-3 d-flex align-items-center justify-content-center h-100">
    <div className="card-body">
      <h5 className="card-title text-primary display-6">Tiempo Faltante: 
      <TiempoFaltante /> </h5>
    </div>
  </div>
</div>
      <div className="col-12">
        <div className="row ">
          <div className="col-md-6 mb-4">
            <div className="card bg-light text-dark mb-3 d-flex  justify-content-center h-100">
              <div className="card-body">
                <h5 className="card-title text-primary">Personas por Departamento</h5>
                <PersonasDepartamento  />
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card bg-light text-dark mb-3 d-flex  justify-content-center h-100">
              <div className="card-body">
                <h5 className="card-title text-primary">Personas por Ocupación</h5>
                <PersonasOcupacion  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="row justify-content-center">
      <div className="col-9 text-center">
        <div className="card bg-primary text-white mb-3 text-center ">
          <div className="card-body">
            <h5 className="card-title">Mapa de Censados</h5>
            <Mapa />
          </div>
        </div>
      </div>
      <div className="col-3 mb-4 align-items-center">
  <div className="card bg-primary text-white mb-3 text-center h-50">
    <div className="card-body">
      <h5 className="card-title display-6">Porcentaje de Personas censadas por este usuario:  <strong>
      <PorcentajePersonas/></strong> </h5>
    </div>
  </div>
</div>
    </div>
  </main>
     
      <footer className="bg-dark text-secondary text-center py-3">
        <p>Jonatan Miranda  - Luciano Mello - Doc. Santiago Fagnoni - ORT 2023</p>
      </footer>
    </div>
  );
};

export default InformacionEstadistica;
