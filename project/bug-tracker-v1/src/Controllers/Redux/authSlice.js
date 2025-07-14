import {createSlice} from '@reduxjs/toolkit';
import { act } from 'react';

const slice=createSlice({
    name: 'auth',
    initialState: {
        user: null,
        LoggedIn: false,
    },
    reducers: {
        signIn: (state, action) => {
            const {name,password}=action.payload;
            state.LoggedIn=true;
            state.admin=true;
        },
        signOut: (state) => {
            state.LoggedIn=false;
            state.admin=false;
        },
        createUser:(state,action)=>{ 

        }
    }
})
export default slice.reducer;
export const {signIn,signOut,createUser}=slice.actions;