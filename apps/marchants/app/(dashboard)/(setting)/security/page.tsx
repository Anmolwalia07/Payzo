"use client"
import axios from 'axios';
import { useState } from 'react';
import { useMerchant } from '../../MerchantProvider';
import Loader from"@repo/ui/LoadingforUi"
import FeedbackMessages from "@repo/ui/FeedbackMessage"

export default function SecurityPage() {
  // const [devices, setDevices] = useState([
  //   {
  //     id: 1,
  //     browser: 'Chrome',
  //     os: 'Windows 10',
  //     ip: '192.168.1.12',
  //     lastAccessed: '2025-06-19 6:45 PM',
  //     current: true,
  //   },
  //   {
  //     id: 2,
  //     browser: 'Firefox',
  //     os: 'Ubuntu',
  //     ip: '103.221.8.77',
  //     lastAccessed: '2025-06-17 11:02 AM',
  //     current: false,
  //   },
  // ]);
  const ctx=useMerchant();

  const [formData,setFormData]=useState({
    id:Number(ctx[0]?.id)||"",
    password:"",
    newPassword:"",
    conformPassword:""
  })
  const [feedback,setFeedback]=useState<{type:"success" | "error",message :string} | null>(null)
  const [loading,setLoading]=useState(false);
  const handleSubmit=async(e:any)=>{
    e.preventDefault();
   try{
    setLoading(true);
      const res= await axios.post('/api/updatePassword',formData);
      if(res.data){
        setFormData({
         id:Number(ctx[0].id)||"",
         password:"",
         newPassword:"",
         conformPassword:""
        })
      }
       setLoading(false);
      setFeedback({type:"success",message:res.data.message})
    }catch(e){
          setLoading(false);
         //@ts-ignore
        setFeedback({type:"error",message:e.data.message})
    }   
  }
  return (
    <div className="w-full mb-5 lg:mb-0 md:h-[77%] overflow-y-scroll px-4 py-6 space-y-10">
      {loading && <Loader/>}
    {feedback?.message && <FeedbackMessages type={feedback.type} message={feedback.message} onClose={()=>{setFeedback(null)}}/>}
      {/* Device Management
      <section className="bg-white p-5 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Device Management</h2>
        <ul className="space-y-4">
          {devices.map((device) => (
            <li
              key={device.id}
              className="flex items-center justify-between border-b pb-2"
            >
              <div>
                <p className="font-medium">
                  {device.browser} on {device.os}
                </p>
                <p className="text-sm text-gray-500">
                  IP: {device.ip} · Last accessed: {device.lastAccessed}
                </p>
              </div>
              {device.current ? (
                <span className="text-green-600 font-semibold text-sm">Current</span>
              ) : (
                <button className="text-red-600 text-sm hover:underline">Log Out</button>
              )}
            </li>
          ))}
        </ul>
        <button className="mt-4 text-sm text-blue-600 hover:underline">
          Log out of all other devices
        </button>
      </section> */}

      {/* Change Password */}
      <section className="bg-white p-5 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <input
            type="password"
            placeholder="Current Password"
            className="w-full border p-2 rounded-md"
            value={formData.password}
            onChange={(e)=>{
              setFormData({...formData,password:e.target.value})
            }}
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full border p-2 rounded-md"
            value={formData.newPassword}
             onChange={(e)=>{
              setFormData({...formData,newPassword:e.target.value})
            }}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full border p-2 rounded-md"
             value={formData.conformPassword}
             onChange={(e)=>{
              setFormData({...formData,conformPassword:e.target.value})
            }}
          />
          {formData.newPassword!==formData.conformPassword &&<div className='text-sm text-red-400'>Don't match</div>}
          <div className="text-sm text-gray-500">
            Make sure it's at least 8 characters with a mix of letters, numbers, and symbols.
          </div>
          <button type='submit' className="bg-black text-white px-4 py-2 rounded-md">
            Update Password
          </button>
        </form>
      </section>

      {/* Security Alerts
      <section className="bg-white p-5 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Security Alerts</h2>
        <ul className="text-sm text-gray-700 space-y-2">
          <li>✅ Password changed on June 18, 2025</li>
          <li>⚠️ Login from new device (Chrome, Delhi) on June 17, 2025</li>
          <li>⚠️ Large transaction alert - ₹15,000 sent on June 16, 2025</li>
        </ul>
      </section> */}
    </div>
  );
}
