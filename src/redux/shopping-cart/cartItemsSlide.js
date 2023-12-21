import { createSlice } from '@reduxjs/toolkit'

const items = localStorage.getItem('cartItems') !== null ? JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
    value: items,
}

export const cartItemsSlice = createSlice({
    name: 'cartItems',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload
            const duplicated = state.value.find(item => item.productDetailId === newItem.productDetailId)
            if(duplicated) {
                duplicated.quantity += newItem.quantity;
            } else {
                state.value.unshift(newItem)
            }
            localStorage.setItem('cartItems', JSON.stringify(state.value))
        },
        updateItem: (state, action) => {
            const updateItem = action.payload;
            if(updateItem.quantity <= 0)
                state.value = state.value.filter(item => item.productDetailId !== updateItem.productDetailId)
            else {
                const duplicated = state.value.find(item => item.productDetailId === updateItem.productDetailId)
                if(duplicated) {
                    duplicated.quantity = updateItem.quantity;
                } 
            }
            localStorage.setItem('cartItems', JSON.stringify(state.value))
        },
        removeItem: (state, action) => {
            state.value = state.value.filter(item => item.productDetailId !== action.payload.productDetailId)
            localStorage.setItem('cartItems', JSON.stringify(state.value))
        },
        removeAll: (state, action) => {
            state.value = []
            localStorage.removeItem('cartItems')
        }
    },
})

// Action creators are generated for each case reducer function
export const { addItem, removeItem, updateItem, removeAll } = cartItemsSlice.actions

export default cartItemsSlice.reducer