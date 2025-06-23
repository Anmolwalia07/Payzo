import Transactions from "./Transactions"

function Transaction({t}:Transactions|any) {
  return (
    <div className="w-full flex justify-between items-center rounded-lg md:px-3 px-1 py-1.5 mt-3">
            <div className="flex items-center gap-4 md:w-[50%] w-[50%]">
            <div className="md:w-13 md:h-13 bg-blue-400  text-white flex justify-center items-center rounded-full w-10 h-8 text-md md:text-2xl">$</div>
              <div className="w-[80%]"><h1 className="text-md md:text-2xl font-mono font-semibold">{t.onRamp ? "Deposist":"Withdraw"} INR</h1>
              <h1 className="text-xs md:text-md ">{`${new Date(t.startTime).toLocaleDateString()} ${new Date(t.startTime).toLocaleTimeString()}`}</h1></div>
            </div>
            <div className="flex flex-col items-end w-[50%] px-1 md:px-4">
              <h1 className="text-md md:text-lg font-mono font-extrabold">{t.status}</h1>
              <h1 className="text-sm font-bold">{}{t.amount}</h1>
            </div>
    </div>
  )
}

export default Transaction