import { useSelector } from "react-redux"

import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { FaCommentDots } from "react-icons/fa";

import { FaExternalLinkAlt } from "react-icons/fa";

import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";

import { useEffect } from "react";
import useGetHomeResources from "../../hooks/useGetHomeResources";
const HomeResourceCard = ({ data }) => {

    const { currentTheme } = useSelector(s => s.theme);
    const {authUser}=useSelector(s=>s.user)

    // console.log(data)


    const formatDate=(date)=>{
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });  
    }

    const isLiked=data?.likes?.includes(authUser?._id)
    const isSaved=authUser?.savedResources?.includes(data?._id)
    console.log(isSaved)

    useGetHomeResources(1)
    return (
        <div className="h-40 w-full max-w-150 bg-green-500 rounded-md p-2 flex gap-2" style={{backgroundColor:currentTheme.cardBackground}}>

            <section className="w-[40%] h-full">
                <img src={data?.thumbnail} className="bg-trasparent h-full w-full object-cover">
                </img>
            </section>

            <section className="w-[60%] h-full  flex flex-col justify-center gap-1 relative">

                <FaExternalLinkAlt className="absolute top-2 right-2"/>
                
                <h3 className="text-sm max-w-full" style={{color:currentTheme.textPrimary}}>{data?.title}</h3>
                <p className="text-xs max-w-full h-10 " style={{color:currentTheme.textSecondary}}>{data?.description}</p>

                <span className="text-sm font-light pl-2 " style={{color:currentTheme.textSecondary}}>By {data?.uploadedBy?.name?.toUpperCase() }<b> • </b>{formatDate(data?.createdAt)}</span>


                <div className="h-8 flex flex-row items-center justify-start gap-5 relative pl-2 mt-2 ">
                    {isLiked?<GoHeartFill className=" h-6 w-6 text-red-500"/>:<GoHeart className=" h-6 w-6"/>}

                    <FaCommentDots className="h-6 w-6"/>

                    {isSaved?<FaRegBookmark className="h-5 w-5 absolute right-0"/>:<FaBookmark className="h-5 w-5 absolute right-0"/>}
                </div>

            </section>

        </div>
    )
}
export default HomeResourceCard