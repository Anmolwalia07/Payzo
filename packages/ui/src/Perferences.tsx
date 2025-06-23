import Info from './Info'

function Perferences() {
  return (
     <div className="w-full bg-white border border-gray-200 shadow  rounded-2xl px-5 py-3 md:py-5 ">
        <h1 className="text-2xl  font-semibold mt-1 ">Perferences</h1>
        <div className=" text-xl mt-1 p-2 md:p-4 flex flex-col gap-5" >
            <Info text="Language" value="English"/>
            <Info text="Current" value="INR"/>
            <Info text="Time Zone" value="[+05.30]GTM"/>
            <Info text="Default Hours" value="24 hr"/>
        </div>
    </div>
  )
}

export default Perferences