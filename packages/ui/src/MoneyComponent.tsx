import InputComponent from "./InputComponent";

function Addmoneycomponent({ user,setUser,text }: { user: any,setUser:any,text:string }) {
  return (
    <div className="lg:w-[50%] h-[40%] ml-4">
      <div className="bg-white shadow px-5 py-5 border border-gray-200 rounded-lg w-full flex flex-col gap-2">
        <h1 className="text-3xl font-medium">{text}</h1>
        <InputComponent user={user}  setUser={setUser} text={text}/>
      </div>
    </div>
  );
}

export default Addmoneycomponent;
