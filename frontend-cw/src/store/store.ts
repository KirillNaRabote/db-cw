import { combineReducers, configureStore } from '@reduxjs/toolkit'

import {
    FLUSH,
    PAUSE,
    PERSIST, persistReducer,
    persistStore, PURGE,
    REGISTER,
    REHYDRATE
} from 'redux-persist'

import storage from'redux-persist/lib/storage'
/*import { carouselSlice } from './carousel/carousel.slice'*/
import {userSlice} from "@/store/user/user.slice";
import {cartSlice} from "@/store/cart/cart.slice";

const persistConfig = {
    key: 'coursework',
    storage,
    whitelist: []
}

const rootReducer = combineReducers({
    /*carousel: carouselSlice.reducer,*/
    user: userSlice.reducer,
    cart: cartSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
})

export const persistor = persistStore(store)

export type TypeRootState = ReturnType<typeof rootReducer>