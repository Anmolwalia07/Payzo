import Main from "@repo/ui/Main"
import Header from "@repo/ui/Header"
import dot from "dotenv"
dot.config();

function page() {
  return (
   <>
    <header><Header/></header>
    <main><Main/></main>
   </>
  )
}

export default page