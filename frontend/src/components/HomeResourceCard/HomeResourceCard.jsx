import "./homeResourceCard.css"
import { useDispatch, useSelector } from "react-redux"

import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";

import { FaExternalLinkAlt } from "react-icons/fa";

import { HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";

import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { IoArrowBackCircle } from "react-icons/io5";
import axios from "axios";

import { likePost, setResourceComments, unlikePost, addResourceComment } from "../../store/slices/resourceSlice";
import { saveResource, unsaveResource, } from "../../store/slices/userSlice";
import { useEffect, useState } from "react";
import SingleComment from "../singleComment/SingleComment";

const HomeResourceCard = ({ data }) => {
    const dispatch = useDispatch();
    // console.log(data)

    const { currentTheme } = useSelector(s => s.theme);
    const { authUser } = useSelector(s => s.user)

    const [commentToggle, setCommentToggle] = useState(false)
    const [inputComment, setInputComment] = useState("");





    // toggle like for resource
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


    // toggle resource save/unsave============
    const toggleSave = async () => {
        const isToggled = await axios.post(import.meta.env.VITE_API_URL + `/auth/toggleSaveResource/${data._id}`, {}, {
            withCredentials: true
        })
        // console.log(isToggled)
        if (isToggled) {
            if (isSaved) {
                dispatch(unsaveResource(data._id))

            } else {
                dispatch(saveResource(data._id))
            }
        }
    }

    const getAllComments = async () => {
        if (commentToggle) {

            try {
                const commentRes = await axios.get(import.meta.env.VITE_API_URL + `/resource/getResourceComments/${data._id}`, {
                    withCredentials: true
                });
                if (commentRes) {
                    dispatch(setResourceComments({ resourceId: data._id, comments: commentRes?.data?.comments }))
                }

            } catch (err) {
                console.log(err)
            }
            // console.log(comments)
        }
    }

    const handlePostComment = async (req, res) => {
        if (inputComment === "") {
            return
        }

        try {
            const isCommented = await axios.post(import.meta.env.VITE_API_URL + "/resource/addComment", {
                comment: inputComment,
                resourceId: data._id
            }, {
                withCredentials: true
            })
            // console.log(isCommented.data.newComment);
            if (isCommented) {
                dispatch(addResourceComment({ resourceId: data._id, newComment: isCommented.data.newComment }))
                setInputComment("")
            }

        } catch (err) {
            console.log(err)
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

    useEffect(() => {
        getAllComments()
    }, [commentToggle])

    return (
        <div className=" homeResource-card h-65 w-full max-w-150 bg-green-500 rounded-md p-1.5 flex gap-2 cursor-pointer" style={{ backgroundColor: currentTheme.cardBackground, border: `1px solid ${currentTheme.line}` }}>

            <section className="image-container w-[40%] h-full" style={commentToggle ? { display: "none" } : { display: "block" }}>
                <img src={data?.thumbnail} className="bg-trasparent h-full w-full object-cover">
                </img>
            </section>

            <section className=" description-container w-[60%] h-full  flex flex-col justify-center gap-1 relative"
                style={commentToggle ? { display: "none" } : { display: "flex" }}
            >

                <a href={`${data.link}`} target="_blank"><FaExternalLinkAlt className="absolute top-2 right-2"></FaExternalLinkAlt></a>

                <h3 className="text-sm max-w-full" style={{ color: currentTheme.textPrimary }}>{data?.title}</h3>
                <p className=" text-xs max-w-full h-auto truncate" style={{ color: currentTheme.textSecondary }}>{data?.description}</p>

                <span className="text-sm font-light pl-2 mt-2" style={{ color: currentTheme.textSecondary }}>By {data?.uploadedBy?.name?.toUpperCase()}<b> • </b>{formatDate(data?.createdAt)}</span>


                <div className="h-10 flex flex-row items-center justify-start gap-5 relative pl-2 mt-2 ">
                    <span className="h-6 flex gap-1 items-center">{isLiked ? <GoHeartFill onClick={toggleLike} className=" h-6 w-6 text-red-500" /> : <GoHeart onClick={toggleLike} className=" h-6 w-6" />}
                        <b className="text-xs font-light">{data?.likes?.length} likes</b>
                    </span>

                    <span className="h-6 flex gap-1 items-center" onClick={() => setCommentToggle(true)}>
                        <HiOutlineChatBubbleLeftEllipsis className="h-6 w-6" />
                        <b className="text-xs font-light">{data?.comments?.length} comments</b>
                    </span>

                    {isSaved ? <FaBookmark onClick={toggleSave} className="h-5 w-5 absolute right-0" /> : <FaRegBookmark onClick={toggleSave} className="h-5 w-5 absolute right-0" />}

                </div>

            </section>


            {/* // comment section ============== */}
            <section className="comments-body h-full w-full rounded-md flex items-center flex-col gap-2"
                style={commentToggle ? { display: "flex" } : { display: "none" }}
            >
                <IoArrowBackCircle className="h-10 w-10 self-start" onClick={() => setCommentToggle(false)} />

                <main className=" comments-list max-h-40 h-40  w-full max-w-120  gap-2 flex flex-col overflow-y-scroll"

                >
                    {
                       
                        data?.commentsData?.length > 0 ? (<>
                            {
                                data?.commentsData?.map((item, i) => {
                                    return <SingleComment data={item} key={i} />
                                })

                            }
                        </>) : (<span className="h-full w-full flex justify-center items-center">

                            <h1 style={{ color: currentTheme.textSecondary }}>Be first one to comment</h1>

                        </span>)
                    }

                </main>


                <div className="h-[20%] min-h-10 w-full  flex items-center justify-evenly">
                    <input className=" rounded-md h-full w-[70%]  max-h-10 outline-none pl-2 pr-2 text-xs" placeholder="enter comment"
                        value={inputComment}
                        onChange={(e) => setInputComment(e.target.value)}
                        style={{ background: currentTheme.background, color: currentTheme.textPrimary }}
                    ></input>
                    <button className="rounded-md w-[20%] h-full max-h-10 text-sm "
                        style={{ background: currentTheme.accent, color: currentTheme.textPrimary }}
                        onClick={handlePostComment}
                    >POST</button>
                </div>

            </section>

        </div>
    )
}
export default HomeResourceCard