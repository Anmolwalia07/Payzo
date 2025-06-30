import Main from "@repo/ui/Main"
import Header from "@repo/ui/Header"
<<<<<<< HEAD
function page() {
=======
import dot from "dotenv"
dot.config();

async function page() {
>>>>>>> parent of 3e5d1f2 (Merchant added)
  return (
   <>
    <header><Header/></header>
    <main><Main/></main>
   </>
  )
}

export default page