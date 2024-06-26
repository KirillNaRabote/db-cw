import * as userActions from './user/user.actions'
import {cartSlice} from "@/store/cart/cart.slice";
import {filterSlice} from "@/store/filters/filters.slice";

export const rootActions = {
    ...userActions,
    ...cartSlice.actions,
    ...filterSlice.actions
}