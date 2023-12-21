import { configureStore } from '@reduxjs/toolkit'

import productModalReducer from './product-modal/productModalSlice'

import cartItemsReducer from './shopping-cart/cartItemsSlide'
import tokenReducer from './token/tokenSlice'

export const store = configureStore({
    reducer: {
        productModal: productModalReducer,
        cartItems: cartItemsReducer,
        token: tokenReducer,
    },
})