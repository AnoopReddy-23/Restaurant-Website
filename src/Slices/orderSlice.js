import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../utils/axiosInstance';

// Thunk to fetch user's orders
export const getUserOrders = createAsyncThunk(
  'orders/getUserOrders',
  async (username, thunkAPI) => {
    try {
      const response = await axios.get(`/order-api/get-orders/${username}`);
      return response.data.payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// Thunk to fetch all orders (Admin)
export const getAllOrders = createAsyncThunk(
  'orders/getAllOrders',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/order-api/all-orders');
      return response.data.payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// Thunk to create a new order
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderObj, thunkAPI) => {
    try {
      const response = await axios.post('/order-api/create-order', orderObj);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// Thunk to update order status
export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ orderId, status }, thunkAPI) => {
    try {
      const response = await axios.put('/order-api/update-status', { orderId, status });
      thunkAPI.dispatch(getAllOrders()); // Refresh list
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    isLoading: false,
    isError: false,
    errMsg: '',
    isSuccess: false
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.errMsg = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errMsg = action.payload.message;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.isSuccess = true;
      });
  }
});

export const { clearState } = orderSlice.actions;
export default orderSlice.reducer;
