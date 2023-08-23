
import React, { useEffect, useState } from "react";

const TiempoFaltante = () => {
  
  const calcularTiempoFaltante= () => {
    const now = new Date().getTime();
    const diff = targetDate - now;
    return Math.max(0, diff);
  }

  const targetDate = new Date("2023-08-31T00:00:00");
  const [tiempoFaltante, setTiempoFaltante] = useState(calcularTiempoFaltante());

 
  useEffect(() => {
    const interval = setInterval(() => {
      setTiempoFaltante(calcularTiempoFaltante());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const dias = Math.floor(tiempoFaltante / (1000 * 60 * 60 * 24));
  const horas = Math.floor((tiempoFaltante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((tiempoFaltante % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((tiempoFaltante % (1000 * 60)) / 1000);

  return (  
      <>
           {dias} días {horas} horas {minutos} minutos {segundos} segundos
      </> 
  );
};

export default TiempoFaltante;