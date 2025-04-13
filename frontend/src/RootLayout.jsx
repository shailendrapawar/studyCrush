import { Toaster } from "react-hot-toast"
import { Outlet } from "react-router"

const RootLayout = () => {
  return (
    <div className="w-full h-screen ">
      <Toaster position="top-center" reverseOrder={true}/>
        <Outlet/>
    </div>
  )
}
export default RootLayout