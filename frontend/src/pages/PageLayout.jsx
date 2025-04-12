import { Outlet, useNavigate } from "react-router"
import Navbar from "../components/navbar/Navbar"
import { useEffect } from "react"

const PageLayout = () => {

  const navigate=useNavigate();

  useEffect(()=>{
    navigate("/user/home")
  },[])
  
  return (
    <div className=" w-full h-full bg-red-400 flex justify-center">
        <main className="w-full min-h-full max-w-250 bg-amber-200">
          <Navbar/>
         <Outlet/>
        </main>
    </div>
  )
}
export default PageLayout