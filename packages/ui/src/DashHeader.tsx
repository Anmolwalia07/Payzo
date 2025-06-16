"use client"
import Logo from "./Logo"
import {useRouter} from "next/navigation"
import Signout from "./Signout";
import { CgProfile } from "react-icons/cg";
import { GoQuestion } from "react-icons/go";
import { FiAlignRight } from "react-icons/fi";
import { useState } from "react";
import SideBarItem from "./SideBarItem";
import { AiOutlineHome, AiOutlineTransaction } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { BiTransfer } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";



function DashHeader() {
  const router=useRouter();
  const [isVisible, setIsVisible] = useState(false)
  return (
    <>
    <div className="w-full flex sm:h-18 h-18 items-center border-b border-gray-300">
        <Logo/>
        <div className="sm:flex hidden gap-3 w-[80%] h-fit items-center justify-end pr-10 lg:pr-18 mt-2">
           <Signout/>
           <CgProfile className="lg:text-3xl text-xl  font-light"/>
           <GoQuestion className="text-xl lg:text-3xl"/>
        </div>
         <div className="w-[60%]  sm:hidden flex justify-end pr-8 ">
                  {!isVisible ? <FiAlignRight className="text-3xl" onClick={()=>{
                    setIsVisible(prev=>!prev)
                  }}/>:<RxCross2 className="text-3xl" onClick={()=>{
                    setIsVisible(prev=>!prev)
                  }}/>}
        </div>
    </div>
    {isVisible && <div className="w-full flex flex-col justify-center sm:hidden items-center bg-gray-100 text-lg">
     <div className="w-fit tracking-widest">
        <SideBarItem href="/dashboard" icon={<AiOutlineHome/>} text="Home"/>
        <SideBarItem href="/explore" icon={<FaSearch/>} text="Explore"/>
        <SideBarItem href="/transfer" icon={<BiTransfer />} text="Transfer"/>
        <SideBarItem href="/transaction" icon={<AiOutlineTransaction />} text="Transactions"/>
     </div>
    </div>}
    </>
  );
}

export default DashHeader;