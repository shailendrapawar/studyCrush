import React from "react";
import { FaHeart } from "react-icons/fa";

import { useSelector } from "react-redux"
import { useNavigate } from "react-router";

const SearchItem = ({ data }) => {

  const { currentTheme } = useSelector(s => s.theme)
  const navigate=useNavigate();

  return (
    <div className="w-full h-30 bg-green-300 rounded-md p-1  flex flex-row items-center gap-5 relative z-0 shadow-xs shadow-black cursor-pointer"
      style={{ backgroundColor: `${currentTheme?.cardBackground}` ,border:`1px solid ${currentTheme.line}`}}
      onClick={()=>navigate(`/user/resource/${data._id}`)}
    >

      <img src={data?.thumbnail} className="h-full w-25 object-cover rounded-md" ></img>

      <div className=" h-auto mt-3 w-[60%]  gap-1">

        <h2 className="text-sm">{data?.title}</h2>
        <p className="text-xs max-h-8 overflow-scroll"
          style={{ color: `${currentTheme?.textSecondary}` }}
        >{data?.description}</p>

        <section className="h-8 w-full p-1 flex gap-2 overflow-x-scroll mt-1 -mb-1"
        >
          {data?.tags?.map((tag,i)=>{
            return <div
            key={i}
            style={{backgroundColor:currentTheme?.accent}}
            className="  w-auto rounded-md  pl-2 pr-2 flex items-center text-xs text-white  whitespace-nowrap">{tag}
            </div>
          })}
        </section>

      </div>


      <span
        className="text-xs absolute top-2 right-2 flex items-center"
      >
        <FaHeart className="text-pink-600 mr-1" />
        {
          data?.likes?.length
        }

      </span>
    </div>
  )
}
export default React.memo(SearchItem)