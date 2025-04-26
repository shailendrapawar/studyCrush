import { createSlice } from "@reduxjs/toolkit"

const slice=createSlice({
    name:"search",
    initialState:{
        list:[],
        hasMore:true
    },
    reducers:{
        setSearchList:(state,action)=>{
            state.list=action.payload;
        }
    }
})

export const {setSearchList} =slice.actions;
export default slice.reducer;