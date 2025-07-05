import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Admin Pannel",
  description: "Admin pannel for wallet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true"
      > 
        {children}
      </body>
    </html>
  );
}
