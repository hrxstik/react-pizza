import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type Sort = {
  name: string;
  value: SortValue;
};
export enum SortValue {
  RATING_ASC = 'rating',
  RATING_DESC = '-rating',
  PRICE_ASC = 'price',
  PRICE_DESC = '-price',
  TITLE_ASC = 'title',
  TITLE_DESC = '-title',
}
export interface FilterState {
  categoryId: number;
  searchValue: string;
  currentPage: number;
  sort: Sort;
}

const initialState: FilterState = {
  categoryId: 0,
  searchValue: '',
  currentPage: 1,
  sort: { name: 'популярности', value: SortValue.RATING_ASC },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterState>) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
  },
});

export const selectSort = (state: RootState) => state.filter.sort;
export const selectFilter = (state: RootState) => state.filter;

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
