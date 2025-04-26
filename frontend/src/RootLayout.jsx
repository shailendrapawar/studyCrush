import { Toaster } from "react-hot-toast"
import { useSelector } from "react-redux"
import { Outlet } from "react-router"

const RootLayout = () => {

    const {currentTheme}=useSelector(s=>s.theme)
  return (
    <div className="w-full min-h-screen h-full " style={{backgroundColor:currentTheme.background, color:currentTheme.textPrimary}}>
      <Toaster position="top-center" reverseOrder={true}/>
        <Outlet/>
    </div>
  )
}
export default RootLayout