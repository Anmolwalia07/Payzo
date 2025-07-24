"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "./Logo";
import Signout from "./Signout";
import SideBarItem from "./SideBarItem";
import { FiLogOut } from "react-icons/fi";

import {
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineShop,
  AiOutlineTransaction,
  AiOutlineMoneyCollect,
  AiOutlineAudit,
  // AiOutlinePieChart,
  AiOutlineHistory,
  // AiOutlineSetting,
  // AiOutlineSecurityScan,
  // AiOutlineMessage,
} from "react-icons/ai";
import { BiMoneyWithdraw } from "react-icons/bi";
// import { MdOutlineSupportAgent } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FiAlignRight } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { signOut } from "next-auth/react";

function DashHeader() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      {/* Header */}
      <div className="w-full flex items-center justify-between border-b border-gray-300 px-4 sm:px-6 py-3">
        <Logo />
        <div className="hidden sm:flex gap-4 items-center">
          <Signout />
          <CgProfile
            onClick={() => router.push("/profile")}
            className="text-2xl lg:text-3xl hover:cursor-pointer text-gray-700"
          />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="sm:hidden flex items-center gap-4">
          <CgProfile className="text-2xl text-gray-700" />
          {isVisible ? (
            <RxCross2 className="text-3xl" onClick={() => setIsVisible(false)} />
          ) : (
            <FiAlignRight className="text-3xl" onClick={() => setIsVisible(true)} />
          )}
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isVisible && (
        <div className="sm:hidden w-full bg-gray-50 border-b border-gray-200 px-6 py-4 text-base shadow">
          <div className="flex flex-col gap-5 overflow-y-auto">
            <Section title="Main">
              <SideBarItem href="/dashboard" icon={<AiOutlineDashboard className="text-xl" />} text="Dashboard" />
            </Section>

            <Section title="User Management">
              <SideBarItem href="/users" icon={<AiOutlineUser className="text-xl" />} text="Users" />
              <SideBarItem href="/merchants" icon={<AiOutlineShop className="text-xl" />} text="Merchants" />
            </Section>

            <Section title="Transactions">
              <SideBarItem href="/transactions" icon={<AiOutlineTransaction className="text-xl" />} text="All Transactions" />
              <SideBarItem href="/deposits" icon={<AiOutlineMoneyCollect className="text-xl" />} text="Deposits" />
              <SideBarItem href="/withdrawals" icon={<BiMoneyWithdraw className="text-xl" />} text="Withdrawals" />
            </Section>

            <Section title="Financial">
              <SideBarItem href="/reconciliation" icon={<AiOutlineAudit className="text-xl" />} text="Reconciliation" />
              {/* <SideBarItem href="/chargebacks" icon={<AiOutlinePieChart className="text-xl" />} text="Chargebacks" />
              <SideBarItem href="/fees" icon={<AiOutlineMoneyCollect className="text-xl" />} text="Fee Management" /> */}
            </Section>

            <Section title="System">
              <SideBarItem href="/audit-logs" icon={<AiOutlineHistory className="text-xl" />} text="Audit Logs" />
              {/* <SideBarItem href="/settings" icon={<AiOutlineSetting className="text-xl" />} text="Platform Settings" />
              <SideBarItem href="/security" icon={<AiOutlineSecurityScan className="text-xl" />} text="Security" /> */}
            </Section>

            {/* <Section title="Support">
              <SideBarItem href="/disputes" icon={<AiOutlineMessage className="text-xl" />} text="Disputes" />
              <SideBarItem href="/support-tickets" icon={<MdOutlineSupportAgent className="text-xl" />} text="Support Tickets" />
            </Section> */}
          </div>
          <h1 className="flex text-gray-600 items-center gap-2 tracking-wide cursor-pointer w-fit pl-0.5" onClick={()=>{
            signOut()
          }}><FiLogOut className="text-lg" />Signout</h1>
        </div>
      )}
    </>
  );
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <p className="text-sm text-gray-500 uppercase tracking-wide mb-2 font-semibold">{title}</p>
    <div className="flex flex-col gap-2">{children}</div>
  </div>
);

export default DashHeader;
