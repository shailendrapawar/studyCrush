import { NavLink, useNavigate } from "react-router"
import { FaUserCircle } from "react-icons/fa";
import {} from "react-router"
import { IoIosNotifications } from "react-icons/io";
import "./navbar.css"
const Navbar = () => {
  const navigate=useNavigate();

  return (
    <nav className="bg-black h-16 flex justify-between pl-4 pr-4 items-center relative">

      <span className="text-md font"><b className="text-blue-500 text-xl">S</b>tudy  <b className="text-blue-500 text-xl">C</b>rush</span>

      <nav className=" web-nav w-1/2 h-8 max-w-100 flex justify-evenly items-center gap-1.5">
        <NavLink to={"/user/home"} className={({ isActive }) => isActive ? "w-1/3 text-center text-red-300" : "w-1/3 text-center"}>HOME</NavLink>
        <NavLink to={"/user/search"} className={({ isActive }) => isActive ? "w-1/3 text-center text-red-300" : "w-1/3 text-center"}>Search</NavLink>
        <NavLink to={"/user/upload"} className={({ isActive }) => isActive ? "w-1/3 text-center text-red-300" : "w-1/3 text-center"}>Upload</NavLink>
      </nav>

      <span className="absolute right-25" onClick={()=>navigate("/user/notification")}>
        <IoIosNotifications className="w-5 h-5" />
        <i className="absolute text-xs -top-1 -right-1">4</i>
      </span>

      <FaUserCircle className="h-8 w-8" />
    </nav>
  )
}
export default Navbar