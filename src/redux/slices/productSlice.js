import { createSlice} from "@reduxjs/toolkit";
import { fetchProducts } from "../../ApiCalls/productApis";

const initialState = {
  products: {status:'idle',data:[]},
  bulkAddData:[],
  searchFilter:{
    category:'All',
    priceRange:700000,
    sortBy:'None',
    rating:'All'
  },
  searchResultFound:0
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetSearchFilter:(state => state=initialState),
    setSearchFilter:(state,{payload})=>{
      state.searchFilter = payload
    },
    setSearchResultFound:(state,{payload})=>{
      state.searchResultFound = payload
    },
    setBulkAddData: (state, {payload}) => {
      state.bulkAddData = payload;
    },
    updateBulkAddData:(state,{payload})=>{
        state.bulkAddData = state.bulkAddData.map((value)=>{
        if(value.Name === payload.productName){
          value.images.push(payload.file)
          value.imagesForPreview.push(payload.preview)
          return value
        }else{
          return value
        }
      })
    },
    removeImages:(state,{payload})=>{
      state.bulkAddData = state.bulkAddData.map((value)=>{
        if(value.Name === payload.productName){
          value.images = value.images.filter((val,i)=>i!==payload.index)
          value.imagesForPreview =value.imagesForPreview.filter((val,i)=>i!==payload.index)
          return value
        }else{
          return value
        }
      })
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
        state.products.status = "loading";
      });
      builder.addCase(fetchProducts.fulfilled, (state, action) => {
        state.products.status = "finished";
      
        state.products.data = action.payload;
      });
      builder.addCase(fetchProducts.rejected, (state) => {
        state.products.status = "error";
        state.products.data = [];
      });
    }
  })
  
export const {
 setBulkAddData,updateBulkAddData,removeImages,setSearchFilter,resetSearchFilter,setSearchResultFound
} = productSlice.actions;

export const getAllProducts = (state) => state.product.products;
export const getAllBulkAddData = (state) => state.product.bulkAddData;
export const getSearchFilter = (state) => state.product.searchFilter;
export const getSearchResultFound = (state) => state.product.searchResultFound;



export default productSlice.reducer;
