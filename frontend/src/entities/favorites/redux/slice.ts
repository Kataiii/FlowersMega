//@ts-nocheck
import { createAction, createEntityAdapter, createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from "@reduxjs/toolkit/query";
import { FullProductSizeDto, Product, ProductSize } from "../../../store/product";


export const addFavorite = createAction<ProductCatalogCard>('addFavorite');
export const deleteFavorite = createAction<Pick<ProductCatalogCard, 'id'>>('deleteFavorite');


export const favoritesEntitiyAdapter = createEntityAdapter<ProductCatalogCard>({
    selectId: (e) => e.id ?? ''
});

const favoriteSlice = createSlice({
    name: 'favorites',
    initialState: favoritesEntitiyAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addFavorite, (state, action) => {
            const favoriteItem = action.payload;
            if (favoriteItem.id) favoritesEntitiyAdapter.addOne(state, favoriteItem);
        });
        builder.addCase(deleteFavorite, (state, action) => {
            favoritesEntitiyAdapter.removeOne(state, action.payload.id ?? '');
        });
    }
});

export const favoritesReducer = favoriteSlice.reducer;