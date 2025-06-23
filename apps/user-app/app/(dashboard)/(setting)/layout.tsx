"use client"
import {usePathname,useRouter} from "next/navigation"
export default function layout({children}:{children:React.ReactNode}) {
    const path=usePathname();
    const router=useRouter()
    return (
     <>
     <div className="w-full mb-5 lg:mb-0 px-4">
      <h1 className="text-5xl font-bold text-blue-600 mt-6 ml-2">Accounts</h1>
     <div className="flex gap-2 w-fit"> <button className={`text-xl font-bold mt-6 ml-6 ${path==='/setting' &&"bg-white shadow border border-gray-200"} w-fit px-3 rounded-xl py-1`} onClick={()=>{
        router.push('/setting')
     }}>Settings</button>
      <button onClick={()=>{
        router.push('/security')
     }} className={`text-xl font-bold mt-6 ml-6 ${path==='/security' &&"bg-white shadow border border-gray-200"} w-fit px-3 rounded-xl py-1`}>Security</button></div>
      </div>
      {children}
     </>
  )
}
