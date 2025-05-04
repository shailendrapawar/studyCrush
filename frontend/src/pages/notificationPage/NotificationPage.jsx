import { } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import NotificationCard from "../../components/notificationCard/NotificationCard"
import { markUsernotificationRead } from "../../store/slices/userSlice"
import { useEffect } from "react"
import axios from "axios"

import { useNavigate } from "react-router"

const NotificationPage = () => {
  const { currentTheme } = useSelector(s => s.theme)
  const { userNotifications } = useSelector(s => s.user)
const dispatch=useDispatch()
  const navigate=useNavigate();

  // console.log(userNotifications)

  const markNotificationRead = async () => {
    // console.log("notification read")
    try {
      const isRead = await axios.post(import.meta.env.VITE_API_URL + `/auth/markNotificationRead`, {}, {
        withCredentials: true
      })
      // console.log(isRead);
      if(isRead){
        dispatch(markUsernotificationRead())
      }

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {

    return () => {
      //===handle notification read==========

      markNotificationRead()
    }
  }, [])


  //onCLick for naviagting to resource===
  const handleClick=(userId)=>{
    if(userId){
      navigate(`/user/resource/${userId}`)
    }
    return
  }

  return (
    <div className=" h-auto w-full flex items-center flex-col gap-2 p-2">

      <h3 className="text-3xl mt-2 mb-2"><b style={{ color: currentTheme.accent }} >N</b>otifications</h3>

      {userNotifications?.map((notify, i) => {
        return <NotificationCard notify={notify} key={i} handleClick={handleClick} />
      })}

    </div>
  )
}
export default NotificationPage