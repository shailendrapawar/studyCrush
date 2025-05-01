import { useEffect } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { setUserUploadedResources } from "../../store/slices/userSlice"
import GridCard from "../../components/gridCard/GridCard"
const UploadedResourcesPage = () => {

  const { authUser } = useSelector(s => s.user)
  const {userUploadedResources}=useSelector(s=>s.user)

  const dispatch = useDispatch();

  const searchUserUploads = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_API_URL + `/auth/getUserUploads/${authUser._id}`, {
        withCredentials: true
      })
      // console.log(res.data.userUploads)

      if(res){
        dispatch(setUserUploadedResources(res.data.userUploads))
      }

    } catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    if(authUser){
      searchUserUploads()
    }
  }, [])

  if(userUploadedResources?.length<=0){
    return <h1 className="text-center text-lg md:text-2xl">No Resource Uploaded 🥹</h1>
  }
  return (
    <div className="w-full h-auto grid grid-cols-2 gap-1 sm:grid-cols-3 ">

      {userUploadedResources?.map((item,i)=>{
        return <GridCard key={i} data={item} source="uploaded" />
      })}

    </div>
  )
}
export default UploadedResourcesPage