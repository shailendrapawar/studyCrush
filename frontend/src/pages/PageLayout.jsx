import { Outlet, useNavigate } from "react-router"
import Navbar from "../components/navbar/Navbar"
import { useEffect } from "react"
import {Toaster} from "react-hot-toast"
import { useSelector } from "react-redux"
import useGetHomeResources from "../hooks/useGetHomeResources"
const PageLayout = () => {

  const navigate=useNavigate();
  const {currentTheme}=useSelector(s=>s.theme)

  useGetHomeResources(1)

  useEffect(()=>{
    navigate("/user/home")
  },[])
  
  return (
    <div className=" w-full h-full  flex justify-center" style={{backgroundColor:currentTheme.background, color:currentTheme.textPrimary}}>
        <main className="w-full min-h-full max-w-250">
          <Navbar/>
          
         <Outlet/>
        </main>
    </div>
  )
}
export default PageLayout