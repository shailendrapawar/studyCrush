import { useEffect } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { setUserNotification } from "../store/slices/userSlice"

const useGetUserNotifications = () => {
    const dispatch=useDispatch();

 useEffect(()=>{

    const getAllNotifications=async()=>{
        try{

            const res=await axios.get(import.meta.env.VITE_API_URL+`/auth/getAllNotifications`,{
                withCredentials:true
            })
    
            // console.log(res.data.userNotifications)
    
            if(res){
                dispatch(setUserNotification(res.data.userNotifications))
            }

        }catch(err){
            console.log(err);
        }
    }

    getAllNotifications()

 },[])
}
export default useGetUserNotifications