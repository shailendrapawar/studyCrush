import "./homeResourceCard.css"
import { useDispatch, useSelector } from "react-redux"

import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";

import { FaExternalLinkAlt } from "react-icons/fa";

import { HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";

import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import axios from "axios";

import { likePost, unlikePost } from "../../store/slices/resourceSlice";
import { saveResource,unsaveResource } from "../../store/slices/userSlice";
const HomeResourceCard = ({ data }) => {
    const dispatch = useDispatch();

    const { currentTheme } = useSelector(s => s.theme);
    const { authUser } = useSelector(s => s.user)

    const toggleLike = async () => {
        try {
            const isToggled = await axios.post(import.meta.env.VITE_API_URL + `/resource/toggleLike/${data._id}`, {}, {
                withCredentials: true
            });
            // console.log(isToggled)
            if (isToggled) {

                if (isLiked) {
                    dispatch(unlikePost({ postId: data._id, userId: authUser._id }))
                } else {
                    dispatch(likePost({ postId: data._id, userId: authUser._id }))

                }

            }
        } catch (err) {
            console.log(err)
        }
    }


    const toggleSave = async () => {
        const isToggled=await axios.post(import.meta.env.VITE_API_URL+`/auth/toggleSaveResource/${data._id}`,{},{
            withCredentials:true
        })
        console.log(isToggled)
        if(isToggled){
            if(isSaved){
                dispatch(unsaveResource(data._id))

            }else{
                dispatch(saveResource(data._id))
            }
        }
    }


    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }
    const isLiked = data?.likes?.includes(authUser?._id)
    const isSaved = authUser?.savedResources?.includes(data?._id)
// console.log(isSaved)
    return (
        <div className=" homeResource-card h-40 w-full max-w-150 bg-green-500 rounded-md p-1.5 flex gap-2 cursor-pointer" style={{ backgroundColor: currentTheme.cardBackground, border: `1px solid ${currentTheme.line}` }}>

            <section className="image-container w-[40%] h-full">
                <img src={data?.thumbnail} className="bg-trasparent h-full w-full object-cover">
                </img>
            </section>

            <section className=" description-container w-[60%] h-full  flex flex-col justify-center gap-1 relative">

                <a href={`${data.link}`} target="_blank"><FaExternalLinkAlt className="absolute top-2 right-2"></FaExternalLinkAlt></a>

                <h3 className="text-sm max-w-full" style={{ color: currentTheme.textPrimary }}>{data?.title}</h3>
                <p className=" text-xs max-w-full h-auto truncate" style={{ color: currentTheme.textSecondary }}>{data?.description}</p>

                <span className="text-sm font-light pl-2 mt-2" style={{ color: currentTheme.textSecondary }}>By {data?.uploadedBy?.name?.toUpperCase()}<b> • </b>{formatDate(data?.createdAt)}</span>


                <div className="h-10 flex flex-row items-center justify-start gap-5 relative pl-2 mt-2 ">
                    <span className="h-6 flex gap-1 items-center">{isLiked ? <GoHeartFill onClick={toggleLike} className=" h-6 w-6 text-red-500" /> : <GoHeart onClick={toggleLike} className=" h-6 w-6" />}
                        <b className="text-xs font-light">{data.likes.length} likes</b>
                    </span>

                    <span className="h-6 flex gap-1 items-center">
                        <HiOutlineChatBubbleLeftEllipsis className="h-6 w-6" />
                        <b className="text-xs font-light">{data.comments.length} comments</b>
                    </span>

                    {isSaved ? <FaBookmark onClick={toggleSave} className="h-5 w-5 absolute right-0" /> :<FaRegBookmark onClick={toggleSave} className="h-5 w-5 absolute right-0" />}
                    
                </div>

            </section>

        </div>
    )
}
export default HomeResourceCard