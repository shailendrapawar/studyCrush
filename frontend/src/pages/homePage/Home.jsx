import { useState } from "react";
import { useSelector } from "react-redux"
import HomeResourceCard from "../../components/HomeResourceCard/HomeResourceCard";


const Home = () => {

  const[page,setPage]=useState(1);
  // const[hasMore,setHasMore]=useState(true);
  
  const { currentTheme } = useSelector(s => s.theme)
  const { authUser } = useSelector(s => s.user)
  const {homeResources}=useSelector(s=>s.resource)
  console.log(homeResources)

  return (
    <div className="h-full" 
    style={{ backgroundColor: currentTheme?.background }}
    >
      

      <section className=" h-auto w-full flex flex-col bg-green-50">
        {
          homeResources?.list?.map((item,i)=>{
            return <HomeResourceCard key={i} data={item} />
          })
        }
      </section>


    </div>
  )
}
export default Home