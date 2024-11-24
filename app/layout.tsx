"use client";

import { SessionProvider } from "next-auth/react";

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import MainFooter from "@/components/Footer/MainFooter";
import MainHeader from "@/components/Header/MainHeader";
import { Toaster } from "@/components/ui/sonner";
import { CartContextProvider } from "@/contexts/cart";
import { CounterProvider } from "@/contexts/CounterContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="rtl">
      <head>
        <title>فروشگاه قهوه</title>
        <link rel="shortcut icon" href="logo.png" type="image/x-icon" />
      </head>
      <body className={inter.className}>
        <SessionProvider>
          <CartContextProvider>
            <CounterProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <div className="font-[fontd2]">
                  <MainHeader />
                  <main className="bg-zinc-100 dark:bg-zinc-900 transition-all">
                    {children}
                  </main>
                  <Toaster />
                  <MainFooter />
                </div>
              </ThemeProvider>
            </CounterProvider>
          </CartContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
