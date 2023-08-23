import { useSelector } from "react-redux";

const PorcentajePersonas = () => { 
const personasReducer = useSelector(state => state.listadoCensados.censados)
const censadosTotalesReducer = useSelector(state => state.censadosTotales.totales)

    return(<p> {(personasReducer.length / censadosTotalesReducer * 100).toFixed(2)} % </p>
)
}

export default PorcentajePersonas;