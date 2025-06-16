"use client"
import {usePathname, useRouter} from "next/navigation"

function SideBarItem({href,icon,text}:{href:string,icon:React.ReactNode,text:string}) {
    const path=usePathname();
    const selected=path===href
    const router=useRouter()
  return (
  <div onClick={()=>{
    router.push(href)
  }} className={`flex items-center gap-2 tracking-wide ${selected ? "text-[#437af3] font-bold" : "text-slate-600"} cursor-pointer w-fit`}>{icon}{text}</div>  )
}

export default SideBarItem