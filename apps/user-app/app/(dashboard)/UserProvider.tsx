"use client";
import { createContext, FC ,useContext} from "react";

export type User={
    id:number,
    name:string,
    email:string,
    balance:Balance,
    OnRampTransaction:OnRampTransaction[],
    balanceHistory:balanceHistory[]
}

type balanceHistory={
    id:number,
    balance:number,
    userId:number
}
type Balance={
    id:number,
    amount :number,
    locked:number,
     userId: number

}

export interface OnRampTransaction {
  id: number,
  status: OnRampStatus
  token: string,
  provider: string,
  amount: number,
  startTime: Date,
  userId: number
}
enum OnRampStatus{
   Success,
   Failure,
   Processing
}


export const UserContext = createContext<User|null>(null);

export const UserProvider: FC<{user: User; children: React.ReactNode}> = ({ user, children }) => (
  <UserContext.Provider value={user}>{children}</UserContext.Provider>
);

export function useUser(): User {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
