import { } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import NotificationCard from "../../components/notificationCard/NotificationCard"
import { useEffect } from "react"
import axios from "axios"

const NotificationPage = () => {
  const { currentTheme } = useSelector(s => s.theme)
  const { userNotifications } = useSelector(s => s.user)

  // console.log(userNotifications)

  const markNotificationRead = async () => {
    // console.log("notification read")
    try {
      const isRead = await axios.post(import.meta.env.VITE_API_URL + `/auth/markNotificationRead`, {}, {
        withCredentials: true
      })
      console.log(isRead);

    } catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {

    return () => {
      //===handle notification read==========

      // markNotificationRead()
    }
  }, [])

  return (
    <div className=" h-auto w-full flex items-center flex-col gap-2 p-2">

      <h3 className="text-3xl mt-2 mb-2"><b style={{ color: currentTheme.accent }} >N</b>otifications</h3>

      {userNotifications?.map((notify, i) => {
        return <NotificationCard notify={notify} key={i} />
      })}

    </div>
  )
}
export default NotificationPage