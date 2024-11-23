//@ts-nocheck
import { createAction, createSlice } from "@reduxjs/toolkit";
import { ItemFilter } from "../../../store/product";

export const addMinPrice = createAction<number>('addMinPrice');
export const addMaxPrice = createAction<number>('addMaxPrice');
export const addPrices = createAction<number[]>('addPrices');
export const addOneToFilters = createAction<ItemFilter>('addToFilters');
export const addAllToFilters = createAction<ItemFilter[]>('addAllToFilters');
export const deleteOneFromFilters = createAction<Pick<ItemFilter, 'id'>>('deleteFromFilters');
export const deleteAllFromFilters = createAction('clearFilters');
export const deleteManyFromFilters = createAction<Pick<ItemFilter, 'idFilter'>>('deleteManyFromFilters');
export const selectAllFilters = (state: RootState) => state.filterSlice.itemsFilter;

type FilterState = {
    minPrice: number;
    maxPrice: number;
    itemsFilter: ItemFilter[];
};

const initialState: FilterState = {
    minPrice: 0,
    maxPrice: -1,
    itemsFilter: []
}

const filterSlice = createSlice({
    name: 'filterSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addMinPrice, (state, action) => {
            state.minPrice = action.payload;
        });
        builder.addCase(addMaxPrice, (state, action) => {
            state.maxPrice = action.payload;
        });
        builder.addCase(addPrices, (state, action) => {
            state.minPrice = action.payload[0];
            state.maxPrice = action.payload[1];
        });
        builder.addCase(addOneToFilters, (state, action) => {
            const item = action.payload;
            if (!item.id) return state;
            if (state.itemsFilter.find(item => item.id === action.payload.id) === undefined)
                state.itemsFilter.push(item);
        });
        builder.addCase(addAllToFilters, (state, action) => {
            const items = action.payload;
            items.forEach(item => {
                if (!state.itemsFilter.find(f => f.id === item.id)) {
                    state.itemsFilter.push(item);
                }
            });
        });
        builder.addCase(deleteOneFromFilters, (state, action) => {
            const item = action.payload;
            if (!item.id) return state;
            if (state.itemsFilter.find(item => item.id === action.payload.id) !== undefined)
                state.itemsFilter = state.itemsFilter.filter(i => i.id !== action.payload.id);
        });
        builder.addCase(deleteAllFromFilters, state => {
            state.itemsFilter = [];
        });
        builder.addCase(deleteManyFromFilters, (state, action) => {
            const item = action.payload;
            if (!item.idFilter) return state;
            state.itemsFilter = state.itemsFilter.filter(item => item.idFilter !== action.payload.idFilter);
        });
    }
})

export const filterReducer = filterSlice.reducer;