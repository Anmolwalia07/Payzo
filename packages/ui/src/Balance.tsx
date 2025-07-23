
type Balance={
  id:number,
  amount:number,
  locked:number,
  userId:number
}

function Balance({balance}:{balance:Balance}) {
  return (
 <div className="py-3 px-5 bg-[#ffffff] shadow rounded text-lg  border-gray-200 border">
      <h1 className="text-xl font-medium tracking-wider">Balance</h1>
      <div className="flex justify-between border-b border-dashed py-1 mt-1"><h1>Unlocked Balance</h1><h1>0 INR</h1></div>
      <div className="flex justify-between border-b border-dashed py-1"><h1>Total Locked Balance</h1><h1>0 INR</h1></div>
      <div className="flex justify-between border-b border-dashed py-1"><h1>Total Balance</h1><h1 className="font-medium">{balance.amount} INR</h1></div>
    </div>
 )
}

export default Balance