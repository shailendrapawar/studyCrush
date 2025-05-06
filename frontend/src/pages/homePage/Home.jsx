import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import HomeResourceCard from "../../components/HomeResourceCard/HomeResourceCard";
import useGetHomeResources from "../../hooks/useGetHomeResources";
import { addHomeResources } from "../../store/slices/resourceSlice";

import axios from "axios";
const Home = () => {

  const dispatch = useDispatch()
  const [page, setPage] = useState(1);

  // const[hasMore,setHasMore]=useState(true);

  const { currentTheme } = useSelector(s => s.theme)
  const { authUser } = useSelector(s => s.user)
  const { homeResources } = useSelector(s => s.resource)

  // console.log(homeResources)
  const bottomRef = useRef(null);


  // function for fetching additional resource===================
  const fetchResourceAgain = async (p) => {
    try {
      const res = await axios.get(import.meta.env.VITE_API_URL + `/resource/getAllResources?page=${p}`, {
        withCredentials: true
      })
      if (res) {
        // console.log(res.data.resources)
        dispatch(addHomeResources({ list: res.data.resources, hasMore: res.data.hasMore }))
      }

    } catch (err) {
      console.log(err)
    }
  }


  // observer function=================
  useEffect(() => {

    // 1:- create a observer==== 
    const observer = new IntersectionObserver(async ([entry]) => {
      if (entry.isIntersecting) {
        // console.log("intersected")

        // 3:- check for intersecting==========
        if (homeResources.hasMore) {
          setPage(prev => prev + 1);
        }
      }
    })



    // 2: observing the bottom ref========
    if (bottomRef?.current) {
      observer?.observe(bottomRef?.current)
    }

    // 4:- most important to cleanup  ,only if it exist==========
    return () => {
      if (bottomRef?.current) {
        observer.unobserve(bottomRef?.current)
      }
    }

  }, [homeResources.hasMore]);


  //trigger for page change===============
  useEffect(() => {
    if (page > 1 && homeResources.hasMore) {
      fetchResourceAgain(page)
    }
  }, [page])

  // useGetHomeResources(1)
  return (
    <div className="h-auto "
      style={{ backgroundColor: currentTheme?.background }}
    >

      <h3 className="text-3xl text-center mt-5 mb-5"><b style={{ color: currentTheme?.primary }}>H</b>OME</h3>


      <section className=" h-auto w-full flex flex-col pt-3 pb-3 p-2 gap-5  items-center">
        {
          homeResources?.list?.length > 0 ? homeResources?.list?.map((item, i) => {
            return <HomeResourceCard key={i} data={item} />
          }) : <h2>No resources available 🥺</h2>
        }

        <div className="" ref={bottomRef}>{homeResources.hasMore ? "Loading..." : "Your are all caught up 🤭"}</div>
      </section>


    </div>
  )
}
export default Home