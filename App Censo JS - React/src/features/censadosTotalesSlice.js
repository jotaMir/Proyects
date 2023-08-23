import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totales : 0
};

export const censadosTotalesSlice = createSlice ( 

    {
        name : 'censadosTotales',
        initialState ,
        reducers : {
            guardarCensadosTotales: (state, action) => {
                state.totales = action.payload;
            },
                      
        }
    })

    export const {guardarCensadosTotales} = censadosTotalesSlice.actions ;
    export default censadosTotalesSlice.reducer;