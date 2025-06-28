import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Sachit Dahal - Full Stack Developer",
  description:
    "Full-stack web developer with 2+ years of experience in React, Next.js, Django, and modern web technologies. Based in Kathmandu, Nepal.",
  keywords: ["Full Stack Developer", "React", "Next.js", "Django", "Web Developer", "Nepal"],
  authors: [{ name: "Sachit Dahal" }],
  creator: "Sachit Dahal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sachit.info.np",
    title: "Sachit Dahal - Full Stack Developer",
    description: "Full-stack web developer specializing in React, Next.js, and Django",
    siteName: "Sachit Dahal Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sachit Dahal - Full Stack Developer",
    description: "Full-stack web developer specializing in React, Next.js, and Django",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="white" enableSystem disableTransitionOnChange={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
