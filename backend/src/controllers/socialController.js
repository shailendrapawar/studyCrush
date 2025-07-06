import UserModel from "../models/userModel.js";

class SocialController {

    // #=====standard response============
    static standardResponse = async (status, res, msg, data) => {
        return res.status(status).json({
            msg: msg,
            data: data || null
        })
    }

    // #===== standard fetch user block list ========
    static getBlockedUser=async({targetUserId,currentUserId})=>{
        const user=await UserModel.findById(currentUserId).select("blockedUsers");
        const isBlocked=user.blockedUsers.includes(targetUserId)
        return isBlocked;
    }

    // A: send friend request=========
    static sendFriendRequest = async (req, res) => {

        try {
            const senderId = req.id;
            const { receiverId } = req.params;

            if (senderId.toString() === receiverId) {
                return this.standardResponse(400, res, "You can't add yourself", null)
            }

            // 1: check for if blocked
            const isBlocked= this.getBlockedUser({currentUserId:req.id,targetUserId:receiverId})
            if(isBlocked){
              return  this.standardResponse(400,"User is blocked , unblock to send friend request")
            }

            // 2: find both user
            const sender = await UserModel.findById(senderId);
            const receiver = await UserModel.findById(receiverId);

            // 3: check if request already sent or friend connected
            if (sender.friends.includes(receiverId) || sender.sentRequests.includes(receiverId) || receiver.friendRequests.includes(senderId)) {
                return this.standardResponse(400, res, "Friend request sent or already connnected", null);
            }

            // 4: update both user friend list===

            sender.sentRequests.push(receiverId);
            receiver.friendRequests.push(senderId);

            await sender.save();
            await receiver.save();

            //5: send notifications===
            return this.standardResponse(200, res, "friend request sent", null);

        } catch (err) {
            console.log("error in sending friend request", err.message)
            return this.standardResponse(400, res, "Internal server error", null);
        }
    }

    // B: Accept friend request=====
    static acceptFriendRequest = async (req, res) => {

        try {
            const receiverId = req.id;
            const { senderId } = req.params

            //1: find both users
            const receiver = await UserModel.findById(receiverId);
            const sender = await UserModel.findById(senderId);

            // 2: check if friend request exists
            if (!receiver.friendRequests.includes(senderId)) {
                return this.standardResponse(400, res, "No request from this user", null)
            }

            // 3: pull for request list and push into friend list for both user
            const receiverIndex = receiver.friendRequests.findIndex((id) => id.equals(senderId));
            const senderIndex = sender.sentRequests.findIndex((id) => id.equals(receiverId));

            //4: check if they exist on both side
            if (receiverIndex == -1 || senderIndex == -1) {
                return this.standardResponse(400, res, "no request received from sender");
            }

            //5 : if yes then update mututal friend list
            receiver.friendRequests.splice(receiverIndex, 1);
            receiver.friends.push(senderId);

            sender.sentRequests.splice(senderIndex, 1);
            sender.friends.push(receiverId);


            await receiver.save()
            await sender.save()

            //6: send notifications===
            return this.standardResponse(200, res, "friend request accepted", null);

        } catch (err) {
            console.log("error in accepting friend request", err.message)
            return this.standardResponse(400, res, "Internal server error", null);
        }
    }

    //C Reject friend request
    static rejectFriendRequest = async (req, res) => {

        try {

            const receiverId = req.id;
            const { senderId } = req.params;

            //1: find both user
            const receiver = await UserModel.findById(receiverId);
            const sender = await UserModel.findById(senderId);

            // 2: check if friend request exists
            if (!receiver.friendRequests.includes(senderId)) {
                return this.standardResponse(400, res, "No request from this user", null)
            }

            //3: remove id from friend request and sent request list of receiver and sender respectively 
            const receiverIndex = receiver.friendRequests.findIndex((id) => id.equals(senderId));
            const senderIndex = sender.sentRequests.findIndex((id) => id.equals(receiverId));

            //4: check if they exist on both side
            if (receiverIndex == -1 || senderIndex == -1) {
                return this.standardResponse(400, res, "no request received from sender");
            }

            //5 : if yes then remove request from sender and receiver lists
            receiver.friendRequests.splice(receiverIndex, 1);
            sender.sentRequests.splice(senderIndex, 1);

            await receiver.save()
            await sender.save()

            //6: send notifications===

            return this.standardResponse(200, res, "friend request rejected", null);
        } catch (err) {
            console.log("error in rejecting request", err.message)
            return this.standardResponse(400, res, "Internal server error", null);
        }
    }

    //D: get friend list of user

    static getFriendList = async (req, res) => {

        try {
            const { userId } = req.params;

            const friendList = await UserModel.findById(userId).populate({
                path: "friends",
                select: " username profilePicture"
            }).select("friends");
            console.log(friendList)

            return this.standardResponse(200, res, "friend list found", friendList);

        } catch (err) {
            console.log("error in get friend request", err.message)
            return this.standardResponse(400, res, "Internal server error", null);
        }
    }

    
    // E: toggle block user 
    static toggleBlockUser = async (req, res) => {

        try {
            const { targetUserId } = req.params;
            const currentUserId = req.id;

            if(targetUserId===currentUserId){
                return this.standardResponse(400, res, "Cannot block yourself", null);
            }

            const user=await UserModel.findById(currentUserId);

            const targetIdIndex=user.blockedUsers.findIndex((id)=> id.equals(targetUserId));

            let isBlocked=false;
            if(targetIdIndex==-1){
                // block user py pushing
                user.blockedUsers.push(targetUserId);
                isBlocked=true;

            }else{
                // unblock user by poping
                user.blockedUsers.splice(targetIdIndex,1);
            }

            await user.save();

            return this.standardResponse(200, res, `user ${isBlocked?"blocked":"unblocked"} successfully`, targetUserId);

        } catch (err) {
            console.log("error in block toggling", err.message)
            return this.standardResponse(400, res, "Internal server error", null);
        }

    }



}

export default SocialController;