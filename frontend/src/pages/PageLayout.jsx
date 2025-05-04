import { Outlet, useLocation, useNavigate } from "react-router"
import Navbar from "../components/navbar/Navbar"
import { useEffect } from "react"
import {Toaster} from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import useGetHomeResources from "../hooks/useGetHomeResources"
import useGetUserNotifications from "../hooks/useGetUserNotifications"
import useSetSocketConnection from "../hooks/useSetSocketConnection"

const PageLayout = () => {

  const navigate=useNavigate();


  const {currentTheme}=useSelector(s=>s.theme)
  const location=useLocation();
  
  useGetHomeResources(1)

  useEffect(()=>{
    // console.log(location.pathname)
    if(location.pathname==="/user/"||location.pathname==="/user"){
      navigate("/user/home")
    }
    
  },[])

  useGetUserNotifications()

  useSetSocketConnection()


  return (
    // y kuch erro h yaha
    <div className=" w-full h-auto min-h-full  flex justify-center" style={{backgroundColor:currentTheme.background, color:currentTheme.textPrimary}}>
        <main className="w-full h-auto min-h-full max-w-250 ">
          <Navbar/>
          
         <Outlet/>
        </main>
    </div>
  )
}
export default PageLayout



