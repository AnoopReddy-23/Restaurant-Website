import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../utils/axiosInstance';

export const getSalesStats = createAsyncThunk(
  'sales/getSalesStats',
  async (timeframe = 'week', thunkAPI) => {
    try {
      const response = await axios.get(`/order-api/sales-stats?timeframe=${timeframe}`);
      return response.data.payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const salesSlice = createSlice({
  name: 'sales',
  initialState: {
    stats: { revenue: 0, orders: 0 },
    topProducts: [],
    salesTrend: [],
    statusDistribution: [],
    isLoading: false,
    isError: false,
    errMsg: '',
    currentTimeframe: 'week'
  },
  reducers: {
    setTimeframe: (state, action) => {
      state.currentTimeframe = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSalesStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSalesStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload.stats;
        state.topProducts = action.payload.topProducts;
        state.salesTrend = action.payload.salesTrend;
        state.statusDistribution = action.payload.statusDistribution;
      })
      .addCase(getSalesStats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errMsg = action.payload?.message || 'Failed to fetch analytics';
      });
  }
});

export const { setTimeframe } = salesSlice.actions;
export default salesSlice.reducer;
