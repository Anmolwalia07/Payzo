"use client";

import axios from "axios";
import { useState } from "react";
import Loading from "./LoadingforUi";
import TransactionPopup from "./PopMessage";
import { Merchant } from "./MerchantHome";


export default function InputComponent({ merchant ,setMerchant}:{merchant:Merchant,setMerchant:any}) {
  const [value, setValue] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "razorpay">("bank");
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [loading ,setLoading]=useState(false);
  const [popupState, setPopupState] = useState<{
    show: boolean;
    type: 'add' | 'withdraw';
    success: boolean;
    amount: number;
  }>({ show: false, type: 'add', success: true, amount: 0 });
   
  const presetValues = [1000, 2000, 5000];

  const isDisable=(Number(merchant.balance?.amount)<value)

  return (
    <>
    {loading && <Loading/>}
    {popupState.show && (
        <TransactionPopup 
          type={popupState.type}
          success={popupState.success}
          amount={popupState.amount}
          onClose={() => setPopupState({...popupState, show: false})}
        />
      )}
      <input
        type="number"
        min={100}
        placeholder="Enter Amount"
        value={value || ""}
        onChange={(e) => setValue(Number(e.target.value))}
        required
        className="border mt-2 rounded outline-none border-gray-300 bg-white w-full px-2 py-1 font-medium"
      />
      {( merchant.balance && merchant.balance.amount<=value) && <div className="ml-2 text-red-600 font-semibold">Insufficient balance</div>}

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
      </form>

      <button
        className="bg-purple-500 p-1.5 px-2 text-xl mt-4 rounded-lg text-white disabled:bg-purple-300"
        disabled={value < 100 || isDisable}
        onClick={() => {
            if(selectedBank!=""){
                
            }
        }
        }
      >
        Withdarw
      </button>
    </>
  );
}
