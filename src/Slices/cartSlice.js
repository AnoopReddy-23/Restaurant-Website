import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'


//http req to get products
export const CartItems=createAsyncThunk('cartproductsdata', async()=>{
    let response=await axios.get('/cart-api/getcartitems')
    return response.data.payload
        
})

let cartSlice=createSlice({
    name:'cart',
    initialState:{
        cartItems:[],
        isError:false,
        isLoading:false,
        isSuccess:false,
        errMsg:'',
    },
    reducers:{},
    extraReducers:{
         //track life cycle of promise returned bt createAsyncThunk function
         [CartItems.pending]:(state,action)=>{
            state.isLoading=true;
        },
        [CartItems.fulfilled]:(state,action)=>{
            state.cartItems=action.payload;
            state.isError=false;
            state.isLoading=false;
            state.isSuccess=true;
            state.errMsg='';
        },
        [CartItems.rejected]:(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.isSuccess=false;
            state.errMsg=action.error.message;
            //console.log(action)
        }
    }
})

//export action creator
export const {}=cartSlice.actions
//export reducer
export default cartSlice.reducer