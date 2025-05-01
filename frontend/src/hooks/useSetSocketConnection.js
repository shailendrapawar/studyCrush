import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { io } from "socket.io-client"
// import {} from "react-redux"

import { setSocket } from "../store/slices/socketSlice";
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


        return () => {
            socket?.disconnect()
        }

    }, [authUser])

}
export default useSetSocketConnection