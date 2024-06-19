import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { categoryApi } from "./category";
import { cityApi } from "./city";
import { filterApi } from "./filter";
import { itemFilterApi } from "./itemFilter";
import { userApi } from "./user";

const rootReducer = combineReducers({
    // favoritesReducer,
    // cartReducer,
    // credentialReducer,
    [cityApi.reducerPath]: cityApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    // [filterApi.reducerPath]: filterApi.reducer
    // [itemFilterApi.reducerPath]: itemFilterApi.reducer
    // [userApi.reducerPath]: userApi.reducer
});

const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        //@ts-ignore
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
            .concat({...cityApi.middleware, ...categoryApi.middleware})
            // .concat(categoryApi.middleware)
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