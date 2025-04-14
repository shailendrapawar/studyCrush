import { useSelector } from "react-redux"


const Home = () => {

  const { currentTheme } = useSelector(s => s.theme)
  const { authUser } = useSelector(s => s.user)


  return (
    <div className="h-full" 
    style={{ backgroundColor: currentTheme?.background }}
    >
      

      <section className=" h-auto bg-green-50">
        cards
      </section>


    </div>
  )
}
export default Home