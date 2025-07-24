'use client';
import Loading from "@repo/ui/LoadingforUi";
import Logo from "@repo/ui/Logo";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SlArrowLeft } from "react-icons/sl";

export default function LoginForm() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;
        setLoading(true);
   
        const res = await signIn("credentials", { 
            email, 
            password, 
            callbackUrl: "/dashboard" 
        }); 
        
        if(res) {
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
                        py-4 px-2 gap-3
                        w-full md:w-[30%] max-w-md
                    "
                >
                    <div className="text-4xl font-extrabold flex justify-center h-fit text-blue-600">Payzo</div>
                    <h2 className="text-2xl mt-1 flex justify-center">Login</h2>
                    
                    <input 
                        name="email" 
                        type="email" 
                        className="border rounded p-2 pl-4 w-[90%] mt-4 outline-blue-400" 
                        placeholder="Enter email or mobile" 
                        required 
                    />
                    <input 
                        name="password" 
                        type="password" 
                        placeholder="Password" 
                        className="border rounded outline-blue-400 p-2 pl-4 w-[90%] mt-1" 
                        required 
                    />
                    
                    <div className="w-[90%] text-right">
                        <button 
                            type="button"
                            className="text-sm text-blue-600 hover:underline"
                            // onClick={() => router.push('/forgot-password')}
                        >
                            Forgot password?
                        </button>
                    </div>
                    
                    <button 
                        type="submit" 
                        className="bg-blue-500 rounded-2xl w-[90%] p-2 text-lg text-white mt-1 hover:bg-purple-600 tracking-wider"
                    >
                        Login
                    </button>
                    
                    <div className="w-[90%] text-center text-sm text-gray-600 mt-2">
                        Don't have an account?{' '}
                        <button 
                            type="button"
                            className="text-blue-600 hover:underline font-medium"
                            onClick={() => router.push('/signup')}
                        >
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}