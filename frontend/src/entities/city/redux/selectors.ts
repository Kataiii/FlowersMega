import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../store/store";

export const selectActiveCity = createSelector(
    [(state: RootState) => state.cityReducer.activeCity],
    (activeCity) => activeCity
);