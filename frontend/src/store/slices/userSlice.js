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
            state.userNotifications=action.payload;
        },

        saveResource:(state,action)=>{
            console.log("save called")
            const postId=action.payload;
            state.authUser.savedResources.push(postId)
            
        },
        unsaveResource:(state,action)=>{
            console.log("unsave called")
            const postId=action.payload;
            const filteredResources=state.authUser.savedResources.filter((item)=>item!=postId);
            state.authUser.savedResources=filteredResources
        },

    }
})

export const {setAuthUser,setUserNotification,unsaveResource,saveResource}=slice.actions

export default slice.reducer;