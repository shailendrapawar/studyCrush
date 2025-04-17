import { useSelector } from "react-redux"
const SearchPage = () => {
  const {currentTheme}=useSelector(s=>s.theme);
  return (
    <div className="min-h-full h-auto flex flex-col items-center">

      <h1 className="text-3xl mt-5 mb-5"><b style={{color:currentTheme.accent}}>S</b>EARCH</h1>

      {/* ======input area ================ */}
      <div className="h-10 w-full max-w-150 flex  pl-2 pr-2"

      >
        <input className="h-full w-[80%] pl-2 pr-2 outline-none" type="text" placeholder="enter tag, subject, title"
        style={{backgroundColor:currentTheme.cardBackground}}
        ></input>
        <button  className="h-full w-[20%]"
        style={{backgroundColor:currentTheme.accent}}
        >Search</button>
      </div>


      {/* ==========searched item body============ */}

      <section className="min-h-50 h-auto w-full max-w-150 mt-10">
        
      </section>

    </div>
  )
}
export default SearchPage