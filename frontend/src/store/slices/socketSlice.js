import {createSlice}from "@reduxjs/toolkit"

const slice=createSlice({
    name:"socket",
    initialState:{
        socket:null
    },
    reducers:{
        setSocket:(state,action)=>{
            state.socket=action.payload
        }
    }
})

export const{setSocket}=slice.actions
export default slice.reducer;