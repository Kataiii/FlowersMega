import { createEntityAdapter, createSlice, createAction } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
import { text } from "stream/consumers";

interface Postcard {
    id: string;
    text: string;
    updatedId: string
}

export const addPostcard = createAction<Pick<Postcard, "text">>("postcards/addPostcard");
export const removePostcard = createAction<{ id: string }>("postcards/removePostcard");
export const updatePostcard = createAction<{ id: string; text: string }>("postcards/updatePostcard");
export const updatePostcardId = createAction<{ oldId: string; newId: string }>("postcards/updatePostcardId");
export const clearStore = createAction("store/clearStore");

export const postcardsEntityAdapter = createEntityAdapter({
    selectId: (postcard: Postcard) => postcard.id,
});
const postcardSlice = createSlice({
    name: "postcards",
    initialState: postcardsEntityAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addPostcard, (state, action) => {
                const newPostcard = {
                    id: nanoid(),
                    text: action.payload.text,
                    updatedId: '',
                };
                postcardsEntityAdapter.addOne(state, newPostcard);
            })
            .addCase(removePostcard, (state, action) => {
                postcardsEntityAdapter.removeOne(state, action.payload.id);
            })
            .addCase(updatePostcard, (state, action) => {
                postcardsEntityAdapter.updateOne(state, {
                    id: action.payload.id,
                    changes: {
                        text: action.payload.text,
                    },
                });

            })
            .addCase(updatePostcardId, (state, action) => {
                const { oldId, newId } = action.payload;
                const postcard = state.entities[oldId];
                if (postcard) {
                    postcardsEntityAdapter.updateOne(state, {
                        id: oldId,
                        changes: {
                            updatedId: newId,
                        },
                    });
                }
            })
            .addCase(clearStore, (state) => {
                postcardsEntityAdapter.removeAll(state);
            });

    },
});

export const postcardsReducer = postcardSlice.reducer;

export const postcardsSelectors = postcardsEntityAdapter.getSelectors(
    (state: { postcards: ReturnType<typeof postcardsReducer> }) => state.postcards
);
