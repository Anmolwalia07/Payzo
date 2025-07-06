"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import Personalnfo from "./Personalnfo";
import { UserInfo } from "./Personalnfo";
import {useRouter} from "next/navigation"
import Loading from "./LoadingforUi";

export default  function Profile({ user }: { user: UserInfo }) {
const userId = Number(user.id);
const [bankAccount, setBankAccount] = useState({
    name:"",
    accountNumber:0,
    accountBalance:0,
    status:""
})

const [loading,setLoading]=useState(false)

const [message, setMessage] = useState('')


const router=useRouter();

async function createBankAccount(userId:Number,name:String) {
    try{
            setLoading(true)
            const res=await axios.post(`${process.env.NEXT_PUBLIC_ServerUrl}/api/bankaccount/`,{userId:userId,name:name})
            if(res.data){
                setLoading(false)
                setMessage("created successfully")
            }
    }catch(err){
         setLoading(false)
        console.log(err);
    }
}

useEffect(() => {
    setLoading(true)
  axios
    .get(`${process.env.NEXT_PUBLIC_ServerUrl}/api/bankaccount/${userId}`)
    .then((res) => {
      setLoading(false)
      if(res.status===200){
      setBankAccount(res.data.accountDetail);
      }
    })
    setLoading(false)

}, [userId,message]);

  return (
    <>
    {loading && <Loading/>}
    <div className="w-full px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl mb-8 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center">
            <div className="border-2 border-dashed rounded-xl w-24 h-24 md:mr-6 mb-4 md:mb-0" style={{backgroundImage:`url("https://img.freepik.com/premium-photo/3d-illustration-cartoon-character-avatar-profile_1183071-136.jpg")`,backgroundPosition:'center',backgroundSize:'100px'}} ></div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold capitalize">{user.name}</h1>
              <p className="text-blue-100 mt-1">{user.email}</p>
              <p className="text-blue-100 flex items-center justify-center md:justify-start mt-2">
                <span className="w-3 h-3 bg-green-400 rounded-full mr-2"></span>
                Active
              </p>
            </div>
          </div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white bg-opacity-10 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <Personalnfo userInfo={user} />
            </div>
          </div>

          <div className="space-y-6">
            {/* Wallet Balance */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-lg p-6 text-white">
              <h2 className="text-xl font-semibold">Wallet Balance</h2>
              <p className="text-3xl font-bold mt-2">₹{user?.balance?.amount && user.balance.amount.toLocaleString()}</p>
              <div className="flex mt-6 space-x-4">
                <button className="flex-1 bg-white text-indigo-700 py-2 rounded-lg font-medium hover:bg-opacity-90 transition" onClick={()=>{
                    router.push('/addmoney')
                }}>
                  Add Money
                </button>
                <button  onClick={()=>{
                    router.push('/withdraw')
                }} className="flex-1 bg-indigo-800 py-2 rounded-lg font-medium hover:bg-indigo-900 transition">
                  Withdraw
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Bank Accounts</h2>
                <button className="text-blue-600 hover:text-blue-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              {bankAccount.name!="" ? (
                <div className="p-6">
                  <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">HFDC</h3>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Primary
                      </span>
                    </div>
                    <p className="text-2xl font-mono mt-3 tracking-wider">
                      **** **** **** {bankAccount?.accountNumber.toString().slice(10)}
                    </p>
                    
                    <div className="flex justify-between mt-4 text-sm">
                      <div>
                        <p className="text-gray-500">Account Holder</p>
                        <p>{bankAccount?.name}</p>
                      </div>
                       <div>
                        <p className="text-gray-500">Status</p>
                        <p>{bankAccount?.status}</p>
                      </div>
                    </div>
                  </div>
                  <button className="w-full mt-4 text-center text-blue-600 hover:text-blue-800 font-medium py-2 border border-gray-200 rounded-lg">
                    Manage Accounts
                  </button>
                </div>
              ) : (
                <div className="p-6 text-center">
                  <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="mt-4 font-medium text-gray-900">No bank account added</h3>
                  <p className="text-gray-500 mt-1">Connect your bank account to withdraw funds</p>
                  <button className="mt-4 w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition" 
                  onClick={()=>{
                    createBankAccount(user.id,user.name);
                  }}
                  >
                    Add Bank Account
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}