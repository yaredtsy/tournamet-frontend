import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { ConfirmationResult, User, } from 'firebase/auth';
import {UserStateType} from 'store/user/user';


const initialState:UserStateType = {
    user: null,
    isLoading: false,
    error: '',
    firebaseConfirmation: null, 
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        loginstart:(state,action:PayloadAction<string>)=>{
            state.isLoading = true

        },
        loginsuccess:(state,action:PayloadAction<ConfirmationResult|null>)=>{
            state.firebaseConfirmation = action.payload
            state.isLoading = false;
        },
        logoutfailed:(state,action:PayloadAction<string>)=>{
            state.error = action.payload;
        },

        otpConfirmStart:(state,action:PayloadAction<{otpCode:string,firebaseConfirmation:ConfirmationResult|null}>)=>{
            state.isLoading = true;
        },
        otpConfirmSuccess:(state,action:PayloadAction<User>)=>{
        
            state.user = action.payload
        },
        otpConfirmFailed:(state,action:PayloadAction<string>)=>{
            state.error = action.payload
        },
        logoutStart:(state,action:PayloadAction<string>)=>{
            state.isLoading = true;
        },
        logoutSuccess:(state)=>{
            state.isLoading = false;
            state.firebaseConfirmation = null;
            state.user = null;
        },
        logoutFailed:(state,action:PayloadAction<string>)=>{
            state.isLoading = false;
        }
    }
})

const userReducers = userSlice.reducer
const userAction = userSlice.actions

export {userReducers,userAction}