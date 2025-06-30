"use client";

import React, {
  createContext,
  FC,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

// Define types matching your Prisma schema
export type BalanceHistoryMerchant = {
  id: number;
  merchantId: number;
  balance: number;
  createdAt: string; // DateTime → ISO string
};

export type OffRampTransactionMerchant = {
  id: number;
  status: offRampStatus;
  token: string;
  provider: string;
  amount: number;
  startTime: string;
  offRamp: boolean;
  merchantId: number;
};

export type BalanceMerchant = {
  id: number;
  merchantId: number;
  amount: number;
  locked: number;
};

export type PaymentTransaction = {
  id: number;
  merchantId: number;
  merchantName: string;
  amount: number;
  date: string;
  status: PaymentStatus;
  type: PaymentType;
  userId: number;
};

export enum offRampStatus {
  Success = "Success",
  Failure = "Failure",
  Processing = "Processing",
}

export enum PaymentStatus {
  completed = "completed",
  pending = "pending",
  failed = "failed",
}

export enum PaymentType {
  payment = "payment",
  refund = "refund",
}

export type Merchant = {
  id: number;
  name: string;
  email: string;
  password?: string | null;
  category: string;
  rating: number;
  reviewCount: number;
  balance?: BalanceMerchant | null;
  balancehistroy: BalanceHistoryMerchant[];
  offRampTransaction: OffRampTransactionMerchant[];
  transactions: PaymentTransaction[];
  createdAt: string;
  updatedAt: string;
};

// Context is a tuple: [merchant, setMerchant]
export type MerchantContextType = [
  Merchant,
  Dispatch<SetStateAction<Merchant>>
];

// Create context with explicit type; default as null until provider wraps
const MerchantContext = createContext<MerchantContextType | null>(null);

export const MerchantProvider: FC<{ merchant: Merchant; children: React.ReactNode }> =
  ({ merchant, children }) => {
    const [merchantState, setMerchant] = useState<Merchant>(merchant);
    return (
      <MerchantContext.Provider value={[merchantState, setMerchant]}>
        {children}
      </MerchantContext.Provider>
    );
  };

export function useMerchant(): MerchantContextType {
  const ctx = useContext(MerchantContext);
  if (!ctx) {
    throw new Error("useMerchant must be used within MerchantProvider");
  }
  return ctx;
}
