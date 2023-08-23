import { useSelector } from "react-redux";
const CensadosTotales = () => { 

const personas = useSelector(state => state.listadoCensados.censados)

const censadosMontevideo = () => {
        const censadosEnMontevideo = personas.filter((persona) => persona.departamento == 3218)            
        return censadosEnMontevideo.length;

}
    return(<table className="table table-striped table-bordered table-success text-center">
    <thead className="table-primary">
      <tr>
        <th scope="col">Cantidad de Personas Censadas Total</th>
        <th scope="col">Cantidad de Personas Montevideo</th>
        <th scope="col">Cantidad de Personas Resto del Pais</th>
      </tr>
    </thead>
    <tbody>
      <tr className="table-info">
        <td>{personas.length}</td>
        <td>{censadosMontevideo()}</td>
        <td>{personas.length - censadosMontevideo()}</td>
      </tr>
    </tbody>
  </table>
  
)
}

export default CensadosTotales;