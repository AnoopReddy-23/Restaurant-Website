//import configureStore
import {configureStore} from '@reduxjs/toolkit'
//import userSlice
import userReducer from './Slices/userSlics'
//import cartSlice
import cartReducer from './Slices/cartSlice'
//import cartSlice
import productReducer from './Slices/productSlice'

//export store
export const store=configureStore({
    reducer:{
        user:userReducer,
        cart:cartReducer,
        product:productReducer
    }
})