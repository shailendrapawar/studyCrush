import { Outlet } from "react-router"
const PageLayout = () => {
  return (
    <div className="bg-red-400">
        <Outlet/>
    </div>
  )
}
export default PageLayout