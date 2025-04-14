import {createSlice} from "@reduxjs/toolkit"

const slice=createSlice({
    name:"resource",
    initialState:{
        homeResources:{
            list:[],
            hasMore:true
        },
        userResources:[],
    },

    reducers:{
        setHomeResources:(state,action)=>{
            const{list,hasMore}=action.payload;
            state.homeResources.list=list
            state.homeResources.hasMore=hasMore
        },
        
        addHomeResources:(state,action)=>{
            state.homeResources.list=[...state.homeResources,action.payload];
        },

        setUserResources:(state,action)=>{
            state.userResources=action.payload;
        },
        addUserResources:(state,action)=>{
            state.userResources=[...state.userResources,action.payload];
        },

        // reducers for handling post update=

        likePost:(state,action)=>{
            const{postId,userId}=action.payload
            const post=state.homeResources.list.find((item)=>item._id===postId)
            post.likes.push(userId)
        },

        unlikePost:(state,action)=>{
            const{postId,userId}=action.payload
            const post=state.homeResources.list.find((item)=>item._id===postId)
            post.likes=post.likes.filter((item)=>item!=userId)
        },
    }
})

export const {setHomeResources,addHomeResources,setUserResources,addUserResources,likePost,unlikePost}=slice.actions
export default  slice.reducer;