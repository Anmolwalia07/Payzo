import { AiOutlineHome } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { BiTransfer } from "react-icons/bi";
import { AiOutlineTransaction } from "react-icons/ai";
import SideBarItem from "./SideBarItem";
import { BiMoneyWithdraw } from "react-icons/bi";
import { TfiMoney } from "react-icons/tfi";
import { CiBank } from "react-icons/ci";



function SideBar() {
  return (
    <div className="w-[28%] lg:w-[30%] xl:w-[18%] hidden sm:flex flex-col pl-4 pt-10 lg:pl-8 lg:pt-12 xl:pl-10 gap-2 xl:pt-15 border-r h-full border-gray-300  text-xl lg:text-2xl">
        <SideBarItem href="/dashboard" icon={<AiOutlineHome/>} text="Home"/>
        <SideBarItem href="/explore" icon={<FaSearch/>} text="Explore"/>
        <SideBarItem href="/transfer" icon={<BiTransfer />} text="Transfer"/>
        <SideBarItem href="/addmoney" icon={<TfiMoney />} text="Add Money"/>
        <SideBarItem href="/withdraw" icon={<BiMoneyWithdraw />} text="Withdraw"/>
        <SideBarItem href="/transaction" icon={<AiOutlineTransaction />} text="Transactions"/>
        <SideBarItem href="/manageBankAccount" icon={<CiBank />} text="BankAccount"/>
    </div>
  )
}

export default SideBar