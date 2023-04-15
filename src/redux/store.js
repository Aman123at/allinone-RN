import { configureStore } from '@reduxjs/toolkit';

import categoryReducer from './slices/categorySlice';

import productReducer from './slices/productSlice';
import userReducer from './slices/userSlice';
import commonReducer from './slices/commonSlice';
import cartReducer from './slices/cartSlice';



export const store = configureStore({
  reducer: {
    category: categoryReducer,
    common:commonReducer,
    product:productReducer,
    user:userReducer,
    cart:cartReducer
  },
});


