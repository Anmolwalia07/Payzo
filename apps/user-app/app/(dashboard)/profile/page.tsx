"use client"
import { useUser } from "../UserProvider";
import Profile   from "@repo/ui/Profile"

export default  function Page() {
  const ctx=useUser()
  return (
    <div className="h-full w-full overflow-y-scroll">
      <Profile user={ctx[0]}/>
    </div>
  );
}