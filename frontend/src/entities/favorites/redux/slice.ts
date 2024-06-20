//@ts-nocheck
import { createAction, createEntityAdapter, createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from "@reduxjs/toolkit/query";
import { Product, ProductSize } from "../../../store/product";


export const addFavorite = createAction<ProductSize>('addFavorite');
export const deleteFavorite = createAction<Pick<ProductSize, 'id'>>('deleteFavorite');




export const favoritesEntitiyAdapter = createEntityAdapter({
    selectId: (e: ProductSize) => e.id
})

const favoriteSlice = createSlice({
    name: 'favorites',
    initialState: favoritesEntitiyAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addFavorite, (state, action) => {
            const favoriteItem = action.payload;
            if (favoriteItem.id) favoritesEntitiyAdapter.addOne(state, favoriteItem);
        }),
            builder.addCase(deleteFavorite, (state, action) => {
                favoritesEntitiyAdapter.removeOne(state, action.payload.id ?? '');
            })
    }

})

export const favoritesReducer = favoriteSlice.reducer;