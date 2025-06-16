"use client"
import DashHome from "@repo/ui/DashHome"
import { useUser } from "../UserProvider";

export default  function Page() {
  const user=useUser()
  return (
    <DashHome user={user}/>
  );
}
