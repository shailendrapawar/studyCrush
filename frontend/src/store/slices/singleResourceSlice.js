import { createSlice } from "@reduxjs/toolkit";

const slice =createSlice({
    name:"singleResource",
    initialState:{
        currentResource:null
    },
    reducers:{
        setSingleResource:(state,action)=>{
            state.currentResource=action.payload
        },


        likeCurrentResource:(state,action)=>{
            const{resourceId,userId}=action.payload;

            if(resourceId===state.currentResource._id){
                state.currentResource.likes.push(userId);
            }
        },

        unlikeCurrentResource:(state,action)=>{
            const{resourceId,userId}=action.payload;
            if(resourceId===state.currentResource._id){
                const index=state.currentResource.likes.findIndex((item)=>item._id===userId);

                state.currentResource.likes.splice(index,1);
            }
        },
        

        addCommentCurrentResource:(state,action)=>{
            const{resourceId,newComment}=action.payload;
            if(resourceId===state.currentResource._id){
                state.currentResource.comments.unshift(newComment);
            }
        },

        // saveCurrentResource:(state,action)=>{

        //     const {resourceId}=action.payload;


        // },
        // unsaveCurrenResource:(state,action)=>{

        // }
    }
})

export const {setSingleResource,likeCurrentResource,unlikeCurrentResource,addCommentCurrentResource}=slice.actions

export default slice.reducer;