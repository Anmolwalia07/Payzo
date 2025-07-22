'use client'
import { signOut } from "next-auth/react"
function Signout({loger}:{loger:any}) {
  return (
     <button
        className="lg:px-3 px-2 font-medium py-1 rounded-xl border hover:bg-blue-500 bg-blue-400 text-white"
        onClick={()=>{
            signOut({callbackUrl:"/"});
        }}
      >
        Sign Out
      </button>  )
}

export default Signout