import Chart from "./Chart";

export default function DashHome({ user }: { user: any }) {
  const date = new Date();
  const hour = date.getHours();

  let greeting = "Hello";
  if (hour >= 4 && hour <= 11) {
    greeting = "Good Morning";
  } else if (hour >= 12 && hour <= 16) {
    greeting = "Good Afternoon";
  } else if (hour > 16 && hour <= 19) {
    greeting = "Good Evening";
  } else {
    greeting = "Good Night";
  }

  return (
    <div className="w-full px-4 lg:pl-8">
      <h1 className="capitalize mt-6 text-3xl w-fit lg:text-5xl font-bold lg:ml-2 text-blue-500 tracking-wide ">{greeting}, <span className="capitalize">{user.name}</span></h1>
     <div className="w-full flex flex-col sm:flex sm:flex-row gap-3 lg:gap-8 mt-5">
         <div className="w-full md:w-[70%] lg:w-[75%] bg-white border border-gray-200 rounded-xl shadow px-2 lg:px-6 h-100  py-4 ">
          <div className="w-full flex justify-between items-center"><h1 className="text-2xl font-semibold">Balance</h1><h1 className="text-xl font-bold ">{user.balance.amount} INR</h1></div>
        <Chart data={user.balanceHistory}/>
      </div>
      <div className="w-full md:w-[30%] xl:w-[20%] bg-white border border-gray-200 rounded-xl shadow px-6 h-80  py-4"></div>
     </div>
    </div>
  );
}
