"use client";

import axios from "axios";
import { useState } from "react";
import Loading from "./LoadingforUi";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface InputComponentProps {
  user: User;
  setUser:any;
}

const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject("Not in browser");
    if (document.getElementById("razorpay-script")) return resolve(true);

    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => reject("Razorpay SDK failed to load.");
    document.body.appendChild(script);
  });
};

export default function InputComponent({ user ,setUser}: InputComponentProps) {
  const [value, setValue] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "razorpay">("bank");
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [loading ,setLoading]=useState(false);

const handleBankPayment=async(amount:number,userId:number)=>{
  let token=""
  try{
     setLoading(true)
      const onRampTransaction=await axios.post('/api/onRamping',{amount,provider:`${selectedBank}${paymentMethod}`,userId:user.id});
      token=onRampTransaction.data?.token;
     axios.put(`${process.env.NEXT_PUBLIC_ServerUrl}/api/bankaccount/updateBalance/${userId}`,{amount}).catch(e=>{
        alert("Don't have sufficient balance");
         setLoading(false)

     })

      const transaction=await axios.post(`${process.env.NEXT_PUBLIC_ServerUrl}/api/bank-webhook`,{
              token,
              amount,
              userId
        })
        if(transaction.data){
                const newuser=await axios.get('/api/data');
                setUser(newuser.data.user);
                setLoading(false)
        }
        setLoading(false)
        

  }catch(err){
     const transaction=await axios.put(`${process.env.NEXT_PUBLIC_ServerUrl}/api/onRamping`,{
        token,
        userId
      })
      setLoading(false)
      alert("Payment was failed");
  }
}

  const handlePayment = async (amount: number,userId:number) => {
    try {
      setLoading(true)
      const onRampTransaction=await axios.post('/api/onRamping',{amount,provider:paymentMethod,userId:user.id});

      const token=onRampTransaction.data?.token;
      const res = await loadRazorpayScript();
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_ServerUrl}/api/razorpay/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency: "INR" }),
      });

      const data = await response.json();

      const options = {
        key: "rzp_test_S6cYb7lWFRr6cQ",
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Payzo",
        description: "Add Money",
        order_id: data.order.id,
        handler: async (response: any) => {
          const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_ServerUrl}/api/razorpay/verify-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          const verifyData = await verifyRes.json();
          console.log(verifyData)
          if(verifyData.success){
            const transaction=await axios.post(`${process.env.NEXT_PUBLIC_ServerUrl}/api/razorpay-webhook`,{
              token,
              amount,
              userId
              })
              if(transaction){
                const newuser=await axios.get('/api/data');
                setUser(newuser.data.user);
              }
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: { color: "#2B7FFF" },
        modal: {
          ondismiss: async() => {
            const transaction=await axios.put(`${process.env.NEXT_PUBLIC_ServerUrl}/api/onRamping`,{
              token,
              userId
            })
            alert("Payment was cancelled");
          },
        },
      };
     
      const rzp = new window.Razorpay(options);
      rzp.open();
      setLoading(false);
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  const presetValues = [1000, 2000, 5000];

  return (
    <>
    {loading && <Loading/>}
      <input
        type="number"
        min={100}
        placeholder="Enter Amount"
        value={value || ""}
        onChange={(e) => setValue(Number(e.target.value))}
        required
        className="border mt-2 rounded outline-none border-gray-300 bg-white w-full px-2 py-1 font-medium"
      />

      <div className="flex gap-4 ml-2 font-medium py-2">
        {presetValues.map((v) => (
          <button
            key={v}
            className={`${value === v ? "border" : ""} p-0.5 rounded`}
            onClick={() => setValue(v)}
          >
            {v}
          </button>
        ))}
      </div>

      <form className="space-y-4">
        <div className="flex gap-2 items-center">
          <input
            type="radio"
            id="payment-bank"
            name="paymentMethod"
            value="bank"
            checked={paymentMethod === "bank"}
            onChange={() => {
              setPaymentMethod("bank");
              setSelectedBank("");
            }}
          />
          <label htmlFor="payment-bank" className="text-lg font-semibold">
            Bank
          </label>

          <input
            type="radio"
            className="ml-5"
            id="payment-razorpay"
            name="paymentMethod"
            value="razorpay"
            checked={paymentMethod === "razorpay"}
            onChange={() => {
              setPaymentMethod("razorpay");
              setSelectedBank("");
            }}
          />
          <label htmlFor="payment-razorpay" className="text-lg font-semibold">
            Razorpay
          </label>
        </div>

        {paymentMethod === "bank" && (
          <div>
            <select
              className="border border-gray-300 rounded w-full px-2 py-1 bg-white"
              value={selectedBank}
              required
              onChange={(e) => setSelectedBank(e.target.value)}
            >
              <option value="">Set bank</option>
              <option value="hdfc">HDFC Bank</option>
              <option value="axis">Axis Bank</option>
            </select>
          </div>
        )}

        {paymentMethod === "razorpay" && (
          <div>
            <input
              className="border border-gray-300 rounded w-full px-2 py-1 bg-[#e3e1e1] outline-none"
              value={paymentMethod.toUpperCase() + " Selected"}
              readOnly
            />
          </div>
        )}
      </form>

      <button
        className="bg-blue-500 p-1.5 px-2 text-xl mt-4 rounded-lg text-white disabled:bg-blue-200"
        disabled={value <100 }
        onClick={() => {
          if (paymentMethod === "razorpay") {
            handlePayment(value,user.id);
          }
          else if(selectedBank!==''){
            handleBankPayment(value,user.id)
          }
        }}
      >
        Add Money
      </button>
    </>
  );
}
