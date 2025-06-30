"use client"
import { SessionProvider } from "next-auth/react";
import React from "react";

function Providers({ children }: React.PropsWithChildren<{}>) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default Providers;
