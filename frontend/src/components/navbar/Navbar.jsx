import { Link, NavLink, useNavigate } from "react-router"
import { FaUserCircle } from "react-icons/fa";
import { CgMenuCheese } from "react-icons/cg";
import { IoIosNotifications } from "react-icons/io";
import "./navbar.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {toggleTheme} from "../../store/slices/themeSlice"
import { LuSquarePen } from "react-icons/lu";
// import { FaCloudUploadAlt } from "react-icons/fa";

import { RxCross1 } from "react-icons/rx";

//theme icons==================
// import { CiLight } from "react-icons/ci";
import { MdSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";
// import { MdOutlineDarkMode } from "react-icons/md";
import ThemeToggle from "../themeToggle/ThemeToggle";

const Navbar = () => {
  const dispatch=useDispatch();

  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  const [unRead, setUnread] = useState([]);

  const { currentTheme } = useSelector(s => s.theme)
  
  const { userNotifications } = useSelector((s) => s.user)

// console.log(currentTheme.name)

   const handleToggleTheme=()=>{
    dispatch(toggleTheme())
   }

  const calculateUnread = () => {
    const notifications = userNotifications?.filter((item) => item.isRead === false);
    setUnread(notifications)
    // console.log(notifications.length)
  }

  useEffect(() => {
    if(userNotifications){
      calculateUnread()
    }
    
  }, [userNotifications])


  const isDarkMode=currentTheme.name==="light";

  return (
    <nav className=" h-16 flex justify-between pl-4 pr-4 items-center relative z-10 " style={{ backgroundColor: currentTheme.background, color: currentTheme.textPrimary, borderBottom: `1px solid ${currentTheme.line}` }}
    >

      <span className="text-md font lg:text-2xl cursor-pointer"
        onClick={()=>navigate("/user/home")}
      ><b className="text-blue-500 text-xl lg:text-3xl">S</b>tudy  <b className="text-blue-500 text-xl lg:text-3xl">C</b>rush</span>


    {/* web -nav============= */}
      <nav className=" web-nav w-1/2 h-8 mr-15 max-w-100 flex justify-evenly items-center gap-1.5" style={{}} >
        <NavLink to={"/user/home"} className={({ isActive }) => isActive ? "w-1/3 text-center text-blue-600 font-bold transition ease-out" : "w-1/3 text-center"}>HOME</NavLink>
        <NavLink to={"/user/search"} className={({ isActive }) => isActive ? "w-1/3 text-center text-blue-600 font-bold transition ease-out" : "w-1/3 text-center"}>Search</NavLink>
        <NavLink to={"/user/upload"} className={({ isActive }) => isActive ? "w-1/3 text-center text-blue-600 font-bold transition ease-out" : "w-1/3 text-center"}>Upload</NavLink>

      </nav>



      {/* mobile-nav============== */}
      <nav id="mobile-nav" className={`slideLeft mobile-nav h-55 w-2/3 max-w-70 rounded-bl-3xl bg-black shadow-md shadow-black flex flex-col items-center justify-center gap-5 absolute top-16 right-0 ${toggle ? "flex" : "hidden"}`}
        onClick={() => setToggle(false)}
        style={{ backgroundColor: currentTheme.background, border: `1px solid ${currentTheme.line}` }}
      >
        <NavLink to={"/user/home"} className={({ isActive }) => isActive ? "w-20 text-center text-blue-600" : "w-20 text-center"}>HOME</NavLink>
        <NavLink to={"/user/search"} className={({ isActive }) => isActive ? "w-20 text-center text-blue-600" : "w-20 text-center"} >SEARCH</NavLink>
        <NavLink to={"/user/upload"} className={({ isActive }) => isActive ? "w-20 text-center text-blue-600" : "w-20 text-center"} >UPLOAD</NavLink>
        <NavLink to={"/user/userProfile"} className="w-20 text-center">Profile</NavLink>

        <span
        onClick={(e)=>{
          e.stopPropagation();
          handleToggleTheme()
        }}
        className="absolute top-2 right-2 rounded-full h-6 w-6 flex items-center justify-center"
        style={{backgroundColor:isDarkMode?"black":"white"}}
        title={isDarkMode?"switch to light mode":"switch to dark mode"}
        >
          {isDarkMode?<IoMdMoon className="text-white themeToggleAnime"/>:<MdSunny className="text-yellow-500 themeToggleAnime"/>}
          
        </span>
      </nav>


      <span title="notifications" className=" absolute right-20 " onClick={() => { navigate("/user/notification"); setToggle(false) }}>
        <IoIosNotifications className={unRead.length>0?"w-5 h-5 bell cursor-pointer hover:scale-110 ":"w-5 h-5 cursor-pointer hover:scale-110"} />
        <i className="absolute text-xs -top-1 -right-1 w-auto  rounded-md " style={{backgroundColor:currentTheme.background}}>{unRead?.length>9?"9+":unRead?.length}</i>
      </span>


      <span
        onClick={handleToggleTheme}
        className={` web-themeToggle hidden absolute shadow-md shadow-black right-35 active:shadow-sm rounded-full h-6 w-10 flex items-center px-1 ${isDarkMode?"justify-start":"justify-end"} `}
        style={{backgroundColor:isDarkMode?"white":"black", border:`2px solid ${currentTheme.line}`}}
        title={isDarkMode?"switch to dark mode":"switch to light mode"}
        >
          {isDarkMode?<MdSunny className="text-yellow-500"/>:<IoMdMoon className="text-white themeToggleAnime"/>}    
      </span>

      <LuSquarePen
      title="generate notes"
      onClick={()=>{
        setToggle(false)
        navigate("/user/generateNotes")
      }}
      className="absolute right-28 hover:scale-110 cursor-pointer "/>

      {toggle ? <RxCross1 className="nav-toggle mobileNav-icon h-8 w-8 active:scale-80 active:opacity-0 ease-in-out" onClick={() => setToggle(!toggle)} /> : <CgMenuCheese className="nav-toggle mobileNav-icon h-8 w-8 active:scale-80 active:opacity-0 ease-in-out" onClick={() => setToggle(!toggle)} />}
      <FaUserCircle title="user profile" className=" userProfile-icon h-8 w-8 cursor-pointer" onClick={() => navigate("/user/userProfile")} />

    </nav>
  )
}
export default Navbar