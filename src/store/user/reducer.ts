import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserType} from 'store/user/user';

const initialState = {
    user: null,
    loading: false,
    error: null
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        loginstart:(state,action:PayloadAction<string>)=>{
            state.loading = true
        },
        loginsucces:(state,action:PayloadAction<string>)=>{

        },
        logoutfailed:(state,action:PayloadAction<string>)=>{}
         
    }
})

const userReducers = userSlice.reducer
const userAction = userSlice.actions

export {userReducers,userAction}