import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

//http req to get products
export const getProducts=createAsyncThunk('productsdata', async()=>{
    let response=await axios.get('/product-api/getproducts')
    return response.data.payload        
})


let productSlice=createSlice({
    name:'product',
    initialState:{
        products:[],
        isError:false,
        isLoading:false,
        isSuccess:false,
        errMsg:'',
    },
    reducers:{
        clearProductsData:(state)=>{
            state.isError=false;
            state.products=[];
            state.isLoading=false;
            state.isSuccess=false;
            state.errMsg='';
            return state;
        }
    },
    extraReducers:{

        //track life cycle of promise returned bt createAsyncThunk function
         [getProducts.pending]:(state,action)=>{
            state.isLoading=true;
        },
        [getProducts.fulfilled]:(state,action)=>{
            state.products=action.payload;
            state.isError=false;
            state.isLoading=false;
            state.isSuccess=true;
            state.errMsg='';
        },
        [getProducts.rejected]:(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.isSuccess=false;
            state.errMsg=action.error.message;
        }
    }
})

//export action creator
export const {clearProductsData}=productSlice.actions
//export reducer
export default productSlice.reducer