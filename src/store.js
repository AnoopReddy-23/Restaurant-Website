//import configureStore
import {configureStore} from '@reduxjs/toolkit'
//import userSlice
import userReducer from './Slices/userSlics'

//export store
export const store=configureStore({
    reducer:{
        user:userReducer
    }
})