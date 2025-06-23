function Info({value,text}:{value:any,text:string}) {
  return (
    <div className="flex gap-20">
        <div className="w-[15%] text-gray-400 font-medium ">{text}</div>
        <div className="capitalize w-fit overflow-hidden">{value}</div>
    </div>
  )
}

export default Info