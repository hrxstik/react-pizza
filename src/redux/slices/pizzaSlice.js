import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasById', async (params, thunkAPI) => {
  const { sortType, order, category, searchQuery, currentPage } = params;

  const { data } = await axios.get(
    `https://66bc4f4f24da2de7ff69f4a8.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType}&order=${order}&${searchQuery}`,
  );
  // if (data.length === 0) {
  //   return thunkAPI.rejectWithValue('Пиццы пустые');
  // }
  // return thunkAPI.fulfillWithValue(data);

  return data;
});

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState: {
    items: [],
    status: 'pending',
  },
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = 'pending';
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.status = 'success';
        state.items = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = 'error';
        state.items = [];
      });
  },
});

export const selectPizzaSlice = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
