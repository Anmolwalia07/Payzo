import InputComponent from "./InputComponent";

function Addmoneycomponent({ user,Razorpay }: { user: any,Razorpay:any }) {
  console.log(user)
  return (
    <div className="lg:w-[50%] h-[40%] ml-4">
      <div className="bg-white shadow px-5 py-5 border border-gray-200 rounded-lg w-full flex flex-col gap-2">
        <h1 className="text-3xl font-medium">Add Money</h1>
        <InputComponent user={user} Razorpay={Razorpay} />
      </div>
    </div>
  );
}

export default Addmoneycomponent;
