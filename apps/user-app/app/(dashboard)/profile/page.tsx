"use client"
import { useUser } from "../UserProvider";
import Profile   from "@repo/ui/Profile"

export default  function Page() {
  const ctx=useUser()
  return (
    <Profile user={ctx[0]}/>
  );
}