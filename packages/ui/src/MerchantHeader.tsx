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
import { BiMoneyWithdraw, BiTransfer } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { IoSettingsSharp } from "react-icons/io5";
import { CiBank } from "react-icons/ci";




function MerchantHeader() {
  const router=useRouter();
  const [isVisible, setIsVisible] = useState(false)
  return (
    <>
    <div className="w-full flex sm:h-18 h-18 items-center border-b border-gray-300">
        <Logo/>
        <div className="sm:flex hidden gap-3 w-[80%] h-fit items-center justify-end pr-10 lg:pr-18 mt-2">
           <Signout/>
           <CgProfile onClick={()=>{
            router.push('/profile')
           }} className="lg:text-3xl text-xl hover:cursor-pointer font-light"/>
           <GoQuestion className="text-xl lg:text-3xl"/>
           <IoSettingsSharp className="text-xl lg:text-3xl hover:cursor-pointer" onClick={()=>{
            router.push('/setting')
           }}/>
        </div>
         <div className="w-[60%]  sm:hidden flex justify-end pr-8 items-center gap-3 mt-2">
          <CgProfile className="text-2xl  font-light" onClick={()=>{
            router.push('/profile')
           }} />
           <IoSettingsSharp className="text-2xl lg:text-3xl hover:cursor-pointer"onClick={()=>{
            router.push('/setting')
           }}/>
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
        <SideBarItem href="/withdraw" icon={<BiMoneyWithdraw />} text="Withdraw"/>
        <SideBarItem href="/transaction" icon={<AiOutlineTransaction />} text="Transactions"/>
        <SideBarItem href="/withdraw-hist" icon={<BiMoneyWithdraw />} text="History"/>
        <SideBarItem href="/manageBankAccount" icon={<CiBank />} text="BankAccount"/>
     </div>
    </div>}
    </>
  );
}

export default MerchantHeader;