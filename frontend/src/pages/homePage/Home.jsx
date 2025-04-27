import { useState } from "react";
import { useSelector } from "react-redux"
import HomeResourceCard from "../../components/HomeResourceCard/HomeResourceCard";
import useGetHomeResources from "../../hooks/useGetHomeResources";


const Home = () => {

  const [page, setPage] = useState(1);
  // const[hasMore,setHasMore]=useState(true);

  const { currentTheme } = useSelector(s => s.theme)
  const { authUser } = useSelector(s => s.user)
  const { homeResources } = useSelector(s => s.resource)
  // console.log(homeResources)

  useGetHomeResources(1)
  return (
    <div className="h-auto "
      style={{ backgroundColor: currentTheme?.background }}
    >

      <h3 className="text-3xl text-center mt-5 mb-5"><b style={{ color: currentTheme?.primary }}>H</b>OME</h3>


      <section className=" h-auto w-full flex flex-col pt-3 pb-3 p-2 gap-5  items-center">
        {
          homeResources?.list?.length>0?homeResources?.list?.map((item, i) => {
            return <HomeResourceCard key={i} data={item} />
          }):<h2>No resources available 🥺</h2>
        }
      </section>


    </div>
  )
}
export default Home