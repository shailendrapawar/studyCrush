import {createSlice} from "@reduxjs/toolkit"

const slice=createSlice({
    name:"user",
    initialState:{
        authUser:null,
        userNotifications:[],

        userSavedResources:[],
        savedResourcesDetails:[],

        userUploadedResources:[]

    },
    reducers:{
        setAuthUser:(state,action)=>{
            state.authUser=action.payload;
        },
        setUserNotification:(state,action)=>{
            state.userNotifications=action.payload;
        },

        setUserUploadedResources:(state,action)=>{
            state.userUploadedResources=action.payload
        },

        setSavedResourcesDetails:(state,action)=>{
            state.savedResourcesDetails=action.payload
        },


        
        //=====toggling saving resource============
        saveResource:(state,action)=>{
            console.log("save called")
            const postId=action.payload;
            state.userSavedResources.push(postId)
        },

        unsaveResource:(state,action)=>{
            console.log("unsave called")
            const postId=action.payload;
            const filteredResources=state.userSavedResources.filter((item)=>item!=postId);
            state.userSavedResources=filteredResources

            //== removing from savedResourcesDetails===
            const index=state.savedResourcesDetails.findIndex((item)=>item._id===action.payload);
            if(index!=-1){
                state.savedResourcesDetails.splice(index,1)
            }
        },

    }
})

export const {setAuthUser,setUserNotification,unsaveResource,saveResource,setSavedResourcesDetails,setUserUploadedResources}=slice.actions

export default slice.reducer;