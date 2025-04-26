import { useEffect } from "react"
import axios from "axios"
import{ useDispatch, useSelector } from "react-redux"
import { setSavedResourcesDetails } from "../../store/slices/userSlice"
import GridCard from "../../components/gridCard/GridCard"

const SavedResourcesPage = () => {
  const{userSavedResources}=useSelector(s=>s.user)
  const{savedResourcesDetails}=useSelector(s=>s.user)
  // console.log(savedResourcesDetails)
  const dispatch=useDispatch();

   const searchUserUploadedResources=async()=>{
      try{
        const savedResources=await axios.post(import.meta.env.VITE_API_URL+`/auth/getSavedResources`,{
          resourcesId:userSavedResources
        },{ withCredentials:true});
        // console.log(savedResources.data.savedResources)
        if(savedResources){
          dispatch(setSavedResourcesDetails(savedResources.data.savedResources))
        }
  
      }catch(err){
        console.log(err)
      }
    }


  useEffect(()=>{
        if(userSavedResources){
          searchUserUploadedResources()
        }
  },[])

  return (
    <div className="w-full h-auto grid grid-cols-2 gap-1 sm:grid-cols-3 ">

      {savedResourcesDetails?.map((item,i)=>{
        return <GridCard key={i} data={item} source="saved"/>
      })}

    </div>
  )
}
export default SavedResourcesPage