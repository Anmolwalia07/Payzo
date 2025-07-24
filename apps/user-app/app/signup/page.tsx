'use client';
import Loading from "@repo/ui/LoadingforUi";
import Logo from "@repo/ui/Logo";
import axios from "axios";
import {  useRouter } from "next/navigation";
import { useState } from "react";
import { SlArrowLeft } from "react-icons/sl";


export default function LoginForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [passwordError, setPasswordError] = useState("")
     
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name=e.currentTarget.username.value
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    
    // Password validation
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    } else {
      setPasswordError("");
    }
    
    setLoading(true)
    const response=await axios.post('/api/signup',{
        name,email,password
    })
    if(response.data.message){
        setLoading(false);
        router.push('/login')
    }
    setLoading(false)
  };

  return (
    <>
    {loading && <Loading/>}
    
    <div className="w-full h-20 sm:h-22 shadow items-center flex"><Logo/></div>
    <div className="w-full mt-20 flex justify-center items-center px-4 ">
        <div className="absolute left-2 top-[14%] sm:left-5 sm:top-[15%]  flex items-center gap-1 md:gap-2 font-bold w-fit cursor-pointer" onClick={()=>{
       router.push('/');
       }}><SlArrowLeft />
      Back
     </div>
<form
  onSubmit={handleSubmit}
  className="
    bg-white border border-gray-500 rounded-xl
    flex flex-col items-center
    py-4 px-2 gap-3
    w-full md:w-[30%] max-w-md
  ">
      <div className="text-4xl  font-extrabold flex justify-center h-fit text-blue-600">Payzo</div>
      <h2 className="text-2xl mt-1 flex justify-center">Sign up</h2>
      <input name="username" type="text" className="border rounded p-2 pl-4 w-[90%] mt-4 outline-blue-400" placeholder="Enter name" required />
      <input name="email" type="email" className="border rounded p-2 pl-4 w-[90%]  outline-blue-400" placeholder="Enter email or mobile" required />
      <input 
        name="password" 
        type="password" 
        placeholder="Password" 
        className="border rounded outline-blue-400 p-2 pl-4 w-[90%] mt-1" 
        required 
        onChange={(e) => {
          if (e.target.value.length > 0 && e.target.value.length < 8) {
            setPasswordError("Password must be at least 8 characters long");
          } else {
            setPasswordError("");
          }
        }}
      />
      {passwordError && <p className="text-red-500 text-sm w-[90%]">{passwordError}</p>}
      <button type="submit" className="bg-blue-500 rounded-2xl w-[90%] p-2 text-lg text-white mt-3 hover:bg-purple-600 tracking-wider">Create Account</button>
      <button className="rounded-2xl w-[90%] p-2 text-lg border border-gray-400 mb-4 hover:bg-gray-200" onClick={()=>{
        router.push('/login')
      }}>Login</button>
    </form>
    </div>
    </>
  );
}