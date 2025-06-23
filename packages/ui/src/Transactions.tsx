import Transaction from "./Transaction";

 interface Transactions {
  id: number;
  amount: number;
  provider: string;
  status: string;
  startTime: string;
  onRamp?:boolean,
  offRamp?:boolean 
  userId:number
}

function Transactions({transactions}:Transactions[]|any) {
  return (
    <div className="w-full mb-5 lg:mb-0 md:h-[90%] px-4">
      <h1 className="text-5xl font-bold text-blue-600 mt-6 ml-2">Transactions</h1>
      <h1 className="text-xl font-bold mt-6 ml-6 bg-white shadow border border-gray-300 w-fit px-3 rounded-2xl py-1">Histroy</h1>
      <div className="w-full mt-5 px-4 flex flex-col overflow-y-scroll  h-[80%] overflow-x-hidden py-3 bg-white shadow border border-gray-200 rounded-4xl">
      <h1 className="text-4xl font-semibold mt-6 ml-2 mb-3">Transactions</h1>
      <div className="flex mb-3 mt-3"><button className="text-xl font-bold ml-6 bg-gray-200 rounded w-fit px-3 py-1">Start Date</button>
      <button className="text-xl font-bold ml-6 bg-gray-200 rounded w-fit px-3 py-1">End Date</button></div>
        {transactions.length >=1 ? transactions.map((t:Transactions)=>{
          return <Transaction key={`${t.id} ${t.onRamp ? "onRamp":"offRamp"}`} t={t}/>
        }):<div className="w-full flex justify-center mt-4 font-bold text-xl">No transactions...</div>}
      </div>
    </div>
  )
}

export default Transactions