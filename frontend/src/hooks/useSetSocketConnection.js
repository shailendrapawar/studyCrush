import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { io } from "socket.io-client"
// import {} from "react-redux"
import { addUserNotification } from "../store/slices/userSlice";
import { setSocket } from "../store/slices/socketSlice";

import noitifySound from "../assets/audio/ringtoneSound.mp3"
function useSetSocketConnection() {

    const { authUser } = useSelector(s => s.user);
    const dispatch = useDispatch();

    useEffect(() => {

        const socket = io(import.meta.env.VITE_API_URL, {
            query: {
                userId: authUser?._id
            },
            withCredentials: true,
            transports: ["websocket"],
            reconnectionAttempts: 5, // Retry up to 5 times
            reconnectionDelay: 1000, // Delay between retries in ms
            reconnectionDelayMax: 5000,
        })
    
        
        if (socket) {
            dispatch(setSocket(socket));
        }


        //listening and adding new notification====
        socket.on("notification",(newNotification)=>{
            // console.log(newNotification)
            if(newNotification){
                const audio=new Audio(noitifySound);
                audio.play()
                dispatch(addUserNotification(newNotification))
            }
        })

        return () => {
            if(socket.connected){
                
            socket?.disconnect()
            dispatch(setSocket(null))
            }
        }

    }, [authUser])

}
export default useSetSocketConnection