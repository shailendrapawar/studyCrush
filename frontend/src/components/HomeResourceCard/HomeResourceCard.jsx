import "./homeResourceCard.css"
import { useSelector } from "react-redux"

import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";

import { FaExternalLinkAlt } from "react-icons/fa";

import { HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";

import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";

import useGetHomeResources from "../../hooks/useGetHomeResources";
const HomeResourceCard = ({ data }) => {

    const { currentTheme } = useSelector(s => s.theme);
    const {authUser}=useSelector(s=>s.user)



    const formatDate=(date)=>{
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });  
    }

    const isLiked=data?.likes?.includes(authUser?._id)
    const isSaved=authUser?.savedResources?.includes(data?._id)

    useGetHomeResources(1)
    return (
        <div className=" homeResource-card h-40 w-full max-w-150 bg-green-500 rounded-md p-1.5 flex gap-2 cursor-pointer" style={{backgroundColor:currentTheme.cardBackground, border:`1px solid ${currentTheme.line}`}}>

            <section className="image-container w-[40%] h-full">
                <img src={data?.thumbnail} className="bg-trasparent h-full w-full object-cover">
                </img>
            </section>

            <section className=" description-container w-[60%] h-full  flex flex-col justify-center gap-1 relative">

                <a href={`${data.link}`} target="_blank"><FaExternalLinkAlt className="absolute top-2 right-2"></FaExternalLinkAlt></a>
                
                <h3 className="text-sm max-w-full" style={{color:currentTheme.textPrimary}}>{data?.title}</h3>
                <p className=" text-xs max-w-full h-auto truncate" style={{color:currentTheme.textSecondary}}>{data?.description}</p>

                <span className="text-sm font-light pl-2 mt-2" style={{color:currentTheme.textSecondary}}>By {data?.uploadedBy?.name?.toUpperCase() }<b> • </b>{formatDate(data?.createdAt)}</span>


                <div className="h-8 flex flex-row items-center justify-start gap-5 relative pl-2 mt-2 ">
                    {isLiked?<GoHeartFill className=" h-6 w-6 text-red-500"/>:<GoHeart className=" h-6 w-6"/>}

                    <HiOutlineChatBubbleLeftEllipsis className="h-6 w-6"/>

                    {isSaved?<FaBookmark className="h-5 w-5 absolute right-0"/>:<FaRegBookmark className="h-5 w-5 absolute right-0"/>}
                </div>

            </section>

        </div>
    )
}
export default HomeResourceCard