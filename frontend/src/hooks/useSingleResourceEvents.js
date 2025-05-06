import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addCommentCurrentResource,likeCurrentResource,unlikeCurrentResource } from "../store/slices/singleResourceSlice";

const useSingleResourceEvents = (resourceId) => {

    const{socket}=useSelector(s=>s.socket);
    const { currentResource } = useSelector(s => s.singleResource)

    const{authUser}=useSelector(s=>s.user);

    const dispatch=useDispatch();

    useEffect(()=>{
        if(!socket||!resourceId)return

        // #= joining single reosurce room=========
        socket?.emit("join-singleResource-room",resourceId)

        // 1:- for getting real time comments=======
        socket?.on("singleResource-newComment",(newComment)=>{
            // console.log(newComment)
            if(newComment&&(newComment?.user?._id!=authUser?._id)){
                // console.log("daldo commment")
                dispatch(addCommentCurrentResource({resourceId,newComment}))
            }
        })


        // 2:- for liking in real times=========
        socket?.on("singleResource-like",(userId)=>{
            if(userId&&(authUser?._id!==userId)){
                dispatch(likeCurrentResource({resourceId,userId}))
            }
        })

        // 3:- for unliking inreal time=========
        socket?.on("singleResource-unlike",(userId)=>{
            if(userId&&(authUser?._id!==userId)){
                dispatch(unlikeCurrentResource({resourceId,userId}))
            }
        })

        return ()=>{
            socket?.emit("leave-singleResource-room",resourceId)
            // socket?.off("join-singleResource-room")
            socket.off("singleResource-newComment")

            socket.off("singleResource-like");
            socket.off("singleResource-unlike");

        }
    },[socket,resourceId])
}
export default useSingleResourceEvents