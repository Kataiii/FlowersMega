import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { cartReducer } from "../entities/cart/redux/slice";
import { favoritesReducer } from "../entities/favorites/redux/slice";
import { categoryApi } from "./category";
import { categoryProductApi } from "./categoryProduct";
import { productApi } from "./product";
import { productSizeApi } from "./productSize";
import { sizeApi } from "./size";

const rootReducer = combineReducers({
    // favoritesReducer,
    // cartReducer,
    // credentialReducer,
    cartReducer,
    favoritesReducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [categoryProductApi.reducerPath]: categoryProductApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [productSizeApi.reducerPath]: productSizeApi.reducer,
    [sizeApi.reducerPath]: sizeApi.reducer
});

const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        //@ts-ignore
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
            // .concat(cityApi.middleware)
            .concat(categoryApi.middleware)
            .concat(categoryProductApi.middleware)
            .concat(productApi.middleware)
            .concat(productSizeApi.middleware)
            .concat(sizeApi.middleware)
            // .concat(filterApi.middleware)
            // .concat(itemFilterApi.middleware)
            // .concat(userApi.middleware)
    });
}

export const store = setupStore();
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']