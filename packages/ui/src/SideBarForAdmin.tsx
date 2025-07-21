"use client"
import { 
  AiOutlineDashboard, 
  AiOutlineUser, 
  AiOutlineShop, 
  AiOutlineTransaction,
  AiOutlineMoneyCollect,
  AiOutlineHistory,
  AiOutlineSetting,
  AiOutlineAudit,
  AiOutlinePieChart,
  AiOutlineSecurityScan,
  AiOutlineMessage
} from "react-icons/ai";
import { BiMoneyWithdraw } from "react-icons/bi";
import {  MdOutlineSupportAgent } from "react-icons/md";
import SideBarItem from "./SideBarItem";
import { CgProfile } from "react-icons/cg";
import {useRouter} from "next/navigation"

function AdminSideBar({name,email}:{name:String,email:string}) {
    const router=useRouter()
  return (
    <div className="w-[280px] hidden sm:flex flex-col pt-6 gap-1 border-r h-full border-gray-200 bg-white text-base shadow-sm pl-7">
      {/* Navigation Sections */}
      <div className="flex flex-col gap-1  overflow-y-auto pb-8">
        {/* Dashboard Section */}
        <div className="mb-2">
          <p className="text-xs  text-gray-500 uppercase tracking-wider py-2 font-semibold">Main</p>
          <SideBarItem 
            href="/dashboard" 
            icon={<AiOutlineDashboard className="text-xl" />} 
            text="Dashboard"
          />
        </div>

        {/* User Management */}
        <div className="mb-2">
          <p className="text-xs  text-gray-500 uppercase tracking-wider  py-2 font-semibold">User Management</p>
          <SideBarItem 
            href="/users" 
            icon={<AiOutlineUser className="text-xl" />} 
            text="Users"
          />
          <SideBarItem 
            href="/merchants" 
            icon={<AiOutlineShop className="text-xl" />} 
            text="Merchants"
          />
        </div>

        {/* Transactions */}
        <div className="mb-2">
          <p className="text-xs  text-gray-500 uppercase tracking-wider  py-2 font-semibold">Transactions</p>
          <SideBarItem 
            href="/transactions" 
            icon={<AiOutlineTransaction className="text-xl" />} 
            text="All Transactions"
          />
          <SideBarItem 
            href="/deposits" 
            icon={<AiOutlineMoneyCollect className="text-xl" />} 
            text="Deposits"
          />
          <SideBarItem 
            href="/withdrawals" 
            icon={<BiMoneyWithdraw className="text-xl" />} 
            text="Withdrawals"
          />

        </div>

        {/* Financial Management */}
        <div className="mb-2">
          <p className="text-xs  text-gray-500 uppercase tracking-wider  py-2 font-semibold">Financial</p>
          <SideBarItem 
            href="/reconciliation" 
            icon={<AiOutlineAudit className="text-xl" />} 
            text="Reconciliation"
          />
          {/* <SideBarItem 
            href="/chargebacks" 
            icon={<AiOutlinePieChart className="text-xl" />} 
            text="Chargebacks"
          />
          <SideBarItem 
            href="/fees" 
            icon={<AiOutlineMoneyCollect className="text-xl" />} 
            text="Fee Management"
          /> */}
        </div>

        {/* System Management */}
        <div className="mb-2">
          <p className="text-xs  text-gray-500 uppercase tracking-wider  py-2 font-semibold">System</p>
          <SideBarItem 
            href="/audit-logs" 
            icon={<AiOutlineHistory className="text-xl" />} 
            text="Audit Logs"
          />
          <SideBarItem 
            href="/settings" 
            icon={<AiOutlineSetting className="text-xl" />} 
            text="Platform Settings"
          />
          <SideBarItem 
            href="/security" 
            icon={<AiOutlineSecurityScan className="text-xl" />} 
            text="Security"
          />
        </div>
        {/* <div className="mb-2">
          <p className="text-xs  text-gray-500 uppercase tracking-wider py-2 font-semibold">Support</p>
          <SideBarItem 
            href="/disputes" 
            icon={<AiOutlineMessage className="text-xl" />} 
            text="Disputes"
          />
          <SideBarItem 
            href="/support-tickets" 
            icon={<MdOutlineSupportAgent className="text-xl" />} 
            text="Support Tickets"
          />
        </div> */}
      </div>

      {/* User Profile */}
      <div className="mt-auto border-t border-gray-200 pt-4 pb-6">
             <div className="flex items-center gap-3 px-3 py-2 font-semibold rounded-lg hover:bg-gray-50 cursor-pointer">
               <div className="bg-gray-200 rounded-xl w-10 h-10 flex items-center justify-center text-xl">
                 <CgProfile onClick={()=>{
                    router.push("/profile")
                 }} />
               </div>
               <div className="flex-1 min-w-0">
                 <p className="text-gray-900 truncate">{name}</p>
                 <p className="text-xs text-gray-500 truncate">{email}</p>
               </div>
             </div>
           </div>

    </div>
  )
}

export default AdminSideBar;
