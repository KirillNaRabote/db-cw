import {IAddToCartPayload, ICartInitialState} from "@/store/cart/cart.type";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: ICartInitialState = {
    items: []
}

export  const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action:
        PayloadAction<IAddToCartPayload>) => {
            const isExistSize = state.items.some(
                item => item.equipment.id ===action.payload.equipment.id
            )

            if (!isExistSize)
                state.items.push({...action.payload, id: state.items.length})
        },
        removeFromCart: (
            state,
            action: PayloadAction<{id: number}>
        ) => {
            state.items = state.items.filter(item => item.id !== action.payload.id)
        },
        reset: state => {
            state.items = []
        }
    }
})