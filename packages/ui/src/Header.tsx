"use client";
import { useState, useEffect } from "react";
import Logo from "./Logo";
import { FiAlignRight } from "react-icons/fi";
import { useRouter } from "next/navigation";

function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const router = useRouter();
 
  useEffect(() => {
    if (window.location.href === "https://payzo-user-app-three.vercel.app/" ) {
      setIsHome(true);
    }
  }, []);

  return (
    <>
      <div className="w-full flex sm:h-22 h-20 items-center shadow">
        <Logo />
        <div className="sm:flex hidden gap-10 md:w-[80%] h-fit justify-end pr-18">
          <button
            className="border px-3 py-1 rounded hover:bg-blue-300 hover:text-white"
            onClick={() => router.push(`/login`)}
          >
            Login
          </button>
          {isHome && (
            <button
              className="border px-3 py-1 rounded hover:text-white hover:bg-gray-300"
              onClick={() => router.push(`/signup`)}
            >
              Sign Up
            </button>
          )}
        </div>
        <div className="w-[60%] sm:hidden flex justify-end pr-8">
          <FiAlignRight
            className="text-3xl"
            onClick={() => setIsVisible((prev) => !prev)}
          />
        </div>
      </div>

      {isVisible && (
        <div className="sm:hidden flex flex-col items-center bg-[#c7def1] text-lg capitalize font-medium py-1.5">
          <h1
            className="hover:bg-[#afcadf]"
            onClick={() => router.push(`/login`)}
          >
            Login
          </h1>
          {isHome && (
            <h1
              className="hover:bg-[#afcadf]"
              onClick={() => router.push(`/signup`)}
            >
              Sign Up
            </h1>
          )}
        </div>
      )}
    </>
  );
}

export default Header;
