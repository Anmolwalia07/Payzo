import AddMoneyForMerchant from "./AddMoneyForMerchant";
import { Merchant } from "./MerchantHome";

function Addmoneycomponent({ merchant,setMerchant}: { merchant: Merchant,setMerchant:any}) {
  return (
    <div className="lg:w-[50%] h-[40%] ml-4">
      <div className="bg-white shadow px-5 py-5 border border-gray-200 rounded-lg w-full flex flex-col gap-2">
        <h1 className="text-3xl font-medium">Withdraw Money</h1>
        <AddMoneyForMerchant merchant={merchant}  setMerchant={setMerchant} />
      </div>
    </div>
  );
}

export default Addmoneycomponent;
