import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ocupaciones: [],
};

export const listadoOcupacionesSlice = createSlice({
  name: 'listadoOcupaciones',
  initialState,
  reducers: {
    guardarListadoOcupaciones: (state, action) => {
      state.ocupaciones = action.payload;
    },
  },
});

export const { guardarListadoOcupaciones } = listadoOcupacionesSlice.actions;
export default listadoOcupacionesSlice.reducer;