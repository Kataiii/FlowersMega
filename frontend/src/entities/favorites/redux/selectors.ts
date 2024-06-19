import { createSelector } from "@reduxjs/toolkit";
import { Product, ProductSize } from "../../../store/product";
import { RootState } from "../../../store/store";
import { favoritesEntitiyAdapter } from "./slice";

export const favoritesSelectors = favoritesEntitiyAdapter.getSelectors<RootState>(state => state.favoritesReducer);
export const isFavoriteSelector = createSelector(
    [
        (state: RootState, itemWithId: Pick<ProductSize, 'id'>) => favoritesSelectors.selectById(state, itemWithId.id ?? '')
    ],
    (item) => item != null
)