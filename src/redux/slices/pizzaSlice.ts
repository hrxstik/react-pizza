import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { Sort } from './filterSlice';

export type SearchPizzaParams = {
  sortBy: string;
  order: string;
  category: string;
  searchQuery: string;
  currentPage: string;
};

// type SearchPizzaParams = Record<string, string>;

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasById',
  async (params, thunkAPI) => {
    const { sortBy, order, category, searchQuery, currentPage } = params;

    const { data } = await axios.get<Pizza[]>(
      `https://66bc4f4f24da2de7ff69f4a8.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${searchQuery}`,
    );
    // if (data.length === 0) {
    //   return thunkAPI.rejectWithValue('Пиццы пустые');
    // }
    // return thunkAPI.fulfillWithValue(data);

    return data;
  },
);

export enum Status {
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
}

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

interface PizzaState {
  items: Pizza[];
  status: Status;
}

const initialState: PizzaState = {
  items: [],
  status: Status.PENDING,
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.PENDING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.items = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const selectPizzaSlice = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
