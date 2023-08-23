import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ciudades: []
  
}

export const ciudadesSlice = createSlice ( 

    {
        name : 'listadoCiudades',
        initialState ,
        reducers : {
            guardarListadoCiudades : (state, action) => {
                state.ciudades = action.payload
            }
        }
    })

    export const {guardarListadoCiudades} = ciudadesSlice.actions ;
    export default ciudadesSlice.reducer;