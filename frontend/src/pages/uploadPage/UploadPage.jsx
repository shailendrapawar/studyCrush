import { useSelector } from "react-redux"
import TagsBar from "../../components/tagsBar/TagsBar"
import { useEffect, useState } from "react"
import getYoutubeThumbnailFromURL from "../../utils/thumbnailGenerator"
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";

import axios from "axios"

const UploadPage = () => {

  const { currentTheme } = useSelector(s => s.theme)

  const [taglist, setTaglist] = useState([]);

  const [resourceData, setResourceData] = useState({
    title: "",
    subject: "",
    link: "",
    description: "",
    tags: taglist,
    thumbnail: ""
  })


  //1:- ======handling change for all fields======================
  const handleChange = (e) => {
    const { name, value } = e.target;


    // handling link for youtbe change
    if (name == "link") {
      const thumbnail = getYoutubeThumbnailFromURL(value);
      if (thumbnail) {
        console.log(thumbnail)
        setResourceData(prev => ({
          ...prev,
          thumbnail: thumbnail,
          link: value
        }))
      }
      return
    }

    setResourceData((prev) => ({
      ...prev,
      [name]: value
    }))
  }


  // 2:- ===== handling tags =====================
  useEffect(() => {
    console.log(taglist)
    setResourceData(prev => ({
      ...prev,
      tags: taglist
    }))
  }, [taglist])


  // 3:-==============handling submit==================
  const handleSubmit = async () => {
    if (!resourceData.title || !resourceData.subject || !resourceData.link || !resourceData.description || !resourceData.tags || !resourceData.thumbnail) {
      toast.error(" All fields required");
      return
    }
    console.log("all fields filled");
    console.log(resourceData)

    try{

      const res=await axios.post(import.meta.env.VITE_API_URL+`/resource/createResource`,resourceData,{
        withCredentials:true
     })
     console.log(res)
     if(res){
       toast.success(res.data.msg)
       setResourceData({
        title: "",
        subject: "",
        link: "",
        description: "",
        tags: taglist,
        thumbnail: ""
      })
      setTaglist([])

     }

    }catch(err){
      console.log(err)
    }
  }


  return (
    <div className="h-full w-full flex justify-center items-center   pl-2 pr-2" style={{ backgroundColor: currentTheme?.background }}>

      <section className=" h-auto max-w-120 w-full rounded-xl p-2 pt-5 flex flex-col gap-2 items-center"
        style={{ backgroundColor: currentTheme?.cardBackground }}
      >
        <h2 className="text-2xl "> <b className="text-blue-500">U</b>pload <b className="text-blue-500">R</b>esource</h2>

        <input value={resourceData.title}
          onChange={(e) => handleChange(e)}
          type="text" name="title" className="h-10 w-full outline-none pl-2 pr-1  text-xs mt-3" placeholder="enter title" style={{ backgroundColor: currentTheme.background }}></input>

        <div className="w-full flex gap-1">
          <input value={resourceData.subject} onChange={(e) => handleChange(e)} name="subject" type="text" className="h-10 w-1/2 outline-none pl-2 pr-1  text-xs" placeholder="enter subject" style={{ backgroundColor: currentTheme.background }}></input>
          <input value={resourceData.link} onChange={(e) => handleChange(e)} name="link" type="text" className="h-10 w-1/2 outline-none pl-2 pr-1  text-xs" placeholder="enter link" style={{ backgroundColor: currentTheme.background }}></input>
        </div>

        {resourceData?.thumbnail && (
          <div className="h-40 w-55 relative">
            <RxCross2 className=" absolute h-8 w-8 -right-10" onClick={() => {
              setResourceData((prev) => ({
                ...prev,
                thumbnail: "",
                link: ""
              }))
            }} />
            <img src={resourceData?.thumbnail} className="w-55 h-40 rounded-xl object-cover">
            </img>
          </div>
        )}

        <textarea value={resourceData.description} onChange={(e) => handleChange(e)} name="description" className="h-20 w-full resize-none outline-none text-xs p-2" placeholder="enter description" style={{ backgroundColor: currentTheme.background }}></textarea>

        {/* ======for tags============== */}
        <TagsBar list={taglist} setList={setTaglist} />

        <button onClick={handleSubmit} className="h-10 w-20 rounded-md self-end mt-2 mb-2" style={{ backgroundColor: currentTheme.primary }}>UPLOAD</button>

      </section>

    </div>


  )
}
export default UploadPage