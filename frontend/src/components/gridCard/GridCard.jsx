import { TiHeartFullOutline } from "react-icons/ti";

import { HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";
import { useNavigate } from "react-router";

import { FaBookmark } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";

import axios from "axios"
import { useDispatch } from "react-redux";
import { unsaveResource,removeUploadedResource } from "../../store/slices/userSlice";

import { AiFillDelete } from "react-icons/ai";
import React from "react";
const GridCard = ({ data, source }) => {
    // console.log(data)
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const removeSavedResource = async () => {
        // e.stopPropogation()

        const res = await axios.post(import.meta.env.VITE_API_URL + `/resource/toggleLike/${data._id}`, {}, {
            withCredentials: true
        });
        // console.log(res)
        if (res) {
            dispatch(unsaveResource(data._id))
        }
    }

    const deleteResource = async () => {
        const choice = confirm(`delete resource?`)
        console.log(choice)

        if (!choice) return;

        try{
            const res=await axios.post(import.meta.env.VITE_API_URL+`/resource/deleteResource/${data._id}`,{},{
                withCredentials:true
           })
   
           if(res){
            //    console.log(res)
               dispatch(removeUploadedResource(data._id))
           }

        }catch(err){
            console.log(err)
        }

    }


    return (
        <div className="h-40 w-auto sm:h-45 relative rounded-md overflow-hidden cursor-pointer "
            onClick={() => navigate(`/user/resource/${data._id}`)}
        >
            <img src={data?.thumbnail} className="h-full w-full object-cover"></img>

            <span className="bg-white rounded-full w-10 h-5 absolute left-1 bottom-3 flex justify-center items-center ">
                <TiHeartFullOutline className="h-4 w-4 text-pink-600" /><b className="text-black text-xs">{data?.likes?.length}</b>
            </span>

            <span className="bg-white rounded-full w-10 h-5 absolute left-14 bottom-3 flex justify-center items-center ">
                <HiOutlineChatBubbleLeftEllipsis className="h-4 w-4 text-pink-600" /><b className="text-black text-xs">{data?.comments?.length}</b>
            </span>

            {source != "public" && <span className="bg-white rounded-full w-5 h-8 absolute p-1 right-2 top-2 flex justify-center items-center hover:shadow-md hover:scale-110 shadow-black ">
                {source === "saved" && (<FaBookmark onClick={(e) => {
                    e.stopPropagation();
                    removeSavedResource()
                }} className="h-full w-full text-gray-500" />)}

                {source === "uploaded" && (<AiFillDelete onClick={(e) => {
                    e.stopPropagation();
                    // removeSavedResource()
                    deleteResource()
                }} className="h-full w-full text-red-500" />)}
            </span>
            }

        </div>
    )
}
export default React.memo(GridCard)