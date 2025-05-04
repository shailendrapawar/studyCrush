import NotificationModel from "../models/notificationModel.js";

import{ io} from "../socket/socket.js"
class NotificationCreator{
    static create=async({senderId,receiverId,message,type,resourceId})=>{
        try{

            const newNotification= new  NotificationModel({
                senderId,
                receiverId,
                type,
                message,
                resourceId
            })
    
            const isCreated=await newNotification.save()
    
            if(isCreated){
                let id=receiverId.toString(receiverId)
                // console.log(id)
                const notification=await isCreated.populate({
                    path:"senderId",
                    select:" name profilePicture"
                })

                //emitting socket event for notifcation for single user====
                io.to(id).emit("notification",notification)

                //returning the notificationfor requested user=====
                return notification
            }

        }catch(err){
            console.log("some error in notification services",err)
            return err
        }
    }

}

export default NotificationCreator;