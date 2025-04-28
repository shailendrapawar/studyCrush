import { useSelector } from "react-redux";
import defaultAvatar from "./defaultAvatar.avif";
import "./singleComment.css"
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";

const SingleComment = ({ data,isNew }) => {
  const { currentTheme } = useSelector((s) => s.theme);
const navigate=useNavigate()
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const commentRef=useRef()

  useEffect(()=>{
    if(isNew && commentRef){
      commentRef.current.classList.remove("loadCommentAnime");
      
    // Force reflow
    void commentRef.current.offsetWidth;
    
    commentRef.current.classList.add("loadCommentAnime");
  

    }
  },[data])

// console.log(data)
  return (
    <div 
      className={` flex gap-3 p-4 hover:bg-opacity-50 transition-colors`}
      style={{
        backgroundColor: currentTheme.cardBackground,
        borderBottom: `1px solid ${currentTheme.line}`
      }}
      ref={commentRef}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        <img 
          src={data?.user?.profilePicture?.url || defaultAvatar}
          alt={data?.user?.name}
          className="w-10 h-10 rounded-full object-cover bg-gray-200"
          onClick={()=>navigate(`/user/publicProfile/${data?.user?._id}`)}
        />
      </div>

      {/* Comment Content */}
      <div className="flex-1 flex flex-col gap-1">
        <div className="flex items-baseline gap-2">
          <span 
            className="font-semibold text-sm"
            style={{ color: currentTheme.textPrimary }}
          >
            {data?.user?.name}
          </span>
          <span 
            className="text-xs opacity-80"
            style={{ color: currentTheme.textSecondary }}
          >
            {formatDate(data?.createdAt)}
          </span>
        </div>

        <p 
          className="text-sm mt-1 break-words"
          style={{ color: currentTheme.textSecondary }}
        >
          {data?.comment}
        </p>
      </div>
    </div>
  );
};

export default SingleComment;