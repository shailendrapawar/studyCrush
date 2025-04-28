import React, { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import toast, {} from "react-hot-toast"

const TagsBar = ({list,setList}) => {
    const inputRef = useRef()
    const listRef=useRef();

    const { currentTheme } = useSelector(s => s.theme)

    const [tag, setTag] = useState("");


    const addTag = (e) => {
        if (e.key === "Enter") {
            if(list.length>5){
                toast.error(" you can only add 5 tags")
                return
            }
            setList((prev) => [...prev, tag])
            setTag("")
        }
    }

    const removeTag=(index)=>{
        const filterItems=list.filter((v,i)=>i!=index)
        setList(filterItems);
    }

    useEffect(() => {
        // console.log(list)
        if(listRef?.current){
            listRef?.current?.scrollIntoView({behavior:"smooth", inline:"end"})
        }
    }, [list])

    return (
        <div className="h-12 pl-2 pr-2 w-full flex items-center" style={{ backgroundColor: currentTheme?.background }}
            onClick={() => inputRef?.current?.focus()}
        >
            <div className="w-auto flex  gap-1.5 overflow-x-scroll" >
                {list?.map((tag,i) => {
                    return <div key={i} index={i} className=" min-w-auto  pl-3 pr-3 h-9 rounded-md  relative cursor-pointer " style={{backgroundColor:currentTheme.primary}}>
                        <section className=" whitespace-nowrap text-[12px] h-5 max-h-5 mt-3">{tag}</section>
                        <b className=" absolute top-0 right-1 text-[10px]" onClick={()=>removeTag(i)}>X</b>
                    </div>
                    
                })}
                <div ref={listRef}></div>
            </div>
            <input value={tag} onChange={(e) => setTag(e.target.value)} placeholder="enter tags" className=" w-20 outline-none pl-1 pr-1 text-xs h-full" onKeyDown={addTag} ref={inputRef}></input>

        </div>
    )
}
export default React.memo(SingleComment)