import { Link, NavLink, useNavigate } from "react-router"
import { FaUserCircle } from "react-icons/fa";
import { CgMenuCheese } from "react-icons/cg";
import { IoIosNotifications } from "react-icons/io";
import "./navbar.css"
import { useState } from "react";
import { useSelector } from "react-redux";

// import { FaCloudUploadAlt } from "react-icons/fa";

import { RxCross1 } from "react-icons/rx";

const Navbar = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  const { currentTheme } = useSelector(s => s.theme)
  const { userNotifications } = useSelector(s => s.user)


  return (
    <nav className=" h-16 flex justify-between pl-4 pr-4 items-center relative z-10 " style={{ backgroundColor: currentTheme.background, color: currentTheme.textPrimary, borderBottom: `1px solid ${currentTheme.line}` }}
    >

      <span className="text-md font lg:text-2xl"><b className="text-blue-500 text-xl lg:text-3xl">S</b>tudy  <b className="text-blue-500 text-xl lg:text-3xl">C</b>rush</span>

      <nav className=" web-nav w-1/2 h-8 max-w-100 flex justify-evenly items-center gap-1.5" style={{}} >
        <NavLink to={"/user/home"} className={({ isActive }) => isActive ? "w-1/3 text-center text-blue-600" : "w-1/3 text-center"}>HOME</NavLink>
        <NavLink to={"/user/search"} className={({ isActive }) => isActive ? "w-1/3 text-center text-blue-600" : "w-1/3 text-center"}>Search</NavLink>
        <NavLink to={"/user/upload"} className={({ isActive }) => isActive ? "w-1/3 text-center text-blue-600" : "w-1/3 text-center"}>Upload</NavLink>
      </nav>


      <nav className={`slideAnime mobile-nav h-55 w-2/3 max-w-70 rounded-bl-3xl bg-black  flex flex-col items-center justify-center gap-5 absolute top-16 right-0 ${toggle ? "flex" : "hidden"}`}
        onClick={() => setToggle(false)}
        style={{ backgroundColor: currentTheme.background, border: `1px solid ${currentTheme.line}` }}
      >
        <NavLink to={"/user/home"} className={({ isActive }) => isActive ? "w-20 text-center text-blue-600" : "w-20 text-center"}>HOME</NavLink>
        <NavLink to={"/user/search"} className={({ isActive }) => isActive ? "w-20 text-center text-blue-600" : "w-20 text-center"} >SEARCH</NavLink>
        <NavLink to={"/user/upload"} className={({ isActive }) => isActive ? "w-20 text-center text-blue-600" : "w-20 text-center"} >UPLOAD</NavLink>
        <NavLink to={"/user/userProfile"} className="w-20 text-center">Profile</NavLink>
      </nav>


      <span className=" absolute right-20" onClick={() => { navigate("/user/notification"); setToggle(false) }}>
        <IoIosNotifications className="w-5 h-5" />
        <i className="absolute text-xs -top-1 -right-2">{userNotifications?.length}</i>
      </span>


      {toggle ? <RxCross1 className="nav-toggle mobileNav-icon h-8 w-8 active:scale-80 active:opacity-0 ease-in-out" onClick={() => setToggle(!toggle)} /> : <CgMenuCheese className="nav-toggle mobileNav-icon h-8 w-8 active:scale-80 active:opacity-0 ease-in-out" onClick={() => setToggle(!toggle)} />}
       <FaUserCircle className=" userProfile-icon h-8 w-8" onClick={() => navigate("/user/userProfile")} />

    </nav>
  )
}
export default Navbar