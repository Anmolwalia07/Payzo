import "./globals.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Providers from "./provider";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Merchants",
  description: "Merchant Pannel for wallet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body  cz-shortcut-listen="true">
        <Providers>{children}</Providers>
        </body>
    </html>
  );
}
