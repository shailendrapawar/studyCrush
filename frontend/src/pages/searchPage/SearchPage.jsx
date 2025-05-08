import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import axios from "axios"
import toast from "react-hot-toast"

import { setSearchList } from "../../store/slices/searchResourcesSlice"
import SearchItem from "../../components/searchItem/SearchItem"

const SearchPage = () => {

  const [keyword, setKeyword] = useState("")
  const { list } = useSelector(s => s.searchResource);
  const { currentTheme } = useSelector(s => s.theme);

  // console.log(list)
  const dispatch = useDispatch();

  const handleSearch = async () => {
    if (keyword == "") {
      return
    }

    if(keyword.length<3){
      toast.error(" keyword length short")
      return
    }

    try {

      const searchResult = await axios.post(import.meta.env.VITE_API_URL + `/resource/searchResource`, {
        search: keyword
      }, {

        withCredentials: true
      })

      // console.log(searchResult?.data?.result)
      if (searchResult) {
        if (searchResult?.data?.result?.length > 0) {
          dispatch(setSearchList(searchResult?.data?.result))
          return
        }
        toast.success("no resource found , try different keywords")
        dispatch(setSearchList([]))
      }

    } catch (err) {
      console.log("err",err)
      toast.error("Some error while search")
    }
  }

  useEffect(()=>{
    if(keyword.length<=0){
      dispatch(setSearchList([]))
    }

   return ()=>{
    // dispatch(setSearchList([]))
   }
  },[keyword])

  return (
    <div className=" h-auto flex flex-col items-center">

      <h1 className="text-3xl mt-5 mb-5"><b style={{ color: currentTheme.accent }}>S</b>EARCH</h1>

      {/* ======input area ================ */}
      <div className="h-10 w-[80%] max-w-150 flex shadow-xs shadow-black rounded-full justify-between  overflow-hidden"
      // style={{border:`0px solid ${currentTheme.line}`}}
      >
        <input className="h-full w-[80%] pl-5 pr-2 outline-none text-sm md:text-lg" type="text" placeholder="enter tag, subject, title"
          style={{ backgroundColor: currentTheme.cardBackground }}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        ></input>
        <button className="h-full w-[20%] text-sm sm:text-xl"
          onClick={handleSearch}
          style={{ backgroundColor: currentTheme.accent }}
        >Search</button>
      </div>


      {/* ==========searched item body============ */}

      <section className=" h-auto w-full max-w-150 mt-10 flex flex-col gap-5 pl-2 pr-2 z-0">
        {list.length <= 0 ? (<h2 className="text-center text-xl">Enter some keyword 🤔</h2>) : (<>{

          list?.map((item,i)=>{
            return <SearchItem data={item} key={i}/>
          })
        }</>)}
      </section>

    </div>
  )
}
export default SearchPage