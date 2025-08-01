import "./globals.css";
import type { Metadata } from "next";
import Providers from "./providers";
export const metadata: Metadata = {
  title: "Wallet",
  description: "User View for Wallet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body  cz-shortcut-listen="true">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
