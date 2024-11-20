import { createEntityAdapter, createSlice, createAction } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

interface Postcard {
    id: number;
    idProductSize: number;
    text: string;
}


export const addPostcard = createAction<Omit<Postcard, 'id'>>("addPostcard");
export const updatePostcard = createAction<Postcard>("updatePostcard");
export const removePostcard = createAction<{ id: number }>("removePostcard");


export const postcardsEntityAdapter = createEntityAdapter({
    selectId: (postcard: Postcard) => postcard.id,
});


const postcardSlice = createSlice({
    name: "postcards",
    initialState: postcardsEntityAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addPostcard, (state, action) => {
            postcardsEntityAdapter.addOne(state, {
                ...action.payload,
                id: Number(`${action.payload.idProductSize}-${nanoid()}`),
            });
        });
        builder.addCase(updatePostcard, (state, action) => {
            const { id, text } = action.payload;
            postcardsEntityAdapter.updateOne(state, {
                id,
                changes: { text },
            });
        });
        builder.addCase(removePostcard, (state, action) => {
            postcardsEntityAdapter.removeOne(state, action.payload.id);
        });
    },
});


export const postcardsReducer = postcardSlice.reducer;
