import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import axios from "axios"
import { useEffect, useState } from "react";
import defaultAvatar from "../../assets/defaultAvatar.avif"
import GridCard from "../../components/gridCard/GridCard";

import { IoArrowBackCircle } from "react-icons/io5";

const PublicProfilePage = () => {

  const { currentTheme } = useSelector(s => s.theme);

  const [userData, setUserData] = useState({});
  const [resourceList, setResourceList] = useState([]);

  const { userId } = useParams();

  const navigate=useNavigate()
  // console.log(userId)

  const fetchPublicProfile = async () => {
    try {
      if (!userId) {
        return
      }

      const res = await axios.get(import.meta.env.VITE_API_URL + `/auth/userPublicProfile/${userId}`, {
        withCredentials: true
      });
      // console.log(res)

      if (res) {
        setUserData(res?.data?.user);
        setResourceList(res?.data?.resources)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    window.scroll(0,0)
    fetchPublicProfile()
  }, [userId])

  return (
    <div className="h-auto min-h-screen w-full flex flex-col items-center px-2 relative">
     
      <IoArrowBackCircle className="self-start mt-5 h-8 w-8 cursor-pointer"
      onClick={()=>navigate(-1)}
      />

      <section className="max-w-100 w-full h-70 rounded-lg flex shadow-xs shadow-black flex-col items-center justify-evenly mt-5"
        style={{ backgroundColor: currentTheme.cardBackground }}
      >

        <img className="h-30 w-30 rounded-full bg-white object-cover"
          src={userData?.profilePicture?.url || defaultAvatar}
        ></img>

        <h2 >{userData?.name}</h2>
        <h3 className="text-sm">{userData?.username}</h3>
        <p className="text-xs"
          style={{ color: currentTheme.textSecondary }}>{userData?.bio}</p>
      </section>


      <h1 className="text-xl mt-5 text-center"><b style={{ color: currentTheme.accent }}>S</b>hared <b style={{ color: currentTheme.accent }}>R</b>esources ( {resourceList.length || 0} )</h1>

      <div className="mt-5 w-full h-auto grid grid-cols-2 gap-1 sm:grid-cols-3 ">

        {resourceList?.map((item, i) => {
          return <GridCard key={i} data={item} source="public" />
        })}

      </div>

    </div>
  )
}
export default PublicProfilePage