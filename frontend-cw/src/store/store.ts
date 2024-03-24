import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistStore, PURGE,
    REGISTER,
    REHYDRATE
} from 'redux-persist'

import {userSlice} from "@/store/user/user.slice";
import {cartSlice} from "@/store/cart/cart.slice";

const isClient = typeof window !== 'undefined'

const combinedReducer = combineReducers({
    /*carousel: carouselSlice.reducer,*/
    user: userSlice.reducer,
    cart: cartSlice.reducer,
})

let mainReducer = combinedReducer

if (isClient) {
    const {persistReducer} = require('redux-persist')
    const storage = require('redux-persist/lib/storage')

    const persistConfig = {
        key: 'coursework',
        storage,
        whitelist: ['cart']
    }

    mainReducer = persistReducer(persistConfig, combinedReducer)
}



export const store = configureStore({
    reducer: mainReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
})

export const persistor = persistStore(store)

export type TypeRootState = ReturnType<typeof mainReducer>