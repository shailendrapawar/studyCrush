import { useSelector } from "react-redux"
import TagsBar from "../../components/tagsBar/TagsBar"
import { useEffect, useState } from "react"
import getThumbnailFromURL from "../../utils/thumbnailGenerator.js"
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";

import axios from "axios"
import Loader from "../../components/loader/Loader.jsx";

const UploadPage = () => {

  const { currentTheme } = useSelector(s => s.theme)

  const [taglist, setTaglist] = useState([]);
  const [loading, setloading] = useState(false)

  const [resourceData, setResourceData] = useState({
    title: "",
    subject: "",
    link: "",
    description: "",
    tags: taglist,
    thumbnail: "",
    linkType: ""
  })


  //1:- ======handling change for all fields======================
  const handleChange = (e) => {
    const { name, value } = e.target;

    // handle  change for link type
    if (name == "linkType") {
      resourceData.link = ""
      resourceData.thumbnail = ""
    }

    // handling link for youtbe change
    if (name == "link") {

      const thumbnail = getThumbnailFromURL(value, resourceData.linkType);
      if (thumbnail) {
        // console.log(thumbnail)
        setResourceData(prev => ({
          ...prev,
          thumbnail: thumbnail,
          link: value
        }))
      }
      // console.log(resourceData)
      return
    }

    setResourceData((prev) => ({
      ...prev,
      [name]: value
    }))
    // console.log(resourceData)
  }


  // 2:- ===== handling tags =====================
  useEffect(() => {
    window.scrollTo(0, 0);
    setResourceData(prev => ({
      ...prev,
      tags: taglist
    }))
  }, [taglist])


  // 3:-==============handling submit==================
  const handleSubmit = async () => {
    if (!resourceData.title || !resourceData.subject || !resourceData.link || !resourceData.description || !resourceData.tags || !resourceData.thumbnail || !resourceData.linkType) {
      toast.error(" All fields required");
      return
    }
    if (loading) {
      return
    }

    try {

      setloading(true);
      const res = await axios.post(import.meta.env.VITE_API_URL + `/resource/createResource`, resourceData, {
        withCredentials: true
      })
      // console.log(res)
      if (res) {
        toast.success(res.data.msg)
        setResourceData({
          title: "",
          subject: "",
          link: "",
          description: "",
          tags: taglist,
          thumbnail: "",
          linkType: ""
        })
        setTaglist([])

      }

    } catch (err) {
      console.log(err)
    } finally {
      setloading(false)
    }
  }

  return (
    <div className="h-full w-full flex flex-col items-center  pl-2 pr-2" style={{ backgroundColor: currentTheme?.background }}>

      <h2 className="text-2xl  mt-10"> <b className="text-blue-500">U</b>pload <b className="text-blue-500">R</b>esource</h2>

      <section className=" h-auto max-w-120 w-full rounded-xl p-2 pt-5 flex flex-col gap-3 items-center mt-10 shadow-md shadow-black"
        style={{ backgroundColor: currentTheme?.cardBackground, border: `1 px solid ${currentTheme.line}` }}
      >

        <div className="w-full flex gap-1 mt-3">
          <input value={resourceData.title}
            onChange={(e) => handleChange(e)}
            type="text" name="title" className="h-10 w-full outline-none pl-2 pr-1  text-xs  shadow-xs shadow-black" placeholder="enter title"
            style={{ backgroundColor: currentTheme.background, }}>
          </input>

          <select
            className="h-10 w-full outline-none pl-2 pr-1  text-xs  shadow-xs shadow-black" name="linkType"
            style={{ backgroundColor: currentTheme.background }}
            value={resourceData.linkType}
            onChange={(e) => handleChange(e)}
          >
            <option value="">select link type</option>
            <option value="google">google</option>
            <option value="youtube">youtube</option>
          </select>

        </div>

        <div className="w-full flex gap-1">
          <input value={resourceData.subject} onChange={(e) => handleChange(e)} name="subject" type="text" className="h-10 w-1/2 outline-none pl-2 pr-1  text-xs shadow-xs shadow-black" placeholder="enter subject" style={{ backgroundColor: currentTheme.background }}></input>
          {resourceData?.linkType && (
            <input value={resourceData.link} onChange={(e) => handleChange(e)} name="link" type="text" className="h-10 w-1/2 outline-none pl-2 pr-1  text-xs shadow-xs shadow-black" placeholder="enter link" style={{ backgroundColor: currentTheme.background }}></input>
          )}
        </div>

        {resourceData?.thumbnail && (
          <div className="h-40 w-55 relative shadow-xs shadow-black">
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

        <textarea value={resourceData.description} onChange={(e) => handleChange(e)} name="description" className="h-20 w-full resize-none outline-none text-xs p-2 shadow-xs shadow-black" placeholder="enter description" style={{ backgroundColor: currentTheme.background }}></textarea>

        {/* ======for tags============== */}
        <TagsBar list={taglist} setList={setTaglist} />

        {!loading && (<button onClick={handleSubmit} className="h-10 w-20 text-white rounded-md self-end mt-2 mb-2 cursor-pointer shadow-md shadow-black active:shadow-none" style={{ backgroundColor: currentTheme.primary }}>UPLOAD</button>
        )}

        {loading && (<span><Loader value={loading} /></span>)}

      </section>

    </div>


  )
}
export default UploadPage