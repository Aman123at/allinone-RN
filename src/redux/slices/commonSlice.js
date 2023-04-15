import { createSlice } from "@reduxjs/toolkit";

const initialState = {loader: false,activePage:'HOME'};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setLoader: (state, {payload}) => {
      state.loader = payload;
    },
    setActivePage: (state, {payload}) => {
      state.activePage = payload;
    }
},
})

export const {setLoader,setActivePage} = commonSlice.actions;

export const getLoaderState = (state) => state.common.loader;
export const getActivePage = (state) => state.common.activePage;

export default commonSlice.reducer;
