import type React from "react";
import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import LenisScrollProvider from "./providers/lenis-provider";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Sachit Dahal",
  description:
    "Developer with 2+ years shipping production software for national platforms, US startups, and design-led agencies. Based in Kathmandu, Nepal.",
  keywords: [
    "Full Stack Developer",
    "React",
    "Next.js",
    "Django",
    "Framer Plugins",
    "Web Developer",
    "Nepal",
    "Sachit Dahal",
  ],
  authors: [{ name: "Sachit Dahal" }],
  creator: "Sachit Dahal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sachit.info.np",
    title: "Sachit Dahal",
    description:
      "Developer with 2+ years shipping production software for national platforms, US startups, and design-led agencies.",
    siteName: "Sachit Dahal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sachit Dahal",
    description:
      "Developer with 2+ years shipping production software for national platforms, US startups, and design-led agencies.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <LenisScrollProvider>{children}</LenisScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
