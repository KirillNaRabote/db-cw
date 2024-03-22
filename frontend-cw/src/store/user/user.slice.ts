import {IInitialState} from "@/store/user/user.interface";
import {createSlice} from "@reduxjs/toolkit";
import {checkAuth, login, logout, register} from "@/store/user/user.actions";
import {getStoreLocal} from "@/utils/local-storage";

const initialState: IInitialState = {
    user: getStoreLocal('user'),
    isLoading: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(register.pending, state => {
            state.isLoading = true
        })
            .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload.user
        })
            .addCase(register.rejected, state => {
            state.isLoading = false
        })
            .addCase(login.pending, state => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, {payload}) => {
                state.isLoading = false
                state.user = payload.user
            })
            .addCase(login.rejected, state => {
                state.isLoading = false
                state.user = null
            })
            .addCase(logout.fulfilled, state => {
                state.isLoading = false
                state.user = null
            })
            .addCase(checkAuth.fulfilled, (state, {payload}) => {
                state.user = payload.user
            })
    }
})