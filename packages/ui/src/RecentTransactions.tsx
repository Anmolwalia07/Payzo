import {redirect} from "next/navigation"

type onRampTransaction={
   id: number;
  status: OnRampStatus;
  token: string;
  provider: string;
  amount: number;
  startTime: Date;
  userId: number;
}
type offRampTransaction={
   id: number;
  status: OnRampStatus;
  token: string;
  provider: string;
  amount: number;
  startTime: Date;
  userId: number;
}
 enum OnRampStatus {
  Success,
  Failure,
  Processing,
}

export default function RecentTransactions({recentTransactions,text}:{recentTransactions:onRampTransaction[] | offRampTransaction[],text:string}){

  return (
    <div className="py-3 px-5 bg-[#ffffff] shadow rounded text-lg mt-3  border-gray-200 border">
      <h1 className="text-xl font-semibold tracking-wide">Recent Transactions</h1>
      {recentTransactions.length >0 ? <div className="w-full flex gap-2 flex-col pt-3 items-center">{recentTransactions.map((trans)=>{
        return(
          <li className="list-none w-full border border-gray-300 shadow flex justify-between items-center rounded-lg px-3 py-0.5" key={trans.id}>
            <div className="md:w-10 md:h-10 bg-blue-400 text-white flex justify-center items-center rounded-full w-8 h-8 text-md md:text-2xl">$</div>
            <div className="w-fit flex flex-col items-center ">
              <h1 className="text-md md:text-xl font-mono font-semibold">{text}</h1>
              <h1 className="text-xs md:text-md ">{new Date(trans.startTime).toUTCString().toString()}</h1>
            </div>
            <div className="flex flex-col items-center  w-fit">
              <h1 className="text-md md:text-lg font-mono font-extrabold">{trans.status}</h1>
              <h1 className="text-sm font-bold">{trans.amount}</h1>
            </div>
          </li>
        )
      })}
      <button className="bg-purple-500 w-fit p-1 mt-2 rounded-lg px-2 font-medium text-white hover:bg-purple-600" onClick={()=>{
       redirect('/transaction');
      }}>Veiw All Transactions</button>
      </div>
      :<div className="flex py-6  justify-center items-center" >No Recent Transactions</div>
     }
    </div>
  )
}
