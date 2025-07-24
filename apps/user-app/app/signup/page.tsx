'use client';
import Loading from "@repo/ui/LoadingforUi";
import Logo from "@repo/ui/Logo";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SlArrowLeft } from "react-icons/sl";

export default function SignupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = e.currentTarget.username.value;
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }
    
    setLoading(true);
    try {
      const response = await axios.post('/api/signup', {
        name,
        email,
        password
      });
      
      if (response.data.message) {
        router.push('/login');
      }
    } catch (error: any) {
      setFormError(error.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loading/>}
      <div className="w-full h-20 sm:h-22 shadow items-center flex"><Logo/></div>
      <div className="w-full mt-20 flex justify-center items-center px-4">
        <div 
          className="absolute left-2 top-[14%] sm:left-5 sm:top-[15%] flex items-center gap-1 md:gap-2 font-bold w-fit cursor-pointer" 
          onClick={() => router.push('/')}
        >
          <SlArrowLeft />
          Back
        </div>
        
        <form
          onSubmit={handleSubmit}
          className="
            bg-white border border-gray-500 rounded-xl
            flex flex-col items-center
            py-6 px-4 gap-3
            w-full md:w-[30%] max-w-md
          "
        >
          <div className="text-4xl font-extrabold flex justify-center h-fit text-blue-600">Payzo</div>
          <h1 className="text-2xl mt-1 flex justify-center">Sign up</h1>
          
          {formError && <p className="text-red-500 text-sm w-full px-4">{formError}</p>}
          
          <div className="w-full px-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input 
              id="username"
              name="username" 
              type="text" 
              className="border rounded p-2 pl-4 w-full outline-blue-400" 
              placeholder="Enter your full name" 
              required 
            />
          </div>
          
          <div className="w-full px-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input 
              id="email"
              name="email" 
              type="email" 
              className="border rounded p-2 pl-4 w-full outline-blue-400" 
              placeholder="Enter your email" 
              required 
            />
          </div>
          
          <div className="w-full px-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input 
              id="password"
              name="password" 
              type="password" 
              placeholder="Create a password" 
              className="border rounded outline-blue-400 p-2 pl-4 w-full" 
              required 
              onChange={(e) => {
                if (e.target.value.length > 0 && e.target.value.length < 8) {
                  setPasswordError("Password must be at least 8 characters long");
                } else {
                  setPasswordError("");
                }
              }}
            />
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>
          
          <div className="w-full px-4 mt-2">
            <button 
              type="submit" 
              className="bg-blue-500 rounded-2xl w-full p-2 text-lg text-white hover:bg-purple-600 tracking-wider disabled:opacity-70"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
          
          <div className="w-full text-center text-sm text-gray-600 mt-2 px-4">
            Already have an account?{' '}
            <button 
              type="button"
              className="text-blue-600 hover:underline font-medium"
              onClick={() => router.push('/login')}
              disabled={loading}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}