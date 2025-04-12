import { Outlet } from "react-router"
const PageLayout = () => {
  return (
    <div className=" w-full h-full bg-red-400 flex justify-center">
        <main className="w-full min-h-full max-w-250 bg-amber-200">
         <Outlet/>
         
        </main>
    </div>
  )
}
export default PageLayout