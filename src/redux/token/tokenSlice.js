import { createSlice } from '@reduxjs/toolkit'

const token = localStorage.getItem('token') ? localStorage.getItem('token') : null

const initialState = {
    value: token,
}

export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        addToken: (state, action) => {
           state.value = action.payload
           localStorage.setItem('token',action.payload)
        },
        removeToken: (state, action) => {
            state.value = null
            localStorage.removeItem('token')
        },
    },
})

// Action creators are generated for each case reducer function
export const { addToken, removeToken } = tokenSlice.actions

export default tokenSlice.reducer