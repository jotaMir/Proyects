import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: false,
      text: 'Censados Por Ocupacion',
    },
  },
};

const PersonasOcupacion = () => {

  const ocupacionesReducer = useSelector(state => state.listadoOcupaciones.ocupaciones);
  const personasCensadas = useSelector((state) => state.listadoCensados.censados);

  const personasPorOcupacion = {};
  ocupacionesReducer.forEach((ocupacion) => {
    personasPorOcupacion[ocupacion.ocupacion] = personasCensadas.filter((persona) => persona.ocupacion == ocupacion.id);
  });

  const nombresOcupaciones = Object.keys(personasPorOcupacion);
  const cantidadesPersonas = nombresOcupaciones.map((ocupacion) => personasPorOcupacion[ocupacion].length);

  return (
    <Bar
      options={options}
      data={{
        labels: nombresOcupaciones,
        datasets: [
          {
            label: 'Censados',
            data: cantidadesPersonas,
            backgroundColor: 'rgba(0, 0, 255, 0.5)',
          },
        ],
      }}
    />
  );
};

export default PersonasOcupacion;