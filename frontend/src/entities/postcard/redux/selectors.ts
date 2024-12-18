import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../store/store";
import { postcardsEntityAdapter } from "./slice";

export const postcardsSelectors = postcardsEntityAdapter.getSelectors<RootState>(
    (state) => state.postcardsReducer
);

export const selectPostcardById = (state: RootState, id: string) =>
    postcardsSelectors.selectById(state, id);