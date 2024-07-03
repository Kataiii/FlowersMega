//@ts-nocheck
import { createAction, createSlice } from "@reduxjs/toolkit";
import { City } from "../../../store/city";

export const addCity = createAction<City | null>('addCity');
export const deleteCity = createAction('deleteCity');

type CityState = {
    activeCity: City | null;
}

const initialState: CityState = {
    activeCity: null
};

const citySlice = createSlice({
    name: 'citySlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addCity, (state, action) => {
            state.activeCity = action.payload;
        }),
        builder.addCase(deleteCity, state => {
            state.activeCity = null;
        })
    }
})

export const cityReducer = citySlice.reducer;