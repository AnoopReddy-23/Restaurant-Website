import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

//make http put req to update user
export const updateUser = createAsyncThunk(
  'updateuser',
  async (modifiedUser, thunkApi) => {
    try {
      let response = await axios.put('/user-api/update-user', modifiedUser)
      return response.data.payload
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  },
)

//make http post req to login user
export const userLogin = createAsyncThunk(
  'loginuser',
  async (userCredObj, thunkApi) => {
    try {
      let response = await axios.post('/user-api/login', userCredObj)
      let data = response.data
      //if login successful
      if (data.message === 'Login Success') {
        //store token in local storage of browser
        localStorage.setItem('token', data.payload)
        return data.userObj
      }
      //if login is not successful
      if (
        data.message === 'Invalid username' ||
        data.message === 'Invalid Password' ||
        data.message === 'Wrong UserType'
      ) {
        return thunkApi.rejectWithValue(data)
      }
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response.data || { message: error.message },
      )
    }
  },
)

let userSlice = createSlice({
  name: 'user',
  initialState: {
    userObj: JSON.parse(localStorage.getItem('userObj')) || {},
    isError: false,
    isLoading: false,
    isSuccess: localStorage.getItem('userObj') ? true : false,
    errMsg: '',
  },
  reducers: {
    clearLoginStatus: (state) => {
      localStorage.removeItem('userObj');
      localStorage.removeItem('token');
      state.isError = false
      state.userObj = {}
      state.isLoading = false
      state.isSuccess = false
      state.errMsg = ''
      return state
    },
  },
  extraReducers: {
    //track life cycle of promise returned bt createAsyncThunk function
    [userLogin.pending]: (state, action) => {
      state.isLoading = true
    },
    [userLogin.fulfilled]: (state, action) => {
      // Persist user object
      localStorage.setItem('userObj', JSON.stringify(action.payload));
      state.userObj = action.payload
      state.isError = false
      state.isLoading = false
      state.isSuccess = true
      state.errMsg = ''
    },
    [userLogin.rejected]: (state, action) => {
      state.isError = true
      state.isLoading = false
      state.isSuccess = false
      state.errMsg = action.payload.message
    },
    [updateUser.pending]: (state, action) => {
      state.isLoading = true
    },
    [updateUser.fulfilled]: (state, action) => {
      // Update persisted user object
      localStorage.setItem('userObj', JSON.stringify(action.payload));
      state.userObj = action.payload
      state.isLoading = false
      state.isError = false
      state.errMsg = ''
    },
    [updateUser.rejected]: (state, action) => {
      state.isError = true
      state.isLoading = false
      state.errMsg = action.payload.message
    },
  },
})

//export action creator
export const { clearLoginStatus } = userSlice.actions
//export reducer
export default userSlice.reducer
