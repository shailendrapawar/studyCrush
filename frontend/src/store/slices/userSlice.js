import {createSlice} from "@reduxjs/toolkit"
import {toast} from "react-hot-toast"
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
        //set initial notification======
        setUserNotification:(state,action)=>{
            state.userNotifications=action.payload;
        },

        //add new notification=====
        addUserNotification:(state,action)=>{
            state.userNotifications.unshift(action.payload)
        },

        //mark notifications read=========
        markUsernotificationRead:(state,action)=>{
            state.userNotifications.forEach((notify)=>{
                notify.isRead=true;
            })
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


        removeUploadedResource:(state,action)=>{

            const resourceId=action.payload;
            const index=state.userUploadedResources.findIndex((item)=>item._id===resourceId);

            if(index!=-1){
                state.userUploadedResources.splice(index,1);
                toast.success("Resource deleted");
            }

        }

    }
})

export const {setAuthUser,setUserNotification,addUserNotification,markUsernotificationRead,unsaveResource,saveResource,setSavedResourcesDetails,setUserUploadedResources,removeUploadedResource}=slice.actions

export default slice.reducer;