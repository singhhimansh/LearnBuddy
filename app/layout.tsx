import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/lib/components/Navbar";
import StoreProvider from "@/lib/store/StoreProvider";
import { ToastProvider } from "@/lib/components/Toast";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LearnBuddy",
  description: "LMS for online education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./lms.ico" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <div className="items-center justify-items-center min-h-screen w-full">
          <ToastProvider/>
            <Navbar />
            <div className="w-4/5">{children}</div>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
