import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Censados Por Departamento",
    },
  },
};

const PersonasDepartamento = () => {
  const departamentosReducer = useSelector((state) => state.departamentos.departamentos);
  const personasCensadas = useSelector((state) => state.listadoCensados.censados);

  // Crear un objeto para hacer coincidir los códigos de departamento con los nombres
  const departamentosNombres = {};
  departamentosReducer.forEach((departamento) => {
    departamentosNombres[departamento.id] = departamento.nombre;
  });

  // Contar la cantidad de personas por departamento utilizando filter
  const personasPorDepartamento = {};
  personasCensadas.forEach((persona) => {
    const departamento = persona.departamento;
    personasPorDepartamento[departamento] = personasCensadas.filter((p) => p.departamento == departamento);
  });

  // Obtener los nombres de los departamentos y las cantidades de personas
  const departamentos = Object.keys(personasPorDepartamento).map((codigo) => departamentosNombres[codigo]); //objects key obtiene las claves de los departamentos (codigos) - convertir las claves en nombres
  const cantidadesPersonas = Object.values(personasPorDepartamento).map((personas) => personas.length); 

  return (
    <>
      <Bar
        options={options}
        data={{
          labels: departamentos,
          datasets: [
            {
              label: "Censados",
              data: cantidadesPersonas,
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        }}
      /> 
      </>
  );
  
};

export default PersonasDepartamento;