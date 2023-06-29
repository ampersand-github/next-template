import { Toaster } from "@/__shared__/ui/shadcn/toaster";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className="relative flex min-h-screen flex-col">
          <div className={"flex h-16 items-center bg-gray-100"}>header</div>
          <main className="flex-1 space-y-8 p-24">{children}</main>
        </div>

        <Toaster />
      </body>
    </html>
  );
}
