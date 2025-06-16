import Main from "@repo/ui/Main"
import Header from "@repo/ui/Header"
import dot from "dotenv"
dot.config();

async function page() {
  return (
   <>
    <header><Header loginUrl={process.env.LoginUrl || " "} MerchantUrl={process.env.MerchantUrl || " "}/></header>
    <main><Main/></main>
   </>
  )
}

export default page