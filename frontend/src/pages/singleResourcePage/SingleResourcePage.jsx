import { useNavigate, useParams } from "react-router"
import axios from "axios"
import toast, { } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { setSingleResource, likeCurrentResource, unlikeCurrentResource, addCommentCurrentResource } from "../../store/slices/singleResourceSlice"
import { saveResource, unsaveResource } from "../../store/slices/userSlice"

import defaultUserAvatar from "../../assets/defaultAvatar.avif"

import { GoHeart, GoHeartFill } from "react-icons/go";
import { FaBookmark, FaRegBookmark, FaExternalLinkAlt } from "react-icons/fa";
import SingleComment from "../../components/singleComment/SingleComment"

import { IoArrowBackCircle } from "react-icons/io5";
import useSingleResourceEvents from "../../hooks/useSingleResourceEvents"


const SingleResourcePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resourceId } = useParams();


  const { currentTheme } = useSelector(s => s.theme)
  const { currentResource } = useSelector(s => s.singleResource)
  const { authUser } = useSelector(s => s.user)
  const {userSavedResources}=useSelector(s=>s.user)

  // const{socket}=useSelector(s=>s.socket);

  const [inputComment, setInputComment] = useState("")

  const[isFound,setIsFound]=useState(true);


  // ==fetching resources data===========
  const fetchResourceData = async () => {
    try{
      const resource = await axios.get(import.meta.env.VITE_API_URL + `/resource/getSingleResource/${resourceId}`, {
        withCredentials: true
      })
      
      if(resource){
        return dispatch(setSingleResource(resource.data.resource))
      }    
    }catch(err){
      setIsFound(false);
      dispatch(setSingleResource(null))
      toast.error(err.response.data.msg)
    }
  }

  //===toggling like==========

  const toggleLike = async (e) => {
    e.preventDefault()
    e.stopPropagation();
    try {
      const isToggled = await axios.post(import.meta.env.VITE_API_URL + `/resource/toggleLike/${resourceId}`, {}, {
        withCredentials: true
      });
      // console.log(isToggled)
      if (isToggled) {

        if (isLiked) {
          dispatch(unlikeCurrentResource({ resourceId, userId: authUser._id }))
        } else {
          dispatch(likeCurrentResource({ resourceId, userId: authUser._id }))
        }

      }
    } catch (err) {
      console.log(err)
    }
  }

  //=====toggle save resource===============

  const toggleSaveResource = async () => {

    // e.stopPropagation();
    const isToggled = await axios.post(import.meta.env.VITE_API_URL + `/auth/toggleSaveResource/${resourceId}`, {}, {
      withCredentials: true
    })

    if (isToggled) {
      if (isSaved) {
        dispatch(unsaveResource(resourceId))
      } else {
        dispatch(saveResource(resourceId))
      }
    }
  }

  const handlePostComment = async (e) => {
    e.preventDefault();

    if (inputComment === "") {
      return
    }
    try {

      const isCommented = await axios.post(import.meta.env.VITE_API_URL + "/resource/addComment", {
        comment: inputComment,
        resourceId
      }, {
        withCredentials: true
      })

      // console.log(isCommented.data.newComment)

      if (isCommented) {
        toast.success("Comment added")
        setInputComment("")
        dispatch(addCommentCurrentResource({ resourceId, newComment: isCommented.data.newComment }))
      }

    } catch (err) {
      console.log(err)
    }
  }

  // hook for handling socket events for single resource====
  useSingleResourceEvents(currentResource?._id);

  useEffect(() => {
    fetchResourceData()
    window.scroll(0, 0)
  }, [resourceId])

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  const isLiked = currentResource?.likes?.includes(authUser?._id)
  const isSaved = userSavedResources?.includes(currentResource?._id)


  if (!currentResource) return <div className="flex justify-center items-center h-screen">Loading...</div>

  if(!isFound) return <div className="h-50 w-full flex justify-center items-center">
    <IoArrowBackCircle className="h-8 w-8 mr-5 hover:shadow-md active:shadow-none shadow-black rounded-full" onClick={()=>navigate(-1)}/>
     Resource not found 😕
     </div>

  return (
    <div className="min-h-screen pb-10" style={{ backgroundColor: currentTheme?.background }}>

      <IoArrowBackCircle className=" mt-5 h-8 w-8 ml-5 rounded-full shadow-md shadow-black active:shadow-none cursor-pointer"
        onClick={() => navigate(-1)}
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-5 relative">
        {/* Resource Thumbnail */}
        <div className="rounded-xl overflow-hidden shadow-lg mb-5">
          <img
            src={currentResource?.thumbnail}
            className="w-full h-64 sm:h-80 object-cover"
            alt={currentResource?.title}
          />
        </div>


        {/* Resource Header */}
        <div className="mb-6 relative">

          <div className="flex justify-between items-start mb-2">
            <h1 className="text-xl sm:text-xl font-bold" style={{ color: currentTheme?.textPrimary }}>
              {currentResource?.title}
            </h1>

            <span className="text-xs pl-2 pr-2 pt-2 pb-2 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: currentTheme?.textPrimary + '30',
                color: currentTheme?.textPrimary
              }}>
              {currentResource?.subject}
            </span>
          </div>

          <p className="text-sm  mt-2 mb-4" style={{ color: currentTheme?.textSecondary }}>
            {currentResource?.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {currentResource?.tags?.map((item, i) => (
              <span
                key={i}
                style={{
                  backgroundColor: currentTheme.accent + '20',
                  color: currentTheme.accent
                }}
                className="px-3 py-1 rounded-full text-xs font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </div>


        {/* Author and Date */}
        <div className="flex items-center justify-between mb-6 p-4 rounded-lg cursor-pointer"
          style={{ backgroundColor: currentTheme?.cardBackground }}
          onClick={()=>navigate(`/user/publicProfile/${currentResource?.uploadedBy?._id}`)}
          >
            
          <div className="flex items-center gap-3">
            <img
              src={currentResource?.uploadedBy.profilePicture?.url || defaultUserAvatar}
              className="h-10 w-10 rounded-full object-scale-down shadow-black shadow-sm"
              alt="Author"
            />

            <div>
              <p className="text-sm font-medium" style={{ color: currentTheme?.textPrimary }}>
                {currentResource?.uploadedBy?.name}
              </p>
              <p className="text-xs" style={{ color: currentTheme?.textSecondary }}>
                {formatDate(currentResource?.createdAt)}
              </p>
            </div>
          </div>
        </div>


        {/* Action Bar */}
        <div className="flex items-center justify-between p-4 mb-6 rounded-lg"
          style={{
            backgroundColor: currentTheme?.cardBackground,
            border: `1px solid ${currentTheme?.line}`
          }}>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1" onClick={(e)=>toggleLike(e)}>
              {isLiked ? (
                <GoHeartFill className="w-6 h-6 text-pink-600" />
              ) : (
                <GoHeart className="w-6 h-6" />
              )}
              <span className="text-md">{currentResource?.likes?.length || 0}</span>
            </button>

            <a
              href={currentResource?.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm ml-5"
            >
              <FaExternalLinkAlt className="w-4 h-4" />
              <span> Visit Resource</span>
            </a>
          </div>

          <button
            onClick={toggleSaveResource}
          >
            {isSaved ? (
              <FaBookmark className="w-5 h-5" style={{ color: currentTheme?.accent }} />
            ) : (
              <FaRegBookmark className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Comments Section */}
        <div className="rounded-lg overflow-hidden"
          style={{
            backgroundColor: currentTheme?.cardBackground,
            border: `1px solid ${currentTheme?.line}`
          }}>
          <div className="p-4 border-b" style={{ borderColor: currentTheme?.line }}>
            <h3 className="font-medium" style={{ color: currentTheme?.textPrimary }}>
              Comments ( {currentResource?.comments?.length || 0} )
            </h3>
          </div>

          <div className="max-h-96 overflow-y-auto p-4">
            {currentResource?.comments?.length > 0 ? (
              currentResource.comments.map((comment, i) => (
                <SingleComment data={comment} key={i} isNew={i===0} />
              ))
            ) : (
              <p className="text-center py-4 text-2xl" style={{ color: currentTheme?.textSecondary }}>
                No comments yet 😜
              </p>
            )}
          </div>

          <div className="p-4 border-t" style={{ borderColor: currentTheme?.line }}>
            <div className="flex gap-2">
              <input
              value={inputComment}
                className="flex-1 px-4 py-2 rounded-full text-sm outline-none"
                style={{ backgroundColor: currentTheme?.background }}
                placeholder="Add a comment..."
                onChange={(e) => setInputComment(e.target.value)}
              />
              <button
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={{ backgroundColor: currentTheme?.accent, color: '#fff' }}
                onClick={(e)=>handlePostComment(e)}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleResourcePage