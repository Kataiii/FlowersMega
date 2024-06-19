import { createAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product, ProductSize } from "../../../store/product";
import { CartProduct } from "../types";


export const addOneToCart = createAction<ProductSize>('addToCart');
export const deleteOneFromCart = createAction<Pick<ProductSize, 'id'>>('deleteFromCart');
export const addManyToCart = createAction<CartProduct<ProductSize>>('addManuToCart');
export const deleteAllFromCart = createAction('clearCart');

export const cartEntityAdapter = createEntityAdapter({
    selectId: (product: CartProduct<ProductSize>) => product.id
})



const cartSlice = createSlice({
    name: 'cart',
    initialState: cartEntityAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addOneToCart, (state, action) => {
            const item = action.payload;
            if (!item.id) return state;
            const productInCart = cartEntityAdapter.getSelectors().selectById(state, item.id);
            if (productInCart) cartEntityAdapter.updateOne(state, { id: item.id, changes: { count: productInCart.count + 1 } });
            else cartEntityAdapter.addOne(state, { ...item, count: 1, id: item.id });
            // product
        }),
            builder.addCase(deleteAllFromCart, state => {
                cartEntityAdapter.removeAll(state);
            }),
            builder.addCase(deleteOneFromCart, (state, action) => {
                const item = action.payload;
                if (!item.id) return state;
                const productInCart = cartEntityAdapter.getSelectors().selectById(state, item.id);
                if (productInCart) cartEntityAdapter.updateOne(state, { id: item.id, changes: { count: productInCart.count - 1 } });
                else cartEntityAdapter.removeOne(state, action.payload.id ?? '');
            }),
            builder.addCase(addManyToCart, (state, action) => {
                const item = action.payload;
                if (!item.id) return state;
                const productInCart = cartEntityAdapter.getSelectors().selectById(state, item.id);
                if (productInCart) cartEntityAdapter.updateOne(state, { id: item.id, changes: { count: productInCart.count + item.count } });
                else cartEntityAdapter.addOne(state, item);
            })
    }
});

export const cartReducer = cartSlice.reducer;
