import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'


//http req to get products
export const CartItems=createAsyncThunk('cartproductsdata', async(name)=>{
    let response=await axios.get(`http://localhost:4000/cart-api/getcartitems/${name}`)
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
    reducers:{
        clearCartItems:(state)=>{
            state.isError=false;
            state.cartItems=[];
            state.isLoading=false;
            state.isSuccess=false;
            state.errMsg='';
            return state;
        }
    },
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
export const {clearCartItems}=cartSlice.actions
//export reducer
export default cartSlice.reducer