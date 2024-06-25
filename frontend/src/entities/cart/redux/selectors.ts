import { createSelector } from "@reduxjs/toolkit";
import { Product, ProductSize } from "../../../store/product";
import { RootState } from "../../../store/store";
import { cartEntityAdapter } from "./slice";

export const cartSelectors = cartEntityAdapter.getSelectors<RootState>(state => state.cartReducer);
export const selectTotalCount = createSelector(
    [(state: RootState) => cartSelectors.selectAll(state)],
    (items) => items.map(i => i.count).reduce((prev, curr) => prev + curr, 0)
)

export const isInCartSelector = createSelector(
    [
        //@ts-ignore
        (state: RootState, itemWithId: Pick<ProductSize, 'id'>) => cartSelectors.selectById(state, itemWithId.id)
    ],
    (item) => item != null
);