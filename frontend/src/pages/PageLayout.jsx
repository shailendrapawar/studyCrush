import { Outlet, useNavigate } from "react-router"
import Navbar from "../components/navbar/Navbar"
import { useEffect } from "react"
import {Toaster} from "react-hot-toast"
const PageLayout = () => {

  const navigate=useNavigate();

  useEffect(()=>{
    navigate("/user/home")
  },[])
  
  return (
    <div className=" w-full h-full flex justify-center">
        <main className="w-full min-h-full max-w-250">
          <Navbar/>
          
         <Outlet/>
        </main>
    </div>
  )
}
export default PageLayout