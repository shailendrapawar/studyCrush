import { useSelector } from "react-redux"
const PublicProfilePage = () => {

  const {currentTheme}=useSelector(s=>s.theme);

  return (
    <div className="h-screen w-full flex flex-col items-center px-1">

      <section className="max-w-100 w-full h-70 rounded-lg flex flex-col items-center justify-evenly mt-5" 
      style={{backgroundColor:currentTheme.cardBackground}}
      >

        <img className="h-30 w-30 rounded-full bg-white"></img>
        <h3>USER Name</h3>
        <p style={{color:currentTheme.textSecondary}}>Bio</p>
      </section>


      <h1 className="text-xl mt-5 text-center"><b style={{color:currentTheme.accent}}>S</b>hared <b style={{color:currentTheme.accent}}>R</b>esources ( 4 )</h1>

      <section 
      className="h-10 w-full max-w-100"
      style={{backgroundColor:currentTheme.cardBackground}}>

      </section>

    </div>
  )
}
export default PublicProfilePage