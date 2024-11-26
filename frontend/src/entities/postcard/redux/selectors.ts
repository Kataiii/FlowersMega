import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../store/store";
import { postcardsEntityAdapter } from "./slice";

export const postcardsSelectors = postcardsEntityAdapter.getSelectors<RootState>(
    (state) => state.postcardsReducer
);

export const selectPostcardsByProductSize = createSelector(
    [
        postcardsSelectors.selectAll,
        (state: RootState, idProductSize: number) => idProductSize,
    ],
    (postcards, idProductSize) =>
        postcards.filter((postcard) => postcard.idProductSize === idProductSize)
);

export const selectPostcardById = (state: RootState, id: number) =>
    postcardsSelectors.selectById(state, id);