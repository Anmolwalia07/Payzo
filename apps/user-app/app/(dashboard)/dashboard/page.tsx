"use client"
import DashHome from "@repo/ui/DashHome"
import { useUser } from "../UserProvider";

export default function Page() {
  const ctx=useUser();
  return (
    //@ts-ignore
    <DashHome user={ctx[0]} />
  );
}