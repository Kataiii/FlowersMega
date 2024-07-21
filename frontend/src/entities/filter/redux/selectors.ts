import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../store/store";

export const selectMinPrice = createSelector(
    [(state: RootState) => state.filterReducer.minPrice],
    (minPrice) => minPrice
);

export const selectMaxPrice = createSelector(
    [(state: RootState) => state.filterReducer.maxPrice],
    (maxPrice) => maxPrice
);

export const selectFilters = createSelector(
    [(state: RootState) => state.filterReducer.itemsFilter],
    (itemsFilter) => itemsFilter
);