import { configureStore } from "@reduxjs/toolkit";
import listadoCensadosReducer from "../features/listadoCensadosSlice";
import listadoOcupacionesReducer from "../features/listadoOcupacionesSlice";
import departamentosReducer from "../features/departamentosSlice";
import censadosTotalesReducer from "../features/censadosTotalesSlice";
import ciudadesReducer from "../features/ciudadesSlice";


export const store = configureStore({
    reducer:{
        listadoCensados: listadoCensadosReducer,
        listadoOcupaciones: listadoOcupacionesReducer,
        departamentos: departamentosReducer,
        ciudades: ciudadesReducer,
        censadosTotales: censadosTotalesReducer
    }
})

