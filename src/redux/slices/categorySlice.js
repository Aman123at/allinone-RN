import { createSlice } from "@reduxjs/toolkit";
import { getAllCategory } from "../../ApiCalls/categoryApis";

const initialState = {
  category: {status:'idle',data:[]},
  filterBySubCategory:{name:"All",id:"905657545412"}
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setFilterBySubCategory: (state, {payload}) => {
      state.filterBySubCategory = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCategory.pending, (state) => {
      state.category.status = "loading";
    });
    builder.addCase(getAllCategory.fulfilled, (state, action) => {
      state.category.status = "finished";
      state.category.data = action.payload;
    });
    builder.addCase(getAllCategory.rejected, (state) => {
      state.category.status = "error";
      state.category.data = [];
    });
  },
});


export const {
  setFilterBySubCategory,
  setCategoryRowData
 } = categorySlice.actions;

export const getAllCategories = (state) => state.category.category;

export const getFilterBySubCategory = (state) => state.category.filterBySubCategory;



export default categorySlice.reducer;