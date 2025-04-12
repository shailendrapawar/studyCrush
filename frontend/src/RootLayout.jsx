import { Outlet } from "react-router"

const RootLayout = () => {
  return (
    <div className="w-full h-screen ">
        <Outlet/>
    </div>
  )
}
export default RootLayout