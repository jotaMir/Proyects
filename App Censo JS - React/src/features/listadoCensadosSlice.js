import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    censados: []
};

export const listadoCensadosSlice = createSlice ( 

    {
        name : 'censados',
        initialState ,
        reducers : {
            guardarCensados: (state, action) => {
                state.censados = action.payload;
            },
            agregarListadoCensados : (state, action) => {
                state.censados.push(action.payload)
            },
            eliminarListadoCensados: (state, action) => {
                const idCensoAEliminar = action.payload;
                const indexAEliminar = state.censados.findIndex((persona) => persona.id === idCensoAEliminar);
          
                if (indexAEliminar !== -1) {
                  state.censados.splice(indexAEliminar, 1);
            }
           
        } }
    })

    export const {agregarListadoCensados, guardarCensados, eliminarListadoCensados} = listadoCensadosSlice.actions ;
    export default listadoCensadosSlice.reducer;