import {createSlice} from "@reduxjs/toolkit"

const slice=createSlice({
    name:"resource",
    initialState:{
        homeResources:[],
        userResources:[],
    },
    reducers:{
        setHomeResources:(state,action)=>{
            state.homeList=action.payload;
        },
        addHomeResources:(state,action)=>{
            state.homeList=[...state.homeResources,action.payload];
        },

        setUserResources:(state,action)=>{
            state.homeList=action.payload;
        },
        addUserResources:(state,action)=>{
            state.userResources=[...state.userResources,action.payload];
        },
    }
})

export const {setHomeResources,addHomeResources,setUserResources,addUserResources}=slice.actions
export default  slice.reducer;