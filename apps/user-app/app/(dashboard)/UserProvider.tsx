"use client"

import React, { createContext, FC, useContext, useState, Dispatch, SetStateAction } from "react";


export type User = {
  id: number;
  name: string;
  email: string;
  balance: Balance;
  OnRampTransaction: OnRampTransaction[];
  balanceHistory: BalanceHistory[];
  offRampTransaction:offRampTransaction[]
};

type BalanceHistory = {
  id: number;
  balance: number;
  userId: number;
};

type Balance = {
  id: number;
  amount: number;
  locked: number;
  userId: number;
};

export interface OnRampTransaction {
  id: number;
  status: OnRampStatus;
  token: string;
  provider: string;
  amount: number;
  startTime: Date;
  userId: number;
}

export interface offRampTransaction {
  id: number;
  status: OnRampStatus;
  token: string;
  provider: string;
  amount: number;
  startTime: Date;
  userId: number;
}

export enum OnRampStatus {
  Success,
  Failure,
  Processing,
}

// Context type with state and setter
type UserContextType = [User, Dispatch<SetStateAction<User>>];

// Create context
export const UserContext = createContext<UserContextType | null>(null);

// Provider component
export const UserProvider: FC<{ user: User; children: React.ReactNode }> = ({ user, children }) => {
  const [userDetails, setUser] = useState<User>(user);

  return (
    <UserContext.Provider value={[userDetails, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use user context
export function useUser(): UserContextType {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
