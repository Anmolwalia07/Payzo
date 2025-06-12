"use client"
import { useState } from "react";
import Logo from "./Logo"
import { FiAlignRight } from "react-icons/fi";

function Header() {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
    <div className="w-full flex sm:h-22 h-20 items-center">
        <Logo/>
        <div className="sm:flex hidden gap-10 w-[60%] h-fit  justify-end pr-18">
            <button className="border px-3 py-1 rounded-2xl hover:bg-blue-300 hover:text-white">Login</button>
            <button className="border-2 px-3 py-1 rounded-2xl font-mono hover:bg-blue-300 "><span className="font-black text-lg text-blue-400 ">P </span> Merchant Login</button>
        </div>
        <div className="w-[40%] sm:hidden flex justify-end pr-10 ">
          <FiAlignRight className="text-3xl" onClick={()=>{
            setIsVisible(prev=>!prev)
          }}/>
        </div>
    </div>
    {isVisible && <div className="sm:hidden flex flex-col items-center bg-[#c7def1] text-lg capitalize font-medium py-1.5">
      <h1 className="hover:bg-[#afcadf]">Login</h1>
      <h1 className="hover:bg-[#afcadf]">Merchant Login</h1>
    </div>}
    </>
  );
}

export default Header;