import type { Metadata } from "next"
import { Noto_Sans } from "next/font/google"
import { Navbar } from "./Navbar"
import "@/css/globals.css"
import "@/css/layout.css"
import { Footer } from "./Footer"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const notoSans = Noto_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Advantage Auto",
    template: `%s | Advantage Auto`,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={notoSans.className}>
        <Navbar />
        <div id="modal-container" />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}