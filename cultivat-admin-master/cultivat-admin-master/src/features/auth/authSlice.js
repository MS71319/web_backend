import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const userDefaultState = {
  _id: null,
  name: null,
  email: null,
  mobile: null,
  token: null,
}

const initialState = {
  user: userDefaultState,
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const login = createAsyncThunk("auth/admin-login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getOrders = createAsyncThunk('order/getallorders', async (thunkAPI) => {
  try {
      return await authService.getOrders();

  }   catch (error) {
      return thunkAPI.rejectWithValue(error);
  }
});


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isError = false
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success"
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "success";
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
        state.message = "success";
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;

      });
  },
});

export default authSlice.reducer; // Exporting the reducer as default