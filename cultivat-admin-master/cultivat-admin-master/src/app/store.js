import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice";
import customerReducer from '../features/customers/customerSlice';
import productReducer from '../features/product/productSlice';
const store = configureStore({
    reducer: {
      auth: authReducer, // Assigning authReducer to the 'auth' slice in the store
      customer: customerReducer,
      product: productReducer
    },
});
  
export default store;



