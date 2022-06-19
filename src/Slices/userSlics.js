//import createSlice
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

//make http post req to login user
export const userLogin=createAsyncThunk('loginuser', async(userCredObj,thunkApi)=>{
    let response=await axios.post('/user-api/login',userCredObj)
    let data=response.data
    //if login successful
    if(data.message==="Login Success"){
        //store token in local storage of browser
        localStorage.setItem("token",data.payload)
        return data.userObj
    }
    //if login is not successful
    if(data.message==="Invalid username" || data.message=="Invalid Password"|| data.message=="Wrong UserType" ){
        return thunkApi.rejectWithValue(data)
    }
})

let userSlice=createSlice({
    name:'user',
    initialState:{
        userObj:{},
        isError:false,
        isLoading:false,
        isSuccess:false,
        errMsg:'',
    },
    reducers:{
        clearLoginStatus:(state)=>{
            state.isError=false;
            state.userObj={};
            state.isLoading=false;
            state.isSuccess=false;
            state.errMsg='';
            return state;
        }
    },
    extraReducers:{
        
        //track life cycle of promise returned bt createAsyncThunk function
        [userLogin.pending]:(state,action)=>{
            state.isLoading=true;
        },
        [userLogin.fulfilled]:(state,action)=>{
            state.userObj=action.payload;
            state.isError=false;
            state.isLoading=false;
            state.isSuccess=true;
            state.errMsg='';
        },
        [userLogin.rejected]:(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.isSuccess=false;
            state.errMsg=action.payload.message;
        }
    }
})

//export action creator
export const {clearLoginStatus}=userSlice.actions
//export reducer
export default userSlice.reducer