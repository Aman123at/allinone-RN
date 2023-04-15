import { createSlice } from "@reduxjs/toolkit";
import { fetchAllCartItems, fetchSavedAddresses } from "../../ApiCalls/cartApis";
import { getAllOrders } from "../../ApiCalls/orderApis";

const initialState = {
  cart: {status:'idle',data:[]},
  address: {status:'idle',data:[]},
  orders: {status:'idle',data:[]},
  shippingType:40,
  invoice:{},
  openModalForInAddress:''
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart:(state)=>{
      state.cart.status = 'finished'
      state.cart.data = []
    },
    setShippingType:(state,{payload})=>{
      state.shippingType = payload
    },
    setInvoiceDetails: (state, action) => {
      
      state.invoice = action.payload
     },
    setOpenModalForInAddress: (state, action) => {
      
      state.openModalForInAddress = action.payload
     }

  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCartItems.pending, (state) => {
      state.cart.status = "loading";
    });
    builder.addCase(fetchAllCartItems.fulfilled, (state, action) => {
      state.cart.status = "finished";
      state.cart.data = action.payload;
    });
    builder.addCase(fetchAllCartItems.rejected, (state) => {
      state.cart.status = "error";
      state.cart.data = [];
    });
    builder.addCase(fetchSavedAddresses.pending, (state) => {
      state.address.status = "loading";
    });
    builder.addCase(fetchSavedAddresses.fulfilled, (state, action) => {
      state.address.status = "finished";
      state.address.data = action.payload
    });
    builder.addCase(fetchSavedAddresses.rejected, (state) => {
      state.address.status = "error";
      state.address.data = {};
    });
    builder.addCase(getAllOrders.pending, (state) => {
      state.orders.status = "loading";
    });
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.orders.status = "finished";
    
      state.orders.data = action.payload;
    });
    builder.addCase(getAllOrders.rejected, (state) => {
      state.orders.status = "error";
      state.orders.data = [];
    });
  },
});

export const {
  clearCart,
  setShippingType,
  setInvoiceDetails,
  setOpenModalForInAddress
} = cartSlice.actions;

export const getCartItems = (state) => state.cart.cart;

export const getSavedAddresses = (state) => state.cart.address;

export const getShippingType = (state) => state.cart.shippingType;

export const getInvoiceDetails = (state) => state.cart.invoice;

export const getOrdersFromState = (state) => state.cart.orders;

export const getOpenModalForInAddress = (state) => state.cart.openModalForInAddress;

export default cartSlice.reducer;
