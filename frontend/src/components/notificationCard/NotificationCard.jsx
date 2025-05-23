import { useSelector } from "react-redux"
import { getTimeAgo } from "../../utils/timeAgo"
import React from "react"
import { useNavigate } from "react-router"
function NotificationCard({notify}) {
  // console.log(notify)
  const navigate=useNavigate()
  const {currentTheme}=useSelector(s=>s.theme)
  return (
    <div className="w-full max-w-150 rounded-xl shadow-xs shadow-black overflow-hidden hover:shadow-black hover:shadow-md active:shadow-none transition-shadow duration-200 cursor-pointer"
    style={{backgroundColor:currentTheme.cardBackground}}
    onClick={()=>navigate(`/user/resource/${notify?.resourceId}`)}

    >
      <div className="flex p-3">
        {/* Avatar */}
        <div className="flex-shrink-0 mr-3">
          <img
            className="h-12 w-12 rounded-full shadow-xs shadow-black "
            src={notify?.senderId?.profilePicture?.url}
            alt="User avatar"
          />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium ">{notify?.senderId?.name}</h3>
            <span className="text-xs ">{getTimeAgo(notify?.createdAt)}</span>
          </div>
          
          <p className="mt-1 text-sm"
          style={{color:currentTheme.textSecondary}}
          >
            {notify?.message}
          </p>
          
          <div className="mt-2 flex items-center">
            <span className="inline-flex items-center px-3 py-2 rounded-full  shadow-xs shadow-black text-xs font-medium "
            style={{backgroundColor:currentTheme.background,color:currentTheme.accent}}
            >
              {notify?.type}
            </span>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="ml-2 flex-shrink-0 flex">
          {!notify?.isRead&&(<div className="h-2 w-2 rounded-full bg-blue-500 mt-1"></div>)}
        </div>
      </div>
    </div>
  )
}
export default React.memo(NotificationCard)