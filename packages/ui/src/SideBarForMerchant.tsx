import { AiOutlineHome } from "react-icons/ai";
import { BiTransfer } from "react-icons/bi";
import { AiOutlineTransaction } from "react-icons/ai";
import SideBarItem from "./SideBarItem";
import { BiMoneyWithdraw } from "react-icons/bi";
import { TfiMoney } from "react-icons/tfi";



function SideBar() {
  return (
    <div className="w-[28%] lg:w-[30%] xl:w-[18%] hidden sm:flex flex-col pl-4 pt-10 lg:pl-8 lg:pt-12 xl:pl-10 gap-2 xl:pt-15 border-r h-full border-gray-300  text-xl lg:text-2xl">
        <SideBarItem href="/dashboard" icon={<AiOutlineHome/>} text="Home"/>
        <SideBarItem href="/withdraw" icon={<BiMoneyWithdraw />} text="Withdraw"/>
        <SideBarItem href="/transaction" icon={<AiOutlineTransaction />} text="Transactions"/>
    </div>
  )
}

export default SideBar