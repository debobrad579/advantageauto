import type { Metadata } from "next";
import { Noto_Sans, Montserrat } from "next/font/google";
import { Navbar } from "./Navbar";
import "@/css/globals.css";
import "@/css/layout.css";
import { Footer } from "./Footer";
import { Analytics } from "@vercel/analytics/react";

const notoSans = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Advantage Auto",
    template: `%s | Advantage Auto`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={notoSans.className}>
        <Navbar />
        <div id="modal-container" />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
