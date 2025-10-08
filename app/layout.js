import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteFooter from "./components/SiteFooter";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "JustHome",
  description: "Looking for a Home , here it is ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <Navbar />
        {children}
      <SiteFooter /> 
      <Toaster/>    
      </body>
    </html>
  );
} 
