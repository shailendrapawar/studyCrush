import { useSelector } from "react-redux"
import TagsBar from "../../components/tagsBar/TagsBar"

const UploadPage = () => {

  const {currentTheme}=useSelector(s=>s.theme)
  return (
    <div className="h-full w-full flex justify-center items-center pl-2 pr-2">

      <section className="h-100 max-w-100 w-full rounded-xl p-2 flex flex-col gap-2 items-center" 
            style={{backgroundColor:currentTheme?.cardBackground}}
      >
        <input type="text" className="h-10 w-full outline-none pl-1 pr-1  text-xs" placeholder="enter title" style={{backgroundColor:currentTheme.background}}></input>

        <textarea className="h-20 w-full resize-none outline-none text-xs p-1" placeholder="enter description" style={{backgroundColor:currentTheme.background}}></textarea>
        <input type="text" className="h-10 w-full outline-none pl-1 pr-1  text-xs" placeholder="enter link" style={{backgroundColor:currentTheme.background}}></input>

        <img className="w-50 h-30">
        </img>



        
        {/* ======for tags============== */}
        <TagsBar/>



      </section>
      
    </div>

    
  )
}
export default UploadPage