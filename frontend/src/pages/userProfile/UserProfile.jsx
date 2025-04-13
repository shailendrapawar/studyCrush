import { useSelector } from "react-redux"
import defaultAvatar from "./defaultAvatar.avif"
import { IoMdLogOut } from "react-icons/io";

const UserProfile = () => {
  const {currentTheme}=useSelector(s=>s.theme)

  const{authUser}=useSelector(s=>s.user);

  return (
    <div className=" h-full flex justify-center p-5 relative" style={{backgroundColor:currentTheme?.background}}>

      <section className="h-90 w-full max-w-100 rounded-xl flex flex-col justify-evenly items-center p-2 relative"

      style={{backgroundColor:currentTheme?.cardBackground}}
      >
        <IoMdLogOut className="absolute right-3 top-3 h-7 w-7 "/>
        <img src={authUser?.profilePicture?.url||defaultAvatar} className="w-40 h-40 object-contain rounded-full bg-gray-300 "></img>
        <h2 style={{color:currentTheme?.textPrimary}} >{authUser?.name}</h2>
        <p className="w-full text-sm   text-center max-h-15 h-15" style={{color:currentTheme?.textSecondary}}>
          ~{authUser?.bio}
        </p>

        <button className="h-8 w-30 rounded-md text-sm " style={{backgroundColor:currentTheme?.primary}}>Edit Profile</button>
      </section>


    </div>
  )
}
export default UserProfile