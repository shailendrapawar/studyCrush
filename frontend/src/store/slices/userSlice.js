import {createSlice} from "@reduxjs/toolkit"

const slice=createSlice({
    name:"user",
    initialState:{
        authUser:null,
        userNotifications:[]

    },
    reducers:{
        setAuthUser:(state,action)=>{
            state.authUser=action.payload;
        },
        setUserNotification:(state,action)=>{
            state.userNotifications=[...state.userNotifications,action.payload];
        }
    }
})

export const {setAuthUser,setUserNotification}=slice.actions

export default slice.reducer;