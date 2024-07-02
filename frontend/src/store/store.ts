import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/es/storage";
import { cartReducer } from "../entities/cart/redux/slice";
import { favoritesReducer } from "../entities/favorites/redux/slice";
import { categoryApi } from "./category";
import { categoryProductApi } from "./categoryProduct";
import { cityApi } from "./city";
import { filterApi } from "./filter";
import { itemFilterApi } from "./itemFilter";
import { orderApi } from "./order";
import { orderProductSizeApi } from "./orderProductSize";
import { productApi } from "./product";
import { productSizeApi } from "./productSize";
import { reviewApi } from "./review";
import { sizeApi } from "./size";
import { typeProductApi } from "./typeProduct";
import { userApi } from "./user";

const persistConfig: PersistConfig<RootState> = {
    key: 'root',
    storage: storage,
    blacklist: ['api']
}

const rootReducer = combineReducers({
    // credentialReducer,
    cartReducer,
    favoritesReducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [categoryProductApi.reducerPath]: categoryProductApi.reducer,
    [cityApi.reducerPath]: cityApi.reducer,
    [filterApi.reducerPath]: filterApi.reducer,
    [itemFilterApi.reducerPath]: itemFilterApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [orderProductSizeApi.reducerPath]: orderProductSizeApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [productSizeApi.reducerPath]: productSizeApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [sizeApi.reducerPath]: sizeApi.reducer,
    [typeProductApi.reducerPath]: typeProductApi.reducer,
    [userApi.reducerPath]: userApi.reducer
});

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

const setupStore = () => {
    return configureStore({
        reducer: persistedRootReducer,
        //@ts-ignore
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
            .concat(categoryApi.middleware)
            .concat(categoryProductApi.middleware)
            .concat(cityApi.middleware)
            .concat(filterApi.middleware)
            .concat(itemFilterApi.middleware)
            .concat(orderApi.middleware)
            .concat(orderProductSizeApi.middleware)
            .concat(productApi.middleware)
            .concat(productSizeApi.middleware)
            .concat(reviewApi.middleware)
            .concat(sizeApi.middleware)
            .concat(typeProductApi.middleware)
            .concat(userApi.middleware)
    });
}

export const store = setupStore();
export const persistor = persistStore(store);
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']