import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: "resource",
    initialState: {
        homeResources: {
            list: [],
            hasMore: true
        },
    },

    reducers: {
        setHomeResources: (state, action) => {
            const { list, hasMore } = action.payload;
            state.homeResources.list = list
            state.homeResources.hasMore = hasMore
        },

        addHomeResources: (state, action) => {
            const { list, hasMore } = action.payload;
            // console.log(action.payload)
            state.homeResources.list=[...state.homeResources.list,...list]
            state.homeResources.hasMore=hasMore
        },

        addUserResources: (state, action) => {
            state.userResources = [...state.userResources, action.payload];
        },


        // reducers for handling post update===============
        likePost: (state, action) => {
            const { postId, userId } = action.payload
            const post = state.homeResources.list.find((item) => item._id === postId)
            post.likes.push(userId)
        },

        unlikePost: (state, action) => {
            const { postId, userId } = action.payload
            const post = state.homeResources.list.find((item) => item._id === postId)
            post.likes = post.likes.filter((item) => item != userId)
        },

        setResourceComments: (state, action) => {
            const{resourceId,comments}=action.payload
            const resource = state.homeResources.list.find((item) => item._id === resourceId);
            if (resource) {
                resource.commentsData = comments;
                return
            }
        },

        addResourceComment:(state,action)=>{
            const {resourceId,newComment}=action.payload;

            const resource=state.homeResources.list.find((item)=>item._id===resourceId);

            resource.commentsData.unshift(newComment);
            resource.comments.push(newComment._id)
        }
    }
})

export const { setHomeResources, addHomeResources, setUserResources, addUserResources, likePost, unlikePost, setResourceComments,addResourceComment } = slice.actions
export default slice.reducer;