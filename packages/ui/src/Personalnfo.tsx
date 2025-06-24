import Info from "./Info";

export type UserInfo={
    id:Number;
    email:String;
    name:String;
    balance:Balance
}

type Balance={
  
    amount:Number
    
}

export default function Personalnfo({userInfo}:{userInfo:UserInfo}) {
  return (
    <div className="w-full bg-white border border-gray-200 shadow  rounded-2xl px-5 py-3 md:py-5">
        <h1 className="text-2xl  font-semibold mt-1 ">Personal Info</h1>
        <div className=" text-xl mt-1 p-2 md:p-4 flex flex-col gap-5" >
            <Info text="Public Id" value={`ABCPAYZO${userInfo.id}`}/>
            <div className="flex gap-20 -mt-10 md:-mt-5 ml-1">
                <div className="w-[15%]"></div>
                <div className="text-sm">(use this id when you need to share with third party)</div>
            </div>
            <Info text="Name" value={userInfo.name}/>
            <Info text="Email" value={userInfo.email}/>
            <Info text="Country" value="India"/>
        </div>
    </div>
  )
}
