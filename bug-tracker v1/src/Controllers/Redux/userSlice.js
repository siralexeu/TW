import {createSlice} from '@reduxjs/toolkit';

const slice=createSlice({
    name: 'user',
    initialState: [{}],
    reducers: {
        getUser:(state)=>{
            state.push({name:'Ryan Gosling'})
            state.push({name:'John Wick'})
        }
    }
})
export default slice.reducer;
export const {getUser}=slice.actions;