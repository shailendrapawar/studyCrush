import NotificationModel from "../models/notificationModel.js";
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
                return isCreated.populate({
                    path:"senderId",
                    select:" name profilePicture"
                })
            }

        }catch(err){
            console.log("some error in notification services",err)
            return err
        }
    }

}

export default NotificationCreator;