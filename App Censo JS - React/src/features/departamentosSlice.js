import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    departamentos: []
  
}

export const departamentosSlice = createSlice ( 

    {
        name : 'listadoDepartamentos',
        initialState ,
        reducers : {
            guardarListadoDepartamentos : (state, action) => {
                state.departamentos = action.payload
            }
        }
    })

    export const {guardarListadoDepartamentos} = departamentosSlice.actions ;
    export default departamentosSlice.reducer;