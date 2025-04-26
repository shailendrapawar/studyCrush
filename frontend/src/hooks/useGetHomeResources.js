import { useEffect } from "react";
import {setHomeResources} from "../store/slices/resourceSlice"
import axios from "axios";
import { useDispatch } from "react-redux";

const useGetHomeResources = (page) => {
    const dispatch=useDispatch();

    // console.log(page)/
    useEffect(()=>{
        const fetchResources=async()=>{

            try{
                const res=await axios.get(import.meta.env.VITE_API_URL+`/resource/getAllResources?page=${page}`,{
                    withCredentials:true
                })
                if(res){
                    // console.log(res)
                    dispatch(setHomeResources({list:res.data.resources,hasMore:res.data.hasMore}))
                }

            }catch(err){
                console.log(err)
            }
        }
        fetchResources();
    },[])

}
export default useGetHomeResources