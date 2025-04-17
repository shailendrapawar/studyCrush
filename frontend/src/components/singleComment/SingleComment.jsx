import { useSelector } from "react-redux"
import defaultAvatar from "./defaultAvatar.avif"
const SingleComment = ({data}) => {
  const{currentTheme}=useSelector(s=>s.theme);
// console.log(data)

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
  });
}
  return (
    <div className="w-full h-auto max-h-max shadow-black shadow-xs  flex items-center pl-5 pt-2 pb-2 gap-2 relative"
    style={{}}
    >
        <img src={(data?.user?.profilePicture?.url)||defaultAvatar} className="h-10 w-10 bg-gray-200 rounded-full"></img>

        <div className=" h-auto w-[80%] flex flex-col ">
          <i className="text-[9px] absolute top-1 right-1" style={{color:currentTheme.textSecondary}}>{formatDate(data?.createdAt)}</i>
          <b className="text-sm">{data?.user?.name}</b>
          <p className="text-xs h-auto">{data?.comment}</p>
        </div>

    </div>
  )
}
export default SingleComment

